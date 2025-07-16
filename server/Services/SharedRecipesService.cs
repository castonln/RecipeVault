using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Data.DTO;
using server.Models;

namespace server.Services
{
    public class SharedRecipesService(AppDbContext context, IMemoryCache cache) : BaseEntityService<SharedRecipe, SharedRecipeDTO>(context, cache)
    {
        public override DbSet<SharedRecipe> GetDbSet() => _context.SharedRecipes;

        public override SharedRecipeDTO MapToDTO(SharedRecipe sharedRecipe)
        {
            return new SharedRecipeDTO
            {
                Id = sharedRecipe.Id,
                ShareDate = sharedRecipe.ShareDate,
                SharedBy = sharedRecipe.SharedBy,
                SharedWith = sharedRecipe.SharedWith,
                RecipeId = sharedRecipe.RecipeId
            };
        }

        public override SharedRecipe MapToEntity(SharedRecipeDTO sharedRecipe)
        {
            return new SharedRecipe
            {
                Id = sharedRecipe.Id ?? throw new Exception("entityId must not be null"),
                ShareDate = sharedRecipe.ShareDate,
                SharedBy = sharedRecipe.SharedBy,
                SharedWith = sharedRecipe.SharedWith,
                RecipeId = sharedRecipe.RecipeId
            };
        }
    }
}
