﻿using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Master
{
    public class User
    {
        public Guid UserMasterGI { get; set; }
        public Guid LogGI { get; set; }
        public string EmployeeName { get; set; }
        public string Name { get; set; }
        public UserRole UserRole { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public DateTime? ActiveFrom { get; set; }
        public DateTime? ActiveTo { get; set; }
        public bool Active { get; set; }
        public string Remarks { get; set; }
        public int EsspCount { get; set; }
        public int HrCount { get; set; }
        public int NonEmployeeUsersCount { get; set; }
        public int InactiveCount { get; set; }
        public int PendingCount { get; set; }
        public bool FullPermission { get; set; }
        public List<UserList> UserList { get; set; }
        public UserVsEmployeeApplicability UserVsEmployeeApplicability { get; set; }
        public List<ApplicableMenus> ApplicableMenus { get; set; }        
        public string ApproveMode { get; set; }
        public string Mode { get; set; }
        public string UserType { get; set; }
        public int EmployeeCode { get; set; }
        public bool HrmsUser { get; set; }
        public bool EsspUser { get; set; }
    }
    public class UserVsEmployeeApplicability
    {
        public List<Designation> Designation { get; set; }
        public List<Department> Department { get; set; }
        public List<Location> Location { get; set; }
        public List<Category> Category { get; set; }
        public List<Grade> Grade { get; set; }
        public List<PayrollGroup> PayrollGroup { get; set; }
        public List<Division> Division { get; set; }
        public List<Section> Section { get; set; }
        public List<EmploymentType> EmploymentType { get; set; }
        
    }
    public class ApplicableMenus
    {
        public string Module { get; set; }
        public string SubModule { get; set; }
        public string Menus { get; set; }

        //public List<FormPermission> Module { get; set; }
        //public List<FormPermission> SubModule { get; set; }
        //public List<FormPermission> Menus { get; set; }
    }
    public class UserList
    {
        public Guid LogGI { get; set; }
        public Guid UserMasterGI { get; set; }
        public string UserName { get; set; }
        public string EmployeeName { get; set; }
        public DateTime ValidTo { get; set; }
        public DateTime PasswordExpiry { get; set; }
        public string Mode { get; set; }
        public string UserRole { get; set; }
        public string FullPermission { get; set; }
        public string Count { get; set; }
        public string Type { get; set; }
        public string EntryType { get; set; }
        public int EmployeeCode { get; set; }
    }
}

