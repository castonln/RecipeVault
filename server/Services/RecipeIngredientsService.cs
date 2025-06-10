using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Models;

namespace server.Services
{
    public class RecipeIngredientsService(AppDbContext context, IMemoryCache cache) : BaseEntityService<RecipeIngredient>(context, cache)
    {
        public override DbSet<RecipeIngredient> GetDbSet() => _context.RecipeIngredients;
    }
}