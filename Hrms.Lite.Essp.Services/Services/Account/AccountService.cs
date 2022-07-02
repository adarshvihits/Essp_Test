using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Services.IServices.Account;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Account;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.Services.Account
{
    public class AccountService : IAccountService
    {
        private readonly string _baseURL;
        private readonly IServiceBase _httpService;
        public AccountService(IServiceBase httpService)
        {
            _baseURL = "Account";
            _httpService = httpService;
        }
       async Task<ResponseEntity<string>> IAccountService.Login(Login input)
        {
            return await _httpService.PostAsync<ResponseEntity<string>, Login>($"{_baseURL}/Login", input);
        }
        async Task<ResponseEntity<string>> IAccountService.LogHistory(Login input)
        {
            return await _httpService.PostAsync<ResponseEntity<string>, Login>($"{_baseURL}/LogHistory", input);
        }
    }
}
