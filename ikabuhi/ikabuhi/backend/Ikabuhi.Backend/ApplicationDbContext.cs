using Ikabuhi.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Ikabuhi.Backend
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Group> Groups { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<MemberLoan> MemberLoans { get; set; }
        public DbSet<ProductLoan> ProductLoans { get; set; }
        public DbSet<Collector> Collectors { get; set; }
        public DbSet<CollectorGroup> CollectorGroups { get; set; }
        public DbSet<MemberSaving> MemberSavings { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<MemberWithdrawal> MemberWithdrawals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<CollectorGroup>()
            //    .HasOne(cg => cg.Collector)
            //    .WithMany(c => c.CollectorGroups)
            //    .HasForeignKey(cg => cg.CollectorId);

            //modelBuilder.Entity<CollectorGroup>()
            //    .HasOne(cg => cg.Group)
            //    .WithMany(g => g.CollectorGroups)
            //    .HasForeignKey(cg => cg.GroupId);

            //modelBuilder.Entity<Member>()
            //    .HasOne(m => m.Group)
            //    .WithMany(g => g.Members)
            //    .HasForeignKey(m => m.GroupId);

            //modelBuilder.Entity<MemberLoan>()
            //    .HasOne(ml => ml.Member)
            //    .WithMany(m => m.MemberLoans)
            //    .HasForeignKey(ml => ml.MemberId);

            //modelBuilder.Entity<MemberLoan>()
            //    .HasOne(ml => ml.ProductLoan)
            //    .WithMany(pl => pl.MemberLoans)
            //    .HasForeignKey(ml => ml.ProductLoanId);

            //modelBuilder.Entity<MemberLoan>()
            //    .HasOne(ml => ml.Collector)
            //    .WithMany(c => c.MemberLoans)
            //    .HasForeignKey(ml => ml.CollectorId);

            //modelBuilder.Entity<MemberSaving>()
            //    .HasOne(ms => ms.Member)
            //    .WithMany(m => m.MemberSavings)
            //    .HasForeignKey(ms => ms.MemberId);

            //modelBuilder.Entity<Transaction>()
            //    .HasOne(t => t.Member)
            //    .WithMany(m => m.Transactions)
            //    .HasForeignKey(t => t.MemberId);

            //modelBuilder.Entity<Transaction>()
            //    .HasOne(t => t.Savings)
            //    .WithMany(s => s.Transactions)
            //    .HasForeignKey(t => t.SavingsId);

            //modelBuilder.Entity<MemberWithdrawal>()
            //    .HasOne(mw => mw.Member)
            //    .WithMany(m => m.MemberWithdrawals)
            //    .HasForeignKey(mw => mw.MemberId);
        }
    }
}