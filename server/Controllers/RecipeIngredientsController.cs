using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeIngredientsController(RecipeIngredientsService rcpeIngrdntSrvc) : BaseEntityController<RecipeIngredient>()
    {
        public override BaseEntityService<RecipeIngredient> GetDbService() => rcpeIngrdntSrvc;
    }
}
