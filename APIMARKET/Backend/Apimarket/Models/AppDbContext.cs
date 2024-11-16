using Apimarket.Model;
using Microsoft.EntityFrameworkCore;
using System;

namespace Apimarket.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<CollecDrone> CollecDrones { get; set; }
        public DbSet<Fertilization> Fertilizations { get; set; }
        public DbSet<Responsible> responsible { get; set; }
        public DbSet<Extraction> Extractions { get; set; }
        public DbSet<Race> Races { get; set; }
        public DbSet<Review> Reviews { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
                optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 23)));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<CollecDrone>().ToTable("CollecDrone");
        }
    }
}
