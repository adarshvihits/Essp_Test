using Hrms.Lite.Essp.Shared.Essp.Leave;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.TimeOffice;
using Hrms.Lite.Essp.Shared.TimeOffice.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.ESSP.Regularization
{
    public class AbsenteeismRegularization
    {
        public Month Month { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public int DaysCount { get; set; }
        public int PendingCount { get; set; }
        public List<AbsenteeismRegularizationList> AbsenteeismRegularizationList { get; set; }
        public LeaveApplication LeaveApplication { get; set; }
        public List<ShiftDayDetails> ShiftDayDetails { get; set; }

    }
    public class AbsenteeismRegularizationList
    {
        public DateTime Date { get; set; }
        public string AssignedShift { get; set; }
        public string WorkedShift { get; set; }
        public string IN { get; set; }
        public string Out { get; set; }
        public string TotalTime { get; set; }
        public string AttendanceStatus { get; set; }
        public string Reason { get; set; }
        public MasterBase Regularize { get; set; }
        public string Status { get; set; }
        public string LeaveType { get; set; }
        public Guid LeaveApplicationGI { get; set; }
        public int? DayStatusCode { get; set; }
    }
}
