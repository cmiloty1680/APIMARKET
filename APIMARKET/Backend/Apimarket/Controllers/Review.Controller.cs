using Apimarket.Functions;
using Apimarket.Services;
using Apimarket.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using Apimarket.DTOs;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly ReviewService _reviewServices;
        private readonly IConfiguration _configuration;

        public ReviewController(IConfiguration configuration, ReviewService reviewServices)
        {
            _configuration = configuration;
            _reviewServices = reviewServices;
            _functionsGeneral = new GeneralFunctions(configuration);
        }

        [HttpPost("CreateReview")]
        public IActionResult AddP([FromBody] Review entity)
        {
            if (entity == null)
            {
                return BadRequest("la entidad de Raza no puede ser nula");

            }

            _reviewServices.Add(entity);
            return Ok("revision creado con éxito");
        }

        [HttpGet("GetsReview")]
        public ActionResult<IEnumerable<Review>> GetsReview(int start, int end)
        {
            try
            {
                if (start <= 1)
                {
                    start = 0;
                }

                var reviews = _reviewServices.GetAll()
                                                        .Skip(start)
                                                        .Take(end - start)
                                                        .ToList();

                if (!reviews.Any())
                {
                    return NotFound("No se encontró el revision en el rango");
                }

                return Ok(reviews);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetsAllReview")]

        public ActionResult <IEnumerable<ReviewDTO>> GetAllReview()
        {
            try
            {
            var reviews = _reviewServices.GetAll().Select(p => new ReviewDTO
            {
                Id_Review = p.Id_Review,
                Fec_Review = p.Fec_Review,
                Des_Review = p.Des_Review,
                Tip_Protocol = p.protocol.Tip_Protocol,
                Nom_Protocol = p.protocol.Nom_Protocol,
                Nam_Responsible = p.responsible.Nam_Responsible,
                LasNam_Responsible= p.responsible.LasNam_Responsible,
                Tip_Responsible = p.responsible.Tip_Responsible,
      

            }).ToList();

            return Ok(reviews);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }

        }

        //public IActionResult GetsAllReview()
        //{
        //    try
        //    {
        //        var review = _reviewServices.GetAll();
        //        if(review == null)
        //        {
        //            return NotFound("No se encontraron los registros");
        //        }
        //        return Ok(review);
        //    }
        //    catch (Exception ex)
        //    {
        //        _functionsGeneral.Addlog(ex.ToString());
        //        return StatusCode(500, ex.Message);
        //    }
        //}
        [HttpGet("GetReview/{id}")]
        public IActionResult GetReview(int id)
        {
            try
            {
                var review = _reviewServices.GetReview(id);
                if (review == null)
                {
                    return NotFound("revision no encontrado");
                }

                return Ok(review);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("UpdateReview")]
        public IActionResult UpdateReview(Review review)
        {
            try
            {
                _reviewServices.Update(review);
                return Ok(new { message = "revision actualizado con éxito" });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("DeleteReview")]
        public IActionResult DeleteReview(int id)
        {
            try
            {
                var result = _reviewServices.GetReview(id);
                if (result == null)
                {
                    return NotFound("El Review con ID " + id + " no se encontró.");
                }

                _reviewServices.DeleteReview(id);
                return Ok("Review eliminado con éxito");
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
        public IActionResult XlsxReview(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var Review = _reviewServices.GetAll();
                string RutaPlantilla = @"C:\ArchivoFile\cateo.rft" + NombrePlantilla;
                string RutaXlsx = @"C:\ArchivoFile\cateo.xlsx" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                var XlsxBase64 = string.Empty;
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);
                }
                return Ok(new { Review });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpPost("SQL")]
        public IActionResult SqlReview(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var Review = _reviewServices.GetAll();
                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaReporte = @"C:\ArchivoFile\cateo.sql" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"" + NombreReporte;
                var SqlBase64 = string.Empty;
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);
                }
                return Ok(new { Review });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

    }
}

