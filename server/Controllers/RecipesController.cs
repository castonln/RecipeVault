using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipesController(RecipesService rcpeSrvc) : BaseEntityController<Recipe>()
    {
        public override BaseEntityService<Recipe> GetDbService() => rcpeSrvc;
    }
}
