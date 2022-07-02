using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.General
{
    public class UserBase
    {
        public Guid UserGuid { get; set; }
        public Guid CompanyGuid { get; set; }
    }
}
