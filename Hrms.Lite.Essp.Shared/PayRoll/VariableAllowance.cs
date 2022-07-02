using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using Hrms.Lite.Essp.Shared.PayRoll.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.PayRoll
{
   public class VariableAllowance
    {

  
        public int EmployeeCode { get; set; }
        public string EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public Guid EmployeeGI { get; set; }
        public Allowance Allowance { get; set; }
        public PayrollMonth AllowanceMonth { get; set; }
        public Designation Designation { get; set; }
        public Department Department { get; set; }
        public Location Location { get; set; }
        public decimal Amount { get; set; }
        public string Mode { get; set; }
        public VariableAllowanceBatchUpDate VariableAllowanceBatchUpDate { get; set; }
        public List<VariableAllowance> VariableAllowanceList { get; set; }
        public Filter Filter { get; set; }
    }
    public class VariableAllowanceBatchUpDate
    {

        public decimal Amount { get; set; }
        public Allowance Allowance { get; set; }
        public PayrollMonth AllowanceMonth { get; set; }
        public decimal AmountBatchUpdate { get; set; }
    }
}
