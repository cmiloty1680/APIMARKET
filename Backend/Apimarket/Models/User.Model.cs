

namespace Apimarket.models
{
    public class LoginUser
    {
        [Required(ErrorMessage = "el campo es requerido")]
        public string Email { get; set; }
        public string Password { get; set; }

        public int id { get; set; }
    }

    internal class RequiredAttribute : Attribute
    {
        public string ErrorMessage { get; set; }
    }
    public class ResetPassUser
    {
        public string Email { get; set; }
    }
    public class User
    {
        //todos los campos
    }
}