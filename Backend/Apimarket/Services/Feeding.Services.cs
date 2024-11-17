using Apimarket.Model;
using Apimarket.Models;

namespace Apimarket.Services
{
    public class FeedingServices
    {
        private readonly AppDbContext _context;

        public FeedingServices(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Feeding> GetAll()
        {
            return _context.feeding.ToList();
        }
        public void Add(Feeding entity)
        {
            _context.feeding.Add(entity);
            _context.SaveChanges();
        } 

        public Feeding GetFeeding(int id)
        {
            return _context.feeding.FirstOrDefault(p => p.Id_Feeding == id);
        }

        public async Task<bool> DeleteFeeding(int id)
        {
            try
            {
                var feedings = await _context.feeding.FindAsync(id);
                if (feedings == null) return false;

                _context.feeding.Remove(feedings);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void Update(Feeding feeding)
        {
            _context.feeding.Update(feeding);
            _context.SaveChanges();
        }

        
    }
}



