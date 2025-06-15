using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Data.DTO;
using server.Models;

namespace server.Services
{
    public abstract class BaseEntityService<TEntity, TEntityDTO>(AppDbContext context, IMemoryCache cache)
           where TEntity : BaseEntity
           where TEntityDTO : BaseEntityDTO
    {
        protected readonly AppDbContext _context = context;
        protected readonly IMemoryCache _cache = cache;

        public abstract DbSet<TEntity> GetDbSet();

        public abstract TEntityDTO MapToDTO(TEntity entity);
        public abstract TEntity MapToEntity(TEntityDTO dto);

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
            var dbSet = GetDbSet();

            // Fetch from the database for tracking  
            var entity = await dbSet.FindAsync(id);
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

        public async Task<PatchEntityDTO<TEntityDTO>> CreateUpdateDeleteCacheAsync(PatchEntityDTO<TEntityDTO> entities)
        {
            PatchEntityDTO<TEntityDTO> newEntities = new();

            if (entities.CreateEntities is not null && entities.CreateEntities.Count > 0)
            {
                foreach (var entity in entities.CreateEntities)
                {
                    if (entity.Id is not null) throw new Exception("When creating entity, entityId must be null.");
                    entity.Id = Guid.NewGuid();
                    var createdEntity = await CreateAndUpdateCacheAsync(MapToEntity(entity));
                    newEntities.CreateEntities.Add(entity);
                }
            }

            if (entities.UpdateEntities is not null && entities.UpdateEntities.Count > 0)
            {
                foreach (var entity in entities.UpdateEntities)
                {
                    var updatedEntity = await UpdateAndRefreshCacheAsync(entity.Id ?? throw new Exception("entityId must not be null"), MapToEntity(entity));
                    if (updatedEntity is not null)
                    {
                        newEntities.UpdateEntities.Add(entity);
                    }
                }
            }

            if (entities.DeleteEntities is not null && entities.DeleteEntities.Count > 0)
            {
                foreach (var entity in entities.DeleteEntities)
                {
                    var deletedEntity = await DeleteAndRefreshCacheAsync(entity.Id ?? throw new Exception("entityId must not be null"));
                    if (deletedEntity is not null)
                    {
                        newEntities.DeleteEntities.Add(MapToDTO(deletedEntity));
                    }
                }
            }

            return newEntities;
        }
    }
}
