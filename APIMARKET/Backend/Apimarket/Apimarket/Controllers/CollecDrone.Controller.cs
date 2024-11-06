using Apimarket.Functions;
using APIMARKET.Models;
using Microsoft.AspNetCore.Mvc;
    
namespace APIMARKET.Controllers
{
    [ApiController]
    [Route("Api/controller")]
    public class CollecDroneController : ControllerBase
    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunctions FunctionsGeneral;
        public CollecDroneController(IConfiguration configuration)
        {
            FunctionsGeneral = new GeneralFunctions(configuration);
            _Configuration = configuration;

        }
        [HttpPost("CreateCollecDrone")]
        public IActionResult CreateCollecDrone(CollecDroneModel collecDrone)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            
        }
        [HttpGet("GetCollecDrones")]
        public IActionResult GetCollecDrones()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            
        }
        [HttpGet("GetCollecDrone")]
        public IActionResult GetCollecDrone()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            
        }
        [HttpPost("updateCollecDrone")]
        public IActionResult updateCollecDrone(CollecDroneModel collecDrone)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            
        }
        [HttpDelete("DeleteCollecDrone")]
        public IActionResult DeleteCollecDrone()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            
        }

    }
}
