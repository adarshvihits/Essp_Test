using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic.PersonalDetails
{
   public class Certifications
    {
        public string Certificate { get; set; }
        public CertificateType CertificateType { get; set; }
        public string IssuedBy { get; set; }
        public Nullable<DateTime> Issued { get; set; }
        public CertificateMode CertificateMode { get; set; }
        public CertificateValidity CertificateValidity { get; set; }
        public Nullable<DateTime> Renewaldate { get; set; }

    }
}
