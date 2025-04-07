using Apimarket.Model;
using Apimarket.Models;
using Microsoft.EntityFrameworkCore;

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
            //return _context.feeding.ToList();
            return _context.feeding.Include(p => p.hive).ToList();
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
