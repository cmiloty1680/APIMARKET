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

        public int Cant_Abejas { get; set; }
        public int Tot_Colmen { get; set; }

        public int Id_Race { get; set; } 
        public string Nom_Race { get; set; }
       
        public int Can_Production { get; set; }
    }
}
