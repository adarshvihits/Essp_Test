using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Shared.ESSP.Regularization;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.Services.ESSP
{
    public class AttendanceRegularizationService : IAttendanceRegularizationService
    {
        private readonly string _baseURL;
        private readonly IServiceBase _httpService;
        public AttendanceRegularizationService(IServiceBase httpService)
        {
            _baseURL = "AttendanceRegularization";
            _httpService = httpService;
        }

        public async Task<ResponseEntity> AttendanceRegularizationApprove(AttendanceRegularization model)
        {
            return await _httpService.PostAsync<ResponseEntity, AttendanceRegularization>($"{_baseURL}/AttendanceRegularizationApprove", model);
        }

        public async Task<ResponseEntity> AttendanceRegularizationReject(AttendanceRegularization model)
        {
            return await _httpService.PostAsync<ResponseEntity, AttendanceRegularization>($"{_baseURL}/AttendanceRegularizationReject", model);
        }

        public async Task<AttendanceRegularization> GetAttendanceRegularizationList(string TabIndex)
        {
            return await _httpService.GetAsync<AttendanceRegularization>($"{_baseURL}/AttendanceRegularizationApprovalList?TabIndex={TabIndex}");
        }

        public async Task<AttendanceRegularization> GetAttendanceRegularizationPreviousList(int LeavePeriod, int LeaveType)
        {
            return await _httpService.GetAsync<AttendanceRegularization>($"{_baseURL}/AttendanceRegularizationPreviousList?LeavePeriod={LeavePeriod}&&LeaveType={LeaveType}");
        }

        public async Task<AttendanceRegularization> GetTrackerDetails(Guid LeaveApplicationGI, string Type)
        {
            return await _httpService.GetAsync<AttendanceRegularization>($"{_baseURL}/GetTrackerDetails?LeaveApplicationGI={LeaveApplicationGI}&&Type={Type}");
        }
    }
}
