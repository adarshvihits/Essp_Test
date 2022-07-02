using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Master
{
   public class ResignationReason : MasterBase
    {
        public int ActiveCount { get; set; }
        public int InactiveCount { get; set; }
        public int PendingCount { get; set; }
        public int?[] ResignationReasonTypes { get; set; }
        public List<ResignationReason> ResigantionReasonList { get; set; }
        public ResignationType ResignationType { get; set; }

    }
}
