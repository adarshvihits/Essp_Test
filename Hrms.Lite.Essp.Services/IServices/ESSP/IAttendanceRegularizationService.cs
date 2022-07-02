using Hrms.Lite.Essp.Shared.ESSP.Regularization;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.IServices.ESSP
{
    public interface IAttendanceRegularizationService
    {
        public Task<AttendanceRegularization> GetAttendanceRegularizationList(string TabIndex);
        public Task<AttendanceRegularization> GetAttendanceRegularizationPreviousList(int LeavePeriod, int LeaveType);
        public Task<AttendanceRegularization> GetTrackerDetails(Guid LeaveApplicationGI, string Type);
        public Task<ResponseEntity> AttendanceRegularizationApprove(AttendanceRegularization model);
        public Task<ResponseEntity> AttendanceRegularizationReject(AttendanceRegularization model);
    }
}
