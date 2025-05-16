using Apimarket.Functions;
using Apimarket.model;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.Intrinsics.X86;
using System.Security.Claims;
using System.Text;
using System.Xml.Linq;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ResponsibleController : Controller
    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunctions _functionsGeneral;
        public JWTModel JWT;
        private readonly ResponsibleService _responsibleService;

        public ResponsibleController(IConfiguration configuration, ResponsibleService responsibleService)
        {
            _functionsGeneral = new GeneralFunctions(configuration);
            _Configuration = configuration;
            JWT = _Configuration.GetSection("JWT").Get<JWTModel>();
            _responsibleService = responsibleService;

        }

        //[Authorize]
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
            new Claim("Responsible", login.Emai_Responsible),
            new Claim(ClaimTypes.Role, responsible.Tip_Responsible)
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

                return Ok(new
                {
                    token = tokenString,
                    username = $"{responsible.Nam_Responsible} {responsible.LasNam_Responsible}",
                    email = responsible.Emai_Responsible,
                    rol = responsible.Tip_Responsible
                });
            }
            catch (Exception ex)
            {

                _functionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpPost("ResetPassUser")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPassUser model)
        {
            try
            {
                var responsible = await _responsibleService.GetByEmailAsync(model.Emai_Responsible);
                if (responsible == null)
                {
                    return NotFound(new { message = "El correo electrónico no está registrado." });
                }

                // Generar un token único y fecha de expiración
                var token = Convert.ToBase64String(Encoding.UTF8.GetBytes(Guid.NewGuid().ToString()));
                responsible.ResetToken = token;
                responsible.ResetTokenExpiration = DateTime.UtcNow.AddMinutes(30); // Expira en 30 minutos
                await _responsibleService.UpdateUserAsync(responsible);

                // Enlace para restablecer la contraseña
                string resetLink = $"http://localhost:3000/reset_password?token={token}";

                // Enviar correo con el enlace
                var emailResponse = await _functionsGeneral.SendEmail(model.Emai_Responsible, resetLink);
                if (!emailResponse.Status)
                {
                    return BadRequest(new { message = "Error al enviar el correo." });
                }

                return Ok(new { message = "Correo de restablecimiento de contraseña enviado correctamente." });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }


        [HttpPost("ValidateToken")]
        public async Task<IActionResult> ValidateToken([FromBody] TokenRequest model_tok)
        {
            if (string.IsNullOrEmpty(model_tok.Tok_Responsible))
                return Unauthorized(new { message = "Token no proporcionado" });

            try
            {
                var responsible = await _responsibleService.GetByTokenAsync(model_tok.Tok_Responsible);

                if (responsible == null || responsible.ResetTokenExpiration < DateTime.UtcNow)
                {
                    return Unauthorized(new { message = "Token inválido o expirado" });
                }

                return Ok(new { message = "Token válido", email = responsible.Emai_Responsible });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, new { message = "Error en el servidor", error = ex.Message });
            }
        }

        [HttpPost("ResetPasswordConfirm")]
        public async Task<IActionResult> ResetPasswordConfirm([FromBody] ResetPasswordModel model)
        {
            if (string.IsNullOrEmpty(model.Token) || string.IsNullOrEmpty(model.NewPassword))
            {
                return BadRequest(new { message = "Token y nueva contraseña son obligatorios." });
            }

            try
            {
                var responsible = await _responsibleService.GetByTokenAsync(model.Token);

                if (responsible == null || responsible.ResetTokenExpiration < DateTime.UtcNow)
                {
                    return BadRequest(new { message = "Token inválido o expirado." });
                }

                // Generar nuevo hash de contraseña
                string salt = BCrypt.Net.BCrypt.GenerateSalt();
                responsible.Hashed_Password = BCrypt.Net.BCrypt.HashPassword(model.NewPassword + salt);
                responsible.Salt = salt;

                // Borrar el token de restablecimiento después de cambiar la contraseña
                responsible.ResetToken = null;
                responsible.ResetTokenExpiration = null;

                // Guardar cambios en la base de datos
                await _responsibleService.UpdateUserAsync(responsible);

                return Ok(new { message = "Contraseña restablecida correctamente." });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, new { message = "Error en el servidor", error = ex.Message });
            }
        }



        [HttpPost("CreateResponsible")]
        public IActionResult Add([FromBody] Responsible entity)
        {
            try
            {


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
                return Ok(new { message = "Responsable creado con éxito" });
            }
            catch (Exception ex)
            {

                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }

        }



        [HttpGet("Profile")]
        public IActionResult GetProfile()
        {
            try
            {
                var email = User.Claims.FirstOrDefault(c => c.Type == "Responsible")?.Value;

                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized(new { message = "Token inválido o sin email." });
                }

                var responsible = _responsibleService.GetByEmail(email);

                if (responsible == null)
                {
                    return NotFound("Responsable no encontrado");
                }

                return Ok(responsible);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, new { message = "Error del servidor", error = ex.Message });
            }
        }


        [Authorize(Roles = "instructor, pasante")]
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

                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        //[Authorize]
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
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        //[Authorize]
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
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
        //[Authorize]
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
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        //[Authorize]
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
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        //[Authorize]
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
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        //[Authorize]
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
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        //[Authorize]
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
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }



    }


}