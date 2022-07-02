using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic
{
    public class AttendanceSettings
    {
        public ShiftType ShiftType { get; set; }
        public ShiftDetails ShiftDetails { get; set; }
        public int[] ShiftDetailsIds { get; set; }
        public int? ShiftDetailsId { get; set; }
        public PunchingMethod PunchingMethod { get; set; }
        public int[] PunchingMethodIDs { get; set; }       
    }
}
