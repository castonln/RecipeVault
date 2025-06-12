using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data.DTO;
using server.Models;
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

        [HttpPost]
        public async Task<IActionResult> CreateRecipe([FromQuery] Guid userId, [FromBody] CreateRecipe recipe)
        {
            // Validate input
            if (recipe == null)
                return UnprocessableEntity("Invalid recipe data.");

            if (userId == Guid.Empty)
                return UnprocessableEntity("userId must be provided.");

            // Check if user exists
            var user = await usrSrvc.GetByIdFromCacheOrDbAsync(userId);
            if (user == null)
                return UnprocessableEntity("No existing user with that id.");

            // Create recipe
            var newRecipe = new Recipe
            {
                Name = recipe.Name,
                Description = recipe.Description,
                Servings = recipe.Servings,
                ServingSize = recipe.ServingSize,
                PrepTime = recipe.PrepTime,
                CookTime = recipe.CookTime,
                CreatedBy = userId
            };

            // Update in DB and refresh cache
            var created = await rcpeSrvc.CreateAndUpdateCacheAsync(newRecipe);
            var resultDto = rcpeSrvc.MapToSimpleDTO(created);

            return CreatedAtAction(nameof(GetRecipe), new { recipeId = resultDto.Id, userId }, resultDto);
        }

        [HttpPut]
        public async Task<IActionResult> ModifyRecipe([FromQuery] Guid userId, [FromBody] SimpleRecipeDTO recipe)
        {
            // Validate input
            if (recipe == null)
                return UnprocessableEntity("Invalid recipe data.");

            if (recipe.CreatedBy == Guid.Empty)
                return UnprocessableEntity("createdBy must be provided.");

            if (recipe.Id == Guid.Empty)
                return UnprocessableEntity("Recipe id must be provided.");

            // Check if user exists
            var user = await usrSrvc.GetByIdFromCacheOrDbAsync(userId);
            if (user == null)
                return UnprocessableEntity("No existing user with that id.");

            // Check if recipe exists
            var existingRecipe = await rcpeSrvc.GetByIdFromCacheOrDbAsync(recipe.Id);
            if (existingRecipe == null)
                return UnprocessableEntity("No existing recipe with that id.");

            // Check if recipe belongs to user
            if (existingRecipe.CreatedBy != userId || recipe.CreatedBy != userId)
                return UnprocessableEntity("Recipe does not belong to the specified user.");

            // Update in DB and refresh cache
            var updatedEntity = rcpeSrvc.MapToEntity(recipe);
            var updated = await rcpeSrvc.UpdateAndRefreshCacheAsync(recipe.Id, updatedEntity);
            if (updated == null)
                return UnprocessableEntity("Failed to update recipe.");

            var resultDto = rcpeSrvc.MapToSimpleDTO(updated);
            return Ok(resultDto);
        }

        [HttpDelete("{recipeId}")]
        public async Task<IActionResult> DeleteRecipe([FromRoute] Guid recipeId, [FromQuery] Guid userId)
        {
            // Validate input
            if (recipeId == Guid.Empty)
                return UnprocessableEntity("Recipe id must be provided.");

            if (userId == Guid.Empty)
                return UnprocessableEntity("userId must be provided.");

            // Check if user exists
            var user = await usrSrvc.GetByIdFromCacheOrDbAsync(userId);
            if (user == null)
                return UnprocessableEntity("No existing user with that id.");

            // Check if recipe exists
            var recipe = await rcpeSrvc.GetByIdFromCacheOrDbAsync(recipeId);
            if (recipe == null)
                return UnprocessableEntity("No existing recipe with that id.");

            // Check if recipe belongs to user
            if (recipe.CreatedBy != userId)
                return UnprocessableEntity("Recipe does not belong to the specified user.");

            // Delete recipe and refresh cache
            var deleted = await rcpeSrvc.DeleteAndRefreshCacheAsync(recipeId);
            if (deleted == null)
                return UnprocessableEntity("Failed to delete recipe.");

            var resultDto = rcpeSrvc.MapToSimpleDTO(deleted);
            return Ok(resultDto);
        }
    }
}
