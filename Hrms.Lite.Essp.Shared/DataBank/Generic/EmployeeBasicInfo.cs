using Hrms.Lite.Essp.Shared;
using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic
{
    public class EmployeeBasicInfo
    {
        public Salutation Salutation { get; set; }
        public string FullName { get; set; }
        public DateTime DOB { get; set; }
        public Gender Gender { get; set; }
        public string FathersName { get; set; }
        public string AdharNo { get; set; }
        public string PanNo { get; set; }
        public DateTime AcceptedDOJ { get; set; }
        public DateTime RenewalDate { get; set; }
        //public ContactDetails ContactDetails { get; set; }
        public File File { get; set; }
    }
}
