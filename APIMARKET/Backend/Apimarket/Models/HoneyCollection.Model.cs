using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.Models
{
    public class HoneyCollection
    {
        [Key]
        public int Id_HoneyCollection { get; set; }

        public int CanFra125_HoneyCollection { get; set; }

        public int CanFra250_HoneyCollection { get; set; }

        public string UniMed_HoneyCollection { get; set; }

        public string Des_HoneyCollection { get; set; }

        //[Required]
        public DateTime Fec_HoneyCollection { get; set; }

        //[Required]
        //public int Can_HoneyCollection { get; set; }

        public int Id_Responsible { get; set; }
        [ForeignKey("Id_Responsible")]
        public Responsible? responsible { get; set; }

        public int Id_Production { get; set; }
        [ForeignKey("Id_Production")]
        public Production? production { get; set; }
    }
}
