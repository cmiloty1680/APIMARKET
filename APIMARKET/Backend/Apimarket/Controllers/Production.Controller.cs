using Apimarket.DTOs;
using Apimarket.Functions;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ProductionController : ControllerBase
    {
        public IConfiguration _configuration { get; set; }
        public GeneralFunctions _functionsGeneral;
        private readonly ProductionService _productionService;
        private readonly HiveService _hiveService;

        public ProductionController(IConfiguration configuration, ProductionService productionService, HiveService hiveService)
        {
            _functionsGeneral = new GeneralFunctions(configuration);
            _configuration = configuration;
            _productionService = productionService;
            _hiveService = hiveService;
        }

        [Authorize]
        [HttpPost("CreateProduction")]
        public IActionResult AddP([FromBody] Production entity)
        {
            try
            {
                //// Calcular y asignar TotColm_Hive aquí
                //entity.TotColm_Hive = _hiveService.CountActiveHives();

                //// Verificar el valor antes de enviar al servicio
                //Console.WriteLine($"TotColm_Hive recibido en el controlador: {entity.TotColm_Hive}");

                // Llamar al servicio para agregar la producción
                _productionService.Add(entity);

                return Ok(new { registrado = "Producción creada con éxito.", totalColmenasActivas = entity.TotColm_Hive });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }



        [Authorize]
        [HttpGet("GetProduction")]
        public IActionResult GetProduccion(int id)
        {
            try
            {
                var production = _productionService.GetProduction(id);
                if (production == null)
                {
                    return NotFound("Producción no encontrada.");
                }
                return Ok(production);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }


        [Authorize]
        [HttpGet("GetsAllProduction")]
        public ActionResult <IEnumerable<ProductionDTO>> GetsAllProduction()
        {
            try
            {
                var productions = _productionService.GetAll().Select(p => new ProductionDTO
                {
                    Id_Production = p.Id_Production,
                    FecIni_Production = p.FecIni_Production,
                    FecFin_Production = p.FecFin_Production,
                    TotColm_Hive = p.TotColm_Hive,
                    SubCen_Production = p.SubCen_Production,
                    CenCos_Production = p.CenCos_Production,
                    Nom_Production = p.Nom_Production,
                    //Tot_Production = p.Tot_Production,
                    CanCua_Production = p.CanCua_Production,
                    Id_Race = p.race.Id_Race,
                    Nom_Race = p.race.Nom_Race
                }).ToList();

                return Ok(productions);
            } 
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }


        [Authorize]
        [HttpPut("UpdateProduction/{id}")]
        public IActionResult UpdateProduction(Production production)
        {
            try
            {

                _productionService.Update(production);

                return Ok(new
                {
                    message = "Production actualizada con exito",
                });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }




        [Authorize]
        [HttpDelete("DeleteProduction")]
        public IActionResult DeleteProduction(int id)
        {
            try
            {
                var result = _productionService.GetProduction(id);
                if (result == null)
                {
                    return NotFound("La producción con ID " + id + " no se encontró.");
                }

                _productionService.Delete(id);
                return Ok("Producción eliminada con éxito.");
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }


        [Authorize]
        [HttpGet("AllProductionInRange")]
        public ActionResult<IEnumerable<Production>> GetAllInRange(int start, int end)
        {
            try
            {
                var productions = _productionService.GetAll() // Obtener todas las colmenas
                                        .Skip(start - 1) // Saltar los primeros 'start - 1' registros
                                        .Take(end - start + 1) // Tomar los registros dentro del rango
                                        .ToList();

                if (!productions.Any())
                {
                    return NotFound("No se encontraron colmenas en el rango especificado.");
                }

                return Ok(productions);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
        [Authorize]
        [HttpPost("PDF")]
        public IActionResult PdfProduction(string NombrePlantilla, string NombreReporte)
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
        [Authorize]
        [HttpPost("SQL")]
        public IActionResult SqlProduction(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var protocols = _productionService.GetAll();


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
        [Authorize]
        [HttpPost("XLSX")]
        public IActionResult XlsxProduction(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                // Obtener los datos de producción (ajusta esta parte según tu servicio)
                var production = _productionService.GetAll();

                // Crear una ruta temporal para el archivo XLSX
                string rutaTemp = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Documentos", "Temp", NombreReporte);

                // Crear el archivo XLSX usando EPPlus
                using (var package = new ExcelPackage())
                {
                    // Crear una hoja de trabajo en el archivo Excel
                    var worksheet = package.Workbook.Worksheets.Add("Producción");

                    // Escribir los encabezados en la primera fila
                    worksheet.Cells[1, 1].Value = "Código";
                    worksheet.Cells[1, 2].Value = "Nombre de Protocolo";
                    worksheet.Cells[1, 3].Value = "Fecha de Creación";

                    // Llenar los datos (ajusta esta parte según la estructura de tu objeto `production`)
                    int row = 2;
                    foreach (var item in production)
                    {
                        worksheet.Cells[row, 1].Value = item.Id_Production;
                        worksheet.Cells[row, 2].Value = item.Nom_Production;
                        worksheet.Cells[row, 3].Value = item.FecIni_Production.ToString("dd/MM/yyyy");
                        row++;
                    }

                    // Guardar el archivo XLSX en la ruta temporal
                    FileInfo fileInfo = new FileInfo(rutaTemp);
                    package.SaveAs(fileInfo);
                }

                // Leer el archivo y devolverlo como respuesta para descarga
                var fileBytes = System.IO.File.ReadAllBytes(rutaTemp);
                return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", NombreReporte);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, "Error al generar el archivo XLSX: " + ex.Message);
            }
        }

        [Authorize]
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

        [Authorize]
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
