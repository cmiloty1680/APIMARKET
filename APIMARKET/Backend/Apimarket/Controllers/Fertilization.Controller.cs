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
    public class FertilizationController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly FertilizationService _fertilizationServices;
        private readonly IConfiguration _configuration;

        public FertilizationController(IConfiguration configuration, FertilizationService fertilizationServices)
        {
            _configuration = configuration;
            _fertilizationServices = fertilizationServices;
            _functionsGeneral = new GeneralFunctions(configuration);
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpPost("CreateFertilization")]
        public IActionResult AddP([FromBody] Fertilization entity)
        {
            try
            {
            _fertilizationServices.Add(entity);
            return Ok("Fertilización creada con éxito");

            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }

        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpGet("GetsFertilization")]
        public ActionResult<IEnumerable<Fertilization>> GetsFertilization(int start, int end)
        {
            try
            {
                if (start <= 0) start = 0;
                if (end <= start) return BadRequest("End debe ser mayor que start");

                var fertilizations = _fertilizationServices.GetAll()
                                                           .Skip(start)
                                                           .Take(end - start)
                                                           .ToList();
                if (!fertilizations.Any())
                {
                    return NotFound("No se encontró la fertilización en el rango");
                }
                return Ok(fertilizations);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpGet("GetFertilization/{id}")]
        public IActionResult GetFertilization(int id)
        {
            try
            {
                var fertilization = _fertilizationServices.GetFertilization(id);
                if (fertilization == null)
                {
                    return NotFound("Fertilización no encontrada");
                }
                return Ok(fertilization);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }


        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpGet("GetFertilizationByExtraction")]

        public ActionResult<IEnumerable<FertilizationDTO>> GetFertilizationByExtraction(int id)
        {
            try
            {
                var fertilizations = _fertilizationServices.GetAll()
                    .Where(e => e.extraction.Id_Extraction == id)
                    .Select(p => new FertilizationDTO
                    {
                        Id_Fertilization = p.Id_Fertilization,
                        Fec_Fertilization = p.Fec_Fertilization,
                        Can_Fertilization = p.Can_Fertilization,
                        Nam_Responsible = p.responsible.Nam_Responsible,
                        Id_Extraction = p.extraction.Id_Extraction,
                        Id_Responsible = p.responsible.Id_Responsible,
                        //LasNam_Responsible = p.responsible.LasNam_Responsible

                    })
                    .ToList();
                return Ok(fertilizations);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }


        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpGet("GetsAllFertilization")]
        public ActionResult<IEnumerable<Fertilization>> GetAll()
        {
            try
            {
                var fertilization = _fertilizationServices.GetAll().Select(p => new FertilizationDTO
                {
                    Id_Fertilization = p.Id_Fertilization,
                    Fec_Fertilization = p.Fec_Fertilization,
                    Can_Fertilization = p.Can_Fertilization,
                    Nam_Responsible = p.responsible.Nam_Responsible,
                    Id_Extraction = p.extraction.Id_Extraction,
                    Id_Responsible = p.responsible.Id_Responsible
                }).ToList();

                return Ok(fertilization);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }



        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpPut("UpdateFertilization/{id}")]
        public IActionResult UpdateFertilization(Fertilization fertilization)
        {
            try
            {
                _fertilizationServices.Update(fertilization);
                return Ok(new { message = "Fertilización actualizada con éxito" });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpDelete("DeleteFertilization")]
        public IActionResult DeleteFertilization(int id)
        {
            try
            {
                var result = _fertilizationServices.GetFertilization(id);
                if (result == null)
                {
                    return NotFound("La fertilización con ID " + id + " no se encontró.");
                }
                _fertilizationServices.DeleteFertilization(id);
                return Ok("Fertilización eliminada con éxito");
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
                var Responsible = _fertilizationServices.GetAll();
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
                var Responsible = _fertilizationServices.GetAll();
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
