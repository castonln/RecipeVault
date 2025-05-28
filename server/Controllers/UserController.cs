using Microsoft.AspNetCore.Mvc;
using server;

namespace client.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(Constants.DB_CONNECTION_STRING);
        }
    }
}
