using Apimarket.Functions;
using Apimarket.models;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class HiveController : ControllerBase
    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunctions FunctionsGeneral;
        private readonly HiveService _hiveService;
        public HiveController(IConfiguration configuration, HiveService hiveService)
        {
            FunctionsGeneral = new GeneralFunctions(configuration);
            _Configuration = configuration;
            _hiveService = hiveService;

        }
        [HttpPost("Createhive")]

        public IActionResult AddC([FromBody] Hive entity)
        {
            if (entity == null)
            {
                return BadRequest("La entidad de colmena no puede ser nula.");
            }

            if (entity.Id_Hive <= 0)
            {
                return BadRequest("El ID de colmena debe ser un valor positivo.");
            }

            var existingHive = _hiveService.GetHive(entity.Id_Hive);
            if (existingHive != null)
            {
                return Conflict("Ya existe una colmena con este ID.");
            }

            _hiveService.Add(entity);
            return Ok("Colmena creada con éxito.");
        }
        [HttpGet("GetHive")]
        public IActionResult GetHive(int id)
        {
            try
            {
                var hive = _hiveService.GetHive(id);
                if (hive == null)
                {
                    return NotFound("Colmena no Encontrada");
                }
                return Ok(hive);
            }
            catch (Exception ex)
            {

                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpGet("AllHive")]

        public ActionResult<IEnumerable<Hive>> GetAll()
        {
            try
            {
                var hive = _hiveService.GetAll();
                return Ok(_hiveService.GetAll());
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpPut("UpdateHive")]
        public IActionResult UpdateHive(Hive hive)
        {
            try
            {
                if (hive.Id_Hive <= 0)
                {
                    return BadRequest("El ID de colmena debe ser un valor positivo.");
                }
                // Obtener la colmena existente por ID
                var existingHive = _hiveService.GetHive(hive.Id_Hive);
                if (existingHive == null)
                {
                    return NotFound("Id " + hive.Id_Hive + " de Colmena no encontrada");
                }


                // Llamar al servicio para actualizar la colmena
                _hiveService.Update(existingHive);

                // Retornar respuesta exitosa
                return Ok(new
                {
                    message = "Colmena actualizada con éxito"
                });
            }
            catch (Exception ex)
            {
                // Registrar el error
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, "Error al actualizar la colmena: " + ex.Message);
            }
        }



        [HttpDelete("DeleteHive")]
        public IActionResult DeleteHive(int id)
        {
            try
            {
                var hive = _hiveService.GetHive(id);
                if (hive == null)
                {
                    return NotFound("La colmena con ID " + id + " no se encontró.");
                }
                _hiveService.Delete(id);
                return Ok("Colmena eliminada con exito");
            }
            catch (Exception ex)
            {

                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpGet("AllHiveInRange")]
        public ActionResult<IEnumerable<Hive>> GetAllInRange(int start, int end)
        {
            try
            {
                if (start <= 0)
                {
                    start = 0;
                }

                var hives = _hiveService.GetAll() // Obtener todas las colmenas
                                        .Skip(start) // Saltar los primeros 'start - 1' registros
                                        .Take(end) // Tomar los registros dentro del rango
                                        .ToList();

                if (!hives.Any())
                {
                    return NotFound("No se encontraron colmenas en el rango especificado.");
                }

                return Ok(hives);
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }


    }
}
