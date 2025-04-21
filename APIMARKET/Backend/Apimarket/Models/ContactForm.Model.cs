using System;
using System.ComponentModel.DataAnnotations;

namespace Apimarket.Models
{
    public class ContactForm
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string NombreCompleto { get; set; }

        [Required]
        [MaxLength(150)]
        [EmailAddress]
        public string CorreoElectronico { get; set; }

        [Required]
        [MaxLength(200)]
        public string Asunto { get; set; }

        [Required]
        public string Mensaje { get; set; }
    }
}
