using Apimarket.Functions;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ProductionController : ControllerBase
    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunctions FunctionsGeneral;
        private readonly ProductionService _productionService;

        public ProductionController(IConfiguration configuration, ProductionService productionService)
        {
            FunctionsGeneral = new GeneralFunctions(configuration);
            _Configuration = configuration;
            _productionService = productionService;
        }

        [HttpPost("CreateProduction")]
        public IActionResult AddP([FromBody] Production entity)
        {
            if (entity == null)
            {
                return BadRequest("La entidad de producción no puede ser nula.");
            }

            // Verificar que id_Produccion sea mayor que 0
            if (entity.Id_Produccion <= 0)
            {
                return BadRequest("El ID de producción debe ser un valor positivo.");
            }


            // Verificar si ya existe una producción con el mismo ID
            var existingProduction = _productionService.GetProduction(entity.Id_Produccion);
            if (existingProduction != null)
            {
                return Conflict("Ya existe una producción con este ID.");
            }

            _productionService.Add(entity);
            return Ok("Producción creada con éxito.");
        }


        [HttpGet("GetProduction")]
        public IActionResult GetProduccion(int id)
        {
            try
            {
                var production = _productionService.GetProduction(id);
                if (production == null)
                {
                    return NotFound("Producción no encontrada.");
                }
                return Ok(production);
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("GetsAllProduction")]
        public IActionResult GetsAllProduccion()
        {
            try
            {
                var productions = _productionService.GetAll();
                return Ok(productions);
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpPut("UpdateProduction")]
        public async Task<IActionResult> UpdateProduction(Production production)
        {
            try
            {
                var existingProduction = _productionService.GetProduction(production.Id_Produccion);
                if (existingProduction == null)
                {
                    return NotFound("Production no actualizada");
                }
                existingProduction.Fec_Production = production.Fec_Production;
                existingProduction.Can_Production = production.Can_Production;

                _productionService.Update(existingProduction);

                return Ok(new
                {
                    message = "Production actualizada con exito"
                });
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }





        [HttpDelete("DeleteProduction")]
        public IActionResult DeleteProduction(int id)
        {
            try
            {
                var production = _productionService.GetProduction(id);
                if (production == null)
                {
                    return NotFound("La producción con ID " + id + " no se encontró.");
                }

                _productionService.Delete(id);
                return Ok("Producción eliminada con éxito.");
            }
            catch (KeyNotFoundException knfEx)
            {
                return NotFound(knfEx.Message);
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpGet("AllProductionInRange")]
        public ActionResult<IEnumerable<Production>> GetAllInRange(int start, int end)
        {
            try
            {
                var productions = _productionService.GetAll() // Obtener todas las colmenas
                                        .Skip(start - 1) // Saltar los primeros 'start - 1' registros
                                        .Take(end - start + 1) // Tomar los registros dentro del rango
                                        .ToList();

                if (!productions.Any())
                {
                    return NotFound("No se encontraron colmenas en el rango especificado.");
                }

                return Ok(productions);
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
    }
}
