using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Account
{
    public class AuthUser
    {
        public string CompanyName { get; set; }

        public Guid EmployeeGI { get; set; }
        public string EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string ImageUrl { get; set; }
        [IgnoreDataMember]
        public string PasswordHash { get; set; }
        [IgnoreDataMember]
        public string PasswordSalt { get; set; }
        public string Token { get; set; }
        public string UserType { get; set; }
        public bool IsActive { get; set; }
    }
}
