using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;
using server.Data.DTO;
using server.Models;

namespace server.Services
{
    public class InstructionsService(AppDbContext context, IMemoryCache cache) : BaseEntityService<Instruction, InstructionDTO>(context, cache)
    {
        public override DbSet<Instruction> GetDbSet() => _context.Instructions;

        public override InstructionDTO MapToDTO(Instruction instruction)
        {
            return new InstructionDTO
            {
                Id = instruction.Id,
                InstructionNumber = instruction.InstructionNumber,
                RecipeId = instruction.RecipeId,
                Description = instruction.Description
            };
        }

        public override Instruction MapToEntity(InstructionDTO instruction)
        {
            return new Instruction
            {
                Id = instruction.Id ?? throw new Exception("entityId must not be null"),
                InstructionNumber = instruction.InstructionNumber,
                RecipeId = instruction.RecipeId,
                Description = instruction.Description
            };
        }
    }
}