using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic.Master
{
    public class Holiday : MasterBase
    {
        public int ActiveCount { get; set; }
        public int PendingCount { get; set; }
        public int InActiveCount { get; set; }
        public List<Holiday> HolidayList { get; set; }

        public CalendarYear Year { get; set; }
        public HolidaySession HolidaySession { get; set; }
        public HolidayType HolidayType { get; set; }
        public DateTime? HolidayDate { get; set; }
        public string HolidayDescription { get; set; }

    }
        public class HolidaySession : MasterBase
        {

        }
        public class HolidayType : MasterBase
        {

        }
   }
