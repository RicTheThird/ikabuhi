using System.ComponentModel.DataAnnotations.Schema;

namespace Ikabuhi.Backend.Models
{
    public class Member
    {
        public Guid Id { get; set; }
        public Guid GroupId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string AccountNo { get; set; }
        public DateTime? Bdate { get; set; }
        public string CivilStatus { get; set; }
        public string? Occupation { get; set; }
        public string Brgy { get; set; }
        public string Municipality { get; set; }
        public string Province { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string? PhotoBlobName { get; set; }
        public string? ElectricBillBlobName { get; set; }
        public string? BrgyClearanceBlobName { get; set; }

        [ForeignKey("GroupId")]
        public virtual Group Group { get; set; }

        public ICollection<MemberLoan>? MemberLoans { get; set; }
        public ICollection<MemberSaving>? MemberSavings { get; set; }
        public ICollection<Transaction>? Transactions { get; set; }
        public ICollection<MemberWithdrawal>? MemberWithdrawals { get; set; }
        public ICollection<Payments>? Payments { get; set; }
    }
}