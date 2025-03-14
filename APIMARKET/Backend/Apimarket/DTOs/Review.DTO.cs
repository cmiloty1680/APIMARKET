using Apimarket.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.DTOs
{
    public class ReviewDTO
    {
        public int Id_Review { get; set; }

        public string Des_Review { get; set; }


        public string Tip_Protocol { get; set; }

        public string Nom_Protocol { get; set; }

        public string Nam_Responsible { get; set; }
        public string LasNam_Responsible { get; set; }

        public string Tip_Responsible { get; set; }

        public DateTime Fec_Review { get; set; } = DateTime.Now;

    }
}
