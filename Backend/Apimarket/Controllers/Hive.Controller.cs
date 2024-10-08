﻿using Apimarket.Functions;
using Apimarket.models;
using Apimarket.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Apimarket.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class HiveController : ControllerBase
    {
  
        public IConfiguration _Configuration { get; set; }
        public GeneralFunctions FunctionsGeneral;
        public HiveController(IConfiguration configuration)
        {
            FunctionsGeneral = new GeneralFunctions(configuration);
            _Configuration = configuration;

        }
        [HttpPost("CreateHive")]
        public IActionResult Createhive(HiveModel hive)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                
                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpGet("GetHive")]
        public IActionResult GetHive(int id)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {

                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());  
            }
        }
        [HttpGet("GetsAllHive")]
        public IActionResult GetsAllHive(int id)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {

                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpPost("UpdateHive")]
        public IActionResult UpdateHive(HiveModel hive)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {

                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpDelete("DeleteHive")]
        public IActionResult DeleteHive(int id)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {

                FunctionsGeneral.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
    }
}
