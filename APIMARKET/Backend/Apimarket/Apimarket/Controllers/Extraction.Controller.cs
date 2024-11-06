using Apimarket.Functions;
using APIMARKET.Models;
using Microsoft.AspNetCore.Mvc;

namespace APIMARKET.Controllers
{
    [ApiController]
    [Route("Api/controller")]
    public class ExtractionController : ControllerBase
    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunctions FunctionsGeneral;
        public ExtractionController(IConfiguration configuration)
        {
            FunctionsGeneral = new GeneralFunctions(configuration);
            _Configuration = configuration;

        }
        [HttpPost("CreateExtraction")]
        public IActionResult CreateExtraction(ExtractionModel extraction)
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
        [HttpGet("GetExtractions")]
        public IActionResult GetExtractions()
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
        [HttpGet("GetExtraction")]
        public IActionResult GetExtraction()
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
        [HttpPost("updateExtraction")]
        public IActionResult updateExtraction(ExtractionModel extraction)
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
        [HttpDelete("DeleteExtraction")]
        public IActionResult DeleteExtraction()
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
