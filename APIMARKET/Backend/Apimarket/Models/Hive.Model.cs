using System.ComponentModel.DataAnnotations;

namespace Apimarket.Models
{
    public class Hive
    {
        [Key]
        public int Id_Hive { get; set; }


        [Required(ErrorMessage = "La descripción es requerida")]
        [StringLength(50, ErrorMessage = "La descripción no debe exceder los 50 caracteres")]
        public string Des_Hive { get; set; } // Campo para la descripción

        [Required(ErrorMessage = "El tipo de responsable es requerido")]
        public string Est_Hive { get; set; } // Se puede crear un Enum para Tip_Responsible si es necesario

        [Required(ErrorMessage = "El número de cuadros es requerido")]
        [Range(1, 30, ErrorMessage = "El número de cuadros debe estar entre {1} y {2}")]
        public int NumCua_Hive { get; set; } // Número de cuadros

        [Required(ErrorMessage = "El número de alzas es requerido")]
        [Range(1, 30, ErrorMessage = "El número de alzas debe estar entre {1} y {2}")]
        public int NumAlz_Hive { get; set; } // Número de alzas

    }
}
