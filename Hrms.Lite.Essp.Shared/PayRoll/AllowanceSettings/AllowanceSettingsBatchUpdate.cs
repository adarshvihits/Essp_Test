using System;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.PayRoll.AllowanceSettings
{
    public class AllowanceSettingsBatchUpdate : AllowanceSettingsSave
    {
        public Filter filter { get; set; }
        public Allowance Allowance { get; set; }
    }
}
