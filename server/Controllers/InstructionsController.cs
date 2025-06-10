using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InstructionsController(InstructionsService instrctnSrvc) : BaseEntityController<Instruction>()
    {
        public override BaseEntityService<Instruction> GetDbService() => instrctnSrvc;
    }
}
