using Apimarket.Model;
using Apimarket.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apimarket.Services
{
    public class ExtractionServices
    {
        private readonly AppDbContext _context;

        public ExtractionServices(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Extraction> GetAll()
        {
            return _context.Extractions.ToList();
        }

        public void Add(Extraction entity)
        {
            _context.Extractions.Add(entity);
            _context.SaveChanges();
        }

        public Extraction GetExtraction(int id)
        {
            return _context.Extractions.FirstOrDefault(p => p.Id_Extraction == id);
        }

        public async Task<bool> DeleteExtraction(int id)
        {
            try
            {
                var extraction = await _context.Extractions.FindAsync(id);
                if (extraction == null) return false;

                _context.Extractions.Remove(extraction);
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
            _context.Extractions.Update(extraction);
            _context.SaveChanges();
        }
    }
}
