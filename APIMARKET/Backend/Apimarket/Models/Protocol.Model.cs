using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [DisplayFormat(DataFormatString = "{yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime FecCre_Protocol { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime FecAct_Protocol { get; set; }

        [Column(TypeName = "LONGBLOB")]
        public byte[] Archivo_Protocol { get; set; }



    }
}