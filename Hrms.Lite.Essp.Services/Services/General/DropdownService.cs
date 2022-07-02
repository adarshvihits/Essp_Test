using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Services.IServices.General;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.Services.General
{

    public class DropdownService : IDropdownService
    {
        private readonly string _baseURL;
        private readonly IServiceBase _httpService;
        public DropdownService(IServiceBase httpService)
        {
            _baseURL = "Dropdown";
            _httpService = httpService;
        }
        async Task<List<Dropdown>> IDropdownService.GetSalutationDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/SalutationDropDown");
        }
        async Task<List<Dropdown>> IDropdownService.GetAllowanceDropdown()
        {
            //throw new NotImplementedException();
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/AllowanceDropdown");
        }

        async Task<List<Dropdown>> IDropdownService.GetBankDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/BankDropdown");
        }

        async Task<List<Dropdown>> IDropdownService.GetCategoryDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/CategoryDropdown");
        }
        async Task<List<Dropdown>> IDropdownService.GetCategoryTypeDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/CategoryTypeDropdown");
        }
        async Task<List<Dropdown>> IDropdownService.GetRegionDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/RegionDropdown");
        }

        async Task<List<Dropdown>> IDropdownService.GetLocationTypeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/LocationTypeDropdown");
        }

        async Task<List<Dropdown>> IDropdownService.GetCountryDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/CountryDropdown");
        }


        async Task<List<Dropdown>> IDropdownService.GetDesignationDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/DesignationDropdown");
        }




        async Task<List<Dropdown>> IDropdownService.GetDepartmentDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/DepartmentDropdown");
        }

        async Task<List<Dropdown>> IDropdownService.GetDurationDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/DurationDropdown");
        }

        async Task<List<Dropdown>> IDropdownService.GetDistrictDropdown(int? StateCode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/DistrictDropdown?StateCode={StateCode}");
        }


        async Task<List<Dropdown>> IDropdownService.GetGenderDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GenderDropdown");
        }

        async Task<List<Dropdown>> IDropdownService.GetGradeDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GradeDropdown");
        }

        async Task<List<Dropdown>> IDropdownService.GetLocationDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/LocationDropdown");
        }

        async Task<List<Dropdown>> IDropdownService.GetPaymentModeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/PaymentModeDropDown");
        }

        async Task<List<Dropdown>> IDropdownService.GetPayrollGroupDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/PayrollGroupDropdown");
        }

        async Task<List<Dropdown>> IDropdownService.GetPunchingMethodDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/PunchingMethodDropdown");
        }



        async Task<List<Dropdown>> IDropdownService.GetShiftDetailsDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/ShiftDetailsDropdown");
        }
        async Task<List<Dropdown>> IDropdownService.GetDutyRosterShiftDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/DutyRosterShiftDropdown");
        }

        async Task<List<Dropdown>> IDropdownService.GetShiftTypeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/ShiftTypeDropDown");
        }

        public async Task<List<Dropdown>> GetShiftCategoryDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetShiftCategoryDropDown");
        }

        async Task<List<Dropdown>> IDropdownService.GetStateDropDown(int? CountryCode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/StateDropdown?CountryCode={CountryCode}");
        }

        async Task<List<Dropdown>> IDropdownService.GetFamilyRelationDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/FamilyRelationDropDown");
        }
        async Task<List<Dropdown>> IDropdownService.GetBloodGroupDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/BloodGroupDropDown");
        }
        async Task<List<Dropdown>> IDropdownService.GetMaritalStatusDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/MaritalStatusDropDown");
        }
        async Task<List<Dropdown>> IDropdownService.GetReligiousViewDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/ReligiousViewDropDown");
        }
        async Task<List<Dropdown>> IDropdownService.GetHobbiesViewDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/HobbiesViewDropdown");
        }
        async Task<List<Dropdown>> IDropdownService.GetLanguagesViewDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/LanguagesViewDropdown");
        }
        async Task<List<Dropdown>> IDropdownService.GeEmergencyContactRelationDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/EmergencyContactRelationDropdown");
        }
        async Task<List<Dropdown>> IDropdownService.GetReportingManagerDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/ReportingManagerDropdown");
        }
        async Task<List<Dropdown>> IDropdownService.GetSkillDropDown(int? SkillCode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/SkillDropDown?SkillCode={SkillCode}");
        }
        async Task<List<Dropdown>> IDropdownService.GetQualificationDropDown(int? QualificationCode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/QualificationDropDown?QualificationCode={QualificationCode}");
        }
        async Task<List<Dropdown>> IDropdownService.GetSpecialisationDropDown(int? QualificationCode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/SpecialisationDropDown?QualificationCode={QualificationCode}");
        }
        async Task<List<Dropdown>> IDropdownService.GetAssetCategoryDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAssetCategoryDropDown");
        }
        async Task<List<Dropdown>> IDropdownService.GetAssetDropDown(int? AssetCategoryCode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAssetDropDown?AssetCategoryCode={AssetCategoryCode}");
        }
        async Task<List<Dropdown>> IDropdownService.GetAssetReturnConditionDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAssetReturnConditionDropDown");
        }
        public async Task<List<Dropdown>> GetAssetAllocationFilterDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAssetAllocationFilterDropDown");
        }
        async Task<List<Dropdown>> IDropdownService.GetEmployeeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetEmployeeDropDown");
        }
        async Task<List<Dropdown>> IDropdownService.GetRewardsDropdown(Guid EmployeeGI)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetRewardsDropdown?EmployeeGI={EmployeeGI}");
        }
        public async Task<List<Dropdown>> GetRewardPointsCriteriaDropdown(int? RewardCode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetRewardPointsCriteriaDropdown?RewardCode={RewardCode}");
        }

        public async Task<List<Dropdown>> GetRewardsRecommendedByDropdown(Guid EmployeeGI)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetRewardsRecommendedByDropdown?EmployeeGI={EmployeeGI}");
        }
        public async Task<List<Dropdown>> GetRewardsAndRecognitionFilterDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetRewardsAndRecognitionFilterDropDown");
        }
        public async Task<List<Dropdown>> GetIncidentTypeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetIncidentTypeDropDown");
        }
        public async Task<List<Dropdown>> GetActionTakenDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetActionTakenDropDown");
        }
        public async Task<List<Dropdown>> GetIncidentDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetIncidentDropDown");
        }
        public async Task<List<Dropdown>> GetTrainingDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetTrainingDropDown");
        }
        public async Task<List<Dropdown>> GetTrainingModeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetTrainingModeDropDown");
        }
        public async Task<List<Dropdown>> GetTrainingLogSearchDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetTrainingLogSearchDropDown");
        }
        public async Task<List<Dropdown>> GetPostAssessmentScoreDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetPostAssessmentScoreDropDown");
        }
        public async Task<List<Dropdown>> GetAppraisalEvaluatorDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAppraisalEvaluatorDropDown");
        }

        public async Task<List<Dropdown>> GetAppraisalTypeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAppraisalTypeDropDown");
        }
        public async Task<List<Dropdown>> GetAppraisalRatingDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAppraisalRatingDropDown");
        }
        public async Task<List<Dropdown>> GetAppraisalRecommendationDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAppraisalRecommendationDropDown");
        }
        public async Task<List<Dropdown>> GetSalaryVisibilityDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetSalaryVisibilityDropDown");
        }
        public async Task<List<Dropdown>> GetAppraisalEvaluationPeriodDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAppraisalEvaluationPeriodDropDown");
        }
        public async Task<List<Dropdown>> GetUserRoleDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetUserRoleDropDown");
        }
        public async Task<List<Dropdown>> GetAssetMasterCategoryDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAssetMasterCategoryDropDown");
        }
        public async Task<List<Dropdown>> GetAssetDepartmentDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAssetDepartmentDropDown");
        }
        public async Task<List<Dropdown>> GetAssetConditionDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAssetConditionDropDown");
        }
        public async Task<List<Dropdown>> GetHRPlanningCombination1DropDown(int? HRPlanningCode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetHRPlanningCombination1DropDown?HRPlanningCode={HRPlanningCode}");
        }

        public async Task<List<Dropdown>> GetDocUploadDocTypeDropDown(string Mode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetDocUploadDocTypeDropDown?Mode={Mode}");
        }
        public async Task<List<Dropdown>> GetDocUploadGridDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetDocUploadGridDropDown");
        }
        public async Task<List<Dropdown>> GetHRPlanningDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetHRPlanningDropDown");
        }

        public async Task<List<Dropdown>> GetHRPlanningAddNewCombination1DropDown(int? HRPlanningCode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetHRPlanningAddNewCombination1DropDown?HRPlanningCode={HRPlanningCode}");
        }

        public async Task<List<Dropdown>> GetHRPlanningMonthDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetHRPlanningMonthDropDown");

        }
        public async Task<List<Dropdown>> GetApprisalTypeAssesmentModeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetApprisalTypeAssesmentModeDropDown");

        }
        public async Task<List<Dropdown>> GetTriningAssesmentModeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetApprisalTypeAssesmentModeDropDown");

        }
        public async Task<List<Dropdown>> GetTriningTypeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetTriningTypeDropDown");

        }

        public async Task<List<Dropdown>> GetPTGroupDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetPTGroupDropDown");
        }

        public async Task<List<Dropdown>> GetESIGroupDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetESIGroupDropDown");
        }
        public async Task<List<Dropdown>> GetJobTransitionTypeDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetJobTransitionTypeDropDown");
        }
        public async Task<List<Dropdown>> GetJobTransitionReasonDropDown(int Typecode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetJobTransitionReasonDropDown?TypeCode={Typecode}");
        }

        public async Task<List<Dropdown>> GetRequestTypeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetRequestTypeDropDown");
        }
        public async Task<List<Dropdown>> GetRequestLevelDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetRequestLevelDropDown");
        }
        public async Task<List<Dropdown>> GetRequestAuthorityDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetRequestAuthorityDropDown");
        }
        public async Task<List<Dropdown>> GetEditEmployeeInfoListDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetEditEmployeeInfoListDropDown");
        }
        public async Task<List<Dropdown>> GetHRPlanningMasterDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetHRPlanningMasterDropDown");
        }
        public async Task<List<Dropdown>> GetResignationType()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetResignationType");
        }
        public async Task<List<Dropdown>> GetResignationReason(int ResignationTypeCode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetResignationReason?Type={ResignationTypeCode}");
        }
        public async Task<List<Dropdown>> GetExitcheckStatus()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetExitcheckStatus");
        }
        public async Task<List<Dropdown>> GetQualificationTypeDropDown(int QualificationTypeCode)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/QualificationTypeDropdown?Type ={ QualificationTypeCode}");
        }
        public async Task<List<Dropdown>> GetRequestListDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetRequestListDropDown");
        }

        public async Task<List<Dropdown>> GetMonthDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetMonthDropdown");
        }
        public async Task<List<Dropdown>> GetLoanTypeDropdown()//sree
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetLoanTypeDropdown");
        }
        public async Task<List<Dropdown>> GetRepaymentMethodDropdown()//sree
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetRepaymentMethodDropdown");
        }
        public async Task<List<Dropdown>> GetHolidayWageSettingsAllowanceDropdown()//sree-25-04-2022
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetHolidayWageSettingsAllowanceDropdown");
        }
        public async Task<List<Dropdown>> GetCalculationTypeDropdown()//sree
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetCalculationTypeDropdown");
        }
        public async Task<List<Dropdown>> GetOvertimeSettingsAllowanceDropdown()//sree
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetOvertimeSettingsAllowanceDropdown");
        }

        public async Task<List<Dropdown>> GetOffdayWageSettingsAllowanceDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetOffdayWageSettingsAllowanceDropdown");
        }
        public async Task<List<Dropdown>> GetDeductionDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetVariableDeduction_DeductionDropdown");
        }
        public async Task<List<Dropdown>> GetAttendanceStatusDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAttendanceStatusDropdown");
        }

        public async Task<List<Dropdown>> GetAttendanceStatusTypeDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAttendanceStatusTypeDropdown");
        }
        public async Task<List<Dropdown>> GetDivisionDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetDivisionDropdown");
        }
        public async Task<List<Dropdown>> GetSectionDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetSectionDropdown");
        }
        public async Task<List<Dropdown>> GetEmploymentTypeDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetEmploymentTypeDropdown");
        }
        public async Task<List<Dropdown>> GetWorkLocationDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetWorkLocationDropdown");
        }
        public async Task<List<Dropdown>> GetWageGradeDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetWageGradeDropdown");
        }
        public async Task<List<Dropdown>> GetEmploymentStatusDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetEmploymentStatusDropdown");
        }


        public async Task<List<Dropdown>> GetPersoalDetailsFilterDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetPersoalDetailsFilterDropdown");
        }
        public async Task<List<Dropdown>> GetLeaveGroupFilterDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetLeaveGroupFilterDropdown");
        }
        public async Task<List<Dropdown>> GetLeavePeriodFilterDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetLeavePeriodFilterDropdown");
        }
        public async Task<List<Dropdown>> GetLeaveFilterDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetLeaveFilterDropdown");
        }
        public async Task<List<Dropdown>> GetLeaveIncrementTypeDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetLeaveIncrementTypeDropdown");
        }
        public async Task<List<Dropdown>> GetLeaveCF_LeaveDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetLeaveCF_LeaveDropdown");
        }


        public async Task<List<Dropdown>> GetCalendarYearDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetCalendarYearDropdown");
        }

        public async Task<List<Dropdown>> GetHolidayTypeDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetHolidayTypeDropdown");
        }

        public async Task<List<Dropdown>> GetHolidaySessionDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetHolidaySessionDropdown");
        }

        public async Task<List<Dropdown>> GetDutyRosterCircleDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetDutyRosterCircleDropdown");
        }
        public async Task<List<Dropdown>> GetResignationEmployeeDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetResignationEmployeeDropDown");
        }


        public async Task<List<Dropdown>> GetDayStatusDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/DayStatusDropDown");
        }

        public async Task<List<Dropdown>> GetDayStatusWithoutSecondHalfDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetDayStatusWithoutSecondHalfDropDown");
        }
        public async Task<List<Dropdown>> GetLeaveDropDown(string type)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/LeaveDropDown?type={ type }");
        }

        public async Task<List<Dropdown>> GetLeaveDropDownWithAll(string type)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/LeaveDropDownWithAll?type={ type }");
        }
        public async Task<List<Dropdown>> GetLeaveReasonsDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/LeaveReasonsDropDown");
        }
        public async Task<List<Dropdown>> GetLeaveReasonsDropDownWithAll()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/LeaveReasonsDropDownWithAll");
        }
        public async Task<List<Dropdown>> GetFinancialYearDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetFinancialYearDropdown");
        }

        public async Task<List<Dropdown>> GetDateFilter()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetDateFilter");
        }
        public async Task<List<Dropdown>> GetJoiningcheckStatusDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetJoiningcheckStatus");
        }

        public async Task<List<Dropdown>> GetDutyRosterEmployeeWiseShiftDropdown(Guid EmployeeGI)
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetDutyRosterEmployeeWiseShiftDropdown?EmployeeGI={EmployeeGI}");

        }
        public async Task<List<Dropdown>> GetAllowanceType()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetAllowanceType");
        }
        public async Task<List<Dropdown>> GetApplicableFor()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetApplicableFor");
        }
        public async Task<List<Dropdown>> GetDeductionType()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetDeductionType");
        }
        public async Task<List<Dropdown>> GetAbsenteeismRegularizationDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetRegularizeDropdown");
        }
        public async Task<List<Dropdown>> GetEmployeeProfileSummaryGroupByDropDown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetEmployeeProfileSummaryGroupBy");
        }
        public async Task<List<Dropdown>> GetOperators()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetOperators");
        }
        public async Task<List<Dropdown>> GetPFGroupDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetPFGroupDropdown");
        }
        public async Task<List<Dropdown>> GetPFDeductionDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetPFDeductionDropdown");
        }
        public async Task<List<Dropdown>> GetESIDeductionDropdown()
        {
            return await _httpService.GetAsync<List<Dropdown>>($"{_baseURL}/GetESIDeductionDropdown");
        }
    }
}
