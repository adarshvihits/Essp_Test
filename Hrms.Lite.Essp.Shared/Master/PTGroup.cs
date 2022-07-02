﻿using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Master
{
   public class PTGroup:MasterBase
    {
        public int ActiveCount { get; set; }
        public int PendingCount { get; set; }
        public int InActiveCount { get; set; }
        public List<PTGroup> PTGroupList { get; set; }
        public Duration Duration { get; set; }

    }
    public class Duration:MasterBase
    {

    }
}
