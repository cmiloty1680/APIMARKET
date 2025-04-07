using Apimarket.Model;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Security.Cryptography.X509Certificates;

namespace Apimarket.Functions
{
    
    public class GeneralFunctions
    {

        public ConfigServer configServer { get; set; }
        private readonly IConfiguration _configuration;
        public GeneralFunctions(IConfiguration configuration)
        {
            configServer = configuration.GetSection("ConfigServerEmail").Get<ConfigServer>();
        }

        public async Task<ResponseSend> SendEmail(string Emaildestinatario, string resetLink)
        {
            ResponseSend responseSend = new ResponseSend();
            try
            {
                // Validar enlace de restablecimiento
                if (string.IsNullOrWhiteSpace(resetLink) || !Uri.IsWellFormedUriString(resetLink, UriKind.Absolute))
                {
                    throw new ArgumentException("El enlace de restablecimiento proporcionado no es válido.");
                }

                using (SmtpClient smtpClient = new SmtpClient
                {
                    Host = configServer.HostName,
                    Port = configServer.PortHost,
                    Credentials = new NetworkCredential(configServer.Email, configServer.Password),
                    EnableSsl = true
                })
                {
                    MailAddress remitente = new MailAddress(configServer.Email, configServer.NameAplication, Encoding.UTF8);
                    MailAddress destinatario = new MailAddress(Emaildestinatario);

                    using (MailMessage message = new MailMessage(remitente, destinatario)
                    {
                        IsBodyHtml = true,
                        Subject = "Restablecimiento de Contraseña",
                        Body = GenerateEmailBody(resetLink),
                        BodyEncoding = Encoding.UTF8
                    })
                    {
                        await smtpClient.SendMailAsync(message);
                    }
                }

                responseSend.Message = "Correo enviado exitosamente";
                responseSend.Status = true;
            }
            catch (Exception ex)
            {
                Addlog($"Error al enviar el correo: {ex}");
                responseSend.Message = ex.Message;
                responseSend.Status = false;
            }
            return responseSend;
        }

        /// <summary>
        /// Genera el cuerpo del correo con el enlace de restablecimiento.
        /// </summary>
        private string GenerateEmailBody(string resetLink)
        {
            return $@"
<!DOCTYPE html>
<html lang=""es"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>Restablecimiento de Contraseña</title>
    <style>
        body {{
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }}
        .container {{
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }}
        .header {{
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eeeeee;
        }}
        .content {{
            padding: 30px 20px;
            text-align: center;
        }}
        h1 {{
            color: #333333;
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 20px;
        }}
        p {{
            margin-bottom: 20px;
            font-size: 16px;
        }}
        .button {{
            display: inline-block;
            background-color: #e87204;
            color: white !important;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0;
        }}
        .expiry {{
            font-size: 14px;
            color: #666666;
            margin-top: 25px;
            font-style: italic;
        }}
        .footer {{
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
            color: #777777;
            font-size: 14px;
        }}
        .security-note {{
            background-color: #f8f9fa;
            border-left: 4px solid #e87204;
            padding: 10px 15px;
            margin: 20px 0;
            text-align: left;
            font-size: 14px;
        }}
    </style>
</head>
<body>
    <div class=""container"">
        <div class=""header"">
            <h1>Restablecimiento de Contraseña</h1>
        </div>
        
        <div class=""content"">
            <p>Hemos recibido una solicitud para restablecer la contraseña de su cuenta.</p>
            
            <p>Haga clic en el siguiente botón para crear una nueva contraseña:</p>
            
            <a href=""{resetLink}"" class=""button"">Restablecer Contraseña</a>
            
            <p class=""expiry"">Este enlace expirará en 30 minutos por razones de seguridad.</p>
            
            <div class=""security-note"">
                <strong>Nota de seguridad:</strong> Si usted no solicitó este cambio de contraseña, por favor ignore este correo o contacte a nuestro equipo de soporte inmediatamente.
            </div>
        </div>
        
        <div class=""footer"">
            <p>© 2024 Su Empresa. Todos los derechos reservados.</p>
            <p>Si tiene problemas con el botón, copie y pegue este enlace en su navegador:<br>
            <span style=""font-size: 12px; color: #999999;"">{resetLink}</span></p>
        </div>
    </div>
</body>
</html>";
        }



public void Addlog(string newlog)
        {
            string Carpetalog = AppDomain.CurrentDomain.BaseDirectory + "Logs//";
            if (!Directory.Exists(Carpetalog))
            {
                Directory.CreateDirectory(Carpetalog);
            }
            string Rutalog = Carpetalog + AppDomain.CurrentDomain.FriendlyName + "_" + DateTime.Now.ToString("dd-MM-yyyy") + ".log";
            var registro = DateTime.Now + "_" + newlog + "\n";
            var bytsNewLog = new UTF8Encoding(true).GetBytes(registro);
            using (FileStream log = File.Open(Rutalog, FileMode.Append))
            {

                log.Write(bytsNewLog,0, bytsNewLog.Length);
            }

        }
        public string[] ValidModel(dynamic collection)
        {
            string[] errores = new string[collection.Count];
            int indice = 0;
            foreach (var item in collection)
            {
                
                    if (item == string.Empty)
                    {
                        errores[indice] = "el campo item es requerido";
                    }
                    indice++;
                
            }
                return errores;
          
        }


        internal object concatMessage(string email)
        {
            throw new NotImplementedException();
        }
        public async Task<(bool Status, string ErrorMessage)> SendEmail(string fromEmail, string toEmail, string subject, string body)
        {
            try
            {
                var smtpClient = new SmtpClient(_configuration["ContactUs:SMTPHost"])
                {
                    Port = int.Parse(_configuration["ContactUs:SMTPPort"]),
                    Credentials = new NetworkCredential(_configuration["ContactUs:SMTPUser"], _configuration["ContactUs:SMTPPassword"]),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(fromEmail),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true,
                };

                mailMessage.To.Add(toEmail);

                await smtpClient.SendMailAsync(mailMessage);

                return (true, null);
            }
            catch (Exception ex)
            {
                // Agregar el log de error
                return (false, ex.Message);
            }
        }
    
  
    }
}
    


