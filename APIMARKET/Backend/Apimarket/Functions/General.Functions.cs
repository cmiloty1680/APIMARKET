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
    style=""margin: 0; padding: 0; background-color: #f7f7f7; font-family: 'Segoe UI', Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;"">
    <!-- Preheader text (invisible) -->
    <div style=""display: none; max-height: 0px; overflow: hidden;"">
        Restablece tu contraseña de apimarket - Este enlace expirará en 30 minutos
    </div>

    <!-- Email container -->
    <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse: collapse;"">
        <tr>
            <td align=""center"" style=""padding: 30px 0;"">
                <!-- Email content -->
                <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""600""
                    style=""border-collapse: collapse; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); max-width: 600px;"">
                    <!-- Header -->
                    <tr>
                        <td bgcolor=""#030712"" style=""padding: 20px;"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                style=""border-collapse: collapse;"">
                                <tr>
                                    <td align=""left"" valign=""middle"" style=""padding-right: 20px; width: 100px;"">
                                        <img src=""https://i.imgur.com/73rKluM.png"" alt=""Logo de apimarket"" width=""80""
                                            style=""display: block; border-radius: 8px;"" />
                                    </td>
                                    <td align=""left"" valign=""middle"">
                                        <h1
                                            style=""color: #ffffff; font-size: 20px; font-weight: bold; margin: 0; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px;"">
                                            Restablecimiento de Contraseña
                                        </h1>

                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>




                    <!-- Main content -->
                    <tr>
                        <td style=""padding: 40px 30px 20px 30px;"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                style=""border-collapse: collapse;"">
                                <tr>
                                    <td align=""center"">
                                        <h2
                                            style=""color: #333333; font-size: 22px; font-weight: 600; margin: 0 0 20px 0; line-height: 1.4;"">
                                            Hemos recibido una solicitud para restablecer la contraseña de su cuenta
                                        </h2>
                                        <p
                                            style=""color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;"">
                                            Haga clic en el siguiente botón para crear una nueva contraseña:</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align=""center"" style=""padding: 10px 0 30px 0;"">
                                        <table border=""0"" cellpadding=""0"" cellspacing=""0""
                                            style=""border-collapse: separate; border-radius: 8px; background: linear-gradient(to right, #FF5F1F, #FF3A5C);""
                                            class=""button-td"">
                                            <tr>
                                                <td align=""center"" valign=""middle"" style=""padding: 0;"">

                                                    <a href=""{resetLink}""
                                                        style=""display: inline-block; padding: 16px 36px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px; background-color: #FF5F1F; background-image: linear-gradient(to right, #FF5F1F, #FF3A5C); box-shadow: 0 5px 15px rgba(255, 95, 31, 0.3); text-align: center; mso-padding-alt: 16px 36px;"">
                                                        Restablecer Contraseña
                                                    </a>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align=""center"">
                                        <p style=""font-size: 14px; color: #999999; margin: 0; font-style: italic;"">Este
                                            enlace expirará en 30 minutos por razones de seguridad.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style=""padding: 0 30px;"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                style=""border-collapse: collapse;"">
                                <tr>
                                    <td
                                        style=""border-bottom: 1px solid #f0f0f0; font-size: 0; line-height: 0; height: 1px;"">
                                        &nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Security alert -->
                    <tr>
                        <td style=""padding: 30px 30px 20px 30px;"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                style=""border-collapse: collapse; background-color: #fff8f3; border-left: 4px solid #FF5F1F; border-radius: 6px;"">
                                <tr>
                                    <td style=""padding: 20px;"">
                                        <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                            style=""border-collapse: collapse;"">
                                            <tr>
                                                <td style=""padding-left: 15px;"">
                                                    <h3
                                                        style=""color: #FF5F1F; font-weight: 600; font-size: 16px; margin: 0 0 10px 0;"">
                                                        Alerta de seguridad</h3>
                                                    <p
                                                        style=""color: #666666; font-size: 14px; line-height: 1.6; margin: 0;"">
                                                        Si usted no inició este cambio de contraseña, su cuenta podría
                                                        estar comprometida.
                                                        Por favor, contacte inmediatamente a nuestro equipo de soporte
                                                        para proteger su información.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Security tips -->
                    <tr>
                        <td style=""padding: 0 30px 30px 30px;"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                style=""border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden;"">
                                <tr>
                                    <td
                                        style=""padding: 25px 20px 15px 20px; background-color: #f1f5f9; border-bottom: 1px solid #e1e8f0;"">
                                        <h3
                                            style=""color: #334155; font-size: 18px; margin: 0; text-align: center; font-weight: 600;"">
                                            ¡Ayúdanos a mantener tus datos seguros!</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td style=""padding: 20px;"">
                                        <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                            style=""border-collapse: collapse;"">
                                            <tr>
                                                <td width=""50%"" valign=""top""
                                                    style=""padding-bottom: 15px; padding-right: 10px;"">
                                                    <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                                        style=""border-collapse: collapse;"">
                                                        <tr>
                                                            <td width=""40"" valign=""top"">
                                                                <div
                                                                    style=""background-color: rgba(255, 95, 31, 0.1); width: 36px; height: 36px; border-radius: 50%; text-align: center; line-height: 36px; font-size: 18px;"">
                                                                    🔍</div>
                                                            </td>
                                                            <td style=""padding-left: 12px;"">
                                                                <p
                                                                    style=""color: #475569; font-size: 13px; font-weight: 600; margin: 0 0 3px 0;"">
                                                                    Seguridad</p>
                                                                <p
                                                                    style=""color: #64748b; font-size: 13px; margin: 0; line-height: 1.4;"">
                                                                    No diligencies ningún dato en páginas de dudosa
                                                                    procedencia</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td width=""50%"" valign=""top""
                                                    style=""padding-bottom: 15px; padding-left: 10px;"">
                                                    <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                                        style=""border-collapse: collapse;"">
                                                        <tr>
                                                            <td width=""40"" valign=""top"">
                                                                <div
                                                                    style=""background-color: rgba(255, 95, 31, 0.1); width: 36px; height: 36px; border-radius: 50%; text-align: center; line-height: 36px; font-size: 18px;"">
                                                                    🔄</div>
                                                            </td>
                                                            <td style=""padding-left: 12px;"">
                                                                <p
                                                                    style=""color: #475569; font-size: 13px; font-weight: 600; margin: 0 0 3px 0;"">
                                                                    Actualización</p>
                                                                <p
                                                                    style=""color: #64748b; font-size: 13px; margin: 0; line-height: 1.4;"">
                                                                    Realiza el cambio de tu contraseña cada 3 meses</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width=""50%"" valign=""top"" style=""padding-right: 10px;"">
                                                    <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                                        style=""border-collapse: collapse;"">
                                                        <tr>
                                                            <td width=""40"" valign=""top"">
                                                                <div
                                                                    style=""background-color: rgba(255, 95, 31, 0.1); width: 36px; height: 36px; border-radius: 50%; text-align: center; line-height: 36px; font-size: 18px;"">
                                                                    💻</div>
                                                            </td>
                                                            <td style=""padding-left: 12px;"">
                                                                <p
                                                                    style=""color: #475569; font-size: 13px; font-weight: 600; margin: 0 0 3px 0;"">
                                                                    Acceso</p>
                                                                <p
                                                                    style=""color: #64748b; font-size: 13px; margin: 0; line-height: 1.4;"">
                                                                    Hazlo solo a través de nuestro portal web o app</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td width=""50%"" valign=""top"" style=""padding-left: 10px;"">
                                                    <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                                        style=""border-collapse: collapse;"">
                                                        <tr>
                                                            <td width=""40"" valign=""top"">
                                                                <div
                                                                    style=""background-color: rgba(255, 95, 31, 0.1); width: 36px; height: 36px; border-radius: 50%; text-align: center; line-height: 36px; font-size: 18px;"">
                                                                    🔐</div>
                                                            </td>
                                                            <td style=""padding-left: 12px;"">
                                                                <p
                                                                    style=""color: #475569; font-size: 13px; font-weight: 600; margin: 0 0 3px 0;"">
                                                                    Contraseña</p>
                                                                <p
                                                                    style=""color: #64748b; font-size: 13px; margin: 0; line-height: 1.4;"">
                                                                    Agrega caracteres especiales para mayor seguridad
                                                                </p>
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

                    <!-- Footer -->
                    <tr>
                        <td bgcolor=""#030712"" style=""padding: 30px 30px 20px 30px;"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                style=""border-collapse: collapse;"">
                                <tr>
                                    <td align=""center"">
                                        <img src=""https://i.imgur.com/73rKluM.png"" alt=""Logo de apimarket"" width=""100""
                                            style=""display: block; margin-bottom: 20px;"" />

                                        <!-- Social icons -->
                                        <table border=""0"" cellpadding=""0"" cellspacing=""0""
                                            style=""border-collapse: collapse; margin-bottom: 20px;"">
                                            <tr>
                                                <td style=""padding: 0 8px;"">
                                                    <a href=""#""
                                                        style=""display: inline-block; width: 36px; height: 36px; background-color: rgba(255, 255, 255, 0.1); color: white; border-radius: 50%; text-align: center; line-height: 36px; text-decoration: none; font-size: 14px; font-weight: bold;"">X</a>
                                                </td>
                                                <td style=""padding: 0 8px;"">
                                                    <a href=""#""
                                                        style=""display: inline-block; width: 36px; height: 36px; background-color: rgba(255, 255, 255, 0.1); color: white; border-radius: 50%; text-align: center; line-height: 36px; text-decoration: none; font-size: 14px; font-weight: bold;"">f</a>
                                                </td>
                                                <td style=""padding: 0 8px;"">
                                                    <a href=""#""
                                                        style=""display: inline-block; width: 36px; height: 36px; background-color: rgba(255, 255, 255, 0.1); color: white; border-radius: 50%; text-align: center; line-height: 36px; text-decoration: none; font-size: 14px; font-weight: bold;"">ig</a>
                                                </td>
                                                <td style=""padding: 0 8px;"">
                                                    <a href=""#""
                                                        style=""display: inline-block; width: 36px; height: 36px; background-color: rgba(255, 255, 255, 0.1); color: white; border-radius: 50%; text-align: center; line-height: 36px; text-decoration: none; font-size: 14px; font-weight: bold;"">yt</a>
                                                </td>
                                                <td style=""padding: 0 8px;"">
                                                    <a href=""#""
                                                        style=""display: inline-block; width: 36px; height: 36px; background-color: rgba(255, 255, 255, 0.1); color: white; border-radius: 50%; text-align: center; line-height: 36px; text-decoration: none; font-size: 14px; font-weight: bold;"">in</a>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style=""color: #9ca3af; font-size: 14px; margin: 0 0 15px 0;"">© 2024
                                            apimarket. Todos los derechos reservados.</p>

                                        <!-- Footer links -->
                                        <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""
                                            style=""border-collapse: collapse; max-width: 400px;"">
                                            <tr>
                                                <td align=""center"" style=""padding: 0 10px 10px 10px;"">
                                                    <a href=""http://localhost:3000/we""
                                                        style=""color: #FF5F1F; text-decoration: none; font-size: 12px;"">Términos
                                                        y Condiciones</a>
                                                </td>
                                                <td align=""center"" style=""padding: 0 10px 10px 10px;"">
                                                    <a href=""http://localhost:3000/we""
                                                        style=""color: #FF5F1F; text-decoration: none; font-size: 12px;"">Política
                                                        de Privacidad</a>
                                                </td>
                                                <td align=""center"" style=""padding: 0 10px 10px 10px;"">
                                                    <a href=""http://localhost:3000/contact""
                                                        style=""color: #FF5F1F; text-decoration: none; font-size: 12px;"">Contacto</a>
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