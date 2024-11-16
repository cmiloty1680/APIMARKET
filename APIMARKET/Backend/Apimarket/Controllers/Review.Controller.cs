using Apimarket.Functions;
using Apimarket.Services;
using Microsoft.AspNetCore.Mvc;
using Apimarket.Models;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly ReviewServices _reviewServices;
        private readonly IConfiguration _configuration;

        public ReviewController(IConfiguration configuration, ReviewServices reviewServices)
        {
            _configuration = configuration;
            _reviewServices = reviewServices;
            _functionsGeneral = new GeneralFunctions(configuration);
        }

        [HttpPost("CreateReview")]
        public IActionResult AddP([FromBody] Review entity)
        {
            if (entity == null)
            {
                return BadRequest("La entidad Review no puede ser nula");
            }

            if (entity.Id_Review <= 0)
            {
                return BadRequest("El Id de Review debe ser un valor positivo");
            }

            var existingReview = _reviewServices.GetReview(entity.Id_Review);
            if (existingReview != null)
            {
                return Conflict("Ya existe un Review con ese ID");
            }

            _reviewServices.Add(entity);
            return Ok("Review creado con éxito");
        }

        [HttpGet("GetsReview")]
        public ActionResult<IEnumerable<Review>> GetsReview(int start, int end)
        {
            try
            {
                if (start <= 1)
                {
                    start = 0;
                }

                var reviews = _reviewServices.GetAll()
                                                        .Skip(start)
                                                        .Take(end - start)
                                                        .ToList();

                if (!reviews.Any())
                {
                    return NotFound("No se encontró el Review en el rango");
                }

                return Ok(reviews);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetReview/{id}")]
        public IActionResult GetReview(int id)
        {
            try
            {
                var review = _reviewServices.GetReview(id);
                if (review == null)
                {
                    return NotFound("Review no encontrado");
                }

                return Ok(review);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("UpdateReview")]
        public IActionResult UpdateReview(Review review)
        {
            try
            {
                _reviewServices.Update(review);
                return Ok(new { message = "Review actualizado con éxito" });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("DeleteReview")]
        public IActionResult DeleteReview(int id)
        {
            try
            {
                var result = _reviewServices.GetReview(id);
                if (result == null)
                {
                    return NotFound("El Review con ID " + id + " no se encontró.");
                }

                _reviewServices.DeleteReview(id);
                return Ok("Review eliminado con éxito");
            }
            catch (KeyNotFoundException knfex)
            {
                return NotFound(knfex.Message);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
    }
}

