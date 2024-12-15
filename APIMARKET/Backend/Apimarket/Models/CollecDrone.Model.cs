using System.ComponentModel.DataAnnotations;
using System;

namespace Apimarket.Model
{
    public class CollecDrone
    {
        [Key]
        public int Id_CollecDrone { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [DataType(DataType.Date, ErrorMessage = "El formato de la fecha no es valido")]
        public DateTime Fec_CollecDrone { get; set; }

        [Range(0, 100, ErrorMessage = "El campo {0} tiene un limite de caracteres de {1}")]
        public int Can_CollecDrone { get; set; }
    }
}
 