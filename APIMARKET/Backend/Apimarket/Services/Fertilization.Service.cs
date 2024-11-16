using Apimarket.Model;
using Apimarket.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apimarket.Services
{
    public class FertilizationServices
    {
        private readonly AppDbContext _context;

        public FertilizationServices(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Fertilization> GetAll()
        {
            return _context.Fertilizations.ToList();
        }

        public void Add(Fertilization entity)
        {
            _context.Fertilizations.Add(entity);
            _context.SaveChanges();
        }

        public Fertilization GetFertilization(int id)
        {
            return _context.Fertilizations.FirstOrDefault(p => p.Id_Fertilization == id);
        }

        public async Task<bool> DeleteFertilization(int id)
        {
            try
            {
                var fertilizations = await _context.Fertilizations.FindAsync(id);
                if (fertilizations == null) return false;
                _context.Fertilizations.Remove(fertilizations);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void Update(Fertilization fertilization)
        {
            _context.Fertilizations.Update(fertilization);
            _context.SaveChanges();
        }
    }
}

