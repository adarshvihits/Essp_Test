using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic.PersonalDetails
{
    public class FamilyDetails
    {
        public Guid FamilyLogGI { get; set; }
        public string Name { get; set; }
        public string RelationName { get; set; }
        public FamilyRelation Relation { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Occupation { get; set; }
        public LivingStatus Status { get; set; }
        public string StatusName { get; set; }
    }
}
