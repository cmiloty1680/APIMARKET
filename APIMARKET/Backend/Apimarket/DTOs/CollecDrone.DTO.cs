
using System;
using Apimarket.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.DTOs
{
    public class CollecDroneDTO
    {
        public int Id_CollecDrone { get; set; }

        [DataType(DataType.Date)]
        public DateTime Fec_CollecDrone { get; set; }

        public int Can_CollecDrone { get; set; }

        public string Nam_Responsible { get; set; }

        public int Id_Responsible { get; set;  }

        public int Id_Hive { get; set; }

    }
}

