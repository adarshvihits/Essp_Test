using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Services.IServices.Home;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.Services.Home
{
    public class HomeService : IHomeService
    {
        private readonly string _baseURL;
        private readonly IServiceBase _httpService;
        public HomeService(IServiceBase httpService)
        {
            _baseURL = "Home";
            _httpService = httpService;
        }
        public async Task<ResponseEntity> SaveTheme(Theme model)
        {
            return await _httpService.PostAsync<ResponseEntity, Theme>($"{_baseURL}/SaveTheme", model);
        }
        public async Task<Theme> GetTheme()
        {
            return await _httpService.GetAsync<Theme>($"{_baseURL}/GetTheme");
        }
    }
}
