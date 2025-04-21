using Apimarket.Functions;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactoController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly CollecDroneService _collecDroneServices;
        private readonly IConfiguration _configuration;

        public ContactoController(IConfiguration configuration)
        {
            _configuration = configuration;
            _functionsGeneral = new GeneralFunctions(configuration);
        }
        [HttpPost]
        public IActionResult EnviarMensaje([FromBody] ContactForm contacto)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    // Aquí puedes guardar en la base de datos o enviar correo
                    return Ok(new { mensaje = "Mensaje recibido con éxito" });
                }

                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
    }

}
