using Hrms.Lite.Essp.Shared;
using Hrms.Lite.Essp.Shared;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Infrastructure.Helpers
{
    public interface IBlob
    {
        Task<File> UploadToAzureAsync(File file);
        Task<bool> Delete(string fileName);
    }
}
