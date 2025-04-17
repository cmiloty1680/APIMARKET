using Apimarket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Apimarket.Services
{
    public class ReviewService
    {
        private readonly AppDbContext _context;

        // Constructor con inyección de dependencias
        public ReviewService(AppDbContext context)
        {
            _context = context;
        }


        public IEnumerable<Review> GetAll()
        {
            return _context.review
                               .Include(p => p.responsible)
                               .Include(p => p.hive)
                               .ToList();

        }

       
        public Review GetReview(int id)
        {
            try
            {
                return _context.review.AsNoTracking().FirstOrDefault(r => r.Id_Review == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener la revision con ID {id}: {ex.Message}");
                return null;
            }
        }

       
        public void Add(Review review)
        {
            try
            {
                _context.review.Add(review);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al agregar la revision: {ex.Message}");
                throw;
            }
        }

       
        public void Update(Review review)
        {
            try
            {
                var existingReview = _context.review.Find(review.Id_Review);
                if (existingReview == null)
                {
                    Console.WriteLine($"No se encontró la revision con ID {review.Id_Review}");
                    return;
                }

                _context.Entry(existingReview).CurrentValues.SetValues(review);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al actualizar la revision con ID {review.Id_Review}: {ex.Message}");
                throw;
            }
        }

       
        public void DeleteReview(int id)
        {
            try
            {
                var review = _context.review.Find(id);
                if (review == null)
                {
                    Console.WriteLine($"No se encontró la revision con ID {id}");
                    return;
                }

                _context.review.Remove(review);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al eliminar la revision con ID {id}: {ex.Message}");
                throw;
            }
        }
    }
}

