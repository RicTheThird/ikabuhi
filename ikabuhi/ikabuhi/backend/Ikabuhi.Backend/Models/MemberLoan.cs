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
        public string CollateralType1 { get; set; }
        public decimal CollateralTypeAmount1 { get; set; }
        public string CollateralType2 { get; set; }
        public decimal CollateralTypeAmount2 { get; set; }
        public string CollateralType3 { get; set; }
        public decimal CollateralTypeAmount3 { get; set; }
        public string GuarantorName { get; set; }
        public string GuarantorRelation { get; set; }
        public string SourceOfIncome { get; set; }
        public string Status { get; set; } // Approve, Decline, Pending
        public DateTime DueDate { get; set; }
        public decimal LoanBalance { get; set; }
        public DateTime FirstPaymentDate { get; set; }
        public string LoanType { get; set; }
        public Member Member { get; set; }
        public ProductLoan ProductLoan { get; set; }
        public Collector Collector { get; set; }
    }
}