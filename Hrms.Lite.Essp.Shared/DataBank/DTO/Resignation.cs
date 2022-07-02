using Hrms.Lite.Essp.Shared;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
    public class Resignation
    {       
        public int EmpId { get; set; }
        public Guid EmployeeGI { get; set; }
        public EmployeeHeader EmployeeHeader { get; set; }
        public int Count_InNoticePeriod { get; set; }
        public int Count_ResignationAccept { get; set; }
        public int Count_ExitChecklistPending { get; set; }
        public int Count_RelivingPending { get; set; }
        public int Count_RetirementDueList { get; set; }
        public List<ResignationList> ResignationList { get; set; }
        public List<ResignationListTabs> ResignationListTabs { get; set; }
        public ResignationDetails ResignationDetails { get; set; }
        public List<ApprovalPendingDetails> ApprovalPendingDetails { get; set; }
        public List<NoticePeriodDetails> NoticePeriodDetails { get; set; }
        public ExitCheckDetails ExitCheckDetails { get; set; }
        public List<ExitCheckDetails> ExitCheck_Communication { get; set; }
        public List<ExitCheckDetails> ExitCheck_KnowledgeTransfer { get; set; }
        public List<ExitCheckDetails> ExitCheck_Recoveries { get; set; }
        public List<ExitCheckDetails> ExitCheck_ITPermission { get; set; }
        public List<ExitCheckDetails> ExitCheck_Others { get; set; }
        public string ApproveMode { get; set; }
        public Filter Filter { get; set; }

        public static implicit operator List<object>(Resignation v)
        {
            throw new NotImplementedException();
        }
    }

    public class ResignationList
    {
        public int ResignationCode { get; set; }
        public Guid ResignationGI { get; set; }
        public Guid EmployeeGI { get; set; }
        public int EmployeeCode { get; set; }
        public string EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public Designation Designation { get; set; }
        public Department Department { get; set; }
        public Location Location { get; set; }
        public DateTime? DOJ { get; set; }
        public string YOS { get; set; }
        public DateTime? LWD { get; set; }
        public string Reason { get; set; }
        public string Stage { get; set; }
    }
    public class ResignationListTabs
    {
        public int Code { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }

    }
    public class ResignationDetails
    {
        public int ResignationCode { get; set; }
        public Guid ResignationGI { get; set; }
        public ResignationType ResignationType { get; set; }
        public ResignationReason ResignationReason { get; set; }
        public DateTime? ResignationDate { get; set; }
        public DateTime? LastWorkingDate { get; set; }
        public bool Rehire { get; set; }
        public File File { get; set; }
        public string Remarks { get; set; }
        public string AcceptanceRemarks { get; set; }
        public string WorkHandOverDetails { get; set; }

    }
    public class ExitCheckDetails
    {
        public int ResignationCode { get; set; }
        public Guid ResignationGI { get; set; }
        public int SlNo { get; set; }
        public int CheckTypeCode { get; set; }
        public string CheckType { get; set; }
        public int CheckItemCode { get; set; }
        public string CheckItem { get; set; }
        public ExitCheckStatus ExitCheckStatus { get; set; }
        public string Remarks { get; set; }
    }
    public class ApprovalPendingDetails
    {
        public string Description { get; set; }
        public string PendingCount { get; set; }
    }
    public class NoticePeriodDetails
    {
        public string Description { get; set; }
        public string InDays { get; set; }
    }
 
    public class ExitCheckStatus : MasterBase
    {

    }
}

