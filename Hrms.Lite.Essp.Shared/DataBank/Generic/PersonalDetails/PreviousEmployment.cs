using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic.PersonalDetails
{
   public class PreviousEmployment
    {
        public Guid PrevEmploymentLogGI { get; set; }
        public string CompanyName { get; set; }
        public string Location { get; set; }
        public string Designation { get; set; }
        public Nullable<DateTime> Fromdate { get; set; }
        public Nullable<DateTime> Todate { get; set; }
        public Decimal? Experience { get; set; }
    }
}
