using Apimarket.Model;
using Apimarket.Models;
using Microsoft.EntityFrameworkCore;

namespace Apimarket.Services
{
    public class HoneyCollectionService
    {
        private readonly AppDbContext _context;

        public HoneyCollectionService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<HoneyCollection> GetAll()
        {
            return _context.honeyCollection
                           .Include(h => h.responsible)
                           .Include(h => h.production)
                           .ToList();
        }

        public HoneyCollection GetHoneyCollection(int id)
        {
            return _context.honeyCollection.FirstOrDefault(p => p.Id_HoneyCollection == id);
        }


        public void Add(HoneyCollection entity)
        {
            // Validar que el ID de producción exista
            var produccionExiste = _context.production.Any(p => p.Id_Production == entity.Id_Production);
            if (!produccionExiste)
            {
                throw new ArgumentException("El ID de producción no existe.");
            }

            // Validar que el ID de producción no haya sido ya usado
            var produccionYaUsada = _context.honeyCollection.Any(h => h.Id_Production == entity.Id_Production);
            if (produccionYaUsada)
            {
                throw new ArgumentException("Ya existe una recolección asociada a este ID de producción.");
            }


            // Guardar si todo está bien
            _context.honeyCollection.Add(entity);
            _context.SaveChanges();
        }


        public void Delete(int id)
        {
            var collection = _context.honeyCollection.Find(id);
            if (collection != null)
            {
                _context.honeyCollection.Remove(collection);
                _context.SaveChanges();
            }
        }
        public void Update(HoneyCollection honeyCollection)
        {
            _context.honeyCollection.Update(honeyCollection);
            _context.SaveChanges();
        }

        // obtener la producción total de miel agrupada por año
        public decimal GetTotalProductionByYear()
        {
            int year = DateTime.Now.Year;  // año actual
            return _context.honeyCollection
                .Where(h => h.Fec_HoneyCollection.Year == year)
                .Sum(h => h.Tot_HoneyCollection);
        }
    }
}
