using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.General
{
    public class EmployeeHeader
    {
        public Guid EmployeeGuid { get; set; }
        public string  EmployeeName {get;set;}
        public string ReportingManager { get; set; }
        public string  EmployeeAbsoluteUri { get; set; }
        public string EmployeeId { get; set; }
        public Designation Designation { get; set; }
        public Department Department { get; set; }
        public Location Location { get; set; }
        public Category Category { get; set; }


    }
}
