using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
namespace Hrms.Lite.Essp.Shared.DataBank.Generic.Master
{
    public class Provisions : MasterBase
    {
        public bool Applicable { get; set; }
        public decimal? Amount { get; set; }
        public decimal? PerAnnum { get; set; }
        public decimal? OldAmount { get; set; }
        public bool? OldApplicable { get; set; }
    }
}
