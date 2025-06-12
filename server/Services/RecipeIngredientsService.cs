using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Data.DTO;
using server.Models;

namespace server.Services
{
    public class RecipeIngredientsService(IngredientsService ingrdntSrvc, AppDbContext context, IMemoryCache cache) : BaseEntityService<RecipeIngredient>(context, cache)
    {
        public override DbSet<RecipeIngredient> GetDbSet() => _context.RecipeIngredients;

        public async Task<RecipeIngredientDTO> MapToDTO(RecipeIngredient recipeIngredient)
        {
            Ingredient? ingredient = await ingrdntSrvc.GetByIdFromCacheOrDbAsync(recipeIngredient.IngredientId);
            if (ingredient == null) throw new ArgumentException("Ingredient not found for the given RecipeIngredient.");

            return new RecipeIngredientDTO
            {
                Id = recipeIngredient.Id,
                RecipeId = recipeIngredient.RecipeId,
                IngredientId = recipeIngredient.IngredientId,
                Quantity = recipeIngredient.Quantity,
                Unit = recipeIngredient.Unit,
                Ingredient = ingrdntSrvc.MapToDTO(ingredient)
            };
        }

        public RecipeIngredient MapToEntity(RecipeIngredientDTO recipeIngredient)
        {
            return new RecipeIngredient
            {
                Id = recipeIngredient.Id,
                RecipeId = recipeIngredient.RecipeId,
                IngredientId = recipeIngredient.IngredientId,
                Quantity = recipeIngredient.Quantity,
                Unit = recipeIngredient.Unit
            };
        }
    }
}