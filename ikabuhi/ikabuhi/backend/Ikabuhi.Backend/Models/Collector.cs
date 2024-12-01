using System.Text.Json.Serialization;

namespace Ikabuhi.Backend.Models
{
    public class Collector
    {
        public Guid Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string? Branch { get; set; } = "Tanauan";
        public string? UserName { get; set; }
        public string? PasswordHash { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool IsActive { get; set; }
        public string? Role { get; set; }
        public string? ProfileImage { get; set; }

        [JsonIgnore]
        public ICollection<MemberLoan>? MemberLoans { get; set; }

        [JsonIgnore]
        public ICollection<CollectorGroup>? CollectorGroups { get; set; }
    }
}