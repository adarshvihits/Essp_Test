﻿using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
namespace Hrms.Lite.Essp.Shared.Master
{
    public class Grade : MasterBase
    {
        public int ActiveCount { get; set; }
        public int InactiveCount { get; set; }
        public int PendingCount { get; set; }

        public List<Grade> GradeList { get; set; }
    }
}
