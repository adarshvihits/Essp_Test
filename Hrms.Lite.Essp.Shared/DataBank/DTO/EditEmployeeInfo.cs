using Hrms.Lite.Essp.Shared.DataBank.Generic;
using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
    public class EditEmployeeInfo
    {
        public Guid EmployeeGI { get; set; }
        public Guid LogGI { get; set; }
        public int EditSummaryCount { get; set; }
        public int AppPendingCount { get; set; }
        public EmployeeHeader EmployeeHeader { get; set; }
        public EmployeeSettings EmployeeSettings { get; set; }
        public EmployeeBasicInfo EmployeeBasicInfo { get; set; }
        public StatutoryClassification StatutoryClassification { get; set; }

        public string Remarks { get; set; }
        public string EntryUser { get; set; }
        public DateTime EntryDateAndTime { get; set; }
        public int EmployeeId { get; set; }
        public List<EditInfoDetailsList> EditInfoDetailsList { get; set; }
        public List<EditInfoList> EditInfoList { get; set; }
        public string ApproveMode { get; set; }
        public FilterSlabComboFill FilterCombo { get; set; }
        public Filter Filter { get; set; }
    }
    public class EditInfoDetailsList
    {
        public string Name { get; set; }
        public string Old { get; set; }
        public string New { get; set; }
    }
    public class EditInfoList
    {
        public Guid EmployeeGI { get; set; }
        public Guid LogGI { get; set; }
        public string EmployeeID { get; set; }
        public string FullName { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string Location { get; set; }
        public DateTime ExpectedDOJ { get; set; }
        public DateTime EditDate { get; set; }
    }
}
