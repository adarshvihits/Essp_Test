using Hrms.Lite.Essp.Shared.Essp.Generic;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Essp.Leave
{
   public class LeaveDetails
    {
        public decimal LeaveDays { get; set; }
        public decimal WorkingDays { get; set; }
        public decimal Holidays { get; set; }
        public decimal OffDays { get; set; }
        public List<LeaveDayWiseDetails> DayWiseDetails { get; set; }
        public List<EmployeeAuthority> EmployeeAuthority { get; set; }

    }
    public class LeaveDayWiseDetails
    {
        public DateTime LeaveDate { get; set; }
        public string Day { get; set; }
        public MasterBase Session { get; set; }
        public string LeaveType { get; set; }
        public string Reason { get; set; }
    }
}
