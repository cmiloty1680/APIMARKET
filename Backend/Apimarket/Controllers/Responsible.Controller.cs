using Apimarket.Functions;
using Apimarket.models;
using Apimarket.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ResponsibleController : Controller
    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunctions FunctionsGeneral;
        public JWTModels JWT;
        public ResponsibleController(IConfiguration configuration)
        {
            FunctionsGeneral = new GeneralFunctions(configuration);
            _Configuration = configuration;
            JWT = _Configuration.GetSection("JWT").Get<JWTModels>();

        }

        [HttpPost("CreateResponsible")]
        public IActionResult CreateResponsible(ResponsibleModel responsible)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString);
            }
        }
        [HttpGet("GetResponsible")]
        public IActionResult GetResponsible(int id)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpGet("GetsAllResponsible")]
        public IActionResult GetsAllResponsible(int id)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpPut("UpdateResponsible")]
        public IActionResult UpdateResponsible(ResponsibleModel responsible)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpDelete("DeleteResponsible")]
        public IActionResult DeleteResponsible(int id)
        {
            try
            {
                   return Ok();
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
    }
}
