﻿namespace Ikabuhi.Backend.Models
{
    public class MemberSaving
    {
        public Guid Id { get; set; }
        public Guid MemberId { get; set; }
        public decimal RunningSavingsAmount { get; set; }
        public DateTime LastPaymentDate { get; set; }
        public decimal LastPaidAmount { get; set; }
        public Member Member { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
    }
}