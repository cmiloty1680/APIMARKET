namespace Apimarket.Model
{
    public class ConfigServer
    {
        public string HostName{ get; set; }
        public int PortHost { get; set; }
        public string Password{ get; set; }
        public string Email{ get; set; }
        public string NameAplication{ get; set; }

    }
    public class ResponseSend
    {
        public bool Status {  get; set; }
        public string Message { get; set; }
    }
    public class PlanEmail
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public ResponseSend Response { get; set; }
        //public string Status { get; set; }
        //public string Message { get; set; }

    }
}
