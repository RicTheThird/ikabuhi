using Ardalis.Result;
using Ikabuhi.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ikabuhi.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectorGroupsController : BaseController
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

        [Authorize]
        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<CollectGroupsResponse>>> GetMyCollectorGroups()
        {
            var response = new List<CollectGroupsResponse>();
            var result = await _context.CollectorGroups.Where(c => c.CollectorId == GetUserId()).Include(c => c.Group)
                .ThenInclude(c => c.Members).ToListAsync();
            foreach (var item in result)
            {
                var temp = new CollectGroupsResponse
                {
                    Id = item.GroupId,
                    Brgy = item?.Group.Brgy,
                    MeetingDay = item.Group.MeetingDay,
                    MeetingTime = item.Group.MeetingTime,
                    MemberCount = item.Group.Members.Count(),
                    Municipality = item.Group.Municipality,
                    Name = item.Group.Name
                };
                response.Add(temp);
            }

            return response;
        }

        // GET: api/CollectorGroups/5
        [Authorize]
        [HttpGet("group/{id}")]
        public async Task<ActionResult<CollectGroupsResponse>> GetCollectorGroupById(Guid id)
        {
            var result = await _context.CollectorGroups.Where(c => c.GroupId == id).Include(c => c.Group)
                .ThenInclude(c => c.Members).FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound();
            }

            var response = new CollectGroupsResponse
            {
                Id = result.GroupId,
                Brgy = result?.Group.Brgy,
                MeetingDay = result.Group.MeetingDay,
                MeetingTime = result.Group.MeetingTime,
                MemberCount = result.Group.Members.Count(),
                Municipality = result.Group.Municipality,
                Name = result.Group.Name
            };

            return response;
        }

        // PUT: api/CollectorGroups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
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

    public class CollectGroupsResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Brgy { get; set; }
        public string Municipality { get; set; }
        public int MeetingDay { get; set; } // 0=Sunday, 1=Monday, etc.
        public string MeetingTime { get; set; }
        public int MemberCount { get; set; }
    }
}