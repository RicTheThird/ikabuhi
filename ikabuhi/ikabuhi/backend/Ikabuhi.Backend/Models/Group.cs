using System.Text.Json.Serialization;

namespace Ikabuhi.Backend.Models
{
    public class Group
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Brgy { get; set; }
        public string Municipality { get; set; }
        public int MeetingDay { get; set; } // 0=Sunday, 1=Monday, etc.
        public string MeetingTime { get; set; }
        public string? Remarks { get; set; }

        public ICollection<Member>? Members { get; set; }

        [JsonIgnore]
        public ICollection<CollectorGroup>? CollectorGroups { get; set; }
    }
}