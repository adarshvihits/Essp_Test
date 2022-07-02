using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using Hrms.Lite.Essp.Shared.TimeOffice.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.TimeOffice
{
   public class LeaveCreditDebit
    {
        public EmployeeHeader EmployeeHeader { get; set; }
        public int EmployeeCode { get; set; }
        public string EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public Guid EmployeeGI { get; set; }
        public Designation Designation { get; set; }
        public Department Department { get; set; }
        public Location Location { get; set; }
        public Category Category { get; set; }
        public DateTime DOJ { get; set; }
        public decimal Balance { get; set; }
        public decimal AppliedLeave { get; set; }
        public decimal Value { get; set; }
        public LeavePeriod LeavePeriod { get; set; }
        public LeaveGroup LeaveGroup { get; set; }
        public Leave Leave { get; set; }
        public DebitCredit DebitCredit { get; set; }
        public Month Month { get; set; }
        public LeaveCreditDebitBatchUpDate LeaveCreditDebitBatchUpDate { get; set; }
        public LeaveCreditDebitEditDetils LeaveCreditDebitEditDetils { get; set; }
        public List<LeaveCreditDebit> LeaveCreditDebitList { get; set; }    
        public Filter Filter { get; set; }
    }
    public class LeaveCreditDebitBatchUpDate
    {

        public decimal Balance { get; set; }
        public decimal Value { get; set; }
        public LeavePeriod LeavePeriod { get; set; }
        public LeaveGroup LeaveGroup { get; set; }
        public Leave Leave { get; set; }
        public DebitCredit DebitCredit { get; set; }
        public Month Month { get; set; }
    }
    public class LeaveCreditDebitEditDetils
    {
        public decimal Balance { get; set; }
        public decimal Applied { get; set; }
        public decimal Value { get; set; }
        public LeavePeriod LeavePeriod { get; set; }
        public LeaveGroup LeaveGroup { get; set; }
        public Leave Leave { get; set; }
        public DebitCredit DebitCredit { get; set; }
        public Month Month { get; set; }
        public string Remarks { get; set; }
        public List<LeaveCrDrLogDetails> LeaveCrDrLogDetails { get; set; }
    }
    public class LeaveCrDrLogDetails
    {
        public int SlNo { get; set; }
        public DateTime LogDATE { get; set; }
        public string TYPE { get; set; }
        public decimal Opening { get; set; }
        public string Remarks { get; set; }

    }
    public class DebitCredit : MasterBase
    {

    }
}
