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
            return _context.fertilization.ToList();
        }

        public void Add(Fertilization entity)
        {
            _context.fertilization.Add(entity);
            _context.SaveChanges();
        }

        public Fertilization GetFertilization(int id)
        {
            return _context.fertilization.FirstOrDefault(p => p.Id_Fertilization == id);
        }

        public async Task<bool> DeleteFertilization(int id)
        {
            try
            {
                var fertilizations = await _context.fertilization.FindAsync(id);
                if (fertilizations == null) return false;
                _context.fertilization.Remove(fertilizations);
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
            _context.fertilization.Update(fertilization);
            _context.SaveChanges();
        }
    }
}

