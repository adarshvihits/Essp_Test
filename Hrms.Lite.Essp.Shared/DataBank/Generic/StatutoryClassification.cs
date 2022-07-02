using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;

using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic
{
    public class StatutoryClassification
    {
        public DateTime? PFEnrollDate { get; set; }
        public string PFNumber { get; set; }
        public string UANNumber { get; set; }
        public DateTime? ESIEnrollDate { get; set; }
        public string ESINumber { get; set; }
        public PaymentMode PaymentMode { get; set; }
        public Bank Bank { get; set; }
        public string AccountNo { get; set; }
        public string IFSC { get; set; }
        public string PFApplicability { get; set; }
        public string ESIApplicability { get; set; }
    }
}
