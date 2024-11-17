namespace Ikabuhi.Backend.Models
{
    public class MemberWithdrawal
    {
        public Guid Id { get; set; }
        public decimal WithdrawAmount { get; set; }
        public Guid MemberId { get; set; }
        public string Status { get; set; } // Approve, Decline, Pending
        public DateTime ApplicationDateTime { get; set; }
        public Member Member { get; set; }
    }
}