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
            return Ok(existingUser.Id);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUp signup)
        {
            if (signup == null || string.IsNullOrEmpty(signup.Username) || string.IsNullOrEmpty(signup.Email) || string.IsNullOrEmpty(signup.Password))
            {
                return BadRequest("Invalid signup request.");
            }
            List<User> users = await usrSrvc.GetFromCacheOrDbAsync();
            if (users.Any(u => u.Email == signup.Email || u.Username == signup.Username))
            {
                return UnprocessableEntity("User already exists with this email or username.");
            }
            var newUser = new User
            {
                Username = signup.Username,
                Email = signup.Email,
                PasswordHash = authSrvc.HashPassword(signup.Password),
                CreatedAt = DateOnly.FromDateTime(DateTime.UtcNow)
            };
            await usrSrvc.CreateAndUpdateCacheAsync(newUser);
            return Ok(newUser.Id);
        }
    }
}