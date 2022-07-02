using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.DTO
{
   public class HRPlanning 
    {
        
        public HRPlanningDropdwn HRPlanningName { get; set; }
        public int HRPlanningSettingsId { get; set; }
        public Guid HRPlanningSettingsGI { get; set; }
        public string PlanningPeriod { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDateAddNew { get; set; }
        public DateTime ToDateAddNew { get; set; }
        public HRPlanningDropdwn Combination1 { get; set; }
        public HRPlanningDropdwn Combination1Main { get; set; }
        public int BasedOn { get; set; }
        public DateTime?  PreviousMonth { get; set; }
        public HRPlanningDropdwn Month { get; set; }

        public int Combination1Code { get; set; }
        public int Combination2Code { get; set; }

        public string Combination1Name { get; set; }
        public string Combination2Name { get; set; }
        public string Combination1Label { get; set; }
        public string Combination2Label { get; set; }
        public int CurrentManPower { get; set; }
        public int PlannedManPower { get; set; }
        public int ManPowerVariance { get; set; }
        public int CurrentGP { get; set; }
        public decimal PlannedBudget { get; set; }
        public decimal BudgetVariance { get; set; }

        public List<HRPlanning> HRPlanningList { get; set; }
        public List<HRPlanningSettingsList> HRPlanningSettingsList { get; set; }
    }
    public class HRPlanningSettingsList
    {
        public int Combination2TrnCode { get; set; }
        public string Combination2TrnName { get; set; }
        public int ManPower { get; set; }
        public decimal Budget { get; set; }
    }
    public class HRPlanningDropdwn:MasterBase
    {

    }
}
