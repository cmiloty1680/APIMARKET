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

        public ProductionService(AppDbContext context)
        {
            _context = context;
        }

        // Obtiene todas las producciones
        public IEnumerable<Production> GetAll()
        {
            return _context.production.ToList();
        }

        // Añade una nueva producción
        public void Add(Production entity)
        {
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
            var production = _context.production.FirstOrDefault(p => p.Id_Production == id);
            if (production != null)
            {
                try
                {
                    _context.production.Remove(production);
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al eliminar la producción: " + ex.Message);
                }
            }
            else
            {
                throw new KeyNotFoundException("La producción con ID " + id + " no se encontró.");
            }
        }

        // Actualiza una producción existente
        public void Update(Production production)
        {
            _context.production.Update(production);
            _context.SaveChanges();
        }

    }
}

