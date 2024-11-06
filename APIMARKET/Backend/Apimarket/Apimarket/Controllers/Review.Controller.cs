using Apimarket.Functions;
using APIMARKET.Models;
using Microsoft.AspNetCore.Mvc;

namespace APIMARKET.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ReviewController : Controller
    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunctions FunctionsGeneral;
        public ReviewController(IConfiguration configuration)
        {
            FunctionsGeneral = new GeneralFunctions(configuration);
            _Configuration = configuration;

        }
        [HttpPost("CreateReview")]
        public IActionResult CreateReview(ReviewModel Review)
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

        [HttpGet("GetReviews")]
        public IActionResult GetReviews()
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

        [HttpGet("GetReview")]
        public IActionResult GetReview()
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

        [HttpPost("UpdateReview")]
        public IActionResult UpdateReview(ReviewModel review)
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

        [HttpDelete("DeleteReview")]
        public IActionResult DeleteReview()
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

