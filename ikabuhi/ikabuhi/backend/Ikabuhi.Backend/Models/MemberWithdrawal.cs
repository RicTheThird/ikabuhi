using System.ComponentModel.DataAnnotations.Schema;

namespace Ikabuhi.Backend.Models
{
    public class MemberWithdrawal
    {
        public Guid Id { get; set; }
        public decimal WithdrawAmount { get; set; }
        public Guid MemberId { get; set; }
        public string Status { get; set; } // Approve, Decline, Pending
        public DateTime ApplicationDateTime { get; set; }
        public DateTime WithdrawalDateTime { get; set; }

        [ForeignKey("MemberId")]
        public virtual Member? Member { get; set; }
    }
}