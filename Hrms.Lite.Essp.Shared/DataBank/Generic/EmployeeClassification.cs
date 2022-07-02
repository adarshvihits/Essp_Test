using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic
{
    public class EmployeeClassification
    {
        public Location Location { get; set; }
        public Department Department { get; set; }
        public Category Category { get; set; }
        public Grade Grade { get; set; }
        public Designation Designation { get; set; }
        public PayrollGroup PayrollGroup { get; set; }
        public int NoticePeriod { get; set; }
        public string RenewalDate { get; set; }
        public Division Division { get; set; }
        public Section Section { get; set; }
        public EmploymentType EmploymentType { get; set; }
        public WorkLocation WorkLocation { get; set; }
        public WageGradeMaster WageGrade { get; set; }
    }
}
