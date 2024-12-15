﻿using Apimarket.Functions;
using Apimarket.Model;
using Apimarket.Models; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Apimarket.Services;

namespace Apimarket.Controllers 
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ProtocolController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly ProtocolServices _protocolServices;
        private readonly IConfiguration _configuration;

        public ProtocolController(IConfiguration configuration, ProtocolServices protocolServices)
        {
            _configuration = configuration; 
            _protocolServices = protocolServices; 
            _functionsGeneral = new GeneralFunctions(configuration); 
        }

        [HttpPost("CreateProtocol")]
        public IActionResult AddP([FromBody] Protocol entity)
        {
            if (entity == null)
            {
                return BadRequest("la entidad de Protocolo no puede ser nula");

            }
            _protocolServices.Add(entity);
            return Ok(new { registro = "Protocolo creada con exito" });
        }
        //[Authorize]
        [HttpGet("GetsProtocol")]
        public ActionResult<IEnumerable<Protocol>> GetsProtocol(int start, int end)
        {
            try
            {
                if (start <= 0)
                {
                    start = 0;
                }
                var protocols = _protocolServices.GetAll()
                                                   .Skip(start)
                                                   .Take(end)
                                                   .ToList();

                if (!protocols.Any())
                {
                    return NotFound("no se encontró ningún protocolo en el rango");
                }

                return Ok(protocols);

            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        
        [HttpGet("GetProtocol/{id}")]
        public IActionResult GetProtocol(int id)
        {
            try
            {
                // Obtiene el objeto 'Feeding' por el ID proporcionado
                var feeding = _protocolServices.GetProtocol(id);

                // Verifica si se encontró el objeto 'Feeding'
                if (feeding == null)
                {
                    return NotFound("alimentacion no encontrado");
                }

                // Devuelve el objeto 'Feeding' con un código HTTP 200 (OK)
                return Ok(feeding);
            }
            catch (Exception ex)
            {
                // Registra el error en los logs
                _functionsGeneral.Addlog(ex.ToString());

                // Devuelve un código HTTP 500 (Error Interno del Servidor) con el mensaje de error
                return StatusCode(500, ex.Message);
            }
        }

        //[Authorize]
        [HttpPut("UpdateProtocol")]
        public IActionResult UpdateProtocol(Protocol protocol)
        {


            if (protocol == null)
            {
                return BadRequest("Implement no encontrado");
            }

            try
            {
                _protocolServices.Update(protocol);
                return Ok("protocol actualizado exitosamente");
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
        //[Authorize]
        [HttpDelete("DeleteProtocol/{id}")]
        public async Task<IActionResult> DeleteProtocol(int id) 
        {
            try
            {
                var result = await _protocolServices.DeleteProtocol(id); 
                if (result)
                {
                    return Ok("Protocol eliminado");
                }
                return NotFound("Protocol no encontrado");
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }

        }
        //[Authorize]
        [HttpPost("PDF")]
        public IActionResult PdfProtocol(string NombrePlantilla, string NombreReporte)
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
        //[Authorize]
        [HttpPost("SQL")]
        public IActionResult SqlResponsible(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var protocols = _protocolServices.GetAll();


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
        //[Authorize]
        [HttpPost("XLSX")]
        public IActionResult XlsxProtocol(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var protocols = _protocolServices.GetAll();
                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaPdf = @"C:\ArchivoFile\cateo.xlsx" + NombreReporte;
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