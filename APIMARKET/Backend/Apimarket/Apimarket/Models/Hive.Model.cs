using System.ComponentModel.DataAnnotations;

namespace Apimarket.Models
{
    public class Hive
    {
        [Key]
        public int Id_Hive { get; set; }

        [Required(ErrorMessage = "La fecha es requerida")]
        [DataType(DataType.Date)]
        public DateTime FecIni_Hive { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(1, ErrorMessage = "El valor de estar entre {1} y {2}")]
        public string Est_Hive { get; set; }


        [Required(ErrorMessage = "El {1} es requerido")]
        [Range(1, 15, ErrorMessage = "Este el maximo de este es {1}")]
        public int NumCua_Hive { get; set; }



        [Required(ErrorMessage = "El {1} es requerido")]
        [Range(1, 15, ErrorMessage = "Este el maximo de este es {1}")]
        public int NumAlz_Hive { get; set; }


        [Required(ErrorMessage = "El {1} es requerido")]
        [Range(1, 100, ErrorMessage = "Este el maximo de este es {1}")]
        public int Can_Hive { get; set; }
    }
}
