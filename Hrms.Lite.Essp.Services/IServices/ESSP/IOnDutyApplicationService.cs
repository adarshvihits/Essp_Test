using Hrms.Lite.Essp.Shared.Essp.Leave;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.IServices.ESSP
{
    public interface IOnDutyApplicationService
    {
        public Task<LeaveDetails> GetLeaveDayWiseDetails(OnDutyApplication model);
        Task<OnDutyApplication> GetLeaveApplicationList(int leavePeriodCode, int leaveType, string TabIndex);
        //Task<OnDutyApplication> GetLeaveApplicationList(int leavePeriodCode, int leaveType, string TabIndex, Filter Filter);
        public Task<ResponseEntity> Save(OnDutyApplication model);
        Task<OnDutyApplication> GetTrackerDetails(Guid LeaveApplicationGI);
    }
}
