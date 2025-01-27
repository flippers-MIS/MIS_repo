using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MIS_Database;

public partial class DatabaseContext : DbContext
{
    public DatabaseContext()
    {
    }

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ContactPerson> ContactPersons { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Paper> Papers { get; set; }

    public virtual DbSet<PostProcessing> PostProcessings { get; set; }

    public virtual DbSet<Printer> Printers { get; set; }

    public virtual DbSet<PrinterPaper> PrinterPapers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(LocalDB)\\mssqllocaldb;attachdbfilename=C:\\MIS_Backend\\MIS_repo\\MIS_Backend\\MIS_Database\\MIS_Database.mdf; integrated security=True;MultipleActiveResultSets=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactPerson>(entity =>
        {
            entity.HasIndex(e => e.CustomerId, "IX_ContactPersons_CustomerId");

            entity.HasOne(d => d.Customer).WithMany(p => p.ContactPeople).HasForeignKey(d => d.CustomerId);
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasIndex(e => e.CustomerId, "IX_Orders_CustomerId");

            entity.HasIndex(e => e.PrinterId, "IX_Orders_PrinterId");

            entity.HasIndex(e => e.UserId, "IX_Orders_UserId");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders).HasForeignKey(d => d.CustomerId);

            entity.HasOne(d => d.Printer).WithMany(p => p.Orders).HasForeignKey(d => d.PrinterId);

            entity.HasOne(d => d.User).WithMany(p => p.Orders).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<Paper>(entity =>
        {
            entity.ToTable("Paper");
        });

        modelBuilder.Entity<PostProcessing>(entity =>
        {
            entity.HasIndex(e => e.PrinterId, "IX_PostProcessings_PrinterId");

            entity.Property(e => e.ActiveUserId).HasColumnName("ActiveUserID");
            entity.Property(e => e.CuttingCostEur).HasColumnName("CuttingCostEUR");

            entity.HasOne(d => d.Printer).WithMany(p => p.PostProcessings).HasForeignKey(d => d.PrinterId);
        });

        modelBuilder.Entity<Printer>(entity =>
        {
            entity.Property(e => e.UnprintedEdgeMm).HasColumnName("UnprintedEdgeMM");
        });

        modelBuilder.Entity<PrinterPaper>(entity =>
        {
            entity.HasIndex(e => e.PaperId, "IX_PrinterPapers_PaperId");

            entity.HasIndex(e => e.PrinterId, "IX_PrinterPapers_PrinterId");

            entity.HasOne(d => d.Paper).WithMany(p => p.PrinterPapers).HasForeignKey(d => d.PaperId);

            entity.HasOne(d => d.Printer).WithMany(p => p.PrinterPapers).HasForeignKey(d => d.PrinterId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
