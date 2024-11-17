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
        public Member Member { get; set; }
        public MemberSaving Savings { get; set; }
        public MemberLoan MemberLoans { get; set; }
    }
}