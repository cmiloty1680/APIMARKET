
using Apimarket.Model;
using Apimarket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apimarket.Services
{
    public class CollecDroneService
    {
        private readonly AppDbContext _context;

        public CollecDroneService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<CollecDrone> GetAll()
        {
            //return _context.collecDrone.ToList();
            return _context.collecdrone
                .Include(cd => cd.responsible)
                .Include(cd => cd.hive)
                .ToList();
        }

        public void Add(CollecDrone entity)
        {
            _context.collecdrone.Add(entity);
            _context.SaveChanges();
        }

        public CollecDrone GetCollecDrone(int id)
        {
            return _context.collecdrone.FirstOrDefault(p => p.Id_CollecDrone == id);
        }

        public async Task<bool> DeleteCollecDrone(int id)
        {
            try
            {
                var collecDrone = await _context.collecdrone.FindAsync(id);
                if (collecDrone == null) return false;
                _context.collecdrone.Remove(collecDrone);
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
            _context.collecdrone.Update(collecDrone);
            _context.SaveChanges();
        }
    }
}