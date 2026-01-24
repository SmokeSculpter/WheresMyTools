using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RESTApi.Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Record> Records { get; set; }

    public virtual DbSet<Tool> Tools { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:WheresMyTools");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__7AD04F114B48A4C9");
        });

        modelBuilder.Entity<Record>(entity =>
        {
            entity.HasKey(e => e.RecordId).HasName("PK__Records__FBDF78E9FB489F66");

            entity.HasOne(d => d.Employee).WithMany(p => p.Records)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Employee");

            entity.HasOne(d => d.Tool).WithMany(p => p.Records)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Tool");
        });

        modelBuilder.Entity<Tool>(entity =>
        {
            entity.HasKey(e => e.ToolId).HasName("PK__Tools__CC0CEB9104F37E39");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
