using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Essp.Leave
{
    public class LeaveBalance
    {
        public List<LeaveBalance> LeaveBalanceList { get; set; }//aleena

        public string LeaveType { get; set; }
        public string ShortName { get; set; }
        public decimal Openings { get; set; }
        public decimal CarryForward { get; set; }
        public decimal Increment { get; set; }
        public decimal Decrement { get; set; }
        public decimal Taken { get; set; }
        public decimal Balance { get; set; }
        public decimal Applied { get; set; }

        public MasterBase LeavePeriod { get; set; }
    }
}
