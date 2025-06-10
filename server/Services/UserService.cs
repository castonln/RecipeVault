using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Models;

namespace server.Services
{
    public class UserService(AppDbContext context, IMemoryCache cache) : BaseEntityService<User>(context, cache)
    {
        public override DbSet<User> GetDbSet() => _context.Users;
        // Additional methods specific to UserService can be added here
    }
}
