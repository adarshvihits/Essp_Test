using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using Hrms.Lite.Essp.Shared.PayRoll.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.PayRoll
{
    public class LoanIssue
    {
        public int LoanIssueCode { get; set; }
        public int EmpCode { get; set; }//sree
        public Guid LoanIssueGI { get; set; }
        //public UserBase User { get; set; }
        public string EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public Guid EmployeeGI { get; set; }
        public EmployeeHeader EmployeeHeader { get; set; }
        public Designation Designation { get; set; }
        public Department Department { get; set; }
        public Location Location { get; set; }
        public Category Category { get; set; }
        public string LoanType { get; set; }
        public int LoanAmount { get; set; }
        public int Tabindex { get; set; }
        public int AllTabCount { get; set; }
        public int Tab1Count { get; set; }
        public int Tab2Count { get; set; }
        public int Tab3Count { get; set; }
        public int MoreCount { get; set; }
        public int PendingTabCount { get; set; }
        public List<LoanIssueListTabs> LoanIssueListTabs { get; set; }
        public List<LoanIssue> LoanIssuesList { get; set; }
        public LoanIssueRequest LoanIssueRequest { get; set; }
        public LoanIssueDetails LoanIssueDetails { get; set; }
        public List<LoanIssueLog> LoanIssueLogList { get; set; }
        public string Mode { get; set; }
        public Filter Filter { get; set; }
    }
    public class LoanIssueListTabs
    {
        public int Code { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }

    }
    public class LoanIssueRequest
    {
        public LoanType LoanType { get; set; }
        public string Pourpose { get; set; }
        public RepaymentMethod RepaymentMethod { get; set; }
        public int LoanAmount { get; set; }
        public int MonthlyEMI { get; set; }
        public int Tenure { get; set; }
        public DateTime DisbursementDate { get; set; }
        public PayrollMonth RepaymentStartMonth { get; set; }
        public string Remarks { get; set; }
        public List<LoanIssueLog> LoanIssueLog { get; set; }

    }
    public class LoanIssueLog
    {
        public int LoanIssueCode { get; set; }
        public Guid LoanIssueGI { get; set; }
        public int SlNo { get; set; }
        public string LoanType { get; set; }
        public string Pourpose { get; set; }
        public string RepaymentMethod { get; set; }
        public int MonthlyEMI { get; set; }
        public int Tenure { get; set; }
        public int LoanAmount { get; set; }
        public int Balance { get; set; }
        public string Status { get; set; }
    }
    public class LoanIssueDetails
    {
        public int LoanIssueCode { get; set; }
        public Guid LoanIssueGI { get; set; }
        public LoanType LoanType { get; set; }
        public string Pourpose { get; set; }
        public RepaymentMethod RepaymentMethod { get; set; }
        public int LoanAmount { get; set; }
        public int MonthlyEMI { get; set; }
        public int Tenure { get; set; }
        public DateTime DisbursementDate { get; set; }
        public string RepaymentStartMonth { get; set; }
        public int Balance { get; set; }
        public string Status { get; set; }
        public string Remarks { get; set; }
        public PayrollMonth PaymentStartMonth { get; set; }
    }
    public class LoanType : MasterBase
    {

    }
    public class RepaymentMethod : MasterBase
    {

    }
    public class RepaymentStartMonth : MasterBase
    {

    }
}

