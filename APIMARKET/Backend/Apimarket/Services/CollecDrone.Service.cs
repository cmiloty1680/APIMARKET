
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
            return _context.collecDrone
                .Include(cd => cd.responsible)
                .ToList();
        }

        public void Add(CollecDrone entity)
        {
            _context.collecDrone.Add(entity);
            _context.SaveChanges();
        }

        public CollecDrone GetCollecDrone(int id)
        {
            return _context.collecDrone.FirstOrDefault(p => p.Id_CollecDrone == id);
        }

        public async Task<bool> DeleteCollecDrone(int id)
        {
            try
            {
                var collecDrone = await _context.collecDrone.FindAsync(id);
                if (collecDrone == null) return false;
                _context.collecDrone.Remove(collecDrone);
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
            _context.collecDrone.Update(collecDrone);
            _context.SaveChanges();
        }
    }
}