using Apimarket.Functions;
using APIMARKET.Models;
using Microsoft.AspNetCore.Mvc;

namespace APIMARKET.Controllers
{
    [ApiController]
    [Route("Api/controller")]
    public class FertilizationController : ControllerBase
    {
        public GeneralFunctions  FuntionsGeneral;

        public FertilizationController(IConfiguration configuration)
        {
            FuntionsGeneral = new GeneralFunctions(configuration);
        }
        [HttpPost("CreateFertilization")]
        public IActionResult CreateFertilization(FertilizationModel fertilization)
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
        [HttpGet("GetFertilizations")]
        public IActionResult GetFertilizations()
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
        [HttpGet("GetFertilization")]
        public IActionResult GetFertilization()
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
        [HttpPost("updateFertilization")]
        public IActionResult updateFertilizacion (FertilizationModel fertilization)
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
        [HttpDelete("DeleteFertilization")]
        public IActionResult DeleteFertilization()
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
