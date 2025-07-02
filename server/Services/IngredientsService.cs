using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Data.DTO;
using server.Models;

namespace server.Services
{
    public class IngredientsService(AppDbContext context, IMemoryCache cache) : BaseEntityService<Ingredient, IngredientDTO>(context, cache)
    {
        public override DbSet<Ingredient> GetDbSet() => _context.Ingredients;

        public override IngredientDTO MapToDTO(Ingredient ingredient)
        {
            return new IngredientDTO
            {
                Id = ingredient.Id,
                Name = ingredient.Name,
                FdaId = ingredient.FdaId,
                Calories = ingredient.Calories,
                Carbs = ingredient.Carbs,
                Fats = ingredient.Fats,
                Protein = ingredient.Protein,
                ServingSize = ingredient.ServingSize,
                Unit = ingredient.Unit
            };
        }

        public override Ingredient MapToEntity(IngredientDTO ingredient)
        {
            return new Ingredient
            {
                Id = ingredient.Id ?? throw new Exception("entityId must not be null"),
                Name = ingredient.Name,
                FdaId = ingredient.FdaId,
                Calories = ingredient.Calories,
                Carbs = ingredient.Carbs,
                Fats = ingredient.Fats,
                Protein = ingredient.Protein,
                ServingSize = ingredient.ServingSize,
                Unit = ingredient.Unit
            };
        }
    }
}