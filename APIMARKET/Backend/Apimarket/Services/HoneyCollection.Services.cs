//using Apimarket.Model;
//using Apimarket.Models;

//namespace Apimarket.Services
//{
//    public class HoneyCollectionServices
//    {

//        private readonly AppDbContext _context;

//        public HoneyCollectionServices(AppDbContext context)
//        {
//            _context = context;
//        }
//        public IEnumerable<HoneyCollection> GetAll()
//        {
//            return _context.honeyCollection.ToList();
//        }
//        public void Add(HoneyCollection entity)
//        {
//            _context.honeyCollection.Add(entity);
//            _context.SaveChanges();
//        }

//        public HoneyCollection GetHoneyCollection(int id)
//        {
//            return _context.feeding.FirstOrDefault(p => p.Id_HoneyCollection == id);
//        }

//        public async Task<bool> DeleteFeeding(int id)
//        {
//            try
//            {
//                var feedings = await _context.feeding.FindAsync(id);
//                if (feedings == null) return false;

//                _context.feeding.Remove(feedings);
//                await _context.SaveChangesAsync();
//                return true;
//            }
//            catch (Exception ex)
//            {
//                throw;
//            }
//        }

//        public void Update(Feeding feeding)
//        {
//            _context.feeding.Update(feeding);
//            _context.SaveChanges();
//        }


//    }
//}
