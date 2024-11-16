using Apimarket.Functions;
using Apimarket.Services;
using Microsoft.AspNetCore.Mvc;
using Apimarket.Models;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class RaceController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly RaceServices _racesServices;
        private readonly IConfiguration _configuration;

        public RaceController(IConfiguration configuration, RaceServices raceServices)
        {
            _configuration = configuration;
            _racesServices = raceServices;
            _functionsGeneral = new GeneralFunctions(configuration);
        }

        [HttpPost("CreateRace")]
        public IActionResult AddP([FromBody] Race entity)
        {
            if (entity == null)
            {
                return BadRequest("La entidad Race no puede ser nula");
            }

            if (entity.Id_Race <= 0)
            {
                return BadRequest("El Id de Race debe ser un valor positivo");
            }

            var existingRace = _racesServices.GetRace(entity.Id_Race);
            if (existingRace != null)
            {
                return Conflict("Ya existe un Race con ese ID");
            }

            _racesServices.Add(entity);
            return Ok("Race creado con éxito");
        }

        [HttpGet("GetsRace")]
        public ActionResult<IEnumerable<Race>> GetsRace(int start, int end)
        {
            try
            {
                if (start <= 1)
                {
                    start = 0;
                }

                var races = _racesServices.GetAll()
                                                        .Skip(start)
                                                        .Take(end - start)
                                                        .ToList();

                if (!races.Any())
                {
                    return NotFound("No se encontró el Race en el rango");
                }

                return Ok(races);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetRace/{id}")]
        public IActionResult GetRace(int id)
        {
            try
            {
                var race = _racesServices.GetRace(id);
                if (race == null)
                {
                    return NotFound("Race no encontrado");
                }

                return Ok(race);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("UpdateRace")]
        public IActionResult UpdateRace(Race race)
        {
            try
            {
                _racesServices.Update(race);
                return Ok(new { message = "Race actualizado con éxito" });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("DeleteRace")]
        public IActionResult DeleteRace(int id)
        {
            try
            {
                var result = _racesServices.GetRace(id);
                if (result == null)
                {
                    return NotFound("El Race con ID " + id + " no se encontró.");
                }

                _racesServices.DeleteRace(id);
                return Ok("Race eliminado con éxito");
            }
            catch (KeyNotFoundException knfex)
            {
                return NotFound(knfex.Message);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
    }
}

