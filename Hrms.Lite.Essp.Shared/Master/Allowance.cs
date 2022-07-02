using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Master
{
    public class Allowance : MasterBase
    {
        public int? Amount { get; set; }
        public string AllowanceType { get; set; }

        public int ActiveCount { get; set; }
        public int InactiveCount { get; set; }
        public int PendingCount { get; set; }
        public string EntryType { get; set; }
        public ResponseEntity ResponseEntity { get; set; }
        public List<Allowance> AllowanceList { get; set; }
    }
}
