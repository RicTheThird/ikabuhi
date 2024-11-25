using System.ComponentModel.DataAnnotations.Schema;

namespace Ikabuhi.Backend.Models
{
    public class CollectorGroup
    {
        public Guid Id { get; set; }
        public Guid CollectorId { get; set; }
        public Guid GroupId { get; set; }
        public bool IsActive { get; set; }

        [ForeignKey("CollectorId")]
        public virtual Collector? Collector { get; set; }

        [ForeignKey("GroupId")]
        public virtual Group? Group { get; set; }
    }
}