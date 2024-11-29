using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ikabuhi.Backend;
using Ikabuhi.Backend.Models;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Authorization;
using Ikabuhi.Backend.Extensions;

namespace Ikabuhi.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialServicesController : BaseController
    {
        private readonly ApplicationDbContext _context;

        public SocialServicesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/SocialServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialService>>> GetSocialServices()
        {
            return await _context.SocialServices.ToListAsync();
        }

        // GET: api/SocialServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SocialService>> GetSocialService(Guid id)
        {
            var socialService = await _context.SocialServices.FindAsync(id);

            if (socialService == null)
            {
                return NotFound();
            }

            return socialService;
        }

        // GET: api/SocialServices/5
        [Authorize]
        [HttpGet("pendings")]
        public async Task<ActionResult<List<SocialService>>> GetPendingSocialService()
        {
            var allCollectorGroups = await _context.CollectorGroups.Where(c => c.CollectorId == GetUserId()).Distinct().ToListAsync();

            var socialService = await _context.SocialServices.Include(s => s.Member).ThenInclude(s => s.Group)
                .Where(s => allCollectorGroups.Select(a => a.GroupId).Contains(s.Member.GroupId) && s.Status == "Pending").ToListAsync();

            if (socialService == null)
            {
                return NotFound();
            }

            return socialService;
        }

        [HttpPut("status/{id}/{status}")]
        public async Task<IActionResult> PutSocialService(Guid id, string status)
        {
            var ss = await _context.SocialServices.FindAsync(id);

            ss.Status = status;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SocialServiceExists(id))
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

        // PUT: api/SocialServices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSocialService(Guid id, SocialService socialService)
        {
            if (id != socialService.Id)
            {
                return BadRequest();
            }

            _context.Entry(socialService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SocialServiceExists(id))
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

        // POST: api/SocialServices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<SocialService>> PostSocialService(SocialServiceDto requestDto)
        {
            var pendingLoan = await _context.SocialServices.Where(m => m.MemberId == GetUserId()
                && m.Status == "Pending" && m.Type == requestDto.Type).FirstOrDefaultAsync();

            if (pendingLoan != null)
                return BadRequest("Invalid request. You still have a pending application waiting for approval.");

            //get last loan details
            var lastLoan = await _context.MemberLoans.FirstOrDefaultAsync();

            var id = Guid.NewGuid();

            var socialService = new SocialService
            {
                Id = id,
                MemberId = GetUserId(),
                CollectorId = lastLoan?.CollectorId,
                LivOwnABusiness = requestDto.LivOwnABusiness,
                LivBizName = requestDto.LivBizName,
                LivBizType = requestDto.LivBizType,
                LivNoOfEmployee = requestDto.LivNoOfEmployee,
                LivYearsOperated = requestDto.LivYearsOperated,
                LivTypeOFBizToStart = requestDto.LivTypeOFBizToStart,
                LivInterestReason = requestDto.LivInterestReason,
                LivSkillsGain = requestDto.LivSkillsGain,
                LivHavePriorTraining = requestDto.LivHavePriorTraining,
                LivPriorTraining = requestDto.LivPriorTraining,
                LivKnowledgePlan = requestDto.LivKnowledgePlan,
                LivRequireFinanceSupport = requestDto.LivRequireFinanceSupport,
                LivSupportType = requestDto.LivSupportType,
                SchLastName = requestDto.SchLastName,
                SchFirstName = requestDto.SchFirstName,
                SchMidName = requestDto.SchMidName,
                SchGender = requestDto.SchGender,
                SchAddress = requestDto.SchAddress,
                SchContact = requestDto.SchContact,
                SchGuardianName = requestDto.SchGuardianName,
                SchGrade = requestDto.SchGrade,
                SchContainRecommendation = requestDto.SchContainRecommendation,
                SchGuardianAddress = requestDto.SchGuardianAddress,
                SchHelpReason = requestDto.SchHelpReason,
                SchLevelStudy = requestDto.SchLevelStudy,
                SchReason = requestDto.SchReason,
                SchRecommendationFileName = requestDto.SchRecommendationFileName,
                SchRelationGuardian = requestDto.SchRelationGuardian,
                SchSchoolName = requestDto.SchSchoolName,
                SchYearLevel = requestDto.SchYearLevel,
                HltAllergies = requestDto.HltAllergies,
                HltBoolAllergies = requestDto.HltBoolAllergies,
                HltBoolExistCondition = requestDto.HltBoolExistCondition,
                HltBoolHealthCare = requestDto.HltBoolHealthCare,
                HltBoolInsurance = requestDto.HltBoolInsurance,
                HltBoolMedication = requestDto.HltBoolMedication,
                HltContact = requestDto.HltContact,
                HltEmergencyContact = requestDto.HltEmergencyContact,
                HltExistCondition = requestDto.HltExistCondition,
                HltHealthCare = requestDto.HltHealthCare,
                HltInsurance = requestDto.HltInsurance,
                HltMedication = requestDto.HltMedication,
                HltReasonApply = requestDto.HltReasonApply,
                HltRelationship = requestDto.HltRelationship,
                HltSupport = requestDto.HltSupport,
                IsActive = true,
                Status = "Pending",
                Type = requestDto.Type,
                CreatedDate = DateTime.UtcNow.ToSEATimeFromUtc()
            };

            _context.SocialServices.Add(socialService);
            await _context.SaveChangesAsync();

            return Ok(socialService);
        }

        // DELETE: api/SocialServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSocialService(Guid id)
        {
            var socialService = await _context.SocialServices.FindAsync(id);
            if (socialService == null)
            {
                return NotFound();
            }

            _context.SocialServices.Remove(socialService);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SocialServiceExists(Guid id)
        {
            return _context.SocialServices.Any(e => e.Id == id);
        }
    }

    public class SocialServiceDto
    {
        public bool? LivOwnABusiness { get; set; } // Nullable boolean for LivOwnABusiness
        public string? LivBizName { get; set; } // Nullable string for LivBizName
        public string? LivBizType { get; set; } // Nullable string for LivBizType
        public int? LivNoOfEmployee { get; set; } // Nullable integer for LivNoOfEmployee
        public int? LivYearsOperated { get; set; } // Nullable integer for LivYearsOperated
        public string? LivTypeOFBizToStart { get; set; } // Nullable string for LivTypeOFBizToStart
        public string? LivInterestReason { get; set; } // Nullable string for LivInterestReason
        public string? LivSkillsGain { get; set; } // Nullable string for LivSkillsGain
        public bool? LivHavePriorTraining { get; set; } // Nullable boolean for LivHavePriorTraining
        public string? LivPriorTraining { get; set; } // Nullable string for LivPriorTraining
        public string? LivKnowledgePlan { get; set; } // Nullable string for LivKnowledgePlan
        public bool? LivRequireFinanceSupport { get; set; } // Nullable boolean for LivRequireFinanceSupport
        public string? LivSupportType { get; set; } // Nullable string for LivSupportType
        public string? SchLastName { get; set; } // Nullable string for SchLastName
        public string? SchFirstName { get; set; } // Nullable string for SchFirstName
        public string? SchMidName { get; set; } // Nullable string for SchMidName
        public string? SchGender { get; set; } // Nullable string for SchGender
        public string? SchContact { get; set; } // Nullable string for SchContact
        public string? SchAddress { get; set; } // Nullable string for SchAddress
        public string? SchGuardianName { get; set; } // Nullable string for SchGuardianName
        public string? SchRelationGuardian { get; set; } // Nullable string for SchRelationGuardian
        public string? SchGuardianAddress { get; set; } // Nullable string for SchGuardianAddress
        public string? SchLevelStudy { get; set; } // Nullable string for SchLevelStudy
        public string? SchSchoolName { get; set; } // Nullable string for SchSchoolName
        public string? SchYearLevel { get; set; } // Nullable string for SchYearLevel
        public string? SchGrade { get; set; } // Nullable string for SchGrade
        public string? SchReason { get; set; } // Nullable string for SchReason
        public string? SchHelpReason { get; set; } // Nullable string for SchHelpReason
        public string? SchContainRecommendation { get; set; } // Nullable string for SchContainRecommendation
        public string? SchRecommendationFileName { get; set; } // Nullable string for SchRecommendationFileName
        public bool? HltBoolExistCondition { get; set; } // Nullable boolean for HltBoolExistCondition
        public string? HltExistCondition { get; set; } // Nullable string for HltExistCondition
        public bool? HltBoolMedication { get; set; } // Nullable boolean for HltBoolMedication
        public string? HltMedication { get; set; } // Nullable string for HltMedication
        public bool? HltBoolAllergies { get; set; } // Nullable boolean for HltBoolAllergies
        public string? HltAllergies { get; set; } // Nullable string for HltAllergies
        public bool? HltBoolHealthCare { get; set; } // Nullable boolean for HltBoolHealthCare
        public string? HltHealthCare { get; set; } // Nullable string for HltHealthCare
        public string? HltReasonApply { get; set; } // Nullable string for HltReasonApply
        public string? HltSupport { get; set; } // Nullable string for HltSupport
        public string? HltEmergencyContact { get; set; } // Nullable string for HltEmergencyContact
        public string? HltRelationship { get; set; } // Nullable string for HltRelationship
        public string? HltContact { get; set; } // Nullable string for HltContact
        public bool? HltBoolInsurance { get; set; } // Nullable boolean for HltBoolInsurance
        public string? HltInsurance { get; set; } // Nullable string for HltInsurance
        public bool? IsActive { get; set; } // Nullable boolean for IsActive status
        public string? Status { get; set; } // Nullable string for Status
        public string? Type { get; set; } // Livelihood,Health,Scholarship
    }
}