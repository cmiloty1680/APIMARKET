namespace Apimarket.DTOs
{
    public class ExtractionDTO
    {
        public int Id_Extraction { get; set; }
        public DateTime Fec_Extraction { get; set; }

        public int Can_Extraction { get; set; }
        public string Nam_Responsible { get; set; }

        public int Id_Responsible { get; set; }

        public int Id_CollecDrone { get; set; }

        public string LasNam_Responsible { get; set; }


    }
}
