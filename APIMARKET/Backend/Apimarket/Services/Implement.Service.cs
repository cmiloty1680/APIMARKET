
using Apimarket.Model;
using Apimarket.Models;
using Microsoft.EntityFrameworkCore;

namespace Apimarket.Services
{
    public class ImplementService
    {
        private readonly AppDbContext _context;

        public ImplementService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Implement> GetAll()
        {
            return _context.implement.ToList();
        }

        public void Add(Implement entity)
        {
            _context.implement.Add(entity);
            _context.SaveChanges();
        }

        public Implement GetImplement(int id)
        {
            return _context.implement.FirstOrDefault(p => p.Id_Implement == id);
        }

        public async Task<bool> DeleteImplement(int id)
        {
            try
            {
                var implement = await _context.implement.FindAsync(id);
                if (implement == null) return false;

                _context.implement.Remove(implement);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void Update(Implement implement)
        {
            _context.implement.Update(implement);
            _context.SaveChanges();
        }
    }
}


