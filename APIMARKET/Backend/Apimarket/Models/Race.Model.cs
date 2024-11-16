using System.ComponentModel.DataAnnotations;

namespace Apimarket.Models
{
    public class Race
    {
        [Key]
        public int Id_Race { get; set; }

        [MaxLength(25)]
        public string Nom_Race { get; set; }

        public string Des_Race { get; set; }
    }
}


