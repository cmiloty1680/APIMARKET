using Apimarket.Functions;
using Apimarket.Services;
using Apimarket.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class RaceController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly RaceServices _raceServices;
        private readonly IConfiguration _configuration;


        public RaceController(IConfiguration configuration, RaceServices raceServices)
        {
            _configuration = configuration;
            _raceServices = raceServices;
            _functionsGeneral = new GeneralFunctions(configuration);
        }

        [HttpPost("CreateRace")]
        public IActionResult AddP([FromBody] Race entity)
        {
            if (entity == null)
            {
                return BadRequest("la entidad de Raza no puede ser nula");

            }
            _raceServices.Add(entity);
            return Ok("Raza creado con éxito");
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

                var races = _raceServices.GetAll()
                                                        .Skip(start)
                                                        .Take(end - start)
                                                        .ToList();

                if (!races.Any())
                {
                    return NotFound("No se encontró el Raza en el rango");
                }

                return Ok(races);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetsAllRace")]
        public IActionResult GetsAllRace()
        {
            try
            {
                var races = _raceServices.GetAll();

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
                var race = _raceServices.GetRace(id);
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
                _raceServices.Update(race);
                return Ok(new { message = "Raza actualizado con éxito" });
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
                var result = _raceServices.GetRace(id);
                if (result == null)
                {
                    return NotFound("El Raza con ID " + id + " no se encontró.");
                }

                _raceServices.DeleteRace(id);
                return Ok("Raza eliminado con éxito");
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
                //    var Responsibles = _responsibleService.GetAll();
                //    string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf"+ NombrePlantilla;
                //    string RutaPdf = @"C:\ArchivoFile\cateo.pdf" + NombreReporte;
                //    string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte; 
                //    var PdfBase64 = string.Empty;
                //    if (System.IO.File.Exists(RutaPlantilla))
                //    {
                //        //PdfBase64 = "hola adso".ToString();
                //        System.IO.File.Copy(RutaPlantilla, RutaTemp);
                //    }
                //    return Ok(new { Responsibles });
                //}
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
        public IActionResult XlsxRace(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var Race = _raceServices.GetAll();
                string RutaPlantilla = @"C:\ArchivoFile\cateo.rft" + NombrePlantilla;
                string RutaXlsx = @"C:\ArchivoFile\cateo.xlsx" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                var XlsxBase64 = string.Empty;
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);
                }
                return Ok(new { Race });
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
                var Race = _raceServices.GetAll();
                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaReporte = @"C:\ArchivoFile\cateo.sql" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"" + NombreReporte;
                var SqlBase64 = string.Empty;
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);
                }
                return Ok(new { Race });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

    }
}
