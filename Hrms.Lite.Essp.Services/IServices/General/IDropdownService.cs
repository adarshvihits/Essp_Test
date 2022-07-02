using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.IServices.General
{
    public interface IDropdownService
    {
        Task<List<Dropdown>> GetSalutationDropDown();
        Task<List<Dropdown>> GetGenderDropDown();
        Task<List<Dropdown>> GetCategoryDropdown();
        Task<List<Dropdown>> GetCategoryTypeDropdown();
        Task<List<Dropdown>> GetDepartmentDropdown();
        Task<List<Dropdown>> GetDesignationDropdown();
        Task<List<Dropdown>> GetDurationDropdown();
        Task<List<Dropdown>> GetPayrollGroupDropdown();
        Task<List<Dropdown>> GetGradeDropdown();
        Task<List<Dropdown>> GetLocationDropdown();
        Task<List<Dropdown>> GetCountryDropDown();
        Task<List<Dropdown>> GetRegionDropDown();

        Task<List<Dropdown>> GetPTGroupDropDown();
        Task<List<Dropdown>> GetESIGroupDropDown();

        Task<List<Dropdown>> GetLocationTypeDropDown();
        Task<List<Dropdown>> GetStateDropDown(int? CountryCode);
        Task<List<Dropdown>> GetDistrictDropdown(int? StateCode);
        Task<List<Dropdown>> GetBankDropdown();
        Task<List<Dropdown>> GetPaymentModeDropDown();
        Task<List<Dropdown>> GetShiftTypeDropDown();
        Task<List<Dropdown>> GetShiftCategoryDropDown();

        Task<List<Dropdown>> GetShiftDetailsDropdown();
        Task<List<Dropdown>> GetDutyRosterShiftDropdown();
        Task<List<Dropdown>> GetDutyRosterEmployeeWiseShiftDropdown(Guid EmployeeGI);

        Task<List<Dropdown>> GetPunchingMethodDropdown();
        Task<List<Dropdown>> GetAllowanceDropdown();
        Task<List<Dropdown>> GetFamilyRelationDropdown();
        Task<List<Dropdown>> GetBloodGroupDropdown();
        Task<List<Dropdown>> GetMaritalStatusDropdown();
        Task<List<Dropdown>> GetReligiousViewDropdown();
        Task<List<Dropdown>> GetHobbiesViewDropdown();
        Task<List<Dropdown>> GetLanguagesViewDropdown();
        Task<List<Dropdown>> GeEmergencyContactRelationDropdown();

        Task<List<Dropdown>> GetReportingManagerDropdown();
        Task<List<Dropdown>> GetSkillDropDown(int? SkillCode);
        Task<List<Dropdown>> GetQualificationDropDown(int? QualificationCode);
        Task<List<Dropdown>> GetSpecialisationDropDown(int? QualificationCode);
        Task<List<Dropdown>> GetAssetCategoryDropDown();
        Task<List<Dropdown>> GetAssetDropDown(int? AssetCategoryCode);
        Task<List<Dropdown>> GetAssetReturnConditionDropDown();
        Task<List<Dropdown>> GetAssetAllocationFilterDropDown();
        Task<List<Dropdown>> GetEmployeeDropDown();
        Task<List<Dropdown>> GetRewardsDropdown(Guid EmployeeGI);
        Task<List<Dropdown>> GetRewardsRecommendedByDropdown(Guid EmployeeGI);
        Task<List<Dropdown>> GetRewardPointsCriteriaDropdown(int? RewardCode);
        Task<List<Dropdown>> GetRewardsAndRecognitionFilterDropDown();
        Task<List<Dropdown>> GetIncidentTypeDropDown();
        Task<List<Dropdown>> GetActionTakenDropDown();
        Task<List<Dropdown>> GetIncidentDropDown();
        Task<List<Dropdown>> GetTrainingDropDown();
        Task<List<Dropdown>> GetTrainingModeDropDown();
        Task<List<Dropdown>> GetTrainingLogSearchDropDown();
        Task<List<Dropdown>> GetPostAssessmentScoreDropDown();
        Task<List<Dropdown>> GetAppraisalEvaluatorDropDown();
        Task<List<Dropdown>> GetAppraisalEvaluationPeriodDropDown();
        Task<List<Dropdown>> GetAppraisalTypeDropDown();
        Task<List<Dropdown>> GetAppraisalRatingDropDown();
        Task<List<Dropdown>> GetAppraisalRecommendationDropDown();
        Task<List<Dropdown>> GetSalaryVisibilityDropDown();
        Task<List<Dropdown>> GetUserRoleDropDown();
        Task<List<Dropdown>> GetAssetMasterCategoryDropDown();
        Task<List<Dropdown>> GetAssetDepartmentDropDown();
        Task<List<Dropdown>> GetAssetConditionDropDown();
        Task<List<Dropdown>> GetHRPlanningDropDown();
        Task<List<Dropdown>> GetHRPlanningCombination1DropDown(int? HRPlanningCode);
        Task<List<Dropdown>> GetHRPlanningAddNewCombination1DropDown(int? HRPlanningCode);
        Task<List<Dropdown>> GetHRPlanningMonthDropDown();
        Task<List<Dropdown>> GetDocUploadDocTypeDropDown(string Mode);
        Task<List<Dropdown>> GetDocUploadGridDropDown();
        Task<List<Dropdown>> GetApprisalTypeAssesmentModeDropDown();
        Task<List<Dropdown>> GetTriningAssesmentModeDropDown();
        Task<List<Dropdown>> GetTriningTypeDropDown();
        Task<List<Dropdown>> GetJobTransitionTypeDropdown();
        Task<List<Dropdown>> GetJobTransitionReasonDropDown(int Typecode);
        Task<List<Dropdown>> GetRequestTypeDropDown();
        Task<List<Dropdown>> GetRequestLevelDropDown();
        Task<List<Dropdown>> GetRequestAuthorityDropDown();
        Task<List<Dropdown>> GetEditEmployeeInfoListDropDown();
        Task<List<Dropdown>> GetHRPlanningMasterDropDown();
        Task<List<Dropdown>> GetResignationType();
        Task<List<Dropdown>> GetResignationReason(int ResignationTypeCode);
        Task<List<Dropdown>> GetExitcheckStatus();
        Task<List<Dropdown>> GetQualificationTypeDropDown(int QualificationTypeCode);
        Task<List<Dropdown>> GetRequestListDropDown();


        Task<List<Dropdown>> GetMonthDropdown();
        Task<List<Dropdown>> GetAttendanceStatusDropdown();
        Task<List<Dropdown>> GetAttendanceStatusTypeDropdown();
        Task<List<Dropdown>> GetDivisionDropdown();
        Task<List<Dropdown>> GetSectionDropdown();
        Task<List<Dropdown>> GetEmploymentTypeDropdown();
        Task<List<Dropdown>> GetWorkLocationDropdown();
        Task<List<Dropdown>> GetWageGradeDropdown();
        Task<List<Dropdown>> GetEmploymentStatusDropdown();
        Task<List<Dropdown>> GetPersoalDetailsFilterDropdown();
        Task<List<Dropdown>> GetLeaveGroupFilterDropdown();
        Task<List<Dropdown>> GetLeavePeriodFilterDropdown();
        Task<List<Dropdown>> GetLeaveFilterDropdown();
        Task<List<Dropdown>> GetLeaveIncrementTypeDropdown();
        Task<List<Dropdown>> GetLeaveCF_LeaveDropdown();


        Task<List<Dropdown>> GetCalendarYearDropdown();
        Task<List<Dropdown>> GetHolidayTypeDropdown();
        Task<List<Dropdown>> GetHolidaySessionDropdown();
        Task<List<Dropdown>> GetDeductionDropdown();
        Task<List<Dropdown>> GetLoanTypeDropdown();//sree
        Task<List<Dropdown>> GetRepaymentMethodDropdown();//sree
        Task<List<Dropdown>> GetHolidayWageSettingsAllowanceDropdown();//sree-25-04-2022                                       
        Task<List<Dropdown>> GetDutyRosterCircleDropdown();
        Task<List<Dropdown>> GetResignationEmployeeDropDown();
        Task<List<Dropdown>> GetCalculationTypeDropdown();//sree
        Task<List<Dropdown>> GetOvertimeSettingsAllowanceDropdown();
        Task<List<Dropdown>> GetOffdayWageSettingsAllowanceDropdown();

        Task<List<Dropdown>> GetDayStatusDropDown();

        Task<List<Dropdown>> GetDayStatusWithoutSecondHalfDropDown();
        Task<List<Dropdown>> GetLeaveDropDown(string type);

        Task<List<Dropdown>> GetLeaveDropDownWithAll(string type);

        Task<List<Dropdown>> GetLeaveReasonsDropDown();
        Task<List<Dropdown>> GetLeaveReasonsDropDownWithAll();
        Task<List<Dropdown>> GetFinancialYearDropdown();
        Task<List<Dropdown>> GetDateFilter();
        Task<List<Dropdown>> GetJoiningcheckStatusDropdown();
        Task<List<Dropdown>> GetAllowanceType();
        Task<List<Dropdown>> GetApplicableFor();
        Task<List<Dropdown>> GetDeductionType();
        Task<List<Dropdown>> GetAbsenteeismRegularizationDropDown();
        Task<List<Dropdown>> GetEmployeeProfileSummaryGroupByDropDown();
        Task<List<Dropdown>> GetOperators();
        Task<List<Dropdown>> GetPFGroupDropdown();
        Task<List<Dropdown>> GetPFDeductionDropdown();
        Task<List<Dropdown>> GetESIDeductionDropdown();

    }
}

