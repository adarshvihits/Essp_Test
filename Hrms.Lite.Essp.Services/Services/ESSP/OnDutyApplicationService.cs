
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.PayRoll;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hrms.Lite.Essp.Shared.PayRoll.AllowanceSettings;
using Hrms.Lite.Essp.Shared.Master;
using Hrms.Lite.Essp.Shared.Essp;

using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Shared.Essp.Leave;
using Hrms.Lite.Essp.Shared.General;

namespace Hrms.Lite.Essp.Services.Services.ESSP
{
   

    public class OnDutyApplicationService : IOnDutyApplicationService
    {
        private readonly string _baseURL;
        private readonly IServiceBase _httpService;
        public OnDutyApplicationService(IServiceBase httpService)
        {

            _baseURL = "OnDutyApplication";
            _httpService = httpService;
        }
        public async Task<LeaveDetails> GetLeaveDayWiseDetails(OnDutyApplication model)
        {
            return await _httpService.PostAsync<LeaveDetails, OnDutyApplication>($"{_baseURL}/DayWiseDetails", model);
                      
        }
       
        public async Task<ResponseEntity> Save(OnDutyApplication model)
        {
            return await _httpService.PostAsync<ResponseEntity, OnDutyApplication>($"{_baseURL}/SaveLeave", model);
        }
        public async Task<OnDutyApplication> GetLeaveApplicationList(int LeavePeriodCode, int LeaveType, string TabIndex)
        {
            return await _httpService.GetAsync<OnDutyApplication>($"{_baseURL}/GetLeaveApplicationList?LeavePeriodCode={LeavePeriodCode}&LeaveType={LeaveType}&TabIndex={TabIndex}");
        }
        //public async Task<OnDutyApplication> GetLeaveApplicationList(int LeavePeriodCode, int LeaveType, string TabIndex, Filter Filter)
        //{
        //    return await _httpService.PostAsync<OnDutyApplication, Filter>($"{_baseURL}/GetLeaveApplicationList?LeavePeriodCode={LeavePeriodCode}&LeaveType={LeaveType}&TabIndex={TabIndex}", Filter);
        //}
        public async Task<OnDutyApplication> GetTrackerDetails(Guid LeaveApplicationGI)
        {
            return await _httpService.GetAsync<OnDutyApplication>($"{_baseURL}/GetTrackerDetails?LeaveApplicationGI={LeaveApplicationGI}");
        }
    }
}
