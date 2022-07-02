using Hrms.Lite.Essp.Shared.DataBank.Generic;
using Hrms.Lite.Essp.Shared.DataBank.Generic.PersonalDetails;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
    public class EmployeeProfile
    {
        public UserBase User { get; set; }
        public FinancialYear FinancialYear { get; set; }
        public int ActiveCount { get; set; }
        public int ResignedCount { get; set; }
        public string DOJ { get; set; }
        public string YOS { get; set; }
        public string ReportingManeger { get; set; }
        public string ReportingManegerDesignation { get; set; }
        public string Languages { get; set; }
        public string Hobbies { get; set; }
        public List<EmployeeProfile_List> EmployeeProfileList { get; set; }
        public EmployeeHeader EmployeeHeader { get; set; }
        public EmployeeAddress Address { get; set; }
        public EmployeeBasicInfo EmployeeBasicInfo { get; set; }
        public EmployeeContactDetails ContactDetails { get; set; }
        public List<Education> Education { get; set; }
        public Skills Skills { get; set; }
        public List<PreviousEmployment> PreviousEmployment { get; set; }
        public CompensationStructure Compensation { get; set; }
        public List<JobTransition_GrowthHistory> GrowthHistory { get; set; }
        public DocumentUpload DocumentUpload { get; set; }
        public List<RequestVsAuthorityLogDetails> AuthorityLogDetails { get; set; }
        public StatutoryClassification Statutory_Payment_Details { get; set; }
        public EmployeeClassification Job_Details { get; set; }
        public List<AssetRequest> AssetRequest { get; set; }
        public List<RewardsRequest> RewardsRequest { get; set; }
        public List<IncidentsAction> IncidentsAction { get; set; }
        public List<TrainingLog> TrainingLog { get; set; }
        public List<AppraisalLog> AppraisalLog { get; set; }
        public CompensationStructure CompensationStructure { get; set; }
        public List<FamilyDetails> FamilyDetails { get; set; }
        public PersonalInfo PersonalInfo { get; set; }
        public List<EmployeeProfile_Attendance> Attendance { get; set; }
        public List<EmployeeProfile_Salary> Salary { get; set; }
        public Filter Filter { get; set; }
    }
    public class EmployeeProfile_List
    {
        public Guid EmployeeGI { get; set; }
        public string Employeeid { get; set; }
        public string EmployeeName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string Location { get; set; }
        public string Category { get; set; }
        public string Gender { get; set; }
        public string Age { get; set; }
        public string YOS { get; set; }
        public Decimal GrossPay { get; set; }
    }
    public class EmployeeProfile_Attendance
    {

        public string Month { get; set; }
        public int TOTALDAYS { get; set; }
        public int PRESENTDAYS { get; set; }
        public int HOLIDAYS { get; set; }
        public int LOP { get; set; }
        public int LEAVE { get; set; }
        public int ATT_PERCENTAGE { get; set; }
        public string ATTENDANCE_CARD { get; set; }

    }
    public class EmployeeProfile_Salary
    {
        public string SalaryPeriod { get; set; }
        public int GrossPay { get; set; }
        public int GrossDeduction { get; set; }
        public int NetPay { get; set; }
        public int LOPAmount { get; set; }
        public string PaySlip { get; set; }

    }
}
