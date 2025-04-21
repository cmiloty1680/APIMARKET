namespace Apimarket.DTOs
{
    public class HoneyCollectionDTO
    {
        public int Id_HoneyCollection { get; set; }

        public int Tot_HoneyCollection { get; set; }

        public int CanFra125_HoneyCollection { get; set; }

        public int CanFra250_HoneyCollection { get; set; }

        public string UniMed_HoneyCollection { get; set; }

        public string Des_HoneyCollection { get; set; }

        public DateTime Fec_HoneyCollection { get; set; }

        public int Id_Responsible { get; set; }
        public string Nam_Responsible { get; set; }

        public int Id_Production { get; set; }
        public string Nom_Production { get; set; }

        public DateTime FecIni_Production { get; set; }

        public DateTime FecFin_Production { get; set; }

        public string SubCen_Production { get; set;  }

        public string CenCos_Production { get; set; }

        public int TotColm_Hive { get; set;  }

        public int Tot_Production { get; set; }

        public int CanCua_Production { get; set; }
    }
}
