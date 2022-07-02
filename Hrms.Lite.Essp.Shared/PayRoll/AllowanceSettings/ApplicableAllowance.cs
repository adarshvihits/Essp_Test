using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.PayRoll.AllowanceSettings
{
    public class ApplicableAllowance
    {
        public Allowance Allowance { get; set; }
        public List<ApplicableAllowance> ApplicableAllowanceList { get; set; }//sree
      //  public List<Allowance> AllowanceList { get; set; }//sree
      public Filter Filter { get; set; }

    }

}
