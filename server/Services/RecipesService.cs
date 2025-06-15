using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Data.DTO;
using server.Models;

namespace server.Services
{
    public class RecipesService(InstructionsService instrctnSrvc, RecipeIngredientsService rcpIngrdntSrvc, AppDbContext context, IMemoryCache cache) : BaseEntityService<Recipe, SimpleRecipeDTO>(context, cache)
    {
        public override DbSet<Recipe> GetDbSet() => _context.Recipes;

        public override SimpleRecipeDTO MapToDTO(Recipe recipe)
        {
            return new SimpleRecipeDTO
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Description = recipe.Description,
                Servings = recipe.Servings,
                ServingSize = recipe.ServingSize,
                PrepTime = recipe.PrepTime,
                CookTime = recipe.CookTime,
                CreatedBy = recipe.CreatedBy
            };
        }

        public override Recipe MapToEntity(SimpleRecipeDTO recipe)
        {
            return new Recipe
            {
                Id = recipe.Id ?? throw new Exception("entityId must not be null"),
                Name = recipe.Name,
                Description = recipe.Description,
                Servings = recipe.Servings,
                ServingSize = recipe.ServingSize,
                PrepTime = recipe.PrepTime,
                CookTime = recipe.CookTime,
                CreatedBy = recipe.CreatedBy
            };
        }

        public async Task<ComplexRecipeDTO> MapToComplexDTO(Recipe recipe)
        {
            // Get instructions from cache or database
            var instructionsEntities = await instrctnSrvc.GetFromCacheOrDbAsync();
            List<InstructionDTO> instructions = instructionsEntities
                .Where(i => i.RecipeId == recipe.Id)
                .Select(i => instrctnSrvc.MapToDTO(i)).ToList();

            // Get recipe ingredients from cache or database
            var recipeIngredientsEntities = await rcpIngrdntSrvc.GetFromCacheOrDbAsync();
            List<RecipeIngredientDTO> recipeIngredients = recipeIngredientsEntities
                    .Where(ri => ri.RecipeId == recipe.Id)
                    .Select(ri => rcpIngrdntSrvc.MapToDTO(ri)).ToList();

            return new ComplexRecipeDTO
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Description = recipe.Description,
                Servings = recipe.Servings,
                ServingSize = recipe.ServingSize,
                PrepTime = recipe.PrepTime,
                CookTime = recipe.CookTime,
                CreatedBy = recipe.CreatedBy,
                Instructions = instructions,
                RecipeIngredients = recipeIngredients
            };
        }

        public Recipe MapToEntityFromComplexRecipe(ComplexRecipeDTO recipe)
        {
            return new Recipe
            {
                Id = recipe.Id ?? throw new Exception("entityId must not be null."),
                Name = recipe.Name,
                Description = recipe.Description,
                Servings = recipe.Servings,
                ServingSize = recipe.ServingSize,
                PrepTime = recipe.PrepTime,
                CookTime = recipe.CookTime,
                CreatedBy = recipe.CreatedBy
            };
        }
    }
}