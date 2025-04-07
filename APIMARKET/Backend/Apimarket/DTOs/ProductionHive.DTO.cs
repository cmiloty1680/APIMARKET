using Apimarket.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apimarket.DTOs
{
    public class ProductionHiveDTO
    {
        [Key]
        public int Id_ProductionHive { get; set; }


        public int Id_Production { get; set; }
        [ForeignKey("Id_Production")]
        public Production? production { get; set; }
        public int Id_Hive { get; set; }
        [ForeignKey("Id_Hive")]
        public Hive? hive { get; set; }
    }
}
