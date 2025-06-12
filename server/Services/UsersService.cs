using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Models;

namespace server.Services
{
    public class UsersService(AppDbContext context, IMemoryCache cache) : BaseEntityService<User>(context, cache)
    {
        public override DbSet<User> GetDbSet() => _context.Users;
    }
}
