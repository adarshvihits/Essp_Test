using Hrms.Lite.Essp.Shared.Essp.Generic;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Essp.Leave
{
    public class CoffApplication
    {
        public DateTime DateOfApplication { get; set; }
        public decimal AvailableBalance { get; set; }
        public DateTime? LeaveOn { get; set; }
        public MasterBase LeaveType { get; set; }
        public MasterBase LeaveReason { get; set; }
        public string AdditionalRemarks { get; set; }
        public string HandOverDetails { get; set; }
        public string ContactDetails { get; set; }
        public CoffLeaveDetails LeaveDetails { get; set; }
        public CoffBalance CoffBalance { get; set; }
        public MasterBase LeavePeriod { get; set; }

        public File Attachment { get; set; }
        public Guid LeaveApplicationGI { get; set; }
        public int ApproveCount { get; set; }
        public int RejectedCount { get; set; }
        public int PendingCount { get; set; }
        public int TotalCount { get; set; }
        public decimal TotalDays { get; set; }
        public List<Tracker> Tracker { get; set; }
        public List<CoffApplication> LeaveApplicationList { get; set; }
        public string Status { get; set; }
        public DateTime EntitleDate { get; set; }
    }
}
