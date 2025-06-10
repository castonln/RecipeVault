using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public abstract class BaseEntityController<TEntity>() : ControllerBase where TEntity : BaseEntity
    {
        public abstract BaseEntityService<TEntity> GetDbService();

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await GetDbService().GetFromCacheOrDbAsync();
            return Ok(items);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne([FromRoute] Guid id)
        {
            var items = await GetDbService().GetByIdFromCacheOrDbAsync(id);
            return Ok(items);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TEntity entity)
        {
            if (entity == null)
            {
                return BadRequest("Entity cannot be null.");
            }
            var createdEntity = await GetDbService().CreateAndUpdateCacheAsync(entity);
            return CreatedAtAction(nameof(GetOne), new { id = createdEntity.Id }, createdEntity);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] TEntity entity)
        {
            if (entity == null || entity.Id != id)
            {
                return BadRequest("Entity cannot be null and must match the ID in the route.");
            }
            var existingEntity = await GetDbService().GetByIdFromCacheOrDbAsync(id);
            if (existingEntity == null)
            {
                return NotFound();
            }
            // Update properties as needed
            existingEntity = entity; // Assuming TEntity has properties to update
            var returnEntity = await GetDbService().UpdateAndRefreshCacheAsync(id, existingEntity);
            return Ok(returnEntity);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var entity = await GetDbService().GetByIdFromCacheOrDbAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            var returnEntity = await GetDbService().DeleteAndRefreshCacheAsync(id);
            return Ok(returnEntity);
        }
    }
}
