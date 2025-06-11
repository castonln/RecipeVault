using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Models;

namespace server.Services
{
    public abstract class BaseEntityService<TEntity> where TEntity : BaseEntity
    {
        protected readonly AppDbContext _context;
        protected readonly IMemoryCache _cache;

        public BaseEntityService(AppDbContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }

        public abstract DbSet<TEntity> GetDbSet();

        public static readonly string cacheKey = typeof(TEntity).Name;

        public async Task<List<TEntity>> GetFromCacheOrDbAsync()
        {
            if (!_cache.TryGetValue(cacheKey, out List<TEntity>? items))
            {
                items = await GetDbSet().ToListAsync();
                var cacheOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(120));
                _cache.Set(cacheKey, items, cacheOptions);
            }

            return items ?? [];
        }


        public async Task<TEntity?> GetByIdFromCacheOrDbAsync(Guid id)
        {
            if (_cache.TryGetValue(cacheKey, out List<TEntity>? items) && items is not null)
            {
                var entity = items.FirstOrDefault(e => e.Id.Equals(id));
                if (entity is not null)
                {
                    return entity;
                }
            }

            var dbEntity = await GetDbSet().FindAsync(id);
            return dbEntity ?? null;
        }


        public async Task<TEntity> CreateAndUpdateCacheAsync(TEntity entity)
        {
            var dbSet = GetDbSet();
            await dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();

            var items = await dbSet.ToListAsync();
            var cacheOptions = new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromMinutes(120));
            _cache.Set(cacheKey, items, cacheOptions);

            return entity;
        }


        public async Task<TEntity?> UpdateAndRefreshCacheAsync(Guid id, TEntity updatedEntity)
        {
            // Try to get the entity from cache or DB
            var entity = await GetByIdFromCacheOrDbAsync(id);
            if (entity is null)
                return null;

            // Update the entity properties
            _context.Entry(entity).CurrentValues.SetValues(updatedEntity);

            // Save changes
            await _context.SaveChangesAsync();

            // Refresh the cache with the latest data
            var items = await GetDbSet().ToListAsync();
            var cacheOptions = new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromMinutes(120));
            _cache.Set(cacheKey, items, cacheOptions);

            return entity;
        }


        public async Task<TEntity?> DeleteAndRefreshCacheAsync(Guid id)
        {
            var dbSet = GetDbSet();
            var entity = await dbSet.FindAsync(id);
            if (entity == null)
            {
                return null;
            }

            dbSet.Remove(entity);
            await _context.SaveChangesAsync();

            // Refresh the cache
            var items = await dbSet.ToListAsync();
            var cacheOptions = new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromMinutes(120));
            _cache.Set(cacheKey, items, cacheOptions);

            return entity;
        }
    }
}
