using System.ComponentModel.DataAnnotations;

namespace Apimarket.Models
{
    public class EnvioMessageModel
    {
        [Required(ErrorMessage="El campo{0} es requerido")]
        public string name { get; set; }
    }
}
