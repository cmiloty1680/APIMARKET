using Apimarket.Functions;
using Apimarket.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class UserController : Controller
    {
        //metodo para que se ejecute en simultaneo 
        //secar la configuración
        public IConfiguration _Configuration { get; set; }
        public GeneralFunctions FunctionsGeneral;
        public JWTModels JWT;
        public UserController(IConfiguration configuration)
        {
            FunctionsGeneral = new GeneralFunctions(configuration);
            _Configuration = configuration;
            JWT = _Configuration.GetSection("JWT").Get<JWTModels>();
            

        }

        //peticion 
        [HttpPost("Login")]
        public IActionResult Login(LoginUser login)
        {
            try
            {

                var key = Encoding.UTF8.GetBytes(JWT.KeySecret);



                ClaimsIdentity subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("User", login.Email)
                });

                var tokenDescriptor = new SecurityTokenDescriptor

                {
                    Subject = subject,
                    Expires = DateTime.Now.AddMinutes(Convert.ToDouble(JWT.JWTExpireTime)),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature

                        )
                };

                var token = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);

                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString);
            }
        }
        [HttpPost("ResetPassUser")]
        
        public async Task<IActionResult> ResetPassword(ResetPassUser User)
        {
            try
            {
                //GeneralFunctions func = new GeneralFunctions(_Configuration);
                //await func.SendEmail(user.Email);
                var response = await FunctionsGeneral.SendEmail(User.Email);
                if (response.Status)
                {
                    return Ok(response);
                }
                return BadRequest(response);

            }
           
            catch (Exception ex) 
            { 
                   FunctionsGeneral.Addlog(ex.Message);
                   return StatusCode(500, ex.ToString());
            }
        }

        [HttpPost("CreateUser")]

        public IActionResult CreateUser(User user)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
    }
}