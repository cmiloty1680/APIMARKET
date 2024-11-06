using Apimarket.Functions;
using Apimarket.models;
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
    public class ResponsibleController : ControllerBase
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
                if (responsible == null || !BCrypt.Net.BCrypt.Verify(login.Pass_Responsible + responsible.Salt, responsible.Hashed_Password))
                {
                    return Unauthorized("Credenciales incorrectas.");
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
        public async Task<IActionResult> ResetPassword(ResetPassUser responsible)
        {
            try
            {
                if (responsible == null || string.IsNullOrEmpty(responsible.Emai_Responsible))
                {
                    return BadRequest("El objeto de solicitud o el correo electrónico es inválido.");
                }


                var emailResponse = await FunctionsGeneral.SendEmail(responsible.Emai_Responsible);

                if (!emailResponse.Status)
                {
                    return BadRequest(emailResponse.Message);
                }


                return Ok(new { Message = "Correo de restablecimiento de contraseña enviado correctamente." });
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


                if (entity == null)
                {
                    return BadRequest("La entidad de responsable no puede ser nula.");
                }


                if (entity.Id_Responsible <= 0)
                {
                    return BadRequest("El ID de responsable debe ser un valor positivo.");
                }



                var existingProduction = _responsibleService.GetResponsible(entity.Id_Responsible);
                if (existingProduction != null)
                {
                    return Conflict("Ya existe un responsable con este ID.");
                }

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

        [HttpGet("ProtectedRoute")]
        public IActionResult ProtectedRoute()
        {
            var responsible = (Responsible)HttpContext.Items["Responsable"];
            return Ok(new { message = $"Bienvenido, {responsible.Emai_Responsible}" });
        }

    }
}