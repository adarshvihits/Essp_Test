using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using Hrms.Lite.Essp.Shared.PayRoll.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;


namespace Hrms.Lite.Essp.Shared.PayRoll
{
    public class TDSConfirmation
    {
        public UserBase User { get; set; }
        public int EmployeeCode { get; set; }
        public string EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public Guid EmployeeGI { get; set; }
        public Deduction Deduction { get; set; }
        public PayrollMonth TDSMonth { get; set; }
        public Designation Designation { get; set; }
        public Department Department { get; set; }
        public Location Location { get; set; }
        public decimal Amount { get; set; }
        public List<TDSConfirmation> TDSConfirmationList { get; set; }
        public Filter Filter { get; set; }
    }

}
