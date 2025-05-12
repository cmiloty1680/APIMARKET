
using Apimarket.Model;
using Apimarket.Models;
using Microsoft.EntityFrameworkCore;

namespace Apimarket.Services
{
    public class FeedingService
    {
        private readonly AppDbContext _context;

        public FeedingService(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Feeding> GetAll()
        {
            //return _context.review.AsNoTracking().ToList();
            return _context.feeding
                               .Include(r => r.hive)
                               .Include(r => r.responsible)
                               .ToList();

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
        public void Delete(int id)
        {
            try
            {
                var feeding = _context.feeding.Find(id);
                if (feeding == null)
                {
                    Console.WriteLine($"No se encontró la alimentacion con ID {id}");
                    return;
                }

                _context.feeding.Remove(feeding);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al eliminar la alimentacion con ID {id}: {ex.Message}");
                throw;
            }
        }
        //    public void DeleteFeeding(int id)
        //    {
        //        try
        //        {
        //            var feeding = _context.feeding.Find(id);
        //            if (feeding == null)
        //            {
        //                Console.WriteLine($"No se encontró la alimentación con ID {id}");
        //                return;
        //            }

        //            _context.feeding.Remove(feeding);
        //            _context.SaveChanges();
        //        }
        //        catch (Exception ex)
        //        {
        //            Console.WriteLine($"Error al eliminar la alimentación con ID {id}: {ex.Message}");
        //            throw;
        //        }
        //    }

        //}

        public void Update(Feeding feeding)
        {
            _context.feeding.Update(feeding);
            _context.SaveChanges();
        }
    }
}

