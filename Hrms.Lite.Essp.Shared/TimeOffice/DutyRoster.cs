using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using Hrms.Lite.Essp.Shared.TimeOffice.Generic.Master;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using static Hrms.Lite.Essp.Shared.TimeOffice.Generic.TimeOfficeCommon;

namespace Hrms.Lite.Essp.Shared.TimeOffice
{
    public class DutyRoster
    {
        public int EmpId { get; set; }
        public Guid EmployeeGI { get; set; }
        public UserBase User { get; set; }
        public EmployeeHeader EmployeeHeader { get; set; }
        public Month Month { get; set; }
        public PayrollGroup PayrollGroup { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public Circle Circle { get; set; }
        public int TotalRows { get; set; }
        public ShiftDetails ShiftDetails { get; set; }
       
        public DutyRoster_MainList MainList { get; set; }
        public Filter Filter { get; set; }
        public List<dynamic> Data { get; set; }
        //public EmpWiseBatchUpdate EmpWiseBatchUpdate { get; set; }
        public List<Employee_DutyRosterEditDetails> Employee_DutyRosterEditDetails { get; set; }
        public List<DateWise_DutyRosterEditDetails> DateWise_DutyRosterEditDetails { get; set; }

        public List<DutyRoster_EmployeePrimaryInfo> DutyRoster_EmployeePrimaryInfo { get; set; }
    }
    public class DutyRoster_MainList
    {
        public List<Header> Header { get; set; }
        public List<DutyRoster_EmployeePrimaryInfo> EmployeePrimaryInfo { get; set; }
        public List<ShiftDayDetails> ShiftDayDetails { get; set; }

    }
    public class DutyRoster_EmployeePrimaryInfo
    {
        public int EmployeeCode { get; set; }
        public Guid EmployeeGI { get; set; }
        public string EmployeeID { get; set; }
        public string FullName { get; set; }
        public Designation Designation { get; set; }
        public bool Applicability { get; set; }

    }
    public class ShiftDayDetails
    {
        public int ShiftCode { get; set; }
        public string Shift { get; set; }

    }
    public class Employee_DutyRosterEditDetails
    {
        public Guid EmployeeGI { get; set; }
        public Guid DutyRosterGI { get; set; }
        public int DutyRosterCode { get; set; }
        public Month Month { get; set; }
        public DateTime Date { get; set; }
        public string Day { get; set; }
        public ShiftDetails ShiftDetails { get; set; }


    }
    public class DateWise_DutyRosterEditDetails
    {
        public int EmployeeCode { get; set; }
        public Guid EmployeeGI { get; set; }
        public string EmployeeID { get; set; }
        public string FullName { get; set; }
        public Guid DutyRosterGI { get; set; }
        public int DutyRosterCode { get; set; }
        public Month Month { get; set; }
        public DateTime Date { get; set; }
        public string Day { get; set; }
        public ShiftDetails ShiftDetails { get; set; }


    }
}
