using Apimarket.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.DTOs
{
    public class ProductionDTO
    {
        
        public int Id_Production { get; set; }

        [DataType(DataType.Date)]
        public DateTime FecIni_Production { get; set; }
        public DateTime FecFin_Production { get; set; }

        public string SubCen_Production { get; set; }

        public string CenCos_Production { get; set; }

        public string Nom_Production { get; set; }

        public int TotColm_Hive { get; set; }


        //public int Tot_Production { get; set; }

        public int CanCua_Production { get; set; }

        public int Id_Race { get; set; }
        public string Nom_Race { get; set; }
       
    }
}
