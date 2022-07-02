using Hrms.Lite.Essp.Shared.Essp.Leave;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.IServices.ESSP
{
    public interface ILeaveApplicationService
    {
        //public Task<LeaveApplication> GetLeaveDayWiseDetails(LeaveApplication model);

        public Task<LeaveDetails> GetLeaveDayWiseDetails(LeaveApplication model);
        public Task<ResponseEntity> SaveLeave(LeaveApplication model);
        public Task<LeaveBalance> GetAvailableBalance(int LeaveType);
        Task<LeaveApplication> GetLeaveApplicationList(int leavePeriodCode, int leaveType, string TabIndex);

        Task<LeaveApplication> GetTrackerDetails(Guid LeaveApplicationGI);
        public Task<List<LeaveBalance>> GetLeaveBalance(int leavePeriodCode, Guid employeeGI);


    }
}
