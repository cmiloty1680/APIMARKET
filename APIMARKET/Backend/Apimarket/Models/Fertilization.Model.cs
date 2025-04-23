using System;
using System.ComponentModel.DataAnnotations;
using Apimarket.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apimarket.Model
{
    public class Fertilization
    {
        [Key]
        public int Id_Fertilization { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Fec_Fertilization { get; set; }

        public int Can_Fertilization { get; set; }

        public int Id_Responsible { get; set; }
        [ForeignKey("Id_Responsible")]
        public Responsible? responsible { get; set; }

        public int Id_Extraction { get; set; }
        [ForeignKey("Id_Extraction")]
        public Extraction? extraction { get; set; }
    }
}
