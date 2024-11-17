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
    public class MemberSavingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MemberSavingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MemberSavings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberSaving>>> GetMemberSavings()
        {
            return await _context.MemberSavings.ToListAsync();
        }

        // GET: api/MemberSavings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemberSaving>> GetMemberSaving(Guid id)
        {
            var memberSaving = await _context.MemberSavings.FindAsync(id);

            if (memberSaving == null)
            {
                return NotFound();
            }

            return memberSaving;
        }

        // PUT: api/MemberSavings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMemberSaving(Guid id, MemberSaving memberSaving)
        {
            if (id != memberSaving.Id)
            {
                return BadRequest();
            }

            _context.Entry(memberSaving).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberSavingExists(id))
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

        // POST: api/MemberSavings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MemberSaving>> PostMemberSaving(MemberSaving memberSaving)
        {
            _context.MemberSavings.Add(memberSaving);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMemberSaving", new { id = memberSaving.Id }, memberSaving);
        }

        // DELETE: api/MemberSavings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMemberSaving(Guid id)
        {
            var memberSaving = await _context.MemberSavings.FindAsync(id);
            if (memberSaving == null)
            {
                return NotFound();
            }

            _context.MemberSavings.Remove(memberSaving);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemberSavingExists(Guid id)
        {
            return _context.MemberSavings.Any(e => e.Id == id);
        }
    }
}
