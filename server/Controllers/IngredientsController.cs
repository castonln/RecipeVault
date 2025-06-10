using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IngredientsController(IngredientsService ingrdntSrvc) : BaseEntityController<Ingredient>()
    {
        public override BaseEntityService<Ingredient> GetDbService() => ingrdntSrvc;
    }
}
