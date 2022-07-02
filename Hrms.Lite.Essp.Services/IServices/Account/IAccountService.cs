using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Account;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.IServices.Account
{
 public interface IAccountService
    {
        public Task<ResponseEntity<string>> Login(Login  input);
        public Task<ResponseEntity<string>> LogHistory(Login input);
    }
}
