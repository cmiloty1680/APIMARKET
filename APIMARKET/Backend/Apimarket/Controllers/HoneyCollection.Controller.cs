using Apimarket.DTOs;
using Apimarket.Functions;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class HoneyCollectionController : ControllerBase
    {
        private readonly GeneralFunctions _functionsGeneral;
        private readonly HoneyCollectionService _honeyCollectionServices;
        private readonly IConfiguration _configuration;


        public HoneyCollectionController(HoneyCollectionService honeyCollectionServices, IConfiguration configuration)
        {
            _configuration = configuration;
            _honeyCollectionServices = honeyCollectionServices;
            _functionsGeneral = new GeneralFunctions(configuration);

        }


        [Authorize]
        [HttpPost("Create")]
        public IActionResult Create([FromBody] HoneyCollection entity)
        {
            try
            {
                _honeyCollectionServices.Add(entity);
                return Ok(new { registrado = "Recolección de miel registrada con éxito." });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        [Authorize]
        [HttpGet("GetAllHoneyCollection")]
        public ActionResult<IEnumerable<HoneyCollectionDTO>> GetAllHoneyCollection()
        {
            try
            {
                var honeyCollection = _honeyCollectionServices.GetAll().Select(h => new HoneyCollectionDTO
                {
                    Id_HoneyCollection = h.Id_HoneyCollection,
                    Tot_HoneyCollection = h.Tot_HoneyCollection,
                    CanFra125_HoneyCollection = h.CanFra125_HoneyCollection,
                    CanFra250_HoneyCollection = h.CanFra250_HoneyCollection,
                    UniMed_HoneyCollection = h.UniMed_HoneyCollection,
                    Des_HoneyCollection = h.Des_HoneyCollection,
                    Fec_HoneyCollection = h.Fec_HoneyCollection,
                    Id_Responsible = h.Id_Responsible,
                    Nam_Responsible = h.responsible.Nam_Responsible,
                    Id_Production = h.Id_Production,
                    Nom_Production = h.production.Nom_Production,
                    FecIni_Production = h.production.FecIni_Production,
                    FecFin_Production = h.production.FecFin_Production,
                    SubCen_Production = h.production.SubCen_Production,
                    CenCos_Production = h.production.CenCos_Production,
                    TotColm_Hive = h.production.TotColm_Hive,
                    //Tot_Production = h.production.Tot_Production,
                    CanCua_Production = h.production.CanCua_Production
                }).ToList();

                return Ok(honeyCollection);

            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        [Authorize]
        [HttpGet("GetHoneyCollection/{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var honeyCollection = _honeyCollectionServices.GetHoneyCollection(id);
                if (honeyCollection == null)
                {
                    return NotFound("No encontrado");
                }

                return Ok(honeyCollection);
            }
            catch(Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        //[Authorize]
        //[HttpGet("GetProductionChart")]
        //public IActionResult GetProductionChart([FromQuery] int years = 10)
        //{
        //    try
        //    {
        //        var productionData = _honeyCollectionServices.GetProductionByYear(years);
        //        return Ok(productionData);
        //    }
        //    catch (Exception ex)
        //    {
        //        _functionsGeneral.Addlog(ex.ToString());
        //        return StatusCode(500, ex.ToString());
        //    }
        //}

        [Authorize]
        [HttpGet("TotalMielYear")]
        public IActionResult GetProductionSummary()
        {
            try
            {
                var totalMiel = _honeyCollectionServices.GetTotalProductionByYear();
                return Ok(new { totalMiel });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }




        [Authorize]
        [HttpPut("UpdateHoneyCollection/{id}")]
        public IActionResult Update([FromBody] HoneyCollection entity)
        {
            try
            {
                _honeyCollectionServices.Update(entity);
                return Ok(new { message = "Recolección actualizada con éxito." });
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        [Authorize]
        [HttpDelete("DeleteHoneyCollection")]
        public IActionResult Delete(int id)
        {
            try
            {
                _honeyCollectionServices.Delete(id);
                return Ok("Recolección eliminada.");
            }
            catch (Exception ex)
            {
                _functionsGeneral.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }
    }
}