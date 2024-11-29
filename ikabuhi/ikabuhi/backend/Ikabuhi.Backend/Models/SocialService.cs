using System.ComponentModel.DataAnnotations.Schema;

namespace Ikabuhi.Backend.Models
{
    public class SocialService
    {
        public Guid Id { get; set; } // Unique identifier (Primary Key)
        public Guid? MemberId { get; set; } // Nullable unique identifier for MemberId
        public Guid? CollectorId { get; set; } // Nullable unique identifier for CollectorId
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
        public string? Type { get; set; } // SS,Health,Scholarship
        public DateTime? CreatedDate { get; set; } // Nullable DateTime for CreatedDate

        [ForeignKey("MemberId")]
        public virtual Member? Member { get; set; }

        [ForeignKey("CollectorId")]
        public Collector? Collector { get; set; }
    }
}