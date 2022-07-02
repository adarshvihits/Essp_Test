namespace Hrms.Lite.Essp.Shared.General
{
    public class AppSettings
    {
        public string ApiBaseUrl { get; set; }
        public Storage Storage { get; set; }
    }
    public class Storage
    {
        public string ConnectionString { get; set; }
        public string BlobContainer { get; set; }
    }
}
