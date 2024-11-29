using System.ComponentModel.DataAnnotations.Schema;

namespace Ikabuhi.Backend.Models
{
    public class MemberLoan
    {
        public Guid Id { get; set; }
        public Guid MemberId { get; set; }
        public Guid ProductLoanId { get; set; }
        public int Cycle { get; set; }
        public decimal LoanAmount { get; set; }
        public decimal TotalLoanAmount { get; set; }
        public decimal WeeklyPayment { get; set; }
        public Guid CollectorId { get; set; }
        public bool IsActive { get; set; }
        public string? CollateralType1 { get; set; }
        public decimal? CollateralTypeAmount1 { get; set; }
        public string? CollateralType2 { get; set; }
        public decimal? CollateralTypeAmount2 { get; set; }
        public string? CollateralType3 { get; set; }
        public decimal? CollateralTypeAmount3 { get; set; }
        public string? GuarantorName { get; set; }
        public string? GuarantorRelation { get; set; }
        public string? SourceOfIncome { get; set; }
        public string? Status { get; set; } // Approve, Decline, Pending
        public DateTime? DueDate { get; set; }
        public decimal LoanBalance { get; set; }
        public DateTime? FirstPaymentDate { get; set; }
        public string? LoanType { get; set; }
        public decimal? LiabilityLoanBalance { get; set; }
        public decimal? LiabilityLoanBalanceWeeklyPayments { get; set; }
        public decimal? ExternalSavingsBalance { get; set; }
        public decimal? MonthlyExpenses { get; set; }

        [ForeignKey("MemberId")]
        public virtual Member? Member { get; set; }

        [ForeignKey("ProductLoanId")]
        public virtual ProductLoan? ProductLoan { get; set; }

        [ForeignKey("CollectorId")]
        public Collector? Collector { get; set; }
    }
}