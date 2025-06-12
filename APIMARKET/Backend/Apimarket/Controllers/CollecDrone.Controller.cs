using Apimarket.Functions;
using Apimarket.Model;
using Apimarket.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Linq;
using Apimarket.Models;
using Apimarket.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class CollecDroneController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly CollecDroneService _collecDroneServices;
        private readonly IConfiguration _configuration;

        public CollecDroneController(IConfiguration configuration, CollecDroneService collecDroneServices)
        {
            _configuration = configuration;
            _collecDroneServices = collecDroneServices;
            _functionsGeneral = new GeneralFunctions(configuration);
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpPost("CreateCollecDrone")]
        public IActionResult AddP([FromBody] CollecDrone entity)
        {
            try
            {
                _collecDroneServices.Add(entity);
                return Ok(new { registrado = "CollecDrone creado con éxito" });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
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

        [Authorize(Roles = "instructor, gestor, pasante")]
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

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpGet("GetAllCollecDrone")]
        public ActionResult <IEnumerable<CollecDrone>> GetAll()
        {
            try
            {
                var collecDrone = _collecDroneServices.GetAll().Select(p => new CollecDroneDTO
                {
                    Id_CollecDrone = p.Id_CollecDrone,
                    Fec_CollecDrone = p.Fec_CollecDrone,
                    Can_CollecDrone = p.Can_CollecDrone,
                    Nam_Responsible = p.responsible.Nam_Responsible,
                    Id_Hive = p.hive.Id_Hive,
                    Id_Responsible = p.responsible.Id_Responsible,
                    //LasNam_Responsible = p.responsible.LasNam_Responsible,
                }).ToList();

                return Ok(collecDrone);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
        [HttpPut("UpdateCollecDrone/{id}")]
        public IActionResult UpdateCollecDrone(CollecDrone collecDrone)
        {
            try
            {
                _collecDroneServices.Update(collecDrone);
                return Ok(new { message = "Recolección de zanganos actualizado con éxito" });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "instructor, gestor, pasante")]
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
                return Ok(new { message = "Recolección de zanganos eliminado con éxito" });
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

        [Authorize(Roles = "instructor, gestor, pasante")]
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

