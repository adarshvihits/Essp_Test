using Hrms.Lite.Essp.Shared.DataBank.Generic;
using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
    public class PreEnrollment
    {
        public int PreEnrollCode { get; set; }
        public Guid? PreEnrollGI { get; set; }
        public EmployeeHeader EmployeeHeader { get; set; }
        public EmployeeBasicInfo BasicInfo { get; set; }
        public EmployeeClassification JobDetails { get; set; }
        public CompensationStructure Compensation { get; set; }
        public ContactDetails PermanentAddress { get; set; }
        public string Mode { get; set; }
        public List<AlreadyExists_OnBoarding> AlreadyExists_OnBoarding { get; set; }
    }
}
