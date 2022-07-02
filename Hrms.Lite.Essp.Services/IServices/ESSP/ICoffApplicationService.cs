using Hrms.Lite.Essp.Shared.Essp.Leave;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.IServices.ESSP
{
    public interface ICoffApplicationService
    {
        Task<ResponseEntity> SaveLeave(CoffApplication leaveDetails);
        Task<CoffLeaveDetails> GetLeaveDayWiseDetails(string LeaveOn);
        Task<CoffBalance> GetAvailableBalance();
        Task<CoffBalance> GetLeaveBalance(int leavePeriodCode);
        Task<CoffApplication> GetLeaveApplicationList(int leavePeriodCode, int Reason, string TabIndex);
        Task<CoffApplication> GetTrackerDetails(Guid LeaveApplicationGI);
    }
}
