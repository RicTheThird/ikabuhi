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
    public class MemberWithdrawalsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MemberWithdrawalsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MemberWithdrawals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberWithdrawal>>> GetMemberWithdrawals()
        {
            return await _context.MemberWithdrawals.ToListAsync();
        }

        // GET: api/MemberWithdrawals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemberWithdrawal>> GetMemberWithdrawal(Guid id)
        {
            var memberWithdrawal = await _context.MemberWithdrawals.FindAsync(id);

            if (memberWithdrawal == null)
            {
                return NotFound();
            }

            return memberWithdrawal;
        }

        // PUT: api/MemberWithdrawals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMemberWithdrawal(Guid id, MemberWithdrawal memberWithdrawal)
        {
            if (id != memberWithdrawal.Id)
            {
                return BadRequest();
            }

            _context.Entry(memberWithdrawal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberWithdrawalExists(id))
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

        // POST: api/MemberWithdrawals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MemberWithdrawal>> PostMemberWithdrawal(MemberWithdrawal memberWithdrawal)
        {
            _context.MemberWithdrawals.Add(memberWithdrawal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMemberWithdrawal", new { id = memberWithdrawal.Id }, memberWithdrawal);
        }

        // DELETE: api/MemberWithdrawals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMemberWithdrawal(Guid id)
        {
            var memberWithdrawal = await _context.MemberWithdrawals.FindAsync(id);
            if (memberWithdrawal == null)
            {
                return NotFound();
            }

            _context.MemberWithdrawals.Remove(memberWithdrawal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemberWithdrawalExists(Guid id)
        {
            return _context.MemberWithdrawals.Any(e => e.Id == id);
        }
    }
}
