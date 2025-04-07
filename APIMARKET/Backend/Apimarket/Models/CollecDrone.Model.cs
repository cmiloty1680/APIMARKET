using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Apimarket.DTOs;
using Apimarket.Models;

namespace Apimarket.Model
{
    public class CollecDrone
    {
        [Key]
        public int Id_CollecDrone { get; set; }

        [DataType(DataType.Date, ErrorMessage = "El formato de la fecha no es válido")]
        public DateTime Fec_CollecDrone { get; set; }

        [Range(0, 100, ErrorMessage = "El campo {0} tiene un límite de caracteres de {1}")]
        public int Can_CollecDrone { get; set; }

        public int Id_Responsible { get; set; }
        [ForeignKey("Id_Responsible")]
        public Responsible? responsible { get; set; }


    }
}
