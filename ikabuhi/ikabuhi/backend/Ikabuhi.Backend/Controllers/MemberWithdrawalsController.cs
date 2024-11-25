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
using Ikabuhi.Backend.Extensions;

namespace Ikabuhi.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberWithdrawalsController : BaseController
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
            return await _context.MemberWithdrawal.ToListAsync();
        }

        // GET: api/MemberWithdrawals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemberWithdrawal>> GetMemberWithdrawal(Guid id)
        {
            var memberWithdrawal = await _context.MemberWithdrawal.FindAsync(id);

            if (memberWithdrawal == null)
            {
                return NotFound();
            }

            return memberWithdrawal;
        }

        [Authorize]
        [HttpGet("group")]
        public async Task<ActionResult<IEnumerable<MemberWithdrawal>>> GetMemberWithdrawalByCollectorGroups()
        {
            var allCollectorGroups = await _context.CollectorGroups.Where(c => c.CollectorId == GetUserId()).Distinct().ToListAsync();
            var memberWithdrawal = await _context.MemberWithdrawal
                .Include(m => m.Member).ThenInclude(m => m.MemberLoans)
                .Include(m => m.Member.MemberSavings)
                .Include(m => m.Member.Group)
                .Where(m => allCollectorGroups.Select(a => a.GroupId).Contains(m.Member.GroupId)).ToListAsync();

            if (memberWithdrawal == null)
            {
                return NotFound();
            }

            return memberWithdrawal;
        }

        [Authorize]
        [HttpPost("date")]
        public async Task<ActionResult<IEnumerable<MemberWithdrawal>>> GetMemberWithdrawalByDate(WithdrawalRequestDto requestDto)
        {
            var allCollectorGroups = await _context.CollectorGroups.Where(c => c.CollectorId == GetUserId()).Distinct().ToListAsync();
            var memberWithdrawal = await _context.MemberWithdrawal.Include(m => m.Member)
                .Where(m => allCollectorGroups.Select(a => a.GroupId).Contains(m.Member.GroupId) && m.WithdrawalDateTime == requestDto.PaymentDate).ToListAsync();

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

            var currentSavings = await _context.MemberSavings
                .Where(m => m.MemberId == memberWithdrawal.MemberId).FirstOrDefaultAsync();

            if (currentSavings != null)
                currentSavings.RunningSavingsAmount -= memberWithdrawal.WithdrawAmount;

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

        // POST: api/memberWithdrawals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<MemberWithdrawal>> PostMemberWithdrawal(WithdrawalDto withdrawalDto)
        {
            if (withdrawalDto.AmountToWithdraw <= 0) return BadRequest("Invalid amount given");

            var pendingWithdrawal = _context.MemberWithdrawal.Where(m => m.MemberId == GetUserId() && m.Status == "Pending").FirstOrDefault();

            if (pendingWithdrawal != null)
            {
                return BadRequest($"Request failed. You still have a pending withdrawal of {pendingWithdrawal.WithdrawAmount}" +
                    $" on {pendingWithdrawal.WithdrawalDateTime.ToShortDateString()}");
            }

            var withdrawal = new MemberWithdrawal
            {
                Id = Guid.NewGuid(),
                WithdrawAmount = withdrawalDto.AmountToWithdraw,
                MemberId = GetUserId(),
                ApplicationDateTime = DateTime.UtcNow.ToSEATimeFromUtc(),
                WithdrawalDateTime = withdrawalDto.WithdrawalPaymentDate,
                Status = "Pending"
            };

            _context.MemberWithdrawal.Add(withdrawal);
            await _context.SaveChangesAsync();

            return Accepted(withdrawal);
        }

        // DELETE: api/MemberWithdrawals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMemberWithdrawal(Guid id)
        {
            var memberWithdrawal = await _context.MemberWithdrawal.FindAsync(id);
            if (memberWithdrawal == null)
            {
                return NotFound();
            }

            _context.MemberWithdrawal.Remove(memberWithdrawal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemberWithdrawalExists(Guid id)
        {
            return _context.MemberWithdrawal.Any(e => e.Id == id);
        }
    }

    public class WithdrawalDto
    {
        public decimal AmountToWithdraw { get; set; }
        public DateTime WithdrawalPaymentDate { get; set; }
    }

    public class WithdrawalRequestDto
    {
        public DateTime PaymentDate { get; set; }
    }
}