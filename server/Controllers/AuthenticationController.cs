using Microsoft.AspNetCore.Mvc;
using server.Data.DTO;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController(UsersService usrSrvc, AuthenticationService authSrvc) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            if (login == null || string.IsNullOrEmpty(login.Username) || string.IsNullOrEmpty(login.Password))
            {
                return BadRequest("Invalid login request.");
            }
            List<User> users = await usrSrvc.GetFromCacheOrDbAsync();
            var existingUser = users.FirstOrDefault(u => u.Username == login.Username && authSrvc.VerifyPassword(login.Password, u.PasswordHash));
            if (existingUser == null)
            {
                return new UnauthorizedObjectResult("Invalid username or password.");
            }
            // Here you would typically generate a JWT token or session for the user  
            return Ok(existingUser.Id);
        }
    }
}
