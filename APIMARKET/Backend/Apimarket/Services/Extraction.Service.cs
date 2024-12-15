﻿using Apimarket.Model;
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
            return _context.extraction.ToList();
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
