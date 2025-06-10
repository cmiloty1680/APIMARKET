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
<!DOCTYPE html
    PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional//EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
<html xmlns=""http://www.w3.org/1999/xhtml"" lang=""es"">

<head>
    <meta http-equiv=""Content-Type"" content=""text/html; charset=UTF-8"" />
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"" />
    <title>Restablecimiento de Contraseña</title>

</head>

<body
    style=""margin: 0; padding: 0; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); font-family: 'Segoe UI', Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;"">
    <!-- Preheader text (invisible) -->
    <div style=""display: none; max-height: 0px; overflow: hidden;"">
        Restablece tu contraseña de APIMARKET - Este enlace expirará en 30 minutos
    </div>

    <!-- Email container -->
    <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse: collapse;"">
        <tr>
            <td align=""center"" style=""padding: 40px 20px;"">
                <!-- Email content -->
                <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""600""
                    style=""border-collapse: collapse; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); max-width: 600px;"">
                    
                    <!-- Header with gradient -->
                    <tr>
                        <td style=""padding: 0; background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%); position: relative;"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse: collapse;"">
                                <tr>
                                    <td align=""center"" style=""padding: 40px 30px; position: relative;"">
                                        <!-- Decorative elements -->
                                        <div style=""position: absolute; top: 20px; right: 30px; width: 60px; height: 60px; background: rgba(255, 107, 53, 0.1); border-radius: 50%; opacity: 0.6;""></div>
                                        <div style=""position: absolute; bottom: 20px; left: 30px; width: 40px; height: 40px; background: rgba(255, 107, 53, 0.1); border-radius: 50%; opacity: 0.4;""></div>
                                        
                                        <h1 style=""color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);"">
                                            Restablecimiento de Contraseña
                                        </h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Main content -->
                    <tr>
                        <td style=""padding: 50px 40px 30px 40px; background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse: collapse;"">
                                <tr>
                                    <td align=""center"">
                                      <!-- APIMARKET logo -->
                                        <div style=""width: 100px; height: 100px; background: #ffffff; border-radius: 50%; display: inline-block; text-align: center; margin-bottom: 25px; box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3); padding: 10px; border: 3px solid #ff6b35;"">
                                            <img src=""https://i.imgur.com/FlGkkEd.png"" alt=""logo"" style=""width: 100%; height: 100%; object-fit: cover; transform: rotate(-45deg); display: block;"" />
                                        </div>
                                        
                                        <h2 style=""color: #1a1a1a; font-size: 28px; font-weight: 700; margin: 0 0 15px 0; line-height: 1.3;"">
                                            ¡Hola! 👋
                                        </h2>
                                        <p style=""color: #64748b; font-size: 18px; line-height: 1.6; margin: 0 0 35px 0; max-width: 400px;"">
                                            Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <strong style=""color: #ff6b35; font-weight: 600;"">APIMARKET</strong>.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Instructions card -->
                                <tr>
                                    <td style=""padding: 0 0 35px 0;"">
                                        <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                            style=""border-collapse: collapse; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 15px; overflow: hidden; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);"">
                                            <tr>
                                                <td style=""padding: 25px 30px;"">
                                                    <p style=""color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 500; text-align: center;"">
                                                        🔐 Para continuar con el proceso de restablecimiento, haz clic en el botón de abajo:
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Modern button -->
                                <tr>
                                    <td align=""center"" style=""padding: 0 0 35px 0;"">
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v=""urn:schemas-microsoft-com:vml"" xmlns:w=""urn:schemas-microsoft-com:office:word"" href=""{{resetLink}}"" style=""height:60px;v-text-anchor:middle;width:280px;"" arcsize=""50%"" stroke=""f"" fillcolor=""#ff6b35"">
                                        <w:anchorlock/>
                                        <center>
                                        <![endif]-->
                                        <a href=""{resetLink}""
                                            style=""background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff6b35 100%); border-radius: 30px; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 18px; font-weight: 700; line-height: 60px; text-align: center; text-decoration: none; width: 280px; -webkit-text-size-adjust: none; mso-hide: all; box-shadow: 0 12px 35px rgba(255, 107, 53, 0.4); text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease;"">
                                            ✨ Restablecer Contraseña
                                        </a>
                                       
                                        <!--[if mso]>
                                        </center>
                                        </v:roundrect>
                                        <![endif]-->
                                    </td>
                                </tr>
                                
                                <!-- Fallback link -->
                                
                                <tr>
                                    <td align=""center"" style=""padding-top: 25px;"">
                                        <p style=""font-size: 14px; color: #64748b; margin: 0; font-style: italic;"">
                                            ⏰ Este enlace expirará en 30 minutos por razones de seguridad.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Security alert with unified colors -->
                    <tr>
                        <td style=""padding: 0 40px 40px 40px;"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                style=""border-collapse: collapse; background: linear-gradient(135deg, #fff8f0 0%, #ffedd5 100%); border-left: 5px solid #ff6b35; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.2);"">
                                <tr>
                                    <td style=""padding: 25px 30px;"">
                                        <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse: collapse;"">
                                            <tr>
                                                <td width=""50"" valign=""top"">
                                                  <div style=""width: 40px; height: 40px; background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;"">
                                                    <span style=""font-size: 18px; line-height: 1;"">🛡️</span>
                                                  </div>
                                                </td>
                                                <td style=""padding-left: 20px;"">
                                                    <h3 style=""color: #1a1a1a; font-weight: 700; font-size: 16px; margin: 0 0 8px 0;"">
                                                        Nota de seguridad
                                                    </h3>
                                                    <p style=""color: #64748b; font-size: 14px; line-height: 1.5; margin: 0;"">
                                                        Si no solicitaste este cambio, te recomendamos cambiar tu contraseña inmediatamente o contactar con nuestro equipo de soporte.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Help section -->
                    <tr>
                        <td style=""padding: 0 40px 40px 40px;"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse: collapse;"">
                                <tr>
                                    <td align=""center"" style=""border-top: 2px solid #e2e8f0; padding-top: 35px;"">
                                        <div style=""width: 60px; height: 60px; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 50%; display: inline-block; text-align: center; line-height: 60px; font-size: 24px; margin-bottom: 20px;"">
                                            💬
                                        </div>
                                        <h3 style=""color: #1a1a1a; font-size: 20px; font-weight: 700; margin: 0 0 10px 0;"">
                                            ¿Necesitas ayuda?
                                        </h3>
                                        <p style=""color: #64748b; font-size: 16px; line-height: 1.6; margin: 0; max-width: 350px;"">
                                            Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. Estamos aquí para ayudarte.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Modern footer -->
                    <tr>
                        <td style=""padding: 0; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse: collapse;"">
                                <tr>
                                    <td align=""center"" style=""padding: 40px 30px;"">
                                        <!-- APIMARKET logo in footer -->
                                        <p style=""color: #94a3b8; font-size: 16px; margin: 0 0 20px 0; font-weight: 500;"">
                                            © 2024 APIMARKET. Todos los derechos reservados.
                                        </p>

                                        <!-- Footer links with unified styling -->
                                        <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse: collapse; max-width: 400px;"">
                                            <tr>
                                                <td align=""center"" style=""padding: 0 15px 0 15px;"">
                                                    <a href=""http://localhost:3000/we"" style=""color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 8px 16px; background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); border-radius: 20px; display: inline-block; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);"">Términos y Condiciones</a>
                                                </td>
                                                <td align=""center"" style=""padding: 0 15px 0 15px;"">
                                                    <a href=""http://localhost:3000/we"" style=""color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 8px 16px; background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); border-radius: 20px; display: inline-block; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);"">Política de Privacidad</a>
                                                </td>
                                                <td align=""center"" style=""padding: 0 15px 0 15px;"">
                                                    <a href=""http://localhost:3000/contact"" style=""color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 8px 16px; background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); border-radius: 20px; display: inline-block; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);"">Contacto</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
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

                log.Write(bytsNewLog, 0, bytsNewLog.Length);
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