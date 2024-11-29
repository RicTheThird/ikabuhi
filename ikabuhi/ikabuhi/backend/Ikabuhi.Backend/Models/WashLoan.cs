using System.ComponentModel.DataAnnotations.Schema;

namespace Ikabuhi.Backend.Models
{
    public class WashLoan
    {
        public Guid Id { get; set; } // Unique identifier (Primary Key)
        public Guid? MemberId { get; set; } // Nullable unique identifier for MemberId
        public int? Cycle { get; set; } // Nullable integer for Cycle
        public string? ProjectType { get; set; } // Nullable string for ProjectType
        public string? ProjectLocation { get; set; } // Nullable string for ProjectLocation
        public decimal? LoanAmount { get; set; } // Nullable decimal for LoanAmount
        public string? PaymentTerms { get; set; } // Nullable string for PaymentTerms
        public bool? HaveCollateral { get; set; } // Nullable boolean for HaveCollateral
        public string? Collateral { get; set; } // Nullable string for Collateral
        public Guid? CollectorId { get; set; } // Nullable unique identifier for CollectorId
        public bool? IsActive { get; set; } // Nullable boolean for IsActive status
        public string? Status { get; set; } // Nullable string for Status
        public DateTime? CreatedDate { get; set; } // Nullable DateTime for CreatedDate

        [ForeignKey("MemberId")]
        public virtual Member? Member { get; set; }

        [ForeignKey("CollectorId")]
        public Collector? Collector { get; set; }
    }
}