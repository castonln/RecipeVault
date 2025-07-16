using Microsoft.AspNetCore.Mvc;
using server.Data.DTO;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SharedRecipesController(
        SharedRecipesService shrdRcpeSrvc,
        UsersService usersService,
        RecipesService recipesService
    ) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromQuery] Guid userId, [FromBody] SharedRecipeDTO sharedRecipeDto)
        {
            if (userId == Guid.Empty)
            {
                return BadRequest("Query parameter 'userId' is required.");
            }
            if (sharedRecipeDto == null)
            {
                return BadRequest("SharedRecipe data is required.");
            }
            if (sharedRecipeDto.SharedWith == Guid.Empty)
            {
                return BadRequest("SharedWith must not be null or empty.");
            }
            if (sharedRecipeDto.RecipeId == Guid.Empty)
            {
                return BadRequest("RecipeId must not be null or empty.");
            }

            // Validate userId
            var user = await usersService.GetByIdFromCacheOrDbAsync(userId);
            if (user == null)
            {
                return UnprocessableEntity("userId is not a valid user.");
            }

            // Validate sharedWith
            var sharedWithUser = await usersService.GetByIdFromCacheOrDbAsync(sharedRecipeDto.SharedWith);
            if (sharedWithUser == null)
            {
                return UnprocessableEntity("SharedWith is not a valid user.");
            }

            // Validate recipeId
            var recipe = await recipesService.GetByIdFromCacheOrDbAsync(sharedRecipeDto.RecipeId);
            if (recipe == null)
            {
                return UnprocessableEntity("RecipeId is not a valid recipe.");
            }

            // Check for uniqueness: no existing SharedRecipe with same RecipeId and SharedWith
            var existingSharedRecipes = await shrdRcpeSrvc.GetFromCacheOrDbAsync();
            bool alreadyExists = existingSharedRecipes.Any(
                sr => sr.RecipeId == sharedRecipeDto.RecipeId && sr.SharedWith == sharedRecipeDto.SharedWith
            );
            if (alreadyExists)
            {
                return Conflict("A shared recipe with this recipeId and sharedWith already exists.");
            }

            // Map DTO to entity and set required fields
            sharedRecipeDto.Id = Guid.NewGuid(); // Generate and set a new GUID
            var sharedRecipe = shrdRcpeSrvc.MapToEntity(sharedRecipeDto);
            sharedRecipe.SharedBy = userId;
            sharedRecipe.ShareDate = DateOnly.FromDateTime(DateTime.UtcNow);

            // Create and update cache
            var createdEntity = await shrdRcpeSrvc.CreateAndUpdateCacheAsync(sharedRecipe);

            // Map back to DTO for response
            var resultDto = shrdRcpeSrvc.MapToDTO(createdEntity);

            return CreatedAtAction(null, new { id = resultDto.Id }, resultDto);
        }
    }
}
