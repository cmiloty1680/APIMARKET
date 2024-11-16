using Apimarket.Models;

namespace Apimarket.Services
{
    public class ReviewServices
    {
        private readonly AppDbContext _context;

        public ReviewServices(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Review> GetAll()
        {
            return _context.Reviews.ToList();
        }

        public void Add(Review entity)
        {
            _context.Reviews.Add(entity);
            _context.SaveChanges();
        }

        public Review GetReview(int id)
        {
            return _context.Reviews.FirstOrDefault(p => p.Id_Review == id);
        }

        public async Task<bool> DeleteReview(int id)
        {
            try
            {
                var review = await _context.Reviews.FindAsync(id);
                if (review == null) return false;
                _context.Reviews.Remove(review);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void Update(Review review)
        {
            _context.Reviews.Update(review);
            _context.SaveChanges();
        }
    }
}

