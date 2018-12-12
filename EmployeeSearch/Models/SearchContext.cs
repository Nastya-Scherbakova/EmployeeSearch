using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeSearch.Models
{
    public class SearchContext : DbContext
    {

        public SearchContext(DbContextOptions<SearchContext> options) :
            base(options)
        { }

        public DbSet<CV> CVs { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Vacancy> Vacancies { get; set; }
        public DbSet<Requirment> Requirments { get; set; }
        public DbSet<Opportunity> Opportunities { get; set; }
        public DbSet<Directory> Directories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Vacancy>(entity =>
            {
                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Vacancies)
                    .HasForeignKey(d => d.CompanyId);
            });

             modelBuilder.Entity<Requirment>(entity =>
            {
                entity.HasOne(d => d.Vacancy)
                    .WithMany(p => p.Requirments)
                    .HasForeignKey(d => d.VacancyId);
            });

            modelBuilder.Entity<Opportunity>(entity =>
            {
                entity.HasOne(d => d.CV)
                    .WithMany(p => p.Opportunities)
                    .HasForeignKey(d => d.CVId);
            });

            modelBuilder.Entity<CV>(entity =>
            {
                entity.HasOne(d => d.Person)
                    .WithOne(p => p.CV)
                    .HasForeignKey<CV>(a=>a.PersonId);
            });
        }

    }
}
