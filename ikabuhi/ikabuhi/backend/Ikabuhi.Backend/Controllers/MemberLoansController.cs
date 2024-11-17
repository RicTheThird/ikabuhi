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
    public class MemberLoansController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MemberLoansController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MemberLoans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberLoan>>> GetMemberLoans()
        {
            return await _context.MemberLoans.ToListAsync();
        }

        // GET: api/MemberLoans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemberLoan>> GetMemberLoan(Guid id)
        {
            var memberLoan = await _context.MemberLoans.FindAsync(id);

            if (memberLoan == null)
            {
                return NotFound();
            }

            return memberLoan;
        }

        // PUT: api/MemberLoans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMemberLoan(Guid id, MemberLoan memberLoan)
        {
            if (id != memberLoan.Id)
            {
                return BadRequest();
            }

            _context.Entry(memberLoan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberLoanExists(id))
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

        // POST: api/MemberLoans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MemberLoan>> PostMemberLoan(MemberLoan memberLoan)
        {
            _context.MemberLoans.Add(memberLoan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMemberLoan", new { id = memberLoan.Id }, memberLoan);
        }

        // DELETE: api/MemberLoans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMemberLoan(Guid id)
        {
            var memberLoan = await _context.MemberLoans.FindAsync(id);
            if (memberLoan == null)
            {
                return NotFound();
            }

            _context.MemberLoans.Remove(memberLoan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemberLoanExists(Guid id)
        {
            return _context.MemberLoans.Any(e => e.Id == id);
        }
    }
}
