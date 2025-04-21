using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public string SubCen_Production { get; set; } = "Apicultura";

        public string CenCos_Production { get; set; } = "Pecuaria";

        public string Nom_Production { get; set; } = "Miel de Abeja";

        public int TotColm_Hive { get; set; }

        //public int Tot_Production { get; set; }

        public int CanCua_Production {get; set; }

        public int Id_Race { get; set; }
        [ForeignKey("Id_Race")]

        public Race? race  { get; set; }

        public int? Id_Hive { get; set; } // Cambio a nullable (int?)

    }
}
