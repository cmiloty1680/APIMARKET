using Apimarket.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.DTOs
{
    public class ReviewDTO
    {
        public int Id_Review { get; set; }

        public string Des_Review { get; set; }

        public DateTime Fec_Review { get; set; } = DateTime.Now;

        public string Nam_Responsible { get; set; }

        public string LasNam_Responsible  { get; set; }

        public int Id_Hive { get; set; }

        public int Id_Responsible { get; set; }
     


    }
}
