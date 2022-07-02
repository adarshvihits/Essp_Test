

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
using Hrms.Lite.Essp.Shared.General;

namespace Hrms.Lite.Essp.Services.Services.ESSP
{
    public class WFHApplicationService : IWFHApplicationService
    {
        private readonly string _baseURL;
        private readonly IServiceBase _httpService;
        public WFHApplicationService(IServiceBase httpService)
        {

            _baseURL = "WFHApplication";
            _httpService = httpService;
        }
        public async Task<LeaveDetails> GetLeaveDayWiseDetails(WFHApplication model)
        {
            return await _httpService.PostAsync<LeaveDetails, WFHApplication>($"{_baseURL}/DayWiseDetails", model);

        }

        public async Task<ResponseEntity> Save(WFHApplication model)
        {
            return await _httpService.PostAsync<ResponseEntity, WFHApplication>($"{_baseURL}/SaveLeave", model);
        }
        //public async Task<WFHApplication> GetLeaveApplicationList(int LeavePeriodCode, int LeaveType, string TabIndex, Filter Filter)
        //{
        //    return await _httpService.PostAsync<WFHApplication, Filter>($"{_baseURL}/GetLeaveApplicationList?LeavePeriodCode={LeavePeriodCode}&LeaveType={LeaveType}&TabIndex={TabIndex}", Filter);
        //}
        public async Task<WFHApplication> GetLeaveApplicationList(int LeavePeriodCode, int LeaveType, string TabIndex)
        {
            return await _httpService.GetAsync<WFHApplication>($"{_baseURL}/GetLeaveApplicationList?LeavePeriodCode={LeavePeriodCode}&LeaveType={LeaveType}&TabIndex={TabIndex}");
        }
        public async Task<WFHApplication> GetTrackerDetails(Guid LeaveApplicationGI)
        {
            return await _httpService.GetAsync<WFHApplication>($"{_baseURL}/GetTrackerDetails?LeaveApplicationGI={LeaveApplicationGI}");
        }
    }

}
