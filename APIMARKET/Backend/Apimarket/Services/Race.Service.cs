using Apimarket.Model;
using Apimarket.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apimarket.Services
{
    public class RaceServices
    {
        private readonly AppDbContext _context;

        public RaceServices(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Race> GetAll()
        {
            return _context.Races.ToList();
        }

        public void Add(Race entity)
        {
            _context.Races.Add(entity);
            _context.SaveChanges();
        }

        public Race GetRace(int id)
        {
            return _context.Races.FirstOrDefault(p => p.Id_Race == id);
        }

        public async Task<bool> DeleteRace(int id)
        {
            try
            {
                var race = await _context.Races.FindAsync(id);
                if (race == null) return false;
                _context.Races.Remove(race);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void Update(Race race)
        {
            _context.Races.Update(race);
            _context.SaveChanges();
        }
    }
}

