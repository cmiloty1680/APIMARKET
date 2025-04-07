using Apimarket.DTOs;
using Apimarket.Functions;
using Apimarket.Services;
using Microsoft.AspNetCore.Mvc;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ProductionHiveController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly ProductionHiveService _productionHiveService;

        public ProductionHiveController(IConfiguration configuration, ProductionHiveService productionHiveService)
        {
            _functionsGeneral = new GeneralFunctions(configuration);
            _productionHiveService = productionHiveService;
        }

        [HttpGet("AllProductionHive")]
        public ActionResult<IEnumerable<ProductionHiveDTO>> GetAll([FromBody] int Id_ProductionHive)
        {
            try
            {
                var productionHives = _productionHiveService.GetAll();
                return Ok(productionHives);
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
    }
}
