using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Master
{
    public class HRPlanningMaster : MasterBase
    {
        public int ActiveCount { get; set; }
        public int InactiveCount { get; set; }
        public int PendingCount { get; set; }       
        public string Status { get; set; }
        public string EntryType { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public Combination Combination1 { get; set; }
        public Combination Combination2 { get; set; }
        public List<HRPlanningMaster> HRPlanningMasterList { get; set; }
    }
    public class Combination : MasterBase
    {

    }
}