using Apimarket.Model;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Apimarket.Functions
{
    public class Func
    {

        public ConfigServer configServer { get; set; }

        public Func(IConfiguration configuration)
        {
            configServer = configuration.GetSection("ConfigServerEmail").Get<ConfigServer>();
        }
        public async Task<ResponseSend> SendEmail(string Emaildestinatario)
        {
            ResponseSend responseSend = new ResponseSend();

            try
            {
                SmtpClient smtpClient = new SmtpClient();
                smtpClient.Host = configServer.HostName;
                smtpClient.Port = configServer.PortHost;
                smtpClient.Credentials = new NetworkCredential(configServer.Email, configServer.Password);
                smtpClient.EnableSsl = true;
                MailAddress remitente = new MailAddress(configServer.Email, configServer.NameAplication, Encoding.UTF8);
                MailAddress Destinatario = new MailAddress(Emaildestinatario);
                MailMessage message = new MailMessage(remitente, Destinatario);

                


                    message.IsBodyHtml = true;
                    message.Subject = "Asunto";
                    message.Body = "<h1>hola</h1>";
                    message.BodyEncoding = Encoding.UTF8;

                    await smtpClient.SendMailAsync(message);



                    responseSend.Message = "se envio correctamente";
                    responseSend.Status = true;
               
            }
            catch (Exception ex)

            {
                responseSend.Message = ex.Message; 
                responseSend.Status = false;
            }
            return responseSend;
        }
    }
}
