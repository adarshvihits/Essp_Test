
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.PayRoll;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hrms.Lite.Essp.Shared.PayRoll.AllowanceSettings;
using Hrms.Lite.Essp.Shared.Master;
using Hrms.Lite.Essp.Shared.Essp;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Shared.Essp.Leave;


namespace Hrms.Lite.Essp.Services.Services.ESSP
{
    public class LeaveApplicationService : ILeaveApplicationService
    {

        private readonly string _baseURL;
        private readonly IServiceBase _httpService;

        public LeaveApplicationService(IServiceBase httpService)
        {
            _baseURL = "LeaveApplication";
            _httpService = httpService;
        }
        public async Task<LeaveDetails> GetLeaveDayWiseDetails(LeaveApplication model)
        {
            return await _httpService.PostAsync<LeaveDetails, LeaveApplication>($"{_baseURL}/DayWiseDetails", model);

            //  return await _httpService.PostFormDataAsync<ResponseEntity<string>, LeaveApplication>($"{_baseURL}/DayWiseDetails", model);

        }


        public async Task<LeaveBalance> GetAvailableBalance(int LeaveType)
        {
            return await _httpService.GetAsync<LeaveBalance>($"{_baseURL}/GetAvailableBalance?leaveCode={LeaveType}");
        }
        public async Task<ResponseEntity> SaveLeave(LeaveApplication model)
        {
            return await _httpService.PostAsync<ResponseEntity, LeaveApplication>($"{_baseURL}/SaveLeave", model);
        }
        public async Task<LeaveApplication> GetLeaveApplicationList(int LeavePeriodCode, int LeaveType, string TabIndex)
        {
            return await _httpService.GetAsync<LeaveApplication>($"{_baseURL}/GetLeaveApplicationList?LeavePeriodCode={LeavePeriodCode}&LeaveType={LeaveType}&TabIndex={TabIndex}");
        }
        public async Task<LeaveApplication> GetTrackerDetails(Guid LeaveApplicationGI)
        {
            return await _httpService.GetAsync<LeaveApplication>($"{_baseURL}/GetTrackerDetails?LeaveApplicationGI={LeaveApplicationGI}");
        }
        async Task<List<LeaveBalance>> ILeaveApplicationService.GetLeaveBalance(int leavePeriodCode, Guid employeeGI)
        {
            return await _httpService.GetAsync<List<LeaveBalance>>($"{_baseURL}/GetLeaveBalance?leavePeriodCode={leavePeriodCode}&employeeGI={employeeGI}");
        }

    }
}
