﻿using Apimarket.Functions;
using Apimarket.Model;
using Apimarket.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Linq;
using Apimarket.DTOs;
using Microsoft.AspNetCore.Authorization;


namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ExtractionController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly ExtractionService _extractionServices;
        private readonly IConfiguration _configuration;

        public ExtractionController(IConfiguration configuration, ExtractionService extractionServices)
        {
            _configuration = configuration;
            _extractionServices = extractionServices;
            _functionsGeneral = new GeneralFunctions(configuration);
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpPost("CreateExtraction")]
        public IActionResult AddP([FromBody] Extraction entity)
        {
            try
            {
            _extractionServices.Add(entity);
            return Ok("Extracción creada con éxito");

            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }

        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpGet("GetsExtraction")]
        public ActionResult<IEnumerable<Extraction>> GetsExtraction(int start, int end)
        {
            try
            {
                if (start <= 0) start = 0;
                if (end <= start) return BadRequest("End debe ser mayor que start");

                var extractions = _extractionServices.GetAll()
                                                      .Skip(start)
                                                      .Take(end - start)
                                                      .ToList();

                if (!extractions.Any())
                {
                    return NotFound("No se encontró la extracción en el rango");
                }

                return Ok(extractions);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpGet("GetExtractionByCollecDrone")]
        public ActionResult<IEnumerable<ExtractionDTO>> GetExtractionByCollecDrone(int id)
        {
            try
            {
                var extractions = _extractionServices.GetAll()
                    .Where(e => e.collecDrone.Id_CollecDrone == id)
                    .Select(p => new ExtractionDTO
                    {
                        Id_Extraction = p.Id_Extraction,
                        Fec_Extraction = p.Fec_Extraction,
                        Can_Extraction = p.Can_Extraction,
                        Nam_Responsible = p.responsible.Nam_Responsible,
                        //LasNam_Responsible = p.responsible.LasNam_Responsible,
                        Id_CollecDrone = p.collecDrone.Id_CollecDrone,
                        Id_Responsible = p.responsible.Id_Responsible,

                    })
                    .ToList();

                return Ok(extractions);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpGet("GetExtraction/{id}")]
        public IActionResult GetExtraction(int id)
        {
            try
            {
                var extraction = _extractionServices.GetExtraction(id);
                if (extraction == null)
                {
                    return NotFound("Extracción no encontrada");
                }
                return Ok(extraction);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpGet("GetAllExtration")]
        public ActionResult<IEnumerable<CollecDrone>> GetAll()
        {
            try
            {
                var extration = _extractionServices.GetAll().Select(p => new ExtractionDTO
                {
                    Id_Extraction = p.Id_Extraction,
                    Fec_Extraction = p.Fec_Extraction,
                    Can_Extraction = p.Can_Extraction,
                    Nam_Responsible = p.responsible.Nam_Responsible,
                    //LasNam_Responsible = p.responsible.LasNam_Responsible,
                    Id_CollecDrone = p.collecDrone.Id_CollecDrone,
                    Id_Responsible =p.responsible.Id_Responsible
                }).ToList();

                return Ok(extration);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpPut("UpdateExtraction/{id}")]
        public IActionResult UpdateExtraction(Extraction extraction)
        {
            try
            {
                _extractionServices.Update(extraction);
                return Ok(new { message = "Extracción actualizada con éxito" });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpDelete("DeleteExtraction")]
        public IActionResult DeleteExtraction(int id)
        {
            try
            {
                var result = _extractionServices.GetExtraction(id);
                if (result == null)
                {
                    return NotFound("La extracción con ID " + id + " no se encontró.");
                }

                _extractionServices.DeleteExtraction(id);
                return Ok("Extracción eliminada con éxito");
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

        [Authorize(Roles = "instructor, gestor, pasante")]
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

        [Authorize(Roles = "instructor, gestor, pasante")]
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
        [Authorize(Roles = "instructor, gestor, pasante")]
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
        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpPost("XLSX")]
        public IActionResult XlsxResponsible(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var Responsible = _extractionServices .GetAll();
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
        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpPost("SQL")]
        public IActionResult SqlResponsible(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var Responsible = _extractionServices.GetAll();
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
