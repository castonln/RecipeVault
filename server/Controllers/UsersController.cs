using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController(UserService usrSrvc) : BaseEntityController<User>()
    {
        public override BaseEntityService<User> GetDbService() => usrSrvc;
    }
}
