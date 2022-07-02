using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.Essp.Leave
{
    public class CoffBalance
    {
        public MasterBase  LeavePeriod { get; set; } 
        public DateTime EntitleDate { get; set; }
        public string EntitlementType { get; set; }
        public string CreditedFor{ get; set; }
        public decimal AvailableCredit { get; set; }
        public DateTime ExpiresOn { get; set; }
        public decimal Expired { get; set; }
        public decimal Availed { get; set; }
        public decimal Balance { get; set; } 
        public List<CoffBalance> CoffBalanceList { get; set; }
    }
}
