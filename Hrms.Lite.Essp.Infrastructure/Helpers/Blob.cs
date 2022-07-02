using Hrms.Lite.Essp.Shared.General;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Filemodel = Hrms.Lite.Essp.Shared.File;
using System.IO;
using Hrms.Lite.Essp.Shared;
using Hrms.Lite.Essp.Shared.General;

namespace Hrms.Lite.Essp.Infrastructure.Helpers
{
    public class Blob : IBlob
    {
        private readonly Shared.General.Storage _storageConfig;
        private readonly CloudBlobClient _cloudBlobClient;

        #region constructor
        public Blob(IOptions<AppSettings> settings)
        {
            _storageConfig = settings.Value.Storage;
            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(_storageConfig.ConnectionString);
            _cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
        }
        #endregion

        #region uploadtoblob
        public async Task<Filemodel> UploadToAzureAsync(Filemodel file)
        {
            var cloudBlobContainer = _cloudBlobClient.GetContainerReference(_storageConfig.BlobContainer);
            var fileObj = GenerateFileName(file);
            if (await cloudBlobContainer.CreateIfNotExistsAsync())
            {
                await cloudBlobContainer.SetPermissionsAsync(new
                    BlobContainerPermissions
                {
                    PublicAccess =
                    BlobContainerPublicAccessType.Blob
                });
            }
            var cloudBlockBlob =
                cloudBlobContainer.GetBlockBlobReference(fileObj.FileName);
            cloudBlockBlob.Properties.ContentType = fileObj.FileData.ContentType; ;

            await
                cloudBlockBlob.UploadFromStreamAsync(fileObj.FileData.OpenReadStream());
            fileObj.AbsoluteUri = cloudBlockBlob.Uri.AbsoluteUri;
            return fileObj;
        }
        #endregion
        #region private
        private Filemodel GenerateFileName(Filemodel file)
        {
            file.RelativeUri = "73151742-C97D-4439-8D06-599A5328EF66/employee/image";
            var fileName = Path.GetFileName(file.FileData.FileName);
            var fileExtension = Path.GetExtension(file.FileData.FileName);
            file.ActualFileName = fileName;
            file.FileExtension = fileExtension;
            file.FileName = $"{file.RelativeUri}/{Guid.NewGuid().ToString()}{fileExtension}";
            return file;
        }
        #endregion

        #region deletefromblob
        public async Task<bool> Delete(string fileName)
        {
            try
            {
                CloudBlobContainer cloudBlobContainer = _cloudBlobClient.GetContainerReference(_storageConfig.BlobContainer);
                if (await cloudBlobContainer.ExistsAsync())
                {
                    CloudBlob fileToDelete = cloudBlobContainer.GetBlobReference(fileName);
                    await fileToDelete.DeleteAsync();
                }
                return true;
            }
            catch (Exception ex)
            {
                var error = new LogDetails();
                error.Exception = ex.ToString();
                error.Message = $"blob delete error for image {fileName} from container {_storageConfig.BlobContainer}";
                return false;
            }
        }
        #endregion
    }
}
