using Microsoft.AspNetCore.Mvc;
using server.Data.DTO;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeIngredientsController(RecipeIngredientsService rcpeIngrdntSrvc) : ControllerBase
    {
        [HttpPatch]
        public async Task<IActionResult> PatchRecipeIngredients(PatchEntityDTO<RecipeIngredientDTO> recipeIngredients)
        {
            if (recipeIngredients is null)
            {
                return BadRequest("No recipe ingredients provided.");
            }
            var result = await rcpeIngrdntSrvc.CreateUpdateDeleteCacheAsync(recipeIngredients);
            if (result is null)
            {
                return UnprocessableEntity("Failed to process recipe ingredients.");
            }
            return Ok(result);
        }
    }
}
