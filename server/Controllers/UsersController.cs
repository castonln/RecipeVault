using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController(UsersService usrSrvc) : BaseEntityController<User>()
    {
        public override BaseEntityService<User> GetDbService() => usrSrvc;
    }
}
