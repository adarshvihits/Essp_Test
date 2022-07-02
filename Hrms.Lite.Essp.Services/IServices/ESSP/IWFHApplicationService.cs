using Hrms.Lite.Essp.Shared.Essp.Leave;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.IServices.ESSP
{
    public interface IWFHApplicationService
    {
        public Task<LeaveDetails> GetLeaveDayWiseDetails(WFHApplication model);
        Task<WFHApplication> GetLeaveApplicationList(int leavePeriodCode, int leaveType, string TabIndex);
        public Task<ResponseEntity> Save(WFHApplication model);
        Task<WFHApplication> GetTrackerDetails(Guid LeaveApplicationGI);
    }
}
