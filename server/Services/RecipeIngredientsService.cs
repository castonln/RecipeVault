using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Data.DTO;
using server.Models;

namespace server.Services
{
    public class RecipeIngredientsService(IngredientsService ingrdntSrvc, AppDbContext context, IMemoryCache cache) : BaseEntityService<RecipeIngredient, RecipeIngredientDTO>(context, cache)
    {
        public override DbSet<RecipeIngredient> GetDbSet() => _context.RecipeIngredients;

        public override RecipeIngredientDTO MapToDTO(RecipeIngredient entity)
        {
            return MapToDTOAsync(entity).GetAwaiter().GetResult() ?? throw new ArgumentException("RecipeIngredient not found for the given entity.");
        }

        public async Task<RecipeIngredientDTO> MapToDTOAsync(RecipeIngredient recipeIngredient)
        {
            Ingredient? ingredient = await ingrdntSrvc.GetByIdFromCacheOrDbAsync(recipeIngredient.IngredientId);
            return ingredient == null
                ? throw new ArgumentException("Ingredient not found for the given RecipeIngredient.")
                : new RecipeIngredientDTO
                {
                    Id = recipeIngredient.Id,
                    RecipeId = recipeIngredient.RecipeId,
                    IngredientId = recipeIngredient.IngredientId,
                    Quantity = recipeIngredient.Quantity,
                    Unit = recipeIngredient.Unit,
                    Ingredient = ingrdntSrvc.MapToDTO(ingredient)
                };
        }

        public override RecipeIngredient MapToEntity(RecipeIngredientDTO recipeIngredient)
        {
            return new RecipeIngredient
            {
                Id = recipeIngredient.Id ?? throw new Exception("entityId must not be null"),
                RecipeId = recipeIngredient.RecipeId,
                IngredientId = recipeIngredient.IngredientId,
                Quantity = recipeIngredient.Quantity,
                Unit = recipeIngredient.Unit
            };
        }
    }
}