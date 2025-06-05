
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

        // Método para contar las colmenas activas

        // Total de alimentación (Can_Feeding sumado)
        public int CountTotalFeeding()
        {
            return _context.feeding.Sum(p => (int?)p.Can_Feeding) ?? 0;
        }





        // Porcentaje de alimentación de una entrada específica (por Id_Feeding)
        public int CountPorcentajeFeeding(int idFeeding)
        {
            var total = CountTotalFeeding();
            if (total == 0) return 0;

            var cantidad = _context.feeding
                .Where(p => p.Id_Feeding == idFeeding)
                .Select(p => (int?)p.Can_Feeding)
                .FirstOrDefault() ?? 0;

            return (int)((cantidad * 100.0) / total);
        }


        // Estimación de total esperado, por ejemplo: 2 alimentaciones por colmena activa
        public int GetTotalExpectedFeeding()
        {
            int count = _context.feeding.Count(f => f.Tip_Feeding == "Azúcar");
            return count * 2; // Suponiendo que esperas 2 eventos por tipo
        }

    }

}










