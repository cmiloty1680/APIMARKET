using Apimarket.Functions;
using APIMARKET.Models;
using Microsoft.AspNetCore.Mvc;

namespace APIMARKET.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class RaceController : ControllerBase
    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunctions FunctionsGeneral;
        public RaceController(IConfiguration configuration)
        {
            FunctionsGeneral = new GeneralFunctions(configuration);
            _Configuration = configuration;

        }
        [HttpPost("CreateRace")]
        public IActionResult CreateRace(RaceModel race)
        {
            try
            {
                // Lógica para crear una nueva raza
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            return Ok();
        }

        [HttpGet("GetBreeds")]
        public IActionResult GetBreeds()
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

        [HttpGet("GetRace")]
        public IActionResult GetRace()
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

        [HttpPost("UpdateRace")]
        public IActionResult UpdateRace(RaceModel race)
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

        [HttpDelete("DeleteRace")]
        public IActionResult DeleteRace()
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

