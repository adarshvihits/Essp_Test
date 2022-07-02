using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
namespace Hrms.Lite.Essp.Shared.Master
{
    public class WorkLocation : MasterBase
    {
        public int ActiveCount { get; set; }
        public int InactiveCount { get; set; }
        public int PendingCount { get; set; }
        public string EntryType { get; set; }
        public List<WorkLocation> WorkLocationList { get; set; }
    }
}
