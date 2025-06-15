using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IngredientsController(IngredientsService ingrdntSrvc) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetIngredients()
        {
            var ingredients = await ingrdntSrvc.GetFromCacheOrDbAsync();
            if (ingredients is null || ingredients.Count == 0)
            {
                return NotFound("No ingredients found.");
            }
            return Ok(ingredients.Select(ingrdntSrvc.MapToDTO));
        }
    }
}
