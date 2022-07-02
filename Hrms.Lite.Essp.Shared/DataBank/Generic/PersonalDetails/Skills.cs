using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic.PersonalDetails
{
   public class Skills
    {
        public Skill Skill { get; set; }
        public SkillType SkillType { get; set; }
        public SkillProficiency SkillProficiency { get; set; }
    }
}
