using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Apimarket.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        public DbSet<Production> production { get; set; }
        public DbSet<Hive> hive { get; set; }

        public DbSet<Responsible> responsible { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseMySql("Server=localhost;Database=apimarket;User=root;Password=cristiantiquet18;Port=3306",
                new MySqlServerVersion(new Version(8, 0, 23))
                );

            }
        }
    }
}