using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Data.DTO;
using server.Models;

namespace server.Services
{
    public class UsersService(AppDbContext context, IMemoryCache cache) : BaseEntityService<User, UserDTO>(context, cache)
    {
        public override DbSet<User> GetDbSet() => _context.Users;

        public override UserDTO MapToDTO(User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Username = user.Username,
                PasswordHash = user.PasswordHash,
                CreatedAt = user.CreatedAt,
                Email = user.Email
            };
        }

        public override User MapToEntity(UserDTO user)
        {
            return new User
            {
                Id = user.Id ?? throw new Exception("entityId must not be null"),
                Username = user.Username,
                PasswordHash = user.PasswordHash,
                CreatedAt = user.CreatedAt,
                Email = user.Email
            };
        }
    }
}
