using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic.PersonalDetails
{
    public class PersonalInfo
    {
        public BloodGroup BloodGroup { get; set; }
        public MaritalStatus MaritalStatus { get; set; }
        public Nullable<DateTime> wedding { get; set; }
        public ReligiousView ReligiousView { get; set; }
        public int[] Language { get; set; }
        public int[] Hobbies { get; set; }
    }
}
