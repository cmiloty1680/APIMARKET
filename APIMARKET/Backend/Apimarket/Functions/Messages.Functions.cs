using Apimarket.Model;
using System.Net.Mail;
using System.Net;
using System.Text;
using Apimarket.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;

namespace Apimarket.Functions
{
    public class WelcomeEmailFunctions
    {
        public ConfigServer configServer { get; set; }
        private readonly IConfiguration _configuration;

        public WelcomeEmailFunctions(IConfiguration configuration)
        {
            _configuration = configuration;
            configServer = configuration.GetSection("ConfigServerEmail").Get<ConfigServer>();
        }

        public async Task<ResponseSend> SendWelcomeEmail(string emailDestinatario, string nombreUsuario, string token)
        {
            ResponseSend responseSend = new ResponseSend();
            try
            {
                // Validar parámetros
                if (string.IsNullOrWhiteSpace(emailDestinatario))
                {
                    throw new ArgumentException("El email del destinatario es requerido.");
                }

                if (string.IsNullOrWhiteSpace(nombreUsuario))
                {
                    throw new ArgumentException("El nombre del usuario es requerido.");
                }

                if (string.IsNullOrWhiteSpace(token))
                {
                    throw new ArgumentException("El token de confirmación es requerido.");
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
                    MailAddress destinatario = new MailAddress(emailDestinatario);

                    using (MailMessage message = new MailMessage(remitente, destinatario)
                    {
                        IsBodyHtml = true,
                        Subject = "¡Bienvenido a APIMARKET!",
                        Body = GenerateWelcomeEmailBody(nombreUsuario, token),
                        BodyEncoding = Encoding.UTF8
                    })
                    {
                        await smtpClient.SendMailAsync(message);
                    }
                }

                responseSend.Message = "Correo de bienvenida enviado exitosamente";
                responseSend.Status = true;
            }
            catch (Exception ex)
            {
                Addlog($"Error al enviar el correo de bienvenida: {ex}");
                responseSend.Message = ex.Message;
                responseSend.Status = false;
            }
            return responseSend;
        }

        /// <summary>
        /// Genera el cuerpo del correo de bienvenida con el token de confirmación.
        /// </summary>
        private string GenerateWelcomeEmailBody(string nombreUsuario, string token)
        {
            // URL de confirmación - ajusta según tu frontend
            string confirmationLink = $"http://localhost:3000/responsible/login";

            return $@"
<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional//EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
<html xmlns=""http://www.w3.org/1999/xhtml"" lang=""es"">
<head>
    <meta http-equiv=""Content-Type"" content=""text/html; charset=UTF-8"" />
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"" />
    <title>¡Bienvenido a APIMARKET!</title>
</head>
<body style=""margin: 0; padding: 0; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); font-family: 'Segoe UI', Arial, sans-serif;"">
    <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse: collapse;"">
        <tr>
            <td align=""center"" style=""padding: 40px 20px;"">
                <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""600"" style=""border-collapse: collapse; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); max-width: 600px;"">
                    <tr>
                        <td style=""padding: 0; background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff6b35 100%);"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                <tr>
                                    <td align=""center"" style=""padding: 40px 30px;"">
                                        <h1 style=""color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);"">
                                            ¡Bienvenido a APIMARKET! 🎉
                                        </h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style=""padding: 50px 40px 30px 40px; background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);"">
                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                <tr>
                                    <td align=""center"">
                                        <div style=""width: 100px; height: 100px; background: #ffffff; border-radius: 50%; display: inline-block; margin-bottom: 25px; box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3); padding: 10px; border: 3px solid #ff6b35;"">
                                            <img src=""https://i.imgur.com/FlGkkEd.png"" alt=""logo"" style=""width: 100%; height: 100%; object-fit: cover; transform: rotate(-45deg); display: block;"" />
                                        </div>
                                        <h2 style=""color: #1a1a1a; font-size: 32px; font-weight: 700; margin: 0 0 15px 0; line-height: 1.3;"">
                                            ¡Hola {nombreUsuario}! 👋
                                        </h2>
                                        <p style=""color: #64748b; font-size: 18px; line-height: 1.6; margin: 0 0 35px 0; max-width: 400px;"">
                                            ¡Gracias por unirte a <strong style=""color: #ff6b35;"">APIMARKET</strong>! Tu cuenta ha sido creada exitosamente.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style=""padding: 0 0 35px 0;"">
                                        <table width=""100%"" style=""background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 15px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);"">
                                            <tr>
                                                <td style=""padding: 25px 30px;"">
                                                    <p style=""color: #ffffff; font-size: 16px; text-align: center;"">
                                                        🚀 Tu cuenta ha sido activada. Ya puedes comenzar a usar todas nuestras funcionalidades.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align=""center"" style=""padding: 0 0 35px 0;"">
                                        <a href=""{confirmationLink}"" style=""background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff6b35 100%); border-radius: 30px; color: #ffffff; display: inline-block; font-size: 18px; font-weight: 700; line-height: 60px; text-align: center; text-decoration: none; width: 280px; box-shadow: 0 12px 35px rgba(255, 107, 53, 0.4); text-transform: uppercase;"">
                                            ✨ ¡Empezar ahora!
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align=""center"" style=""padding: 0 0 25px 0;"">
                                        <p style=""color: #64748b; font-size: 14px;"">
                                            Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:
                                        </p>
                                        <p style=""color: #ff6b35; font-size: 12px; font-family: monospace; background: #f8fafc; padding: 10px; border-radius: 5px;"">
                                            {confirmationLink}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align=""center"" style=""padding-top: 25px;"">
                                        <p style=""font-size: 14px; color: #64748b; font-style: italic;"">
                                            🔗 Accede a tu cuenta usando el siguiente enlace.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Aquí puedes seguir con las secciones adicionales del email -->
                </table>
            </td>
        </tr>
    </table>
</body>
</html>";

        }

        /// <summary>
        /// Método para registrar logs específicos de correos de bienvenida
        /// </summary>
        public void Addlog(string newlog)
        {
            string carpetaLog = AppDomain.CurrentDomain.BaseDirectory + "Logs//WelcomeEmails//";
            if (!Directory.Exists(carpetaLog))
            {
                Directory.CreateDirectory(carpetaLog);
            }
            string rutaLog = carpetaLog + "WelcomeEmail_" + DateTime.Now.ToString("dd-MM-yyyy") + ".log";
            var registro = DateTime.Now + "_" + newlog + "\n";
            var bytsNewLog = new UTF8Encoding(true).GetBytes(registro);
            using (FileStream log = File.Open(rutaLog, FileMode.Append))
            {
                log.Write(bytsNewLog, 0, bytsNewLog.Length);
            }
        }
    }
}