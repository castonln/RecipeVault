using Microsoft.AspNetCore.Mvc;
using server.Data.DTO;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InstructionsController(InstructionsService instrctnSrvc) : ControllerBase
    {
        [HttpPatch]
        public async Task<IActionResult> PatchInstructions(PatchEntityDTO<InstructionDTO> instructions)
        {
            if (instructions is null)
            {
                return BadRequest("No instructions provided.");
            }
            var result = await instrctnSrvc.CreateUpdateDeleteCacheAsync(instructions);
            if (result is null)
            {
                return UnprocessableEntity("Failed to process instructions.");
            }
            return Ok(result);
        }
    }
}