using Hrms.Lite.Essp.Shared.DataBank.Generic;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
    public class Enrollment
    {
        public int EnrollCode { get; set; }
        public Guid EnrollGUID { get; set; }
        public MasterBase User { get; set; }
        //public EmployeeID Employee { get; set; }
        public bool AddOnClassification_Applicability { get; set; }
        public PreEnrollment PreEnrollment { get; set; }
        public AttendanceSettings AttendanceSettings { get; set; }
        public StatutoryClassification StatutoryClassification { get; set; }
        public EmployeeSettings EmployeeSettings { get; set; }
        public List<AlreadyExists_OnBoarding> AlreadyExists_OnBoarding { get; set; }
    }
    public class AlreadyExists_OnBoarding
    {
        public int Code { get; set; }
        public string Message { get; set; }
    }
}