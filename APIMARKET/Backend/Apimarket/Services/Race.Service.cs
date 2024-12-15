using Apimarket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

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
            return _context.race.AsNoTracking().ToList();
        }

        public Race GetRace(int id)
        {
            return _context.race.AsNoTracking().FirstOrDefault(r => r.Id_Race == id);
        }

        public void Add(Race race)
        {
            _context.race.Add(race);
            _context.SaveChanges();
        }

        public void Update(Race race)
        {
            _context.race.Update(race);
            _context.SaveChanges();
        }

        public void DeleteRace(int id)
        {
            var race = _context.race.Find(id);
            if (race != null)
            {
                _context.race.Remove(race);
                _context.SaveChanges();
            }
        }
    }
}
