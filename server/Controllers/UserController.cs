using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server;
using server.Data;

namespace client.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await context.Users.ToListAsync();
            return Ok(items);
        }
    }
}
