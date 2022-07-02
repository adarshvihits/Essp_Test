using Hrms.Lite.Essp.Shared.Essp.Leave;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.ESSP.Regularization
{
    public class AttendanceRegularization
    {
        public int AllCount { get; set; }

        public int LeaveCount { get; set; }
        public int OnDutyCount { get; set; }
        public int COFFCount { get; set; }
        public int WFHCount { get; set; }
        public int AttendanceRegularizationCount { get; set; }
        public int PreviousHistoryCount { get; set; }
        public int AttendanceStatusTypeCode { get; set; }
        public EmployeeHeader employeeHeader { get; set; }
        public MasterBase LeaveType { get; set; }
        public MasterBase LeavePeriod { get; set; }
        public List<AttendanceRegularizationList> AttendanceRegularizationList { get; set; }
        public LeaveApplication LeaveApplication { get; set; }
        public List<AttendanceRegularizationMyTeamList> AttendanceRegularizationMyTeamList { get; set; }
        public List<AttendanceRegularizationLeaveBalance> AttendanceRegularizationLeaveBalance { get; set; }
    }

    public class AttendanceRegularizationList
    {
        public string ID { get; set; }
        public string EmployeeName { get; set; }
        public DateTime AppliedOn { get; set; }
        public string Type { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public decimal NoOfDays { get; set; }
        public string Reason { get; set; }
        public int Aging { get; set; }
        public int AttendanceStatusTypeCode { get; set; }
        public string LeaveType { get; set; }
        public string Status { get; set; }
        public Guid LeaveApplicationGI { get; set; }
    }

    public class AttendanceRegularizationMyTeamList
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string LeaveType { get; set; }
        public decimal TotalDays { get; set; }
        public EmployeeHeader employeeHeader { get; set; }
    }

    public class AttendanceRegularizationLeaveBalance
    {
        public string LeaveType { get; set; }
        public decimal Taken { get; set; }
        public decimal Balance { get; set; }
        public decimal Applied { get; set; }

    }
}
