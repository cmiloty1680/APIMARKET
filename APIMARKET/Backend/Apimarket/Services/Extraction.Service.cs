using Apimarket.Model;
using Apimarket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apimarket.Services
{
    public class ExtractionService
    {
        private readonly AppDbContext _context;

        public ExtractionService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Extraction> GetAll()
        {
            //return _context.extraction.ToList();
            return _context.extraction
              .Include(cd => cd.responsible)
              .Include(cd => cd.collecDrone)
              .ToList();
        }

        public void Add(Extraction entity)
        {
            _context.extraction.Add(entity);
            _context.SaveChanges();
        }

        public Extraction GetExtraction(int id)
        {
            return _context.extraction.FirstOrDefault(p => p.Id_Extraction == id);
        }

        public async Task<bool> DeleteExtraction(int id)
        {
            try
            {
                var extraction = await _context.extraction.FindAsync(id);
                if (extraction == null) return false;

                _context.extraction.Remove(extraction);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void Update(Extraction extraction)
        {
            _context.extraction.Update(extraction);
            _context.SaveChanges();
        }
    }
}
