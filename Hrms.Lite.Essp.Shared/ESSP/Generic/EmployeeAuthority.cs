using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Essp.Generic
{
    public class EmployeeAuthority
    {
        public string Level { get; set; }
        public string AuthorityName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string AbsoluteUri { get; set; }

        public List<EmployeeAuthority> EmployeeAuthorityList { get; set; }

    }
}
