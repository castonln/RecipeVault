using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Models;

namespace server.Services
{
    public class InstructionsService(AppDbContext context, IMemoryCache cache) : BaseEntityService<Instruction>(context, cache)
    {
        public override DbSet<Instruction> GetDbSet() => _context.Instructions;
    }
}