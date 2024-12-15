using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.Models
{
    public class Protocol
    {
        [Key]
        public int Id_Protocol { get; set; }
        [DisplayName("Tipo de dato")]
        [Required(ErrorMessage = "El campo{0}es requerido")]

        public string Nom_Protocol { get; set; }
        public string Tip_Protocol { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime FecCre_Protocol { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime FecAct_Protocol { get; set; }



    }
}
