using System.ComponentModel.DataAnnotations.Schema;

namespace Ikabuhi.Backend.Models
{
    public class BusinessLoan
    {
        public Guid Id { get; set; } // Unique identifier (Primary Key)
        public Guid? MemberId { get; set; } // Nullable unique identifier for MemberId
        public int? Cycle { get; set; } // Nullable integer for Cycle
        public string? BusinessName { get; set; } // Nullable string for BusinessName
        public string? BusinessType { get; set; } // Nullable string for BusinessType
        public string? BusinessAddress { get; set; } // Nullable string for BusinessAddress
        public decimal? LoanAmount { get; set; } // Nullable decimal for LoanAmount
        public Guid? CollectorId { get; set; } // Nullable unique identifier for CollectorId
        public decimal? AnnualRevenue { get; set; } // Nullable decimal for AnnualRevenue
        public decimal? EstMonthlyExpenses { get; set; } // Nullable decimal for Estimated Monthly Expenses
        public bool? IsActive { get; set; } // Nullable boolean for IsActive status
        public string? Status { get; set; } // Nullable string for Status
        public DateTime? CreatedDate { get; set; } // Nullable DateTime for CreatedDate
        public string? PurposeLoan { get; set; } // Nullable string for PurposeLoan
        public string? PaymentTerms { get; set; } // Nullable string for PaymentTerms

        [ForeignKey("MemberId")]
        public virtual Member? Member { get; set; }

        [ForeignKey("CollectorId")]
        public Collector? Collector { get; set; }
    }
}