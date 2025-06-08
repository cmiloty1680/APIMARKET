using Apimarket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Apimarket.Services
{
    public class ProductionService
    {
        private readonly AppDbContext _context;
        private readonly HiveService _hiveService;

        public ProductionService(AppDbContext context, HiveService hiveService)
        {
            _context = context;
            _hiveService = hiveService;
        }

        // Obtiene todas las producciones
        public IEnumerable<Production> GetAll()
        {
            //return _context.production.ToList();
            return _context.production.Include(p => p.race  ).ToList();
        }

        // Añade una nueva producción
        public void Add(Production entity)
        {
            entity.TotColm_Hive = _hiveService.CountActiveHives();
            // Obtiene el total de cuadros de miel en colmenas activas
            entity.CanCua_Production = _hiveService.CountHoneyFramesInActiveHives();
            //Console.WriteLine($"TotColm_Hive calculado: {entity.TotColm_Hive}");
            _context.production.Add(entity);
            _context.SaveChanges();
        }

        // Obtiene una producción por su ID
        public Production GetProduction(int id)
        {
            return _context.production.FirstOrDefault(p => p.Id_Production == id);
        }

        // Elimina una producción por su ID
        public void Delete(int id)
        {
            try
            {
                var production = _context.production.Find(id);
                if (production == null)
                {
                    Console.WriteLine($"No se encontró la revision con ID {id}");
                    return;
                }

                _context.production.Remove(production);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al eliminar la production con ID {id}: {ex.Message}");
                throw;
            }
        }
        //public void Delete(int id)
        //{
        //    var production = _context.production.FirstOrDefault(p => p.Id_Production == id);
        //    if (production != null)
        //    {
        //        try
        //        {
        //            _context.production.Remove(production);
        //            _context.SaveChanges();
        //        }
        //        catch (Exception ex)
        //        {
        //            Console.WriteLine($"Error al eliminar la produccion con ID {id}: {ex.Message}");
        //            throw;
        //        }
        //    }
        //}

        // Actualiza una producción existente
        public void Update(Production production)
        {
            _context.production.Update(production);
            _context.SaveChanges();
        }
        public int GetTotalHoneyFrames()
        {
            return _context.production.Sum(p => (int?)p.CanCua_Production) ?? 0;
        }



        public int GetTotalHivesUsed()
        {
            return _context.production.Sum(p => (int?)p.TotColm_Hive) ?? 0;
        }

        // Porcentaje de producción de una entrada específica (por Id_Production)
        public int GetProductionPercentage(int idProduction)
        {
            var total = GetTotalHoneyFrames();
            if (total == 0) return 0;

            var prod = _context.production
                .Where(p => p.Id_Production == idProduction)
                .Select(p => p.CanCua_Production)
                .FirstOrDefault();

            return (int)((prod * 100.0) / total);
        }

        // Porcentaje de colmenas utilizadas en una producción específica
        public int GetHiveUsagePercentage(int idProduction)
        {
            var totalHives = GetTotalHivesUsed();
            if (totalHives == 0) return 0;

            var hivesUsed = _context.production
                .Where(p => p.Id_Production == idProduction)
                .Select(p => p.TotColm_Hive)
                .FirstOrDefault();

            return (int)((hivesUsed * 100.0) / totalHives);
        }
        //public int GetProductionCount()
        //{
        //    return _context.production.Count();
        //}
        public int GetProductionCount()
        {
            int year = DateTime.Now.Year;
            DateTime startOfYear = new DateTime(year, 1, 1);
            DateTime endOfYear = new DateTime(year, 12, 31, 23, 59, 59);

            return _context.production
                .Where(p => p.FecIni_Production <= endOfYear && p.FecFin_Production >= startOfYear)
                .Count();
        }



    }
}

