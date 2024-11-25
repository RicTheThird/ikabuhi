using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ikabuhi.Backend;
using Ikabuhi.Backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace Ikabuhi.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : BaseController
    {
        private readonly ApplicationDbContext _context;

        public GroupsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Groups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
        {
            return await _context.Groups.Include(g => g.Members).ToListAsync();
        }

        // GET: api/Groups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> GetGroup(Guid id)
        {
            var @group = await _context.Groups.FindAsync(id);

            if (@group == null)
            {
                return NotFound();
            }

            return @group;
        }

        // PUT: api/Groups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroup(Guid id, Group @group)
        {
            if (id != @group.Id)
            {
                return BadRequest();
            }

            _context.Entry(@group).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupExists(id))
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

        // POST: api/Groups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Group>> PostGroup(GroupDto groupDto)
        {
            var exists = await _context.Groups.SingleOrDefaultAsync(g => g.Name == groupDto.Name);
            if (exists != null) return BadRequest("Group name already exist.");

            var groupId = Guid.NewGuid();
            var group = new Group
            {
                Id = groupId,
                Name = groupDto.Name,
                Brgy = groupDto.Brgy,
                MeetingDay = groupDto.MeetingDay,
                MeetingTime = groupDto.MeetingTime,
                Municipality = groupDto?.Municipality
            };

            _context.Groups.Add(group);

            var collectorGroup = new CollectorGroup
            {
                Id = Guid.NewGuid(),
                CollectorId = GetUserId(),
                GroupId = groupId,
                IsActive = true
            };

            _context.CollectorGroups.Add(collectorGroup);

            await _context.SaveChangesAsync();

            return group;
        }

        // DELETE: api/Groups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(Guid id)
        {
            var @group = await _context.Groups.FindAsync(id);
            if (@group == null)
            {
                return NotFound();
            }

            _context.Groups.Remove(@group);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GroupExists(Guid id)
        {
            return _context.Groups.Any(e => e.Id == id);
        }
    }

    public class GroupDto
    {
        public string Name { get; set; }
        public string Brgy { get; set; }
        public string? Municipality { get; set; } = "Tanauan";
        public int MeetingDay { get; set; } // 0=Sunday, 1=Monday, etc.
        public string MeetingTime { get; set; }
    }
}