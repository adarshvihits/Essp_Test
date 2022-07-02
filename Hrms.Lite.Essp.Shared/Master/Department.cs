using Hrms.Lite.Essp.Shared.General;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hrms.Lite.Essp.Shared.Master
{
    public class Department:MasterBase
    {
        //public Guid UniqueID { get; set; }
        //public string Name { get; set; }

        //[JsonIgnore]
        //public IFormFile Logo { get; set; }
        //public int salutation { get; set; }
        public int ActiveCount { get; set; }
        public int InactiveCount { get; set; }
        public int PendingCount { get; set; }
        public List<Department> DepartmentList { get; set; }
     
    }
}
