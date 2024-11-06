using Apimarket.Functions;
using Apimarket.Model;
using Microsoft.AspNetCore.Mvc;

namespace Apimarket.Controller
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ImplementController : ControllerBase
    {
        public GeneralFunctions FunctionsGeneral;

        public ImplementController(IConfiguration configuration)
        {
            FunctionsGeneral = new GeneralFunctions(configuration);

        }

        [HttpPost("CreateImplement")]
        public IActionResult CreateImplemento(ImplementModel number)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("GetsImplement")]
        public IActionResult getsImplement(ImplementModel number)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetImplement")]
        public IActionResult GetImplement(ImplementModel number)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("UpdateImplement")]
        public IActionResult UpdateImplement(ImplementModel number)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete("DeleteImplement")]
        public IActionResult DeleteImplement(ImplementModel number)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                FunctionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
        
    }
}










