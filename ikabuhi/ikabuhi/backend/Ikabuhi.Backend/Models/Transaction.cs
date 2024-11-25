using System.ComponentModel.DataAnnotations.Schema;

namespace Ikabuhi.Backend.Models
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public Guid MemberId { get; set; }
        public Guid SavingsId { get; set; }
        public Guid LoanId { get; set; }
        public decimal SaveAmount { get; set; }
        public decimal LoanPayment { get; set; }
        public DateTime TransactionDate { get; set; }
        public string? ReceiptFileName { get; set; }
        public string? Status { get; set; } //Pending, Approved
        public decimal LoanBalance { get; set; }
        public decimal SavingsAmount { get; set; }
        public string? PaymentMethod { get; set; }

        [ForeignKey("MemberId")]
        public virtual Member? Member { get; set; }

        [ForeignKey("SavingsId")]
        public virtual MemberSaving? Savings { get; set; }

        [ForeignKey("LoanId")]
        public virtual MemberLoan? MemberLoans { get; set; }
    }
}