using Apimarket.DTOs;
using Apimarket.model;
using Apimarket.Model;
using Microsoft.EntityFrameworkCore;

namespace Apimarket.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Protocol> protocol { get; set; }
        public DbSet<Feeding> feeding { get; set; }
        public DbSet<Implement> implement { get; set; }
        public DbSet<Responsible> responsible { get; set; }

        public DbSet<HoneyCollection> honeyCollection { get; set; }
        public DbSet<Hive> hive { get; set; }
        public DbSet<Production> production { get; set; }
        public DbSet<Race> race { get; set; }

        public DbSet<Review> review { get; set; }
        public DbSet<Fertilization> fertilization { get; set; }

        public DbSet<Extraction> extraction { get; set; }
        public DbSet<CollecDrone> collecDrone { get; set; }

        public DbSet<ContactForm> contactForm { get; set; }












        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)

                optionsBuilder.UseMySql(
                 "Server=localhost;Database=apimarket;User=root;Password=victor2016;Port=3306",
                   new MySqlServerVersion(new Version(8, 0, 23))
 );

        }

    }
}


