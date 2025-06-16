using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController(UsersService usrSrvc) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await usrSrvc.GetFromCacheOrDbAsync();
            if (users is null || !users.Any())
            {
                return NotFound("No users found.");
            }
            return Ok(users.Select(usrSrvc.MapToDTO));
        }
    }
}
