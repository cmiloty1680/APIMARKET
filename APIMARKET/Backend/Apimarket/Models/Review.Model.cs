using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Apimarket.Models;

[Table("reviews")]
public class Review
{
    [Key]
    public int Id_Review { get; set; }


    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    public DateTime Fec_Review { get; set; } = DateTime.Now;

    public string Des_Review { get; set; }

    public int Id_Responsible { get; set; }
    [ForeignKey("Id_Responsible")]

    public Responsible? responsible { get; set; }

    public int Id_Hive { get; set; }
    [ForeignKey("Id_Hive")]

    public Hive? hive { get; set; }


}



