using System.ComponentModel.DataAnnotations;

namespace Apimarket.Model
{
    public class TareaModel
    {
        
        [Required(ErrorMessage ="El campo{0} es requerido")]
        public string Name{ get; set; }
    }
}
