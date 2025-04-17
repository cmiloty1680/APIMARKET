using Apimarket.DTOs;
using Apimarket.Functions;
using Apimarket.Model;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]

    public class FeedingController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;

        private readonly FeedingService _feedingServices;
        private readonly IConfiguration _configuration;


        public FeedingController(IConfiguration configuration, FeedingService feedingServices)
        {
            _configuration = configuration;
            _feedingServices = feedingServices;
            _functionsGeneral = new GeneralFunctions(configuration);
        }


        [HttpPost("CreateFeeding")]
        public IActionResult AddP([FromBody] Feeding entity)
        {
            try
            {

            _feedingServices.Add(entity);
            return Ok(new { registrado = "Alimentacion creada con éxito." });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }

        }




        [HttpGet("GetAllFeeding")]


        public ActionResult<IEnumerable<FeedingDTO>> GetAllFeeding()
        {
            try
            {

            var feeding = _feedingServices.GetAll().Select(p => new FeedingDTO
            {
                Id_Feeding = p.Id_Feeding,
                Tip_Feeding = p.Tip_Feeding,
                Fec_Feeding = p.Fec_Feeding,
                Can_Feeding = p.Can_Feeding,
                Vlr_Feeding = p.Vlr_Feeding,
                Des_Hive = p.hive != null ? p.hive.Des_Hive : "Sin colmena"  ,   
                Nam_Responsible = p.responsible.Nam_Responsible,
                NumDoc_Responsible = p.responsible.NumDoc_Responsible,
                Tip_Responsible = p.responsible.Tip_Responsible,
                Id_Hive = p.hive.Id_Hive,
                Id_Responsible = p.responsible.Id_Responsible

            }).ToList();

            return Ok(feeding);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet("GetFeeding/{id}")]
        public IActionResult GetFeeding(int id)
        {
            try
            {

                var feeding = _feedingServices.GetFeeding(id);

                // Verifica si se encontró el objeto 'Feeding'
                if (feeding == null)
                {
                    return NotFound("alimentacion no encontrado");
                }


                return Ok(feeding);
            }
            catch (Exception ex)
            {
                // Registra el error en los logs
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
        //[Authorize]
        [HttpPut("UpdateFeeding/{id}")]
        public IActionResult UpdateFeeding(Feeding feeding)
        {
            try
            {
                _feedingServices.Update(feeding);
                return Ok(new

                {
                    message = "alimentacion actualizado con exito"
                });
            }

            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("DeleteFeeding")]
        public IActionResult DeleteFeeding(int id)
        {
            try
            {
                var result = _feedingServices.GetFeeding(id);
                if (result == null)
                {
                    return NotFound("La alimentacion con ID " + id + " no se encontró.");
                }

                _feedingServices.Delete(id);
                return Ok("Producción eliminada con éxito.");
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }



        [Authorize]
        [HttpPost("PDF")]
        public IActionResult PdfFeeding(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                //var Feeding = _feedingServices.GetAll();
                //string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                //string RutaPdf = @"C:\ArchivoFile\cateo.pdf" + NombreReporte;
                //string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                //var PdfBase64 = string.Empty;
                //if (System.IO.File.Exists(RutaPlantilla))
                //{
                //    System.IO.File.Copy(RutaPlantilla, RutaTemp);

                //}

                //return Ok(new { Feeding });

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
        public IActionResult SqlFeeding(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var Feeding = _feedingServices.GetAll();


                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaPdf = @"C:\ArchivoFile\cateo.sql" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                var PdfBase64 = string.Empty;
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);

                }

                return Ok(new { Feeding });

            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpPost("XLSX")]
        public IActionResult XlsxProtocol(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var Feeding = _feedingServices.GetAll();
                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaPdf = @"C:\ArchivoFile\cateo.xlsx" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                var PdfBase64 = string.Empty;

                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);

                }

                return Ok(new { Feeding });

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



