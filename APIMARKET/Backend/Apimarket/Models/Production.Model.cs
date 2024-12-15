using System.ComponentModel.DataAnnotations;
using System.Data;

namespace Apimarket.Models
{
    public class Production
    {
        [Key]
        //[Required(ErrorMessage = "Los campos son requeridos")]
        public int Id_Production { get; set; }

        [Required(ErrorMessage = "El campo de fecha es requerido")]
        [DataType(DataType.Date)]
        public DateTime FecIni_Production { get; set; }
        public DateTime FecFin_Production { get; set; }
       
        public int Cant_Abejas { get; set; }
        public int Tot_Colmen { get; set; }




        [Required(ErrorMessage = "El {1} es requerido")]
        [Range(1, 100, ErrorMessage = "Este el maximo de este es {1}")]
        public int Can_Production { get; set; }
    }
}
