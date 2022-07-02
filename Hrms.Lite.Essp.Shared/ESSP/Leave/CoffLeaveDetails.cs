using Hrms.Lite.Essp.Shared.Essp.Generic;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Essp.Leave
{
    public class CoffLeaveDetails
    {
        public decimal LeaveDays { get; set; }
        public decimal WorkingDays { get; set; }
        public decimal Holidays { get; set; }
        public decimal OffDays { get; set; }
        public List<CoffLeaveDayWiseDetails> DayWiseDetails { get; set; }
        public List<EmployeeAuthority> EmployeeAuthority { get; set; }

    }
    public class CoffLeaveDayWiseDetails
    {
        public DateTime EntitleDate{ get; set; }
        //public decimal Opening { get; set; }
        public DateTime ExpiresOn { get; set; }
        public string Day { get; set; }
        //public MasterBase Session { get; set; }
        public string CreditedFor { get; set; }
        public bool CheckStatus { get; set; }
    }
}
