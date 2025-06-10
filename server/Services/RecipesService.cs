using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Models;

namespace server.Services
{
    public class RecipesService(AppDbContext context, IMemoryCache cache) : BaseEntityService<Recipe>(context, cache)
    {
        public override DbSet<Recipe> GetDbSet() => _context.Recipes;
    }
}