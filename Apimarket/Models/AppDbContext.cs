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

     





        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)

                optionsBuilder.UseMySql(
                 "Server=localhost;Database=apimarket;User=root;Password=@Stefany31;Port=3306",
                   new MySqlServerVersion(new Version(8, 0, 23))
 );

        }

    }
}


