using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
    public class JobTransition
    {
        public int Empcode { get; set; }
        public int HistoryCode { get; set; }
        public Guid HistoryGI { get; set; }
        public Guid EmployeeGI { get; set; }
        public EmployeeHeader EmployeeHeader { get; set; }
        public UserBase User { get; set; }
        public int Tabindex { get; set; }
        public int SearchId { get; set; }
        public int AllTabCount { get; set; }
        public int Tab1Count { get; set; }
        public int Tab2Count { get; set; }
        public int Tab3Count { get; set; }
        public int Tab4Count { get; set; }
        public int MoreCount { get; set; }

        public FilterSlabComboFill Filter { get; set; }
        public Filter SliderFilter { get; set; }
        public List<JobTransitionList> JobTransitionList { get; set; }
        public List<JobTransitionList> JobTransitionConfirmList { get; set; }
        public List<JobTransitionList> JobTransitionDueList { get; set; }
        public List<JobTransitionList> JobTransitionLogList { get; set; }
        public List<JobTransition_Tabs> JobTransition_Tabs { get; set; }
        public List<JobTransition_Tabs> JobTransition_Due_List_Tabs { get; set; }
        public List<JobTransition_GrowthHistory> GrowthHistory { get; set; }
        public List<JobTransition_Allowance> JobTransition_Allowance { get; set; }
        public List<JobTransition_Deduction> JobTransition_Deduction { get; set; }
        public List<JobTransition_StatutoryDeductions> JobTransition_StatutoryDeductions { get; set; }

        public JobTransition_JobDetail JobTransition_JobDetail { get; set; }
        public JobTransition_Approve JobTransition_Approve { get; set; }

    }
    public class JobTransitionList
    {
        public int HistoryCode { get; set; }
        public Guid HistoryGI { get; set; }
        public int EmployeeCode { get; set; }
        public Guid EmployeeGI { get; set; }

        public string EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public Designation Designation { get; set; }
        public Department Department { get; set; }
        public Location Location { get; set; }
        public string TransitionType { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime EffectiveDate { get; set; }
        public DateTime RenewalDate { get; set; }
        public DateTime DOJ { get; set; }
        public int Ageing { get; set; }
    }
    public class JobTransition_Tabs
    {
        public int Code { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }

    }
    public class JobTransition_Approve
    {
        public Guid EmployeeGI { get; set; }
        public Guid HistoryGI { get; set; }
        public string TransitionType { get; set; }
        public string Reason { get; set; }
        public DateTime? EffectiveDate { get; set; }
        public DateTime? OrderDate { get; set; }
        public string PRApplicable { get; set; }
        public string EntryUser { get; set; }
        public  string  EntryDate { get; set; }

        public string ApproverComments { get; set; }
        public string ApproveMode { get; set; }

    }
    public class JobTransition_GrowthHistory
    {
        public Guid HistoryGI { get; set; }
        public Guid EmployeeGI { get; set; }
        public string TransitionType { get; set; }
        public DateTime EffectiveDate { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string Location { get; set; }
        public string Category { get; set; }
        public int GrossPay { get; set; }
    }

    public class JobTransition_JobDetail
    {
        public Guid EmployeeGI { get; set; }
        public JobTransitionsType JobTransitionsType { get; set; }
        public JobTransitionReason JobTransitionReason { get; set; }
        public DateTime? EffectiveDate { get; set; }
        public DateTime? OrderDate { get; set; }
        public PRApplicability PRApplicability { get; set; }
        public Location CurrentLocation { get; set; }
        public Location NewLocation { get; set; }
        public Department CurrentDepartment { get; set; }
        public Department NewDepartment { get; set; }
        public Designation CurrentDesignation { get; set; }
        public Designation NewDesignation { get; set; }
        public Category CurrentCategory { get; set; }
        public Category NewCategory { get; set; }
        public Grade CurrentGrade { get; set; }
        public Grade NewGrade { get; set; }
        public PayrollGroup CurrentPayrollGroup { get; set; }
        public PayrollGroup NewPayrollGroup { get; set; }
        public DateTime CurrentRenewalDate { get; set; }
        public DateTime NewRenewalDate { get; set; }
        public int CurrentNoticePeriod { get; set; }
        public int NewNoticePeriod { get; set; }
        public decimal CurrentGrossSalary { get; set; }
        public decimal NewGrossSalary { get; set; }
        public decimal CurrentCTC { get; set; }
        public decimal NewCTC { get; set; }
        public bool PF { get; set; }
        public bool ESI { get; set; }
        public string Remarks { get; set; }
    }
    public class JobTransition_Allowance
    {
        public int AllowanceCode { get; set; }
        public string AllowanceName { get; set; }
        public string AllowanceType { get; set; }
        public int CurrentAmount { get; set; }
        public int NewAmount { get; set; }
    }
    public class JobTransition_Deduction
    {
        public int DeductionCode { get; set; }
        public string DeductionName { get; set; }
        public int CurrentAmount { get; set; }
        public int NewAmount { get; set; }
    }
    public class JobTransition_StatutoryDeductions
    {
        public int DeductionCode { get; set; }
        public string DeductionName { get; set; }
        public bool Current { get; set; }
        public bool New { get; set; }
    }
}
