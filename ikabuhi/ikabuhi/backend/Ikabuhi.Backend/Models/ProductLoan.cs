namespace Ikabuhi.Backend.Models
{
    public class ProductLoan
    {
        public Guid Id { get; set; }
        public int Transactions { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public decimal InterestRate { get; set; }
        public ICollection<MemberLoan> MemberLoans { get; set; }
    }
}