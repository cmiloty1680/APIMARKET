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
        public IConfiguration _configuration { get; set; }
        public GeneralFunctions _functionsGeneral;
        private readonly ProductionService _productionService;
        private readonly HiveService _hiveService;

        public ProductionController(IConfiguration configuration, ProductionService productionService, HiveService hiveService)
        {
            _functionsGeneral = new GeneralFunctions(configuration);
            _configuration = configuration;
            _productionService = productionService;
            _hiveService = hiveService;
        }

        [HttpPost("CreateProduction")]
        public IActionResult AddP([FromBody] Production entity)
        {
            try
            {
                //// Calcular y asignar TotColm_Hive aquí
                //entity.TotColm_Hive = _hiveService.CountActiveHives();

                //// Verificar el valor antes de enviar al servicio
                //Console.WriteLine($"TotColm_Hive recibido en el controlador: {entity.TotColm_Hive}");

                // Llamar al servicio para agregar la producción
                _productionService.Add(entity);

                return Ok(new { registrado = "Producción creada con éxito.", totalColmenasActivas = entity.TotColm_Hive });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
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
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("GetsAllProduction")]
        public ActionResult <IEnumerable<ProductionDTO>> GetsAllProduction()
        {
            try
            {
                var productions = _productionService.GetAll().Select(p => new ProductionDTO
                {
                    Id_Production = p.Id_Production,
                    FecIni_Production = p.FecIni_Production,
                    FecFin_Production = p.FecFin_Production,
                    TotColm_Hive = p.TotColm_Hive,
                    SubCen_Production = p.SubCen_Production,
                    CenCos_Production = p.CenCos_Production,
                    Nom_Production = p.Nom_Production,
                    //Tot_Production = p.Tot_Production,
                    CanCua_Production = p.CanCua_Production,
                    Id_Race = p.race.Id_Race,
                    Nom_Race = p.race.Nom_Race
                }).ToList();

                return Ok(productions);
            } 
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
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
                });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
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
                _functionsGeneral.Addlog(ex.ToString());
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
                _functionsGeneral.Addlog(ex.Message);
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
                string RutaPlantilla = _configuration["Rutas:Plantilla:Path"] + _configuration["Rutas:Plantilla:File"];
                return Ok(RutaPlantilla);
            }

            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
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
                _functionsGeneral.Addlog(ex.ToString());
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
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("Archivo")]
        public IActionResult GetArchivo()
        {
            try
            {
                string RutaArchivo = _configuration["Rutas:Archivo:Path"] + _configuration["Rutas :ArchivoFile"];
                return Ok(RutaArchivo);


            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());

            }

        }
        [HttpGet("temp")]
        public IActionResult GetTemp()
        {

            try
            {
                string RutaTemp = _configuration["Rutas:Archivo:Path"];
                return Ok(RutaTemp);


            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());

            }

        }
    }
}
