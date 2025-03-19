using Apimarket.DTOs;
using Apimarket.Functions;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.AspNetCore.Authorization;
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
            //if (entity == null)
            //{
            //    return BadRequest("La entidad de producción no puede ser nula.");
            //}

            //// Verificar que id_Produccion sea mayor que 0
            //if (entity.Id_Produccion <= 0)
            //{
            //    return BadRequest("El ID de producción debe ser un valor positivo.");
            //}


            //// Verificar si ya existe una producción con el mismo ID
            //var existingProduction = _productionService.GetProduction(entity.Id_Produccion);
            //if (existingProduction != null)
            //{
            //    return Conflict("Ya existe una producción con este ID.");
            //}

            _productionService.Add(entity);
            return Ok(new {registrado = "Producción creada con éxito." });
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
        //public IActionResult GetsAllProduccion()
        //{
        //    try
        //    {
        //        var productions = _productionService.GetAll();
        //        return Ok(productions);
        //    }
        //    catch (Exception ex)
        //    {
        //        FunctionsGeneral.Addlog(ex.ToString());
        //        return StatusCode(500, ex.ToString());
        //    }
        //}
        public ActionResult <IEnumerable<ProductionDTO>> GetsAllProduction()
        {
            var productions = _productionService.GetAll().Select(p => new ProductionDTO
            {
                Id_Production = p.Id_Production,
                FecIni_Production = p.FecIni_Production,
                FecFin_Production = p.FecFin_Production,
                Cant_Abejas = p.Cant_Abejas,
                Can_Production = p.Can_Production,
                Tot_Colmen = p.Tot_Colmen,
                Nom_Race = p.race.Nom_Race,
                Id_Race = p.race.Id_Race
            }).ToList();

            return Ok(productions);
        }






        [HttpPut("UpdateProduction/{id}")]
        public IActionResult UpdateProduction(Production production)
        {
            try
            {

                _productionService.Update(production);

                return Ok(new
                {
                    message = "Production actualizada con exito",
                    production
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
                var result = _productionService.GetProduction(id);
                if (result == null)
                {
                    return NotFound("La producción con ID " + id + " no se encontró.");
                }

                _productionService.Delete(id);
                return Ok("Producción eliminada con éxito.");
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
        [Authorize]
        [HttpPost("PDF")]
        public IActionResult PdfProduction(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                //    var protocols = _protocolServices.GetAll();
                //    string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                //    string RutaPdf = @"C:\ArchivoFile\cateo.pdf" + NombreReporte;
                //    string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                //    var PdfBase64 = string.Empty;
                //    if(System.IO.File.Exists(RutaPlantilla))
                //    {
                //        System.IO.File.Copy(RutaPlantilla, RutaTemp);

                //    }

                //return Ok(new { protocols });
                string RutaPlantilla = _Configuration["Rutas:Plantilla:Path"] + _Configuration["Rutas:Plantilla:File"];
                return Ok(RutaPlantilla);
            }

            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [Authorize]
        [HttpPost("SQL")]
        public IActionResult SqlProduction(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var protocols = _productionService.GetAll();


                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaPdf = @"C:\ArchivoFile\cateo.sql" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                var PdfBase64 = string.Empty;
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);

                }

                return Ok(new { protocols });

            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [Authorize]
        [HttpPost("XLSX")]
        public IActionResult XlsxProduction(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var production = _productionService.GetAll();
                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaPdf = @"C:\ArchivoFile\cateo.xlsx" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                var PdfBase64 = string.Empty;

                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);

                }

                return Ok(new { production});

            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("Archivo")]
        public IActionResult GetArchivo()
        {
            try
            {
                string RutaArchivo = _Configuration["Rutas:Archivo:Path"] + _Configuration["Rutas :ArchivoFile"];
                return Ok(RutaArchivo);


            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());

            }

        }
        [HttpGet("temp")]
        public IActionResult GetTemp()
        {

            try
            {
                string RutaTemp = _Configuration["Rutas:Archivo:Path"];
                return Ok(RutaTemp);


            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());

            }

        }
    }
}
