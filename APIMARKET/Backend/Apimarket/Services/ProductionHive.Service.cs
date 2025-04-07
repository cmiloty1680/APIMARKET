using Apimarket.DTOs;
using Apimarket.Models;
using Microsoft.EntityFrameworkCore;

namespace Apimarket.Services
{
    public class ProductionHiveService
    {
        private readonly AppDbContext _context;

        public ProductionHiveService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<ProductionHiveDTO> GetAll()
        {
            return _context.productionhive
                .Select(ph => new ProductionHiveDTO
                {
                    Id_ProductionHive = ph.Id_ProductionHive,
                    Id_Production = ph.Id_Production,
                    Id_Hive = ph.Id_Hive
                })
                .AsNoTracking()
                .ToList();
        }
    }
}
