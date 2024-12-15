using Apimarket.Models;

namespace Apimarket.Services
{
    public class HiveService
    {
        private readonly AppDbContext _context;

        public HiveService(AppDbContext context)
        {
            _context = context;
        }
        // Obtiene todas las hives
        public IEnumerable<Hive> GetAll()
        {
            return _context.hive.ToList();
        }

        // Añade una nueva hive
        public void Add(Hive entity)
        {
            _context.hive.Add(entity);
            _context.SaveChanges();
        }
        public Hive GetHive(int id)
        {
            return _context.hive.FirstOrDefault(p => p.Id_Hive == id);
        }

        public void Delete(int id)
        {
            var hive = _context.hive.FirstOrDefault(p => p.Id_Hive == id);
            if (hive != null)
            {
                try
                {
                    _context.hive.Remove(hive);
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al eliminar la hive" + ex.Message);
                }
            }
            else
            {
                throw new KeyNotFoundException("La hive con ID " + id + " no se encontro");
            }
        }
        public void Update(Hive hive)
        {
            _context.hive.Update(hive);
            _context.SaveChanges();
        }
    }
}