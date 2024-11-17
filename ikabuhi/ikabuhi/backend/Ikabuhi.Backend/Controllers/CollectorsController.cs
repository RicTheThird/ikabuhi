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
    public class CollectorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CollectorsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Collectors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Collector>>> GetCollectors()
        {
            return await _context.Collectors.ToListAsync();
        }

        // GET: api/Collectors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Collector>> GetCollector(Guid id)
        {
            var collector = await _context.Collectors.FindAsync(id);

            if (collector == null)
            {
                return NotFound();
            }

            return collector;
        }

        // PUT: api/Collectors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCollector(Guid id, Collector collector)
        {
            if (id != collector.Id)
            {
                return BadRequest();
            }

            _context.Entry(collector).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CollectorExists(id))
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

        // POST: api/Collectors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Collector>> PostCollector(Collector collector)
        {
            _context.Collectors.Add(collector);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCollector", new { id = collector.Id }, collector);
        }

        // DELETE: api/Collectors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollector(Guid id)
        {
            var collector = await _context.Collectors.FindAsync(id);
            if (collector == null)
            {
                return NotFound();
            }

            _context.Collectors.Remove(collector);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CollectorExists(Guid id)
        {
            return _context.Collectors.Any(e => e.Id == id);
        }
    }
}
