using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.ESSP.Regularization;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.Services.ESSP
{
    public class AbsenteeismRegularizationService : IAbsenteeismRegularizationService
    {
        private readonly string _baseURL;
        private readonly IServiceBase _httpService;

        public AbsenteeismRegularizationService(IServiceBase httpService)
        {
            _baseURL = "AbsenteeismRegularization";
            _httpService = httpService;
        }

        async Task<AbsenteeismRegularization> IAbsenteeismRegularizationService.GetAbsenteeismList(int month, string TabIndex)
        {
            return await _httpService.GetAsync<AbsenteeismRegularization>($"{_baseURL}/AbsenteeismList?Month={month}&TabIndex={TabIndex}");
        }
        public async Task<IList<ShiftDetails>> GetShiftDetails()
        {
            return await _httpService.GetAsync<IList<ShiftDetails>>($"{_baseURL}/GetShiftDetails");

        }
        async Task<AbsenteeismRegularization> IAbsenteeismRegularizationService.GetTracker(Guid LeaveGI, string Type)
        {
            return await _httpService.GetAsync<AbsenteeismRegularization>($"{_baseURL}/GetTrackerDetails?LeaveApplicationGI={LeaveGI}&Type={Type}");
        }
    }
}
