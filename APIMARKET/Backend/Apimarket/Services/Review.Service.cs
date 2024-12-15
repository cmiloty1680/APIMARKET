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

        /// <summary>
        /// Obtiene todas las reseñas.
        /// </summary>
        /// <returns>Lista de todas las reseñas.</returns>
        public IEnumerable<Review> GetAll()
        {
            return _context.review.AsNoTracking().ToList();
        }

        /// <summary>
        /// Obtiene una reseña por su ID.
        /// </summary>
        /// <param name="id">ID de la reseña.</param>
        /// <returns>Reseña encontrada o null si no existe.</returns>
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

        /// <summary>
        /// Agrega una nueva reseña.
        /// </summary>
        /// <param name="review">Objeto de la reseña a agregar.</param>
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

        /// <summary>
        /// Actualiza una reseña existente.
        /// </summary>
        /// <param name="review">Objeto de la reseña con los datos actualizados.</param>
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

        /// <summary>
        /// Elimina una reseña por su ID.
        /// </summary>
        /// <param name="id">ID de la reseña a eliminar.</param>
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

