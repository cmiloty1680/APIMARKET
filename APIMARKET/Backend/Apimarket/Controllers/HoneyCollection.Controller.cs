//using Apimarket.Functions;
//using Apimarket.Model;
//using Apimarket.Services;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;

//namespace Apimarket.Controllers
//{
//    [ApiController]
//    [Route("Api/[controller]")]

//    public class HoneyCollectionController : ControllerBase
//    {
//        private readonly GeneralFunctions _functionsGeneral;

//        private readonly HoneyCollectionServices _honeyCollectionServices;
//        private readonly IConfiguration _configuration;


//        public HoneyCollectionController(IConfiguration configuration, HoneyCollectionServices honeyCollectionServices)
//        {
//            _configuration = configuration;
//            _honeyCollectionServices = honeyCollectionServices;
//            _functionsGeneral = new GeneralFunctions(configuration);
//        }



//        [HttpPost("CreateHoneyCollection")]
//        public IActionResult AddP([FromBody] HoneyCollection entity)
//        {
//            if (entity == null)
//            {
//                return BadRequest("la entidad de alimentación no puede ser nula");

//            }

//            _HoneyCollectionServices.Add(entity);
//            return Ok("alimentacion creada con exito");
//        }




//        [HttpGet("GetsFeeding")]
//        public ActionResult<IEnumerable<Feeding>> GetsFeeding(int start, int end)
//        {
//            try
//            {
//                if (start <= 0)
//                {
//                    start = 0;
//                }
//                var feedings = _feedingServices.GetAll()
//                                                   .Skip(start)
//                                                   .Take(end)
//                                                   .ToList();
//                if (!feedings.Any())
//                {
//                    return NotFound("no se encontro la alimentacion en el rango");
//                }
//                return Ok(feedings);

//            }
//            catch (Exception ex)
//            {
//                _functionsGeneral.Addlog(ex.ToString());
//                return StatusCode(500, ex.Message);
//            }
//        }


//        [Authorize]
//        [HttpGet("GetFeeding/{id}")]
//        public IActionResult GetFeeding(int id)
//        {
//            try
//            {

//                var feeding = _feedingServices.GetFeeding(id);

//                // Verifica si se encontró el objeto 'Feeding'
//                if (feeding == null)
//                {
//                    return NotFound("alimentacion no encontrado");
//                }


//                return Ok(feeding);
//            }
//            catch (Exception ex)
//            {
//                // Registra el error en los logs
//                _functionsGeneral.Addlog(ex.ToString());

//                return StatusCode(500, ex.Message);
//            }
//        }
//        [Authorize]
//        [HttpPut("UpdateFeeding")]
//        public IActionResult UpdateFeeding(Feeding feeding)
//        {
//            try
//            {
//                _feedingServices.Update(feeding);
//                return Ok(new

//                {
//                    message = "alimentacion actualizado con exito"
//                });
//            }

//            catch (Exception ex)
//            {
//                _functionsGeneral.Addlog(ex.ToString());
//                return StatusCode(500, ex.Message);
//            }
//        }
//        [Authorize]
//        [HttpDelete("DeleteFeeding")]
//        public IActionResult DeleteFeeding(int id)
//        {
//            try
//            {
//                var result = _feedingServices.GetFeeding(id);
//                if (result == null)
//                {
//                    return NotFound("La alimentacion con ID" + id + "no se encontro.");

//                }
//                _feedingServices.DeleteFeeding(id);

//                return Ok("alimentacion eliminado con exito");
//            }
//            catch (KeyNotFoundException knfex)

//            {

//                return NotFound(knfex.Message);

//            }
//            catch (Exception ex)
//            {
//                _functionsGeneral.Addlog(ex.ToString());
//                return StatusCode(500, ex.Message);
//            }
//        }
//        [Authorize]
//        [HttpPost("PDF")]
//        public IActionResult PdfFeeding(string NombrePlantilla, string NombreReporte)
//        {
//            try
//            {
//                //var Feeding = _feedingServices.GetAll();
//                //string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
//                //string RutaPdf = @"C:\ArchivoFile\cateo.pdf" + NombreReporte;
//                //string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
//                //var PdfBase64 = string.Empty;
//                //if (System.IO.File.Exists(RutaPlantilla))
//                //{
//                //    System.IO.File.Copy(RutaPlantilla, RutaTemp);

//                //}

//                //return Ok(new { Feeding });

//                string RutaPlantilla = _configuration["Rutas:Plantilla:Path"] + _configuration["Rutas:Plantilla:File"];
//                return Ok(RutaPlantilla);
//            }
//            catch (Exception ex)
//            {
//                _functionsGeneral.Addlog(ex.ToString());
//                return StatusCode(500, ex.ToString());
//            }
//        }
//        [Authorize]
//        [HttpPost("SQL")]
//        public IActionResult SqlFeeding(string NombrePlantilla, string NombreReporte)
//        {
//            try
//            {
//                var Feeding = _feedingServices.GetAll();


//                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
//                string RutaPdf = @"C:\ArchivoFile\cateo.sql" + NombreReporte;
//                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
//                var PdfBase64 = string.Empty;
//                if (System.IO.File.Exists(RutaPlantilla))
//                {
//                    System.IO.File.Copy(RutaPlantilla, RutaTemp);

//                }

//                return Ok(new { Feeding });

//            }
//            catch (Exception ex)
//            {
//                _functionsGeneral.Addlog(ex.ToString());
//                return StatusCode(500, ex.ToString());
//            }
//        }

//        [HttpPost("XLSX")]
//        public IActionResult XlsxProtocol(string NombrePlantilla, string NombreReporte)
//        {
//            try
//            {
//                var Feeding = _feedingServices.GetAll();
//                string RutaPlantilla = @"C:\ArchivoFile\cateo.rtf" + NombrePlantilla;
//                string RutaPdf = @"C:\ArchivoFile\cateo.xlsx" + NombreReporte;
//                string RutaTemp = AppDomain.CurrentDomain.BaseDirectory + @"Documentos\\Temp\\" + NombreReporte;
//                var PdfBase64 = string.Empty;

//                if (System.IO.File.Exists(RutaPlantilla))
//                {
//                    System.IO.File.Copy(RutaPlantilla, RutaTemp);

//                }

//                return Ok(new { Feeding });

//            }
//            catch (Exception ex)
//            {
//                _functionsGeneral.Addlog(ex.ToString());
//                return StatusCode(500, ex.ToString());
//            }
//        }

//        [HttpGet("Archivo")]
//        public IActionResult GetArchivo()
//        {
//            try
//            {
//                string RutaArchivo = _configuration["Rutas:Archivo:Path"] + _configuration["Rutas :ArchivoFile"];
//                return Ok(RutaArchivo);


//            }
//            catch (Exception ex)
//            {
//                _functionsGeneral.Addlog(ex.ToString());
//                return StatusCode(500, ex.ToString());

//            }

//        }
//        [HttpGet("temp")]
//        public IActionResult GetTemp()
//        {

//            try
//            {
//                string RutaTemp = _configuration["Rutas:Archivo:Path"];
//                return Ok(RutaTemp);


//            }
//            catch (Exception ex)
//            {
//                _functionsGeneral.Addlog(ex.ToString());
//                return StatusCode(500, ex.ToString());

//            }

//        }
//    }
//}





