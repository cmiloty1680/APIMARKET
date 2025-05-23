﻿using System.ComponentModel.DataAnnotations;
using System;
using Apimarket.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apimarket.Model
{
    public class Extraction
    {
        [Key]
        public int Id_Extraction { get; set; }

        //[Required(ErrorMessage = "El campo {0} es requerido}")]
        [DataType(DataType.Date, ErrorMessage = "El formato de la fecha no es valido")]
        public DateTime Fec_Extraction { get; set; }

        [Range(0, 100, ErrorMessage = "El campo {0} tiene un limite de caracteres de {1}")]
        public int Can_Extraction { get; set; }

        public int Id_Responsible { get; set; }
        [ForeignKey("Id_Responsible")]
        public Responsible? responsible { get; set; }

        public int Id_CollecDrone { get; set; }
        [ForeignKey("Id_CollecDrone")]
        public CollecDrone? collecDrone { get; set; }

    }
}
