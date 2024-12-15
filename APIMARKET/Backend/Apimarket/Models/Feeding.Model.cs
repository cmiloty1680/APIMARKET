﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.Model
{
    public class Feeding
    {
        [Key]
        
        public int  Id_Feeding { get; set; }
        [DisplayName("tipo de alimentación es rrequerido")]
        [Required(ErrorMessage ="El campo{0}es requerido")]
        //[StringLength(255,ErrorMessage ="El campo es {0} tiene un limite de caracteres de {1}")]

        public string Tip_Feeding { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]

        public DateTime Fec_Feeding { get; set; }
        [DisplayName("Cantidad de alimentación")]
        [Required(ErrorMessage = "El campo{0}es requerido")]
        //[StringLength(255, ErrorMessage = "El campo es {0} tiene un limite de caracteres de {1}")]

        public string Can_Feeding { get; set; }
        //[DisplayName("Valor de la alimentación")]

        public int Vlr_Feeding { get; set; }


    }
}
