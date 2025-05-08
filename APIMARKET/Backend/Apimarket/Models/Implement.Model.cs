using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.Model
{
    public class Implement
    {
        [Key]
        public int Id_Implement { get; set; }
        [DisplayName("Nombre es requerido")]
        [Required(ErrorMessage = "El campo{0}es requerido")]
        //[StringLength(25, ErrorMessage = "El campo es {0} tiene un limite de caracteres de {1}")]
        public string Nom_Implement { get; set; }
        [DisplayName("tipo de dato requerido")]
        [Required(ErrorMessage = "El campo{0}es requerido")]
        //[StringLength(25, ErrorMessage = "El campo es {0} tiene un limite de caracteres de {1}")]
        public string Tip_Implement { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]

        public DateTime FechIng_Implement { get; set; }

        [Required(ErrorMessage = "El valor {0} es obligatorio")]

        public decimal Vlr_Implement { get; set; }

        [Required(ErrorMessage = "El campo{0}es requerido")]
        //[StringLength(25, ErrorMessage = "El campo es {0} tiene un limite de caracteres de {1}")]
        public string Exi_Implement { get; set; }


    }
}



