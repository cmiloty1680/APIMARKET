using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apimarket.Models
{
    [Table("race")] // Asegúrate de que la tabla se mapee correctamente.
    public class Race
    {
        [Key]
        public int Id_Race { get; set; }
        [StringLength(50, ErrorMessage = "el nombren no debe exceder los 50 caracteres")]

        public string Nom_Race { get; set; }
        [DisplayName("la descripcion es requerido")]
        public string Des_Race { get; set; }
    }
}



