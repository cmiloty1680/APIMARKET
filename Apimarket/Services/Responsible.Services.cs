
using Apimarket.Models;
using Microsoft.EntityFrameworkCore;

namespace Apimarket.Services
{
    public class ResponsibleService
    {
        private readonly AppDbContext _context;

        public ResponsibleService(AppDbContext context)
        {
            _context = context;
        }


        public bool CheckEmailExists(string email)
        {
            // Verificar si el correo existe en la base de datos
            return _context.responsible.Any(u => u.Emai_Responsible == email); // Devuelve true si existe, false si no
        }

        public async Task<bool> ResponsibleEmail(string Emai_Responsible)
        {
            return await _context.responsible.AnyAsync(u => u.Emai_Responsible == Emai_Responsible);
        }
        public IEnumerable<Responsible> GetAll()
        {
            return _context.responsible.ToList();
        }

        public void Add(Responsible entity)
        {
            _context.responsible.Add(entity);
            _context.SaveChanges();

        }
        public Responsible GetResponsible(int id)
        {
            return _context.responsible.FirstOrDefault(p => p.Id_Responsible == id);
        }
        // Elimina una producción por su ID
        public void Delete(int id)
        {
            var responsible = _context.responsible.FirstOrDefault(p => p.Id_Responsible == id);
            if (responsible != null)
            {
                try
                {
                    _context.responsible.Remove(responsible);
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al eliminar el responsable: " + ex.Message);
                }
            }
            else
            {
                throw new KeyNotFoundException("El responsable con ID " + id + " no se encontró.");
            }
        }

        // Actualiza una producción existente
        public void Update(Responsible responsible)
        {
            _context.responsible.Update(responsible);
            _context.SaveChanges();
        }
        public async Task<bool> DeleteResponsible(int id)
        {
            var responsible = await _context.responsible.FindAsync(id);
            if (responsible == null) return false;

            _context.responsible.Remove(responsible);
            await _context.SaveChangesAsync();
            return true;
        }
        public Responsible GetByEmail(string email)
        {
            // Suponiendo que tienes una tabla o lista de responsables, busca uno por su email
            return _context.responsible.FirstOrDefault(r => r.Emai_Responsible == email);
        }
        public void ConfigureServices(IServiceCollection services)
        {
            // Registrar IUserService e implementar el servicio correspondiente
            services.AddScoped<ResponsibleService, ResponsibleService>();
        }

    }
}

