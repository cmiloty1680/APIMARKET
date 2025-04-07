using Apimarket.Functions;
using Apimarket.Model;
using Apimarket.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Linq;
using Apimarket.Models;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class CollecDroneController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly CollecDroneServices _collecDroneServices;
        private readonly IConfiguration _configuration;

        public CollecDroneController(IConfiguration configuration, CollecDroneServices collecDroneServices)
        {
            _configuration = configuration;
            _collecDroneServices = collecDroneServices;
            _functionsGeneral = new GeneralFunctions(configuration);
        }

        [HttpPost("CreateCollecDrone")]
        public IActionResult AddP([FromBody] CollecDrone entity)
        {

            _collecDroneServices.Add(entity);
            return Ok(new { registrado = "CollecDrone creado con éxito" });
        }

        [HttpGet("GetsCollecDrone")]
        public ActionResult<IEnumerable<CollecDrone>> GetsCollecDrone(int start, int end)
        {
            try
            {
                if (start <= 1)
                {
                    start = 0;
                }
              
                var collecDrones = _collecDroneServices.GetAll()
                                                        .Skip(start)
                                                        .Take(end - start)
                                                        .ToList();

                if (!collecDrones.Any())
                {
                    return NotFound("No se encontró el CollecDrone en el rango");
                }

                return Ok(collecDrones);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetCollecDrone/{id}")]
        public IActionResult GetCollecDrone(int id)
        {
            try
            {
                var collecDrone = _collecDroneServices.GetCollecDrone(id);
                if (collecDrone == null)
                {
                    return NotFound("CollecDrone no encontrado");
                }

                return Ok(collecDrone);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("UpdateCollecDrone")]
        public IActionResult UpdateCollecDrone(CollecDrone collecDrone)
        {
            try
            {
                _collecDroneServices.Update(collecDrone);
                return Ok(new { message = "CollecDrone actualizado con éxito" });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("DeleteCollecDrone")]
        public IActionResult DeleteCollecDrone(int id)
        {
            try
            {
                var result = _collecDroneServices.GetCollecDrone(id);
                if (result == null)
                {
                    return NotFound("El CollecDrone con ID " + id + " no se encontró.");
                }

                _collecDroneServices.DeleteCollecDrone(id);
                return Ok("CollecDrone eliminado con éxito");
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
        [HttpGet("PDF")]
        public IActionResult PdfResponsible()
        {
            try
            {
  
                string RutaPlantilla = _configuration["Rutas:Plantilla:Path"] + _configuration["Rutas:Plantilla:File"];
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    return NotFound("La ruta del archivo no existe");
                }
                return Ok(RutaPlantilla);
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
                string RutaArchivo = _configuration["Rutas:Archivo:Path"] + _configuration["Rutas:Archivo:File"];
                if (System.IO.File.Exists(RutaArchivo))
                {
                    return NotFound("La ruta del archivo no existe");
                }
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
                string RutaTemp = _configuration["Rutas:Temp:Path"];
                if (System.IO.File.Exists(RutaTemp))
                {
                    return NotFound("La ruta del archivo no existe");
                }
                return Ok(RutaTemp);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpPost("XLSX")]
        public IActionResult XlsxResponsible(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var Responsible = _collecDroneServices .GetAll();
                string RutaPlantilla = @"C:\ArchivoFile\cateo.rft" + NombrePlantilla;
                string RutaXlsx = @"C:\ArchivoFile\cateo.xlsx" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                var XlsxBase64 = string.Empty;
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);
                }
                return Ok(new { Responsible });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpPost("SQL")]
        public IActionResult SqlResponsible(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var Responsible = _collecDroneServices.GetAll();
                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaReporte = @"C:\ArchivoFile\cateo.sql" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"" + NombreReporte;
                var SqlBase64 = string.Empty;
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);
                }
                return Ok(new { Responsible });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
    }
}

