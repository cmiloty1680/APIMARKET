using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Apimarket.DTOs
{
    public class FeedingDTO
    {

        public int Id_Feeding { get; set; }
        public string Tip_Feeding { get; set; }
        public DateTime Fec_Feeding { get; set; }
        public decimal Can_Feeding { get; set; }

        public decimal Vlr_Feeding { get; set; }

        public string Des_Hive { get; set; }

        public string Nam_Responsible { get; set; }

        public string LasNam_Responsible { get; set; }
    
        public int NumDoc_Responsible { get; set; }

        public string Tip_Responsible { get; set; } = "pasante";

        public int Id_Responsible { get; set; }

        public int Id_Hive { get; set; }


    }
}