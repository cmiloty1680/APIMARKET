using Apimarket.Model;
using Microsoft.AspNetCore.Http;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.Models
{

    public class LoginResponsible
    {
        [Required(ErrorMessage = "el campo es requerido")]
        public string Emai_Responsible { get; set; }
        public string Hashed_Password { get; set; }
    }

    internal class RequiredAttribute : Attribute
    {
        public string ErrorMessage { get; set; }
    }
    public class ResetPassUser
    {
        [Required(ErrorMessage = "El correo es requerido")]
        [EmailAddress(ErrorMessage = "Formato de correo electrónico inválido")]
        public string Emai_Responsible { get; set; }
    }
    public class Responsible
    {
        [Key]
        public int Id_Responsible { get; set; }

        [DisplayName("Nombre")]
        [Required(ErrorMessage = "El Nombre Es Requerido")]
        public string Nam_Responsible { get; set; }

        [DisplayName("Apellido")]
        [Required(ErrorMessage = "El Apellido Es Requerido")]
        public string LasNam_Responsible { get; set; }


        [Required(ErrorMessage = "El número de documento es requerido")]
        public int NumDoc_Responsible { get; set; }


        //[Required(ErrorMessage = "El tipo de responsible es requerido")]

        public string Tip_Responsible { get; set; } = "pasante";

        [Required(ErrorMessage = "El número de teléfono es requerido")]
        [Range(1000000000, 9999999999, ErrorMessage = "El número de teléfono debe tener exactamente 10 dígitos")]

        public long Pho_Responsible { get; set; }



        [Required(ErrorMessage = "El campo es requerido")]


        [EmailAddress(ErrorMessage = "Formato de correo electrónico inválido")]
        public string Emai_Responsible { get; set; }

        public string Tok_Responsible { get; set; }

        public byte Blockad { get; set; }
        public string Hashed_Password { get; set; }
        public string Salt { get; set; }

        public int Int_Responsible { get; set; }

        public string? ResetToken { get; set; } = null;
        public DateTime? ResetTokenExpiration { get; set; }



    }

    public class TokenRequest
    {
        [Required(ErrorMessage = "El token es requerido")]
        public string Tok_Responsible { get; set; }
    }


    public class ResetPasswordModel
    {
        public string? Token { get; set; } = null;
        public string? NewPassword { get; set; } = null;
    }
}