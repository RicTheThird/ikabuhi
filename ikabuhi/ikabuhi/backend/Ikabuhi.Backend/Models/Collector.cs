namespace Ikabuhi.Backend.Models
{
    public class Collector
    {
        public Guid Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string Branch { get; set; }
        public string? UserName { get; set; }
        public string? PasswordHash { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool IsActive { get; set; }
        public ICollection<MemberLoan> MemberLoans { get; set; }
        public ICollection<CollectorGroup> CollectorGroups { get; set; }
    }
}