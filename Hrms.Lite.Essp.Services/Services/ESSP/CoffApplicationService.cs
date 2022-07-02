using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Shared.Essp.Leave;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.Services.ESSP
{
    public class CoffApplicationService : ICoffApplicationService
    {
        private readonly string _baseURL;
        private readonly IServiceBase _httpService;

        public CoffApplicationService(IServiceBase httpService)
        {
            _baseURL = "CoffApplication";
            _httpService = httpService;
        }

        public async Task<CoffBalance> GetLeaveBalance(int leavePeriodCode)
        {
            return await _httpService.GetAsync<CoffBalance>($"{_baseURL}/GetCoffBalance?leavePeriodCode={leavePeriodCode}");
        }

        public async Task<CoffLeaveDetails> GetLeaveDayWiseDetails(string LeaveOn)
        {
            return await _httpService.GetAsync<CoffLeaveDetails>($"{_baseURL}/DayWiseDetails?LeaveOn={LeaveOn}");

        }

        public async Task<CoffBalance> GetAvailableBalance()
        {
            return await _httpService.GetAsync<CoffBalance>($"{_baseURL}/GetAvailableBalance");
        }

        public async Task<CoffApplication> GetLeaveApplicationList(int leavePeriodCode, int Reason, string TabIndex)
        {

            return await _httpService.GetAsync<CoffApplication>($"{_baseURL}/GetCoffApplicationList?leavePeriodCode={leavePeriodCode}&Reason={Reason}&TabIndex={TabIndex}");
        }

        public async Task<CoffApplication> GetTrackerDetails(Guid LeaveApplicationGI)
        {

            return await _httpService.GetAsync<CoffApplication>($"{_baseURL}/GetTrackerDetails?LeaveApplicationGI={LeaveApplicationGI}");

        }

        public async Task<ResponseEntity> SaveLeave(CoffApplication leaveDetails)
        {
            return await _httpService.PostAsync<ResponseEntity, CoffApplication>($"{_baseURL}/SaveCoff", leaveDetails);
        }
    }
}
