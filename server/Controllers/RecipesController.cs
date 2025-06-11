using Microsoft.AspNetCore.Mvc;
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

            return Ok(userRecipes.Select(x => rcpeSrvc.MapToDTO(x)).ToList());
        }
    }
}
