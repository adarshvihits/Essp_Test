using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
namespace Hrms.Lite.Essp.Shared.DataBank.Generic.Master
{
    public class Deduction : MasterBase
    {
        public int? Amount { get; set; }
        public int ActiveCount { get; set; }
        public int InactiveCount { get; set; }
        public int PendingCount { get; set; }

        public List<Deduction> DeductionList { get; set; }
    }
}
