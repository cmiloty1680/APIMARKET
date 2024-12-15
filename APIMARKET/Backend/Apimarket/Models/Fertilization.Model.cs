using System;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.Model
{
    public class Fertilization
    {
        [Key]
        public int Id_Fertilization { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Fec_Fertilization { get; set; }
    }
}
