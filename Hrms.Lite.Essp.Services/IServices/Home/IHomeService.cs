using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.IServices.Home
{
    public interface IHomeService
    {
        public Task<ResponseEntity> SaveTheme(Theme model);
        public Task<Theme> GetTheme();
    }
}
