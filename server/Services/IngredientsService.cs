using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Data.DTO;
using server.Models;

namespace server.Services
{
    public class IngredientsService(AppDbContext context, IMemoryCache cache) : BaseEntityService<Ingredient>(context, cache)
    {
        public override DbSet<Ingredient> GetDbSet() => _context.Ingredients;

        public IngredientDTO MapToDTO(Ingredient ingredient)
        {
            return new IngredientDTO
            {
                Id = ingredient.Id,
                Name = ingredient.Name,
                FdaId = ingredient.FdaId,
            };
        }

        public Ingredient MapToEntity(IngredientDTO ingredient)
        {
            return new Ingredient
            {
                Id = ingredient.Id,
                Name = ingredient.Name,
                FdaId = ingredient.FdaId
            };
        }
    }
}