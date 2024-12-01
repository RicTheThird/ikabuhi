using Ikabuhi.Backend.Extensions;
using Ikabuhi.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ikabuhi.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Payments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payments>>> GetPayments()
        {
            return await _context.Payments.ToListAsync();
        }

        // GET: api/Payments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Payments>> GetPayments(Guid id)
        {
            var payments = await _context.Payments.FindAsync(id);

            if (payments == null)
            {
                return NotFound();
            }

            return payments;
        }

        [HttpPost("group")]
        public async Task<ActionResult<IEnumerable<Payments>>> GetPaymentsByGroupDate(GetPaymentDto paymentDto)
        {
            var payments = await _context.Payments.Where(p => p.PaymentDate == paymentDto.PaymentDate && p.Status != "Deleted")
                .Include(p => p.MemberSavings)
                .Include(p => p.Member)
                .ThenInclude(m => m.MemberLoans)
                    .ThenInclude(m => m.ProductLoan)
                .Where(p => p.Member.GroupId == paymentDto.GroupId).ToListAsync();

            if (payments == null)
            {
                return NotFound();
            }

            return payments;
        }

        // PUT: api/Payments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayments(Guid id, Payments payments)
        {
            if (id != payments.Id)
            {
                return BadRequest();
            }

            _context.Entry(payments).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentsExists(id))
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

        // POST: api/Payments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<List<Payments>>> PostPayments(List<Payments> payments)
        {
            foreach (var payment in payments)
            {
                int creditPoints = 0;
                if (payment.LoanPayment > 0) creditPoints += 1;
                if (payment.SavingsPayment > 0) creditPoints += 1;
                if (payment.SavingsPayment >= 300) creditPoints += 1;

                payment.CreditPointsGained = creditPoints;
                payment.Status = "Submitted";

                _context.Entry(payment).State = EntityState.Modified;

                var loan = await _context.MemberLoans.Where(l => l.Id == payment.LoanId).FirstOrDefaultAsync();
                if (loan != null)
                {
                    loan.LoanBalance -= payment?.LoanPayment ?? 0;
                }

                var savings = await _context.MemberSavings.Where(s => s.Id == payment.SavingsId).FirstOrDefaultAsync();
                if (savings != null)
                {
                    savings.RunningSavingsAmount += payment?.SavingsPayment ?? 0;
                    if (loan.LoanBalance < 0)
                    {
                        savings.RunningSavingsAmount += (0 - (loan.LoanBalance));
                        loan.LoanBalance = 0;
                    }
                }

                if (loan != null && loan.LoanBalance <= 0 && loan.Status != "Paid")
                {
                    loan.Status = "Paid";
                    var notif = new Notification
                    {
                        Id = Guid.NewGuid(),
                        MemberId = loan.MemberId,
                        Message = "Congratulations! You have PAID your loan. You are now eligible to apply for a new regular loan.",
                        IsSeen = false,
                        CreatedAt = DateTime.UtcNow.ToSEATimeFromUtc()
                    };

                    _context.Notifications.Add(notif);
                }

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    return BadRequest("Failed to save");
                }
            }
            return Accepted(payments);
        }

        // DELETE: api/Payments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayments(Guid id)
        {
            var payments = await _context.Payments.FindAsync(id);
            if (payments == null)
            {
                return NotFound();
            }

            _context.Payments.Remove(payments);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentsExists(Guid id)
        {
            return _context.Payments.Any(e => e.Id == id);
        }
    }

    public class GetPaymentDto
    {
        public DateTime PaymentDate { get; set; }
        public Guid GroupId { get; set; }
    }
}