using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
    public class IndustryBenchmarkSalary
    {
        public int AllCount { get; set; }
        public int GreaterBenchmarkSalaryCount { get; set; }
        public int LessBenchmarkSalaryCount { get; set; }
        public int SameBenchmarkSalaryCount { get; set; }        
        public EmployeeHeader EmployeeHeader { get; set; }
        public Designation Designation { get; set; }
        public Department Department { get; set; }
        public Location Location { get; set; }
        public Category Category { get; set; }
        public string WageGrade { get; set; }
        public decimal CurrentGP { get; set; }
        public decimal BenchmarkGP { get; set; }
        public decimal Variation { get; set; }
        public string Flag { get; set; }
        public List<WageGradeList> WageGradeList { get; set; }
        public List<IndustryBenchmarkSalary> IndustryBenchmarkSalaryList { get; set; }
        public Filter Filter { get; set; }
    }
    public class WageGradeList
    {
        public int Code { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
    }
}
