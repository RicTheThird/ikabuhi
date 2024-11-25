using System.ComponentModel.DataAnnotations.Schema;

namespace Ikabuhi.Backend.Models
{
    public class Payments
    {
        public Guid Id { get; set; } // Unique identifier for the payment
        public Guid? MemberId { get; set; } // Foreign key to Members table (nullable)
        public Guid? SavingsId { get; set; } // Foreign key to MemberSavings table (nullable)
        public Guid? LoanId { get; set; } // Foreign key to MemberLoans table (nullable)
        public decimal? SavingsPayment { get; set; } // Payment made towards savings (nullable)
        public decimal? LoanPayment { get; set; } // Payment made towards loan (nullable)
        public decimal? WithdrawalAmount { get; set; } // Withdrawal amount (nullable)
        public string? PaymentMethod { get; set; } // Payment method (nullable)
        public int? CreditPointsGained { get; set; } // Credit points gained (nullable)
        public DateTime? PaymentDate { get; set; } // Date when the payment was made (nullable)
        public int? WeekNumber { get; set; } // Week number for the payment (nullable)
        public string? Status { get; set; } //Submitted, Pending

        // Navigation properties (optional)
        [ForeignKey("MemberId")]
        public virtual Member? Member { get; set; } // Navigation to Member entity

        [ForeignKey("SavingsId")]
        public virtual MemberSaving? MemberSavings { get; set; } // Navigation to MemberSavings entity

        [ForeignKey("LoanId")]
        public virtual MemberLoan? MemberLoan { get; set; } // Navigation to MemberLoans entity
    }
}