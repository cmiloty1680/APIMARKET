using Apimarket.Functions;
using Apimarket.Model;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;

namespace Apimarket.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("Api/[controller]")]
   
    public class HiveController : ControllerBase
    {
        public IConfiguration _configuration { get; set; }
        public GeneralFunctions _functionsGeneral;
        private readonly HiveService _hiveService;
        public HiveController(IConfiguration configuration, HiveService hiveService)
        {
            _functionsGeneral = new GeneralFunctions(configuration);
            _configuration = configuration;
            _hiveService = hiveService;

        }
        //[Authorize]
        [HttpPost("Createhive")]

        public IActionResult AddC([FromBody] Hive entity)
        {
            try
            {
                _hiveService.Add(entity);
                return Ok(new { registrado = "Colmena creada con éxito." });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
           
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

                _functionsGeneral.Addlog(ex.ToString());
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
                _functionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpPut("UpdateHive/{id}")]
        public IActionResult UpdateFeeding(Hive hive)
        {
            try
            {
                _hiveService.Update(hive);
                return Ok(new

                {
                    message = "Colmena actualizado con exito"
                });
            }

            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
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

                _functionsGeneral.Addlog(ex.Message);
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
                _functionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

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
        [HttpPost("SQL")]
        public IActionResult SqlProduction(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var hive = _hiveService.GetAll();


                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaPdf = @"C:\ArchivoFile\cateo.sql" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                var PdfBase64 = string.Empty;
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);

                }

                return Ok(new { hive });

            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpPost("XLSX")]
        public IActionResult XlsxHive(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var hive = _hiveService.GetAll();
                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaPdf = @"C:\ArchivoFile\cateo.xlsx" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                var PdfBase64 = string.Empty;

                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);

                }

                return Ok(new { hive });

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
