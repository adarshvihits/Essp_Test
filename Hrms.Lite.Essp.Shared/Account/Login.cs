using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Account
{
    public class Login
    {
        public AuthUser authUser { get; set; }
        public string CompanyCode { get; set; }
        public string UserCode { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string CompanyName { get; set; }
        public string MACAddress { get; set; }
        public string INOUT { get; set; }
        public string software { get; set; }
    }
}
