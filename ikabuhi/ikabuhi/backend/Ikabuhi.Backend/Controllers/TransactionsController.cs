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
    public class TransactionsController : BaseController
    {
        private readonly ApplicationDbContext _context;

        public TransactionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions.ToListAsync();
        }

        [Authorize]
        [HttpGet("ecash")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetECashTransactions()
        {
            var allCollectorGroups = await _context.CollectorGroups.Where(c => c.CollectorId == GetUserId())
                .Distinct().Select(c => c.GroupId).ToListAsync();

            return await _context.Transactions.Include(t => t.Member)
                .Where(t => allCollectorGroups.Contains(t.Member.GroupId) && t.Status == "Pending" && t.PaymentMethod == "ECash").ToListAsync();
        }

        [Authorize]
        [HttpPost("group/ecash")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetECashTransactionsByGroup(ECashRequestDto requestDto)
        {
            var allCollectorGroups = await _context.CollectorGroups.Where(c => c.CollectorId == GetUserId())
                .Distinct().Select(c => c.GroupId).ToListAsync();

            return await _context.Transactions.Include(t => t.Member)
                .Where(t => allCollectorGroups.Contains(t.Member.GroupId) && t.TransactionDate == requestDto.PaymentDate && t.PaymentMethod == "ECash").ToListAsync();
        }

        [Authorize]
        [HttpGet("download-receipt/{transactionId}")]
        public async Task<IActionResult> GetReceiptFile(string transactionId)
        {
            var transaction = await _context.Transactions.FindAsync(Guid.Parse(transactionId));
            if (transaction == null) return NotFound();

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles", transaction.ReceiptFileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var fileName = Path.GetFileName(filePath);

            return File(fileBytes, "application/octet-stream", fileName);
        }

        // GET: api/Transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(Guid id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }

        // GET: api/Transactions/5
        [HttpGet("withdrawal-report/{year}")]
        public async Task<ActionResult<List<ReportItem>>> GetWithdrawalReport(int year)
        {
            var report = await _context.MemberWithdrawal
            .Where(w => w.Status == "Approved" && w.WithdrawalDateTime.Year == year)
            .GroupBy(w => w.WithdrawalDateTime.Month)
            .Select(g => new ReportItem
            {
                Month = g.Key,
                MonthName = GetMonthName(g.Key),
                No = g.Count(),
                Amount = g.Sum(w => w.WithdrawAmount).ToString("N2")
            }).OrderBy(n => n.Month)
            .ToListAsync();

            return report;
        }

        [HttpGet("savings-report/{year}")]
        public async Task<ActionResult<List<ReportItem>>> GetSavingsReport(int year)
        {
            var report = await _context.MemberSavings
            .Where(w => w.LastPaymentDate.Year == year)
            .GroupBy(w => w.LastPaymentDate.Month)
            .Select(g => new ReportItem
            {
                Month = g.Key,
                No = g.Count(),
                MonthName = GetMonthName(g.Key),
                Amount = g.Sum(w => w.RunningSavingsAmount).ToString("N2")
            }).OrderBy(n => n.Month)
            .ToListAsync();

            return report;
        }

        [HttpGet("loan-report/{year}")]
        public async Task<ActionResult<List<ReportItem>>> GetLoansReport(int year)
        {
            var report = await _context.MemberLoans
            .Where(w => w.FirstPaymentDate != null && w.FirstPaymentDate.Value.Year == year && (w.Status == "Paid" || w.Status == "Approved"))
            .GroupBy(w => w.FirstPaymentDate.Value.Month)
            .Select(g => new ReportItem
            {
                Month = g.Key,
                MonthName = GetMonthName(g.Key),
                No = g.Count(),
                Amount = g.Sum(w => w.LoanAmount).ToString("N2")
            }).OrderBy(n => n.Month)
            .ToListAsync();

            return report;
        }

        // PUT: api/Transactions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(Guid id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return BadRequest();
            }

            _context.Entry(transaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
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

        // POST: api/transactions/payment
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost("payment")]
        public async Task<ActionResult<Transaction>> PostPayment([FromForm] PaymentDto paymentDto)
        {
            var userDetails = await _context.Members.Where(m => m.Id == GetUserId())
                .Include(m => m.MemberLoans).Include(m => m.Transactions).Include(m => m.MemberSavings).FirstOrDefaultAsync();

            var savings = userDetails?.MemberSavings?.FirstOrDefault();
            var activeLoan = userDetails?.MemberLoans?.Where(m => m.IsActive && m.Status == "Approved").FirstOrDefault();

            //get all pending transactions to add
            var pendingTransactions = userDetails.Transactions.Where(t => t.Status == "Pending");

            if (pendingTransactions != null && pendingTransactions.Any())
                return BadRequest("You still have a pending transaction. Please wait for approval and retry this payment.");

            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                MemberId = GetUserId(),
                SavingsId = savings.Id,
                LoanId = activeLoan.Id,
                SaveAmount = paymentDto.SavingsPayment,
                LoanPayment = paymentDto.LoanPayment,
                TransactionDate = paymentDto.PaymentDate,
                PaymentMethod = "ECash",
                ReceiptFileName = paymentDto.ReceiptFile != null ? $"{GetUserId()}-{paymentDto.ReceiptFile.FileName}" : null,
                Status = "Pending"
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            await UploadFile(paymentDto.ReceiptFile, GetUserId().ToString());

            return Accepted(transaction);
        }

        private async Task UploadFile(IFormFile? file, string memberId)
        {
            if (file != null)
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles", $"{memberId}-{file.FileName}");

                // Create directory if it doesn't exist
                var directoryPath = Path.GetDirectoryName(filePath);
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                // Save the file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
        }

        // POST: api/Transactions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransaction", new { id = transaction.Id }, transaction);
        }

        // DELETE: api/Transactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransactionExists(Guid id)
        {
            return _context.Transactions.Any(e => e.Id == id);
        }

        private static string GetMonthName(int monthNumber)
        {
            // Ensure the monthNumber is between 1 and 12
            if (monthNumber < 1 || monthNumber > 12)
            {
                throw new ArgumentOutOfRangeException(nameof(monthNumber), "Month number must be between 1 and 12.");
            }

            // Use DateTime to get the month name
            DateTime date = new DateTime(2024, monthNumber, 1); // Year is arbitrary, monthNumber is what matters
            return date.ToString("MMMM");  // Returns the full month name
        }
    }

    public class PaymentDto
    {
        public decimal SavingsPayment { get; set; }
        public decimal LoanPayment { get; set; }
        public DateTime PaymentDate { get; set; }
        public IFormFile? ReceiptFile { get; set; }
    }

    public class ECashRequestDto
    {
        public DateTime PaymentDate { get; set; }
    }

    public class ReportItem
    {
        public int Month { get; set; }
        public string MonthName { get; set; }
        public int No { get; set; }
        public string Amount { get; set; }
    }
}