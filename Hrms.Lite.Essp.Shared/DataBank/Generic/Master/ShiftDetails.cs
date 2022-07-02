using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic.Master
{
    public class ShiftDetails : MasterBase
    {
        public int ActiveCount { get; set; }
        public int InactiveCount { get; set; }
        public int PendingCount { get; set; }
        public string ShiftCode { get; set; }
        public ShiftType ShiftType { get; set; }
        public DutyRosterColor DutyRosterFontColor { get; set; }
        public string ShiftStartTime { get; set; }
        public DutyRosterColor DutyRosterBackgroundColor { get; set; }
        public string ShiftEndTime { get; set; }
        public string BreakHourStartTime { get; set; }
        public string BreakHourEndTime { get; set; }
        public string FullDayHour { get; set; }
        public string HalfDayHour { get; set; }
        public string  BreakHour { get; set; }
        public string ScheduledHour { get; set; }
        public List<ShiftDetails> ShiftList { get; set; }


        //public string StartTimeShift { get; set; }
        //public string EndTimeShift { get; set; }
        //public string BreakHrstartTime { get; set; }
        //public string BreakHrendTime { get; set; }
        //public string FullDayHrs { get; set; }
        //public string HalfDayHrs { get; set; }



    }

    public class DutyRosterColor : MasterBase
    {

    }
}
