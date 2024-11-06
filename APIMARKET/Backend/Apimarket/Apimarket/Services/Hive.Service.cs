using Apimarket.models;
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
        public IEnumerable<Hive> GetAll()
        {
            return _context.hive.ToList();
        }
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
            var existingHive = _context.hive.Find(hive.Id_Hive);
            if (existingHive == null)
            {
                throw new ArgumentException("Colmena no encontrada");
            }
            existingHive.FecIni_Hive = hive.FecIni_Hive; // Actualizar fecha de inicio
            existingHive.Est_Hive = hive.Est_Hive;       // Actualizar estado
            existingHive.NumCua_Hive = hive.NumCua_Hive; // Actualizar número de cuadros
            existingHive.NumAlz_Hive = hive.NumAlz_Hive; // Actualizar número de alzas
            existingHive.Can_Hive = hive.Can_Hive;       // Actualizar capacidad
            _context.hive.Update(hive);
            _context.SaveChanges();
        }
    }
}