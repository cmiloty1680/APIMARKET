﻿
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

        public async Task UpdateUserAsync(Responsible responsible)
        {
            if (responsible == null)
            {
                throw new ArgumentNullException(nameof(responsible), "El modelo de usuario es nulo");
            }

            var existingResponsible = await _context.responsible
                .Where(u => u.Id_Responsible == responsible.Id_Responsible)
                .FirstOrDefaultAsync();

            if (existingResponsible == null)
            {
                throw new ArgumentException("Usuario no encontrado");
            }

            existingResponsible.Emai_Responsible = responsible.Emai_Responsible;
            existingResponsible.Hashed_Password = responsible.Hashed_Password;
            existingResponsible.Salt = responsible.Salt;
            existingResponsible.Tok_Responsible = responsible.Tok_Responsible;
            existingResponsible.Blockad = responsible.Blockad;
            existingResponsible.ResetToken = responsible.ResetToken;
            existingResponsible.ResetTokenExpiration = responsible.ResetTokenExpiration;

            await _context.SaveChangesAsync();
        }

        public async Task<Responsible> GetByEmailAsync(string email)
        {
            return await _context.responsible
                .Where(u => u.Emai_Responsible == email)
                .Select(u => new Responsible
                {
                    Id_Responsible = u.Id_Responsible,
                    Emai_Responsible = u.Emai_Responsible,
                    Hashed_Password = u.Hashed_Password ?? string.Empty, // Asegurarse de que no sea NULL
                    Salt = u.Salt ?? string.Empty, // Asegurarse de que no sea NULL
                    Tok_Responsible = u.Tok_Responsible ?? string.Empty, // Asegurarse de que no sea NULL
                    Blockad = u.Blockad,
                    ResetToken = u.ResetToken ?? string.Empty, // Asegurarse de que no sea NULL
                    ResetTokenExpiration = u.ResetTokenExpiration ?? DateTime.UtcNow // Si es NULL, asigna la fecha actual
                })
                .FirstOrDefaultAsync();
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

        //public async Task<string> GenePassRestToken(string email)
        //{
        //    var responsible = await (email);
        //    if(responsible == null)
        //    {
        //        throw new ArgumentException("El correo no se encuentra registrado");
        //    }

        //    string tokSet_Responsible  = Guid.NewGuid().ToString();
        //    responsible.TokSet_Responsible = tokSet_Responsible;
        //    responsible.TokExpiration_Responsible = DateTime.Now.AddMinutes(30);

        //    await _context.SaveChangesAsync();
        //    return tokSet_Responsible;
        //}

        public void ConfigureServices(IServiceCollection services)
        {
            // Registrar IUserService e implementar el servicio correspondiente
            services.AddScoped<ResponsibleService, ResponsibleService>();
        }

        public async Task<Responsible> GetResponsibleByResetToken(string token)
        {
            return await _context.responsible.FirstOrDefaultAsync(u => u.ResetToken == token && u.ResetTokenExpiration > DateTime.UtcNow);
        }

        public async Task ClearResetToken(Responsible responsible)
        {
            responsible.ResetToken = null;
            responsible.ResetTokenExpiration = null;
            await _context.SaveChangesAsync();
        }
        public async Task<Responsible> GetByTokenAsync(string token)
        {
            return await _context.responsible.FirstOrDefaultAsync(u => u.ResetToken == token);
        }

    }
}

