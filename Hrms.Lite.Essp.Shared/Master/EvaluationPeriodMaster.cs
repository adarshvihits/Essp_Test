﻿using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Master
{
   public class EvaluationPeriodMaster:MasterBase
    {
        public int ActiveCount { get; set; }
        public int InactiveCount { get; set; }
        public int PendingCount { get; set; }
        public string Status { get; set; }
        public string EntryType { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public List<EvaluationPeriodMaster> EvaluationPeriodMasterList { get; set; }
    }
}
