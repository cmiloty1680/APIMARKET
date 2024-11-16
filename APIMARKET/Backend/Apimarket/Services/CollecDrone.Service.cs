using Apimarket.Model;
using Apimarket.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apimarket.Services
{
    public class CollecDroneServices
    {
        private readonly AppDbContext _context;

        public CollecDroneServices(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<CollecDrone> GetAll()
        {
            return _context.CollecDrones.ToList();
        }

        public void Add(CollecDrone entity)
        {
            _context.CollecDrones.Add(entity);
            _context.SaveChanges();
        }

        public CollecDrone GetCollecDrone(int id)
        {
            return _context.CollecDrones.FirstOrDefault(p => p.Id_CollecDrone == id);
        }

        public async Task<bool> DeleteCollecDrone(int id)
        {
            try
            {
                var collecDrone = await _context.CollecDrones.FindAsync(id);
                if (collecDrone == null) return false;
                _context.CollecDrones.Remove(collecDrone);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void Update(CollecDrone collecDrone)
        {
            _context.CollecDrones.Update(collecDrone);
            _context.SaveChanges();
        }
    }
}
