namespace Ikabuhi.Backend.Models
{
    public class CollectorGroup
    {
        public Guid Id { get; set; }
        public Guid CollectorId { get; set; }
        public Guid GroupId { get; set; }
        public bool IsActive { get; set; }
        public Collector Collector { get; set; }
        public Group Group { get; set; }
    }
}