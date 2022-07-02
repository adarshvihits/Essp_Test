using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
  public  class OnBoarding
    {
        public Guid PreEnrollGI { get; set; }
        public EmployeeHeader EmployeeHeader { get; set; }
        public string CandidateName { get; set; }
        public Department Department { get; set; }
        public Designation Designation { get; set; }
        public Location Location { get; set; }
        public DateTime ExpectedDOJ { get; set; }
        public int DueDays { get; set; }
        public string CheckList { get; set; }
        public string PendingStatus { get; set; }
        public int AllCount { get; set; }
        public int PreenrollmentAppCount { get; set; }
        public int EnrollmentCount { get; set; }
        public int CheckListCount { get; set; }
        public int JoiningConfCount { get; set; }
        public int OverDueCount { get; set; }
        public List<OnBoarding> OnBoardingList { get; set; }
        public FilterSlabComboFill FilterSlabComboFill { get; set; }
        public List<OnBoardingListTabs> OnBoardingListTabs { get; set; }
        public List<JoiningCheckDetails> JoiningCheckDetails_1 { get; set; }
        public List<JoiningCheckDetails> JoiningCheckDetails_2 { get; set; }
        public List<JoiningCheckDetails> JoiningCheckDetails_3 { get; set; }
        public List<JoiningCheckDetails> JoiningCheckDetails_4 { get; set; }
        public List<JoiningCheckDetails> JoiningCheckDetails_5 { get; set; }
        public int TabIndex { get; set; }
        public Filter Filter { get; set; }
    }
    public class OnBoardingListTabs
    {
        public int Code { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }

    }
    public class JoiningCheckDetails
    {
        public Guid PreEnrollGI { get; set; }
        public int SlNo { get; set; }
        public int CheckTypeCode { get; set; }
        public string CheckType { get; set; }
        public int CheckItemCode { get; set; }
        public string CheckItem { get; set; }
        public JoiningCheckStatus JoiningCheckStatus { get; set; }
        public string Remarks { get; set; }
    }
    public class JoiningCheckStatus : MasterBase
    {

    }
}
