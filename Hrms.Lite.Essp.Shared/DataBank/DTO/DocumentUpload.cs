using Hrms.Lite.Essp.Shared;
using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
    public class DocumentUpload
    {        
        public string EmpId { get; set; }
        public string EmployeeName { get; set; }
        public Guid EmployeeGI { get; set; }
        public EmployeeHeader EmployeeHeader { get; set; }
        public Designation Designation { get; set; }
        public Department Department { get; set; }
        public Location Location { get; set; }

        public int Tabindex { get; set; }
        public int SearchId { get; set; }
        public int AllTabCount { get; set; }
        public int Update { get; set; }
        public int NotUpdate { get; set; }
        public bool Aadhar { get; set; }
        public bool PAN { get; set; }
        public bool DrivingLicense { get; set; }
        public bool Passport { get; set; }
        public bool Others { get; set; }
        public int AadharDocID { get; set; }
        public string NameInAadhar { get; set; }
        public string AadharNumber { get; set; }
        public DateTime? AadharIssueDate { get; set; }
        public int PANDocID { get; set; }
        public string NameInPAN { get; set; }
        public string PANNumber { get; set; }
        public DateTime? PANIssueDate { get; set; }
        public int DrivingLicenseDocID { get; set; }
        public string NameInDrivingLicense { get; set; }
        public string DrivingLicenseNumber { get; set; }
        public DateTime? DrivingLicenseValidFrom { get; set; }
        public DateTime? DrivingLicenseValidTo { get; set; }
        public int PassportDocID { get; set; }
        public string NameInPassport { get; set; }
        public string PassportNumber { get; set; }
        public DateTime? PassportValidFrom { get; set; }
        public DateTime? PassportValidTo { get; set; }
        public Guid SliderDocumentGI { get; set; }
        public Guid SliderDocumentLogGI { get; set; }
        public string SliderDocumentNo { get; set; }
        public string SliderDocumentName { get; set; }
        public DocType SliderDocumentType { get; set; }
        public DateTime? SliderDateFrom { get; set; }
        public DateTime? SliderDateTo { get; set; }
        public string SliderDescription { get; set; }
        public String Docurl { get; set; }
        public string DocFileName { get; set; }
        public List<OtherDocList> OtherDocList { get; set; }
        public List<DocumentUpload> DocumentUploadList { get; set; }
        public File File { get; set; }
        public string SliderTitle { get; set; }
        public string Mode { get; set; }
        public FilterSlabComboFill FilterCombo { get; set; }
        public Filter Filter { get; set; }
    }
    public class DocType : MasterBase
    {

    }
    public class OtherDocList
    {
        public Guid EmployeeOtherDocumentGI { get; set; }
        public Guid LogGI { get; set; }
        public int EmployeeOtherDocumentId { get; set; }
        public string OtherDocumentName { get; set; }
        public string OtherDocumentType { get; set; }
        public string OtherDocumentDescription { get; set; }
        public DateTime? OtherDocumentDate { get; set; }
    }
}

