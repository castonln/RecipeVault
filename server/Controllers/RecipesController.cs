using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipesController(RecipesService rcpeSrvc, UsersService usrSrvc) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Guid userId)
        {
            // Check if user exists
            var user = await usrSrvc.GetByIdFromCacheOrDbAsync(userId);
            if (user == null)
            {
                return UnprocessableEntity("No existing user with that id.");
            }

            // Get all recipes for the user
            var recipes = await rcpeSrvc.GetFromCacheOrDbAsync();
            var userRecipes = recipes.Where(r => r.CreatedBy == userId).ToList();

            return Ok(userRecipes.Select(x => rcpeSrvc.MapToSimpleDTO(x)).ToList());
        }

        [HttpGet("{recipeId}")]
        public async Task<IActionResult> GetRecipe([FromRoute] Guid recipeId, [FromQuery] Guid userId)
        {
            // Check if user exists
            var user = await usrSrvc.GetByIdFromCacheOrDbAsync(userId);
            if (user == null)
            {
                return UnprocessableEntity("No existing user with that id.");
            }

            // Get the recipe with all related data
            var recipe = await rcpeSrvc.GetDbSet()
                .Include(r => r.Instructions)
                .Include(r => r.RecipeIngredients)
                    .ThenInclude(ri => ri.Ingredient)
                .FirstOrDefaultAsync(r => r.Id == recipeId);

            if (recipe == null)
            {
                return UnprocessableEntity("No existing recipe with that id.");
            }

            if (recipe.CreatedBy != userId)
            {
                return UnprocessableEntity("Recipe does not belong to the specified user.");
            }

            // Optionally, map to a DTO if you want to control the output structure
            return Ok(await rcpeSrvc.MapToComplexDTO(recipe));
        }
    }
}
