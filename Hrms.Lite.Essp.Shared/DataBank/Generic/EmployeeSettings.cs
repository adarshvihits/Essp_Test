using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic
{
    public class EmployeeSettings
    {
        public ReportingManager ReportingManager { get; set; }
        public string EmployeeID { get; set; }
        public string PunchingID { get; set; }
    }
}
