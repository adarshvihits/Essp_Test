using Hrms.Lite.Essp.Shared.DataBank.Generic.PersonalDetails;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
    public class PersonalDetails
    {
        public Guid EmployeeGI { get; set; }
        public Enrollment enrollment { get; set; }
        public EmployeeAddress Address { get; set; }
        public EmployeeContactDetails ContactDetails { get; set; }
        public PersonalInfo PersonalInfo { get; set; }
        public List<FamilyDetails> FamilyDetails { get; set; }
        public List<Education> Education { get; set; }
        public List<PreviousEmployment> PreviousEmployment { get; set; }
        public Education GetEducation { get; set; }
        public FamilyDetails GetFamilyDetails { get; set; }
        public Skills Skills { get; set; }
        public Certifications Certifications { get; set; }
        public PreviousEmployment GetPreviousEmployment { get; set; }
        public string TabIndex { get; set; }
        public string SliderName { get; set; }

    }
}
