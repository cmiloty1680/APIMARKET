
using Apimarket.Model;
using Apimarket.Models;
using Microsoft.EntityFrameworkCore;

namespace Apimarket.Services
{
    public class ImplementService
    {
        private readonly AppDbContext _context;

        public ImplementService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Implement> GetAll()
        {
            return _context.implement.ToList();
        }

        public void Add(Implement entity)
        {
            _context.implement.Add(entity);
            _context.SaveChanges();
        }

        public Implement GetImplement(int id)
        {
            return _context.implement.FirstOrDefault(p => p.Id_Implement == id);
        }

        public async Task<bool> DeleteImplement(int id)
        {
            try
            {
                var implement = await _context.implement.FindAsync(id);
                if (implement == null) return false;

                _context.implement.Remove(implement);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void Update(Implement implement)
        {
            _context.implement.Update(implement);
            _context.SaveChanges();
        }




        public int GetTotalImplement()
        {
            return _context.implement.Sum(i => i.Can_Implement); // ✅ Esto suma todos los valores de cantidad
        }


        public int GetTotalImplementUsed()
        {
            return _context.implement.Sum(p => (int?)p.Can_Implement) ?? 0;
        }
        // Porcentaje de protocol de una entrada específica (por Id_Production)
        public int GetImplementPercentage(int idimplement)
        {
            var total = GetTotalImplement();
            if (total == 0) return 0;

            var prod = _context.implement
                .Where(p => p.Id_Implement == idimplement)
                .Select(p => p.Can_Implement)
                .FirstOrDefault();

            return (int)((prod * 100.0) / total);
        }

        // Porcentaje de colmenas utilizadas en una producción específica
        public int GetProtocolUsagePercentage(int idimplement)
        {
            var totalImplement = GetTotalImplementUsed();
            if (totalImplement == 0) return 0;

            var implementUsed = _context.implement
                .Where(p => p.Id_Implement == idimplement)
                .Select(p => p.Can_Implement)
                .FirstOrDefault();

            return (int)((implementUsed * 100.0) / totalImplement);
        }
        public int GetImplementCount()
        {
            return _context.implement.Count();
        }
        public decimal GetValorTotalImplementos()
        {
            return _context.implement.Sum(i => (decimal?)i.Vlr_Implement) ?? 0;
        }



    }
}


