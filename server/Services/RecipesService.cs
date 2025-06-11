using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Data.DTO;
using server.Models;

namespace server.Services
{
    public class RecipesService(AppDbContext context, IMemoryCache cache) : BaseEntityService<Recipe>(context, cache)
    {
        public override DbSet<Recipe> GetDbSet() => _context.Recipes;

        public SimpleRecipeData MapToDTO(Recipe recipe)
        {
            return new SimpleRecipeData
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

        public Recipe MapToEntity(SimpleRecipeData recipe)
        {
            return new Recipe
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
    }
}