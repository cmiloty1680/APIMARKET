using Apimarket.Functions;
using Apimarket.model;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.Intrinsics.X86;
using System.Security.Claims;
using System.Text;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ResponsibleController : Controller
    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunctions FunctionsGeneral;
        public JWTModel JWT;
        private readonly ResponsibleService _responsibleService;

        public ResponsibleController(IConfiguration configuration, ResponsibleService responsibleService)
        {
            FunctionsGeneral = new GeneralFunctions(configuration);
            _Configuration = configuration;
            JWT = _Configuration.GetSection("JWT").Get<JWTModel>();
            _responsibleService = responsibleService;

        }

        [HttpPost("Login")]
        public IActionResult Login(LoginResponsible login)
        {
            try
            {

                var responsible = _responsibleService.GetByEmail(login.Emai_Responsible);
                if (responsible == null || !BCrypt.Net.BCrypt.Verify(login.Hashed_Password + responsible.Salt, responsible.Hashed_Password))
                {
                    return Unauthorized(new { message = "Credenciales incorrectas." });
                }


                var key = Encoding.UTF8.GetBytes(JWT.KeySecret);
                var claims = new ClaimsIdentity(new[]
                {
            new Claim("Responsible", login.Emai_Responsible)
        });


                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(JWT.JWTExpireTime)),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };


                var token = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);
                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);


                responsible.Tok_Responsible = tokenString;
                _responsibleService.Update(responsible);

                return Ok(new { token = tokenString });
            }
            catch (Exception ex)
            {

                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpPost("ResetPassUser")]
        public async Task<IActionResult> Resetpassword(ResetPassUser responsible)
        {
            try
            {
                if (responsible == null || string.IsNullOrEmpty(responsible.Emai_Responsible))
                {
                    return BadRequest("El objeto de solicitud o el correo electrónico es inválido.");
                }

                // Llama al método de servicio para verificar si el correo existe
                var emailExists = _responsibleService.CheckEmailExists(responsible.Emai_Responsible);
                if (!emailExists)
                {
                    return NotFound(new { message = "El correo no se encuentra registrado." });
                }

                var emailResponse = await FunctionsGeneral.SendEmail(responsible.Emai_Responsible);

                // Aquí había un error de lógica en la condición
                if (!emailResponse.Status)
                {
                    // Si el envío falló, retornamos un error
                    return BadRequest(new { message = "Error al enviar el correo de restablecimiento." });
                }

                // Si todo salió bien, retornamos éxito
                return Ok(new { enviado = "Correo de restablecimiento de contraseña enviado correctamente." });
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, "Ocurrió un error interno. Por favor, intenta nuevamente.");
            }
        }


        [HttpPost("CreateResponsible")]
        public IActionResult Add([FromBody] Responsible entity)
        {
            try
            {


                //if (entity == null)
                //{
                //    return BadRequest(new { message = "La entidad de responsable no puede ser nula." });
                //}


                //if (entity.Id_Responsible <= 0)
                //{
                //    return BadRequest(new { message = "El ID de responsable debe ser un valor positivo." });
                //}



                //var existingResponsible = _responsibleService.GetResponsible(entity.Id_Responsible);
                //if (existingResponsible != null)
                //{
                //    return Conflict(new { message = "Ya existe un responsable con este ID." });
                //}

                string salt = BCrypt.Net.BCrypt.GenerateSalt();
                entity.Hashed_Password = BCrypt.Net.BCrypt.HashPassword(entity.Hashed_Password + salt);
                entity.Salt = salt;
                entity.Tok_Responsible = "";


                var key = Encoding.UTF8.GetBytes(JWT.KeySecret);
                var claims = new ClaimsIdentity(new[]
                {
     new Claim("responsible", entity.Emai_Responsible)
 });

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(JWT.JWTExpireTime)),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);
                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);


                entity.Tok_Responsible = tokenString;


                _responsibleService.Add(entity);
                return Ok(new { creado = "Responsable creado con éxito" });
            }
            catch (Exception ex)
            {

                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }

        }



        [Authorize]

        [HttpGet("GetResponsible/{id}")]
        public IActionResult GetResponsible(int id)
        {
            try
            {

                var responsible = _responsibleService.GetResponsible(id);


                if (responsible == null)
                {
                    return NotFound("responsable no encontrado");
                }


                return Ok(responsible);
            }
            catch (Exception ex)
            {

                FunctionsGeneral.Addlog(ex.ToString());


                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("GetsAllResponsible")]
        public IActionResult GetResponsible()
        {
            try
            {

                var responsible = _responsibleService.GetAll();
                return Ok(responsible);
            }
            catch (Exception ex)
            {

                FunctionsGeneral.Addlog(ex.ToString());


                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet("GetsResponsible")]
        public ActionResult<IEnumerable<Responsible>> GetsResponsible(int start, int end)
        {
            try
            {
                if (start <= 0)
                {
                    start = 0;
                }
                var responsibles = _responsibleService.GetAll()
                                                   .Skip(start)
                                                   .Take(end)
                                                   .ToList();

                if (!responsibles.Any())
                {
                    return NotFound("no se encontró ningún responsable en el rango");
                }

                return Ok(responsibles);

            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPut("UpdateResponsible")]
        public IActionResult UpdateResponsible(Responsible responsible)
        {


            if (responsible == null)
            {
                return BadRequest("Responsible no encontrado");
            }

            try
            {
                _responsibleService.Update(responsible);
                return Ok("Responsible actualizado exitosamente");
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
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize]
        [HttpDelete("DeleteResponsible/{id}")]
        public async Task<IActionResult> DeleteResponsible(int id)
        {
            try
            {
                var result = await _responsibleService.DeleteResponsible(id);
                if (result)
                {
                    return Ok("Responsible eliminado");
                }
                return NotFound("Responsible no encontrado");
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        //[HttpGet("ProtectedRoute")]
        //public IActionResult ProtectedRoute()
        //{
        //    var responsible = (Responsible)HttpContext.Items["Responsable"];
        //    return Ok(new { message = $"Bienvenido, {responsible.Emai_Responsible}" });
        //}


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
                string RutaPlantilla = _Configuration["Rutas:Plantilla:Path"] + _Configuration["Rutas:Plantilla:File"];
                if (System.IO.File.Exists(RutaPlantilla))
                {
                    return NotFound("La ruta del archivo no existe");
                }
                return Ok(RutaPlantilla);
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpGet("Archivo")]
        public IActionResult GetArchivo()
        {
            try
            {
                string RutaArchivo = _Configuration["Rutas:Archivo:Path"] + _Configuration["Rutas:Archivo:File"];
                if (System.IO.File.Exists(RutaArchivo))
                {
                    return NotFound("La ruta del archivo no existe");
                }
                return Ok(RutaArchivo);
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpGet("temp")]
        public IActionResult GetTemp()
        {
            try
            {
                string RutaTemp = _Configuration["Rutas:Temp:Path"];
                if (System.IO.File.Exists(RutaTemp))
                {
                    return NotFound("La ruta del archivo no existe");
                }
                return Ok(RutaTemp);
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpPost("XLSX")]
        public IActionResult XlsxResponsible(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var Responsible = _responsibleService.GetAll();
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
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpPost("SQL")]
        public IActionResult SqlResponsible(string NombrePlantilla, string NombreReporte)
        {
            try
            {
                var Responsible = _responsibleService.GetAll();
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
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
    


    }


}



