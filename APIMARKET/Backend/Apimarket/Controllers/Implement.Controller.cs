using Apimarket.Functions;
using Apimarket.Model;
using Apimarket.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ImplementController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly ImplementService _implementServices;
        private readonly IConfiguration _configuration;

        public ImplementController(IConfiguration configuration, ImplementService implementServices)
        {
            _configuration = configuration;
            _implementServices = implementServices;
            _functionsGeneral = new GeneralFunctions(configuration);
        }

        [HttpPost("CreateImplement")]
        public IActionResult AddP([FromBody] Implement entity)
        {
            try
            {
                if (entity == null)
                {
                    return BadRequest("la entidad de implemento no puede ser nula");

                }

                _implementServices.Add(entity);
                return Ok("Implemento creada con exito");
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }



        [Authorize]
        [HttpGet("GetImplement/{id}")]
        public IActionResult GetImplement(int id)
        {
            try
            {
          
                var implement = _implementServices.GetImplement(id);

             
                if (implement == null)
                {
                    return NotFound("Implemento no encontrado");
                }

               
                return Ok(implement);
            }
            catch (Exception ex)
            {
                // Registra el error en los logs
                _functionsGeneral.Addlog(ex.ToString());

                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetsImplement")]
        public IActionResult GetsAllImplement()
        {
            try
            {
                var Implements = _implementServices.GetAll();
                return Ok(Implements);

            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPut("UpdateImplement{id}")]
        public IActionResult UpdateImplement(Implement implement)
        {
            try
            {

                _implementServices.Update(implement);
                return Ok(new

                {
                    message = "Implemento actualizado con exito"
                });
            }

            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("DeleteImplement")]
        public IActionResult DeleteImplement(int id)
        {
            try
            {
                var result = _implementServices.GetImplement(id);
                if (result == null)
                {
                    return NotFound("La Implemento con ID"  + id +  "no se encontro.");

                }
                _implementServices.DeleteImplement(id);

                return Ok("Implemento eliminado con exito");
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
        [Authorize]
        [HttpPost("PDF")]
        public IActionResult PdfImplement(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                //var implements = _implementServices.GetAll();
                //string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                //string RutaPdf = @"C:\ArchivoFile\cateo.pdf" + NombreReporte;
                //string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                //var PdfBase64 = string.Empty;
                //if (System.IO.File.Exists(RutaPlantilla))
                //{
                //    System.IO.File.Copy(RutaPlantilla, RutaTemp);

                //}

                //return Ok(new { implements });

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
        public IActionResult SqlImplement(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var implements= _implementServices.GetAll();


                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaPdf = @"C:\ArchivoFile\cateo.sql" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                var PdfBase64 = string.Empty;
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);

                }

                return Ok(new { implements });

            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [Authorize]
        [HttpPost("XLSX")]
        public IActionResult XlsxProtocol(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var implements = _implementServices.GetAll();
                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
                string RutaPdf = @"C:\ArchivoFile\cateo.xlsx" + NombreReporte;
                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
                var PdfBase64 = string.Empty;

                if (System.IO.File.Exists(RutaPlantilla))
                {
                    System.IO.File.Copy(RutaPlantilla, RutaTemp);

                }

                return Ok(new { implements });

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














