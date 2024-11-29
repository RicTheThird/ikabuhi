using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ikabuhi.Backend;
using Ikabuhi.Backend.Models;
using static Ikabuhi.Backend.Controllers.MembersController;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations.Schema;
using Ikabuhi.Backend.Extensions;

namespace Ikabuhi.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberLoansController : BaseController
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

        // GET: api/MemberLoans/pendings
        [Authorize]
        [HttpGet("pendings")]
        public async Task<ActionResult<PendingLoanResponse>> GetPendingLoans()
        {
            var allCollectorGroups = await _context.CollectorGroups.Where(c => c.CollectorId == GetUserId()).Distinct().ToListAsync();

            var pendingRegularLoan = await _context.MemberLoans.Include(m => m.Member).ThenInclude(m => m.Group).Include(m => m.ProductLoan)
                .Where(m => allCollectorGroups.Select(a => a.GroupId).Contains(m.Member.GroupId) && m.Status == "Pending").ToListAsync();

            var pendingWashLoan = await _context.WashLoans.Include(m => m.Member).ThenInclude(m => m.Group)
                .Where(m => allCollectorGroups.Select(a => a.GroupId).Contains(m.Member.GroupId) && m.Status == "Pending").ToListAsync();

            var pendingBizLoan = await _context.BusinessLoans.Include(m => m.Member).ThenInclude(m => m.Group)
                .Where(m => allCollectorGroups.Select(a => a.GroupId).Contains(m.Member.GroupId) && m.Status == "Pending").ToListAsync();

            var response = new PendingLoanResponse
            {
                PendingBusinessLoans = pendingBizLoan,
                PendingLoanCount = (pendingBizLoan != null && pendingBizLoan.Any() ? pendingBizLoan.Count : 0) +
                    (pendingRegularLoan != null && pendingRegularLoan.Any() ? pendingRegularLoan.Count : 0) +
                    (pendingWashLoan != null && pendingWashLoan.Any() ? pendingWashLoan.Count : 0),
                PendingRegularLoans = pendingRegularLoan,
                PendingWashLoans = pendingWashLoan
            };

            return response;
        }

        // PUT: api/MemberLoans/loan-status/wash/5/pending
        [HttpPut("loan-status/regular/{id}/{status}")]
        public async Task<IActionResult> PutMemberLoan(Guid id, string status)
        {
            var loan = await _context.MemberLoans.FindAsync(id);

            if (loan == null)
                return BadRequest("Cannot find loan");

            loan.Status = status;
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

        [HttpPut("loan-status/wash/{id}/{status}")]
        public async Task<IActionResult> PutWashLoan(Guid id, string status)
        {
            var loan = await _context.WashLoans.FindAsync(id);

            if (loan == null)
                return BadRequest("Cannot find loan");

            loan.Status = status;
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

        [HttpPut("loan-status/biz/{id}/{status}")]
        public async Task<IActionResult> PutBizLoan(Guid id, string status)
        {
            var loan = await _context.BusinessLoans.FindAsync(id);

            if (loan == null)
                return BadRequest("Cannot find loan");

            loan.Status = status;
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

        // PUT: api/MemberLoans/social-status/5/pending
        [HttpPut("social-status/{id}/{status}")]
        public async Task<IActionResult> PutSs(Guid id, string status)
        {
            var ss = await _context.SocialServices.FindAsync(id);

            if (ss == null)
                return BadRequest("Cannot find loan");

            ss.Status = status;
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

        // PUT: api/MemberLoans/social-status/5/pending
        [HttpPut("insurance-status/{id}/{status}")]
        public async Task<IActionResult> PutInsurance(Guid id, string status)
        {
            var ss = await _context.SocialServices.FindAsync(id);

            if (ss == null)
                return BadRequest("Cannot find loan");

            ss.Status = status;
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

        [Authorize]
        [HttpPost("bizloan")]
        public async Task<ActionResult<WashLoan>> PostWashLoan(BusinessLoanDto requestDto)
        {
            var pendingLoan = await _context.BusinessLoans.Where(m => m.MemberId == GetUserId() && m.Status == "Pending").FirstOrDefaultAsync();

            if (pendingLoan != null)
                return BadRequest("Invalid request. You still have a pending business loan application waiting for approval.");

            //get last loan details
            var lastLoan = await _context.MemberLoans.FirstOrDefaultAsync();

            var loanId = Guid.NewGuid();

            var loan = new BusinessLoan
            {
                Id = loanId,
                MemberId = GetUserId(),
                BusinessName = requestDto.BusinessName,
                BusinessAddress = requestDto.BusinessAddress,
                BusinessType = requestDto.BusinessType,
                LoanAmount = requestDto.LoanAmount,
                CollectorId = lastLoan?.CollectorId,
                AnnualRevenue = requestDto.AnnualRevenue,
                EstMonthlyExpenses = requestDto.EstMonthlyExpenses,
                PurposeLoan = requestDto.PurposeLoan,
                PaymentTerms = requestDto.PaymentTerms,
                IsActive = true,
                Status = "Pending",
                CreatedDate = DateTime.UtcNow.ToSEATimeFromUtc()
            };

            _context.BusinessLoans.Add(loan);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpPost("washloan")]
        public async Task<ActionResult<WashLoan>> PostWashLoan(WashLoanDto requestDto)
        {
            var pendingLoan = await _context.WashLoans.Where(m => m.MemberId == GetUserId() && m.Status == "Pending").FirstOrDefaultAsync();

            if (pendingLoan != null)
                return BadRequest("Invalid request. You still have a pending wash loan application waiting for approval.");

            //get last loan details
            var lastLoan = await _context.MemberLoans.FirstOrDefaultAsync();

            var loanId = Guid.NewGuid();

            var washLoan = new WashLoan
            {
                Id = loanId,
                MemberId = GetUserId(),
                CollectorId = lastLoan?.CollectorId,
                ProjectType = requestDto.ProjectType,
                ProjectLocation = requestDto.ProjectLocation,
                LoanAmount = requestDto.LoanAmount,
                PaymentTerms = requestDto.PaymentTerms,
                HaveCollateral = requestDto.HaveCollateral,
                Collateral = requestDto?.Collateral,
                IsActive = true,
                Status = "Pending",
                CreatedDate = DateTime.UtcNow.ToSEATimeFromUtc()
            };

            _context.WashLoans.Add(washLoan);

            await _context.SaveChangesAsync();

            return Ok();
        }

        // POST: api/MemberLoans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<MemberLoan>> PostMemberLoan(LoanRequestDto requestDto)
        {
            var lastLoans = await _context.MemberLoans.Where(m => m.MemberId == GetUserId()).ToListAsync();

            if (lastLoans.Any(l => l.Status == "Pending"))
                return BadRequest("Invalid request. You still have a pending loan requested.");

            //get last loan details
            var lastLoan = lastLoans.FirstOrDefault();

            // get loan details
            var loanDetails = await _context.ProductLoans.FindAsync(requestDto.LoanId);
            if (loanDetails == null)
            {
                return StatusCode(500, $"Cannot find ProductLoan with ID {requestDto.LoanId}");
            }

            var loanId = Guid.NewGuid();
            var totalLoanAmount = (requestDto.LoanAmount * (loanDetails.InterestRate / 100)) + requestDto.LoanAmount;

            var memberLoan = new MemberLoan
            {
                Id = loanId,
                MemberId = GetUserId(),
                CollectorId = lastLoan.CollectorId,
                ProductLoanId = requestDto.LoanId,
                Cycle = requestDto.Cycle,
                LoanAmount = requestDto.LoanAmount,
                TotalLoanAmount = totalLoanAmount,
                WeeklyPayment = totalLoanAmount / loanDetails.Transactions,
                IsActive = true,
                GuarantorName = requestDto.GuarantorName,
                GuarantorRelation = requestDto.GuarantorRelation,
                SourceOfIncome = requestDto.SourceOfIncome,
                Status = "Pending",
                CollateralType1 = requestDto.CollateralType1,
                CollateralType2 = requestDto.CollateralType2,
                CollateralType3 = requestDto.CollateralType3,
                CollateralTypeAmount1 = requestDto.CollateralTypeAmount1,
                CollateralTypeAmount2 = requestDto.CollateralTypeAmount2,
                CollateralTypeAmount3 = requestDto.CollateralTypeAmount3,
                LiabilityLoanBalance = requestDto.LiabilityLoanBalance,
                LiabilityLoanBalanceWeeklyPayments = requestDto.LiabilityLoanBalanceWeeklyPayments,
                ExternalSavingsBalance = requestDto.ExternalSavingsBalance,
                MonthlyExpenses = requestDto.MonthlyExpenses,
                //DueDate = requestDto.FirstPaymentDate.AddDays((loanDetails.Transactions - 1) * 7),
                LoanBalance = totalLoanAmount,
                DueDate = null,
                FirstPaymentDate = null
            };
            _context.MemberLoans.Add(memberLoan);

            await _context.SaveChangesAsync();

            return Ok();
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

    public class LoanRequestDto
    {
        public Guid GroupId { get; set; }
        public int Cycle { get; set; }
        public decimal LoanAmount { get; set; }

        //public decimal TotalLoanAmount { get; set; }
        //public decimal WeeklyPayment { get; set; }
        //public decimal CurrentSavings { get; set; }

        public Guid LoanId { get; set; }
        public bool IsActive { get; set; } = true;
        public string? CollateralType1 { get; set; }
        public decimal? CollateralTypeAmount1 { get; set; }
        public string? CollateralType2 { get; set; }
        public decimal? CollateralTypeAmount2 { get; set; }
        public string? CollateralType3 { get; set; }
        public decimal? CollateralTypeAmount3 { get; set; }
        public string? GuarantorName { get; set; }
        public string? GuarantorRelation { get; set; }
        public string? SourceOfIncome { get; set; }
        public string? Status { get; set; } // Approved, Declined, Pending
        public decimal? LoanBalance { get; set; }
        public decimal? LiabilityLoanBalance { get; set; }
        public decimal? LiabilityLoanBalanceWeeklyPayments { get; set; }
        public decimal? ExternalSavingsBalance { get; set; }
        public decimal? MonthlyExpenses { get; set; }
    }

    public class WashLoanDto
    {
        public string? ProjectType { get; set; }
        public string? ProjectLocation { get; set; }
        public decimal? LoanAmount { get; set; }
        public string? PaymentTerms { get; set; }
        public bool? HaveCollateral { get; set; }
        public string? Collateral { get; set; }
    }

    public class BusinessLoanDto
    {
        public string? BusinessName { get; set; }
        public string? BusinessType { get; set; }
        public string? BusinessAddress { get; set; }
        public decimal? LoanAmount { get; set; }
        public decimal? AnnualRevenue { get; set; }
        public decimal? EstMonthlyExpenses { get; set; }
        public string? PurposeLoan { get; set; }
        public string? PaymentTerms { get; set; }
    }

    public class PendingLoanResponse
    {
        public int PendingLoanCount { get; set; }
        public List<WashLoan>? PendingWashLoans { get; set; }
        public List<BusinessLoan>? PendingBusinessLoans { get; set; }
        public List<MemberLoan>? PendingRegularLoans { get; set; }
    }
}