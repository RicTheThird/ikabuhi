using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ikabuhi.Backend;
using Ikabuhi.Backend.Models;
using Ikabuhi.Backend.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace Ikabuhi.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectorsController : BaseController
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

        [Authorize]
        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<Collector>>> GetMyCollectors()
        {
            return await _context.Collectors.Where(c => c.Id == GetUserId()).Include(c => c.CollectorGroups).ToListAsync();
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

        [Authorize]
        [HttpGet("group/{id}")]
        public async Task<ActionResult<Collector>> GetCollectorByGroup(Guid id)
        {
            var collector = await _context.CollectorGroups.Where(c => c.GroupId == id).Include(c => c.Collector).Select(c => new Collector
            {
                FirstName = c.Collector.FirstName,
                LastName = c.Collector.LastName,
                Id = c.CollectorId,
            }).ToListAsync();

            if (collector == null)
            {
                return NotFound();
            }

            return Ok(collector);
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
        [HttpPost("register")]
        public async Task<ActionResult<Collector>> PostCollector(CollectorDto collectorDto)
        {
            if (collectorDto == null) return BadRequest();

            var exists = await _context.Collectors.SingleOrDefaultAsync(x => x.UserName == collectorDto.UserName);
            if (exists != null) return BadRequest("Username exists");

            var collectorId = Guid.NewGuid();
            var collector = new Collector
            {
                Id = collectorId,
                UserName = collectorDto.UserName,
                LastName = collectorDto.LastName,
                FirstName = collectorDto.FirstName,
                MiddleName = collectorDto.MiddleName,
                Address = collectorDto.Address,
                ContactNo = collectorDto.ContactNo,
                Branch = collectorDto.Branch,
                PasswordHash = collectorDto.PasswordRaw.Hash(),
                CreatedAt = DateTime.UtcNow.ToSEATimeFromUtc(),
                IsActive = true
            };

            await _context.Collectors.AddAsync(collector);

            var collectorGroups = new List<CollectorGroup>();

            foreach (var groupId in collectorDto.GroupIds)
            {
                var group = new CollectorGroup
                {
                    Id = Guid.NewGuid(),
                    CollectorId = collectorId,
                    GroupId = groupId,
                    IsActive = true,
                };

                collectorGroups.Add(group);
            }

            await _context.CollectorGroups.AddRangeAsync(collectorGroups);
            await _context.SaveChangesAsync();
            return Ok(collector);
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

    public class CollectorDto
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string Branch { get; set; } = "Tanauan";
        public string UserName { get; set; }
        public string PasswordRaw { get; set; }
        public List<Guid> GroupIds { get; set; }
    }
}