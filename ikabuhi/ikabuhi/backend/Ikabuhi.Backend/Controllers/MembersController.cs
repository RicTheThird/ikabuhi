using Ikabuhi.Backend.Extensions;
using Ikabuhi.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ikabuhi.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : BaseController
    {
        private readonly ApplicationDbContext _context;

        public MembersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Members
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
            return await _context.Members.ToListAsync();
        }

        // GET: api/members/mine
        [HttpGet("mine")]
        [Authorize]
        public async Task<ActionResult<Member>> GetMyMembersDetails()
        {
            return await _context.Members.Where(m => m.Id == GetUserId())
                .Include(m => m.MemberLoans).ThenInclude(m => m.ProductLoan)
                .Include(m => m.Group)
                .Include(m => m.Transactions.OrderByDescending(s => s.TransactionDate).Take(20))
                .Include(m => m.Payments.Where(p => p.Status == "Submitted").OrderByDescending(p => p.PaymentDate))
                .Include(m => m.MemberSavings.OrderByDescending(s => s.LastPaymentDate).Take(1)).FirstOrDefaultAsync();
        }

        // GET: api/Members/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(Guid id)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }

        // GET: api/members/group/5
        [Authorize]
        [HttpGet("group/{groupId}")]
        public async Task<ActionResult<IEnumerable<Member>>> GetGroupMembers(Guid groupId)
        {
            var member = await _context.Members
                .Include(m => m.MemberSavings)
                .Include(m => m.MemberLoans.Where(l => l.Status == "Approved"))
                .Include(m => m.Transactions)
                .Include(m => m.Payments.Where(p => p.Status == "Submitted"))
                .Where(m => m.IsActive && m.GroupId == groupId).ToListAsync();

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }

        [Authorize]
        [HttpGet("group/all")]
        public async Task<ActionResult<IEnumerable<Member>>> GetGroupAllMembers()
        {
            var allCollectorGroups = await _context.CollectorGroups.Where(c => c.CollectorId == GetUserId())
                .Distinct().Select(c => c.GroupId).ToListAsync();

            var member = await _context.Members
                .Include(m => m.MemberSavings)
                .Include(m => m.MemberLoans.Where(l => l.Status == "Approved"))
                .Include(m => m.Transactions)
                .Include(m => m.Payments.Where(p => p.Status == "Submitted"))
                .Where(m => m.IsActive && allCollectorGroups.Contains(m.GroupId)).ToListAsync();

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }

        // PUT: api/Members/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember(Guid id, Member member)
        {
            if (id != member.Id)
            {
                return BadRequest();
            }

            _context.Entry(member).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberExists(id))
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

        // POST: api/Members
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Member>> PostMember(Member member)
        {
            _context.Members.Add(member);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMember", new { id = member.Id }, member);
        }

        // POST: api/Members/register
        [Authorize]
        [HttpPost("register")]
        public async Task<ActionResult<Member>> RegisterMember([FromForm] MemberRegistrationDto registrationDto)
        {
            if (registrationDto == null)
                return BadRequest("Invalid registration data.");

            // Check if a member with the given AccountNo or UserName already exists
            var existingMember = await _context.Members
                .FirstOrDefaultAsync(m => m.AccountNo == registrationDto.AccountNo || m.UserName == registrationDto.UserName);

            if (existingMember != null)
            {
                return BadRequest("A member with this AccountNo or UserName already exists.");
            }

            // get loan details
            var loanDetails = await _context.ProductLoans.FindAsync(registrationDto.LoanId);
            if (loanDetails == null)
            {
                return StatusCode(500, $"Cannot find ProductLoan with ID {registrationDto.LoanId}");
            }

            var memberId = Guid.NewGuid();
            var totalLoanAmount = (registrationDto.LoanAmount * (loanDetails.InterestRate / 100)) + registrationDto.LoanAmount;

            var member = new Member
            {
                Id = memberId,
                GroupId = registrationDto.GroupId,
                LastName = registrationDto.LastName,
                FirstName = registrationDto.FirstName,
                MiddleName = registrationDto.MiddleName,
                AccountNo = registrationDto.AccountNo,
                Bdate = registrationDto.Bdate,
                CivilStatus = registrationDto.CivilStatus,
                Occupation = registrationDto.Occupation,
                Brgy = registrationDto.Brgy,
                Municipality = registrationDto.Municipality,
                Province = registrationDto.Province,
                IsActive = true,
                CreatedAt = DateTime.UtcNow.ToSEATimeFromUtc(),
                UserName = registrationDto.UserName,
                PasswordHash = registrationDto.Password.Hash(),
                PhotoBlobName = registrationDto.PhotoFile != null ? $"{memberId}-{registrationDto.PhotoFile.FileName}" : null,
                ElectricBillBlobName = registrationDto.BillsFile != null ? $"{memberId}-{registrationDto.BillsFile.FileName}" : null,
                BrgyClearanceBlobName = registrationDto.IdFile != null ? $"{memberId}-{registrationDto.IdFile.FileName}" : null,
            };
            _context.Members.Add(member);

            var loanId = Guid.NewGuid();
            var memberLoan = new MemberLoan
            {
                Id = loanId,
                MemberId = memberId,
                CollectorId = registrationDto.CollectorId,
                ProductLoanId = registrationDto.LoanId,
                Cycle = 1,
                LoanAmount = registrationDto.LoanAmount,
                TotalLoanAmount = totalLoanAmount,
                WeeklyPayment = totalLoanAmount / loanDetails.Transactions,
                IsActive = true,
                GuarantorName = registrationDto.GuarantorName,
                GuarantorRelation = registrationDto.GuarantorRelation,
                SourceOfIncome = registrationDto.SourceOfIncome,
                Status = "Approved",
                DueDate = registrationDto.FirstPaymentDate.AddDays((loanDetails.Transactions - 1) * 7),
                LoanBalance = totalLoanAmount,
                FirstPaymentDate = registrationDto.FirstPaymentDate,
            };
            _context.MemberLoans.Add(memberLoan);

            var savingsId = Guid.NewGuid();
            var savings = new MemberSaving
            {
                Id = savingsId,
                MemberId = memberId,
                LastPaidAmount = registrationDto.CurrentSavings,
                LastPaymentDate = DateTime.UtcNow.ToSEATimeFromUtc(),
                RunningSavingsAmount = registrationDto.CurrentSavings,
            };
            _context.MemberSavings.Add(savings);

            var payments = new List<Payments>();

            //Add placeholders for payments
            for (int i = 0; i < loanDetails.Transactions; i++)
            {
                payments.Add(new Payments
                {
                    Id = Guid.NewGuid(),
                    MemberId = memberId,
                    LoanId = loanId,
                    SavingsId = savingsId,
                    WeekNumber = GetWeekNumberInMonth(registrationDto.FirstPaymentDate.AddDays(7 * i)),
                    PaymentDate = registrationDto.FirstPaymentDate.AddDays(7 * i),
                    Status = "Pending",
                });
            }
            _context.Payments.AddRange(payments);

            await _context.SaveChangesAsync();

            await UploadFile(registrationDto.IdFile, memberId.ToString());
            await UploadFile(registrationDto.BillsFile, memberId.ToString());
            await UploadFile(registrationDto.PhotoFile, memberId.ToString());

            return Ok(member);
        }

        // DELETE: api/Members/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(Guid id)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null)
            {
                return NotFound();
            }

            _context.Members.Remove(member);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemberExists(Guid id)
        {
            return _context.Members.Any(e => e.Id == id);
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

        private static int GetWeekNumberInMonth(DateTime date)
        {
            // Get the first day of the month
            DateTime firstDayOfMonth = new DateTime(date.Year, date.Month, 1);

            // Calculate the difference in days between the given date and the first day of the month
            int dayOfMonth = (date - firstDayOfMonth).Days;

            // Week number in the month is the total days divided by 7 (rounded up)
            return (dayOfMonth / 7) + 1;
        }

        public class MemberRegistrationDto
        {
            public Guid GroupId { get; set; }
            public string LastName { get; set; }
            public string FirstName { get; set; }
            public string? MiddleName { get; set; }
            public string AccountNo { get; set; }
            public DateTime? Bdate { get; set; }
            public string CivilStatus { get; set; }
            public string Occupation { get; set; }
            public string Brgy { get; set; }
            public string Municipality { get; set; }
            public string Province { get; set; }
            public string UserName { get; set; }
            public string Password { get; set; }
            public IFormFile? BillsFile { get; set; }
            public IFormFile? IdFile { get; set; }
            public IFormFile? PhotoFile { get; set; }

            public int Cycle { get; set; }
            public decimal LoanAmount { get; set; }

            //public decimal TotalLoanAmount { get; set; }
            //public decimal WeeklyPayment { get; set; }
            public decimal CurrentSavings { get; set; }

            public Guid CollectorId { get; set; }
            public Guid LoanId { get; set; }
            public bool IsActive { get; set; } = true;
            public string? CollateralType1 { get; set; }
            public decimal? CollateralTypeAmount1 { get; set; }
            public string? CollateralType2 { get; set; }
            public decimal? CollateralTypeAmount2 { get; set; }
            public string? CollateralType3 { get; set; }
            public decimal? CollateralTypeAmount3 { get; set; }
            public string GuarantorName { get; set; }
            public string GuarantorRelation { get; set; }
            public string SourceOfIncome { get; set; }
            public string? Status { get; set; } // Approve, Decline, Pending
            public decimal? LoanBalance { get; set; }
            public DateTime FirstPaymentDate { get; set; }
        }
    }
}