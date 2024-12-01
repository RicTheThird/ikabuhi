using System.ComponentModel.DataAnnotations.Schema;

namespace Ikabuhi.Backend.Models
{
    public class Notification
    {
        public Guid Id { get; set; }          // Unique identifier for the notification
        public Guid MemberId { get; set; }    // Unique identifier for the member
        public string? Message { get; set; }   // Message content (nullable)
        public DateTime? CreatedAt { get; set; } // Date and time the notification was created (nullable)
        public bool? IsSeen { get; set; }     // Indicates if the notification has been seen (nullable)

        [ForeignKey("MemberId")]
        public virtual Member? Member { get; set; }

        // Optional: You can add constructors, methods, or additional logic as needed
    }
}