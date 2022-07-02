using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Services.IServices.General;
using Hrms.Lite.Essp.Shared.Essp.Generic;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.Services.General
{
    public class CommonService : ICommonService
    {
        private readonly string _baseURL;
        private readonly IServiceBase _httpService;
        public CommonService(IServiceBase httpService)
        {
            _baseURL = "Common";
            _httpService = httpService;
        }

        public async Task<ResponseEntity> CheckEmptyDropDown(string Mode)
        {
            return await _httpService.GetAsync<ResponseEntity>($"{_baseURL}/CheckEmptyDropDown?Mode={Mode}");
        }


        public async Task<EmployeeHeader> GetEmployeeCard(int EmpCode)
        {
            return await _httpService.GetAsync<EmployeeHeader>($"{_baseURL}/GetEmployeeCard?EmpCode={EmpCode}");
        }
        public async Task<EmployeeHeader> GetEmployeeHeader(Guid EmployeeGI)
        {
            return await _httpService.GetAsync<EmployeeHeader>($"{_baseURL}/GetEmployeeHeader?EmployeeGI={EmployeeGI}");
        }
        public async Task<AddOnClassification> GetAddOnClassificationApplicability()
        {
            return await _httpService.GetAsync<AddOnClassification>($"{_baseURL}/AddOnClassification_Applicability");
        }
        public async Task<List<Dropdown>> GetDurationWiseFilterSlabDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetDurationWiseFilterDropDown");
        }

        public async Task<ResponseEntity<string>> GetCurrentLeavePeriod()
        {
            return await _httpService.GetAsync<ResponseEntity<string>>($"{_baseURL}/GetCurrentLeavePeriod");
        }
        async Task<List<EmployeeAuthority>> ICommonService.GetEmployeeAuthorityDetails()
        {
            return await _httpService.GetAsync<List<EmployeeAuthority>>($"{_baseURL}/GetEmployeeAuthorityDetails");
        }
        public async Task<ResponseEntity<Int32>> GetCurrentLFinancialYear()
        {
            return await _httpService.GetAsync<ResponseEntity<Int32>>($"{_baseURL}/GetCurrentLFinancialYear");
        }
    }
}
