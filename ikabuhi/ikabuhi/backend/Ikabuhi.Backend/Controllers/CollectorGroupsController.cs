using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ikabuhi.Backend;
using Ikabuhi.Backend.Models;

namespace Ikabuhi.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectorGroupsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CollectorGroupsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CollectorGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollectorGroup>>> GetCollectorGroups()
        {
            return await _context.CollectorGroups.ToListAsync();
        }

        // GET: api/CollectorGroups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CollectorGroup>> GetCollectorGroup(Guid id)
        {
            var collectorGroup = await _context.CollectorGroups.FindAsync(id);

            if (collectorGroup == null)
            {
                return NotFound();
            }

            return collectorGroup;
        }

        // PUT: api/CollectorGroups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCollectorGroup(Guid id, CollectorGroup collectorGroup)
        {
            if (id != collectorGroup.Id)
            {
                return BadRequest();
            }

            _context.Entry(collectorGroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CollectorGroupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CollectorGroups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CollectorGroup>> PostCollectorGroup(CollectorGroup collectorGroup)
        {
            _context.CollectorGroups.Add(collectorGroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCollectorGroup", new { id = collectorGroup.Id }, collectorGroup);
        }

        // DELETE: api/CollectorGroups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollectorGroup(Guid id)
        {
            var collectorGroup = await _context.CollectorGroups.FindAsync(id);
            if (collectorGroup == null)
            {
                return NotFound();
            }

            _context.CollectorGroups.Remove(collectorGroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CollectorGroupExists(Guid id)
        {
            return _context.CollectorGroups.Any(e => e.Id == id);
        }
    }
}
