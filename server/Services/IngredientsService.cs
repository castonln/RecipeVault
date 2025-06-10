using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Models;

namespace server.Services
{
    public class IngredientsService(AppDbContext context, IMemoryCache cache) : BaseEntityService<Ingredient>(context, cache)
    {
        public override DbSet<Ingredient> GetDbSet() => _context.Ingredients;
    }
}