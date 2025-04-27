



namespace Apimarket.DTOs
{
    public class protocolDTO
    {
        //public int Id_Protocol { get; set; }
        public string Nom_Protocol { get; set; }
        public string Tip_Protocol { get; set; }
        public DateTime FecCre_Protocol { get; set; }
        public DateTime FecAct_Protocol { get; set; }
        public IFormFile Archivo_Protocol { get; set; } // Aquí va el archivo
    }
}