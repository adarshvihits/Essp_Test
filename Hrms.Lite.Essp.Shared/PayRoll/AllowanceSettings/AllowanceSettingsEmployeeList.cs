using Hrms.Lite.Essp.Shared.DataBank.Generic;

using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.TimeOffice;

namespace Hrms.Lite.Essp.Shared.PayRoll.AllowanceSettings
{
    public class AllowanceSettingsEmployeeList
    {
        public EmployeePrimaryInfo Employee { get; set; }
        public string LocationName { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
        public decimal Rate { get; set; }
        public Dropdown CalcType { get; set; }
        public int Count { get; set; }
        public List<AllowanceSettingsEmployeeList> SettingsEmployeeList { get; set; }

    }
}
