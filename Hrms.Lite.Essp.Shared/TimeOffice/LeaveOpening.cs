using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.TimeOffice
{
    public class LeaveOpening
    {
        public EmployeeHeader EmployeeHeader { get; set; }
        public int EmployeeCode { get; set; }
        public string EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public Guid EmployeeGI { get; set; }
        public Designation Designation { get; set; }
        public Department Department { get; set; }
        public Location Location { get; set; }
        public Category Category { get; set; }
        public DateTime DOJ { get; set; }
        public decimal Opening { get; set; }
        public LeavePeriod LeavePeriod { get; set; }
        public LeaveGroup LeaveGroup { get; set; }
        public Leave Leave { get; set; }
        public LeaveOpeningBatchUpDate LeaveOpeningBatchUpDate { get; set; }
        public LeaveOpeningEdit LeaveOpeningEdit { get; set; }
        public List<LeaveOpening> LeaveOpeningList { get; set; }
        public Filter Filter { get; set; }
    }
    public class LeaveOpeningBatchUpDate
    {
        public decimal Opening { get; set; }
        public LeavePeriod LeavePeriod { get; set; }
        public LeaveGroup LeaveGroup { get; set; }
        public Leave Leave { get; set; }
    }
    public class LeaveOpeningEdit
    {
        public Location Location { get; set; }
        public DateTime DOJ { get; set; }
        public decimal Opening { get; set; }
        public LeavePeriod LeavePeriod { get; set; }
        public LeaveGroup LeaveGroup { get; set; }
        public Leave Leave { get; set; }
        public decimal OpeningEdit { get; set; }
    }

}
