using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
  public  class JoiningConfirmation
    {
        public Enrollment Enrollment { get; set; }
        public Guid PreEnrollGI { get; set; }
    }
}
