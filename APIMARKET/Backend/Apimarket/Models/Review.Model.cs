using System;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.Models
{
    public class Review
    {
        [Key]
        public int Id_Review { get; set; }

        
        public string Des_Review { get; set; }

 
        public DateTime Fec_Review { get; set; } = DateTime.Now;
    }
}


