using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hrms.Lite.Essp.Infrastructure.Helpers;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Services.IServices.General;
using Hrms.Lite.Essp.Shared.DataBank.Generic.PersonalDetails;
using Hrms.Lite.Essp.Shared.ESSP.MyProfile;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Hrms.Lite.Essp.UI.Areas.ESSP.Controllers
{
    [Area("ESSP")]
    public class MyProfileController : Controller
    {
        private readonly IDropdownService _dropdownService;
        private readonly ICommonService _commonService;
        private readonly IBlob _blob;
        private readonly IMyProfileService _myProfileService;        

        public static class Global
        {
            public static Guid Global_EmpGI;
            public static bool flag = false;
            //public static Filter GlobalFilter;
        }
        public MyProfileController(IMyProfileService myProfileService, IDropdownService dropdownService, ICommonService commonService, IBlob blob)
        {
            _myProfileService = myProfileService;            
            _dropdownService = dropdownService;
            _commonService = commonService;
            _blob = blob;
        }
        public async Task<IActionResult> Index()
        {
            MyProfile model = new MyProfile();
            ViewBag.FinancialYear = new SelectList(await _dropdownService.GetFinancialYearDropdown(), "Code", "Name");
            model = await _myProfileService.GetMyProfileDetails();
            return View(model);
        }
        public async Task<IActionResult> Create(Guid EmployeeGI)
        {
            //await fillDropdown();
            PersonalDetailsDropDown dropmodel = new PersonalDetailsDropDown();
            dropmodel = await _myProfileService.GetPersonalDetailsDropDown();
            MyProfile Model = new MyProfile();
            Global.Global_EmpGI = EmployeeGI;
            Model.EmployeeGI = EmployeeGI;
            ViewBag.Fam = new SelectList(dropmodel.FamilyRelation, "Code", "Name");
            ViewBag.Blo = new SelectList(dropmodel.bloodGroup, "Code", "Name");
            ViewBag.Mar = new SelectList(dropmodel.MaritalStatus, "Code", "Name");
            ViewBag.Rel = new SelectList(dropmodel.Religion, "Code", "Name");
            ViewBag.Con = new SelectList(dropmodel.Relation, "Code", "Name");
            ViewBag.Mar = new SelectList(dropmodel.MaritalStatus, "Code", "Name");
            ViewBag.Sta = new SelectList(dropmodel.Status, "Code", "Name");
            ViewBag.Qty = new SelectList(dropmodel.QualificationType, "Code", "Name");
            ViewBag.Yoc = new SelectList(dropmodel.YearOfCompletion, "Code", "Name");
            ViewBag.Hob = new SelectList(dropmodel.Hobbies, "Code", "Name");
            ViewBag.Lan = new SelectList(dropmodel.Languages, "Code", "Name");
            ViewBag.Ski = new SelectList(dropmodel.Skill, "Code", "Name");
            ViewBag.Skp = new SelectList(dropmodel.SkillProficiency, "Code", "Name");
            ViewBag.Cty = new SelectList(dropmodel.CertificateType, "Code", "Name");
            ViewBag.Cmo = new SelectList(dropmodel.CertificateMode, "Code", "Name");
            ViewBag.Cva = new SelectList(dropmodel.CertificateValidity, "Code", "Name");
            Model = await _myProfileService.GetPersonalDetails();
            if (Model.FamilyDetails[0].DateOfBirth == Convert.ToDateTime("01-Jan-0001"))
            {
                Model.FamilyDetails[0].DateOfBirth = null;
            }
            ViewBag.Cou = new SelectList(await _dropdownService.GetCountryDropDown(), "Code", "Name");
            ViewBag.St = new SelectList(await _dropdownService.GetStateDropDown(Model.Address.PermanentAddress.Country.Code), "Code", "Name");
            ViewBag.Dist = new SelectList(await _dropdownService.GetDistrictDropdown(Model.Address.PermanentAddress.State.Code), "Code", "Name");
            ViewBag.PrSt = new SelectList(await _dropdownService.GetStateDropDown(Model.Address.PresentAddress.Country.Code), "Code", "Name");
            ViewBag.PrDist = new SelectList(await _dropdownService.GetDistrictDropdown(Model.Address.PresentAddress.State.Code), "Code", "Name");
            ViewBag.Sty = new SelectList(await _dropdownService.GetSkillDropDown(Model.Skills.Skill.Code), "Code", "Name");
            ViewBag.Qua = new SelectList(await _dropdownService.GetQualificationDropDown(0), "Code", "Name");
            ViewBag.Spc = new SelectList(await _dropdownService.GetSpecialisationDropDown(0), "Code", "Name");
            return View("~/Areas/ESSP/Views/MyProfile/Create.cshtml", Model);
        }
        [HttpGet]
        public async Task<JsonResult> GetState(int id)
        {
            var State = new SelectList(await _dropdownService.GetStateDropDown(id), "Code", "Name");
            return Json(State);
        }
        [HttpGet]
        public async Task<JsonResult> GetDistrict(int id)
        {
            var District = new SelectList(await _dropdownService.GetDistrictDropdown(id), "Code", "Name");
            return Json(District);
        }
        [HttpGet]
        public async Task<JsonResult> GetSkill(int id)
        {
            var Skill = new SelectList(await _dropdownService.GetSkillDropDown(id), "Code", "Name");
            return Json(Skill);
        }

        [HttpGet]
        public async Task<JsonResult> GetQualification(int id)
        {
            var Qualification = new SelectList(await _dropdownService.GetQualificationDropDown(id), "Code", "Name");
            return Json(Qualification);
        }
        [HttpGet]
        public async Task<JsonResult> GetSpecialisation(int id)
        {
            var Specialisation = new SelectList(await _dropdownService.GetSpecialisationDropDown(id), "Code", "Name");
            return Json(Specialisation);
        }
        [HttpPost]
        public async Task<IActionResult> Create(MyProfile model)
        {

            //model.EmployeeGI = "04252427-0CD1-4F08-8560-3BB1332DE98C";             
            var response = await _myProfileService.SaveMyProfileDetails(model);

            if (response.Success == true)
            {
                if (model.SliderName == "Modify")
                {
                    response.Message = "Modified Successfully";
                    return Json(response);
                }
                else
                {
                    response.Message = "Saved Successfully";
                    return Json(response);
                }
            }
            return Json(response);
        }

        public async Task<IActionResult> EducationSave(Guid LogGI)
        {

            MyProfile model = new MyProfile();
            PersonalDetailsDropDown dropmodel = new PersonalDetailsDropDown();
            dropmodel = await _myProfileService.GetPersonalDetailsDropDown();
            ViewBag.Qty = new SelectList(dropmodel.QualificationType, "Code", "Name");
            ViewBag.Yoc = new SelectList(dropmodel.YearOfCompletion, "Code", "Name");
            if (LogGI != Guid.Parse("00000000-0000-0000-0000-000000000000"))
            {
                model = await _myProfileService.GetMyProfileEducation(LogGI);
                model.SliderName = "Modify";
                ViewBag.Qua = new SelectList(await _dropdownService.GetQualificationDropDown(model.GetEducation.QualificationType.Code), "Code", "Name");
                ViewBag.Spc = new SelectList(await _dropdownService.GetSpecialisationDropDown(model.GetEducation.Qualification.Code), "Code", "Name");
                return PartialView("_EducationSave", model);
            }
            model.SliderName = "Save";
            ViewBag.Qua = new SelectList(await _dropdownService.GetQualificationDropDown(0), "Code", "Name");
            ViewBag.Spc = new SelectList(await _dropdownService.GetSpecialisationDropDown(0), "Code", "Name");

            return PartialView("_EducationSave", model);
        }
        public async Task<IActionResult> FamilySave(Guid LogGI)
        {

            MyProfile model = new MyProfile();
            PersonalDetailsDropDown dropmodel = new PersonalDetailsDropDown();
            dropmodel = await _myProfileService.GetPersonalDetailsDropDown();
            model.SliderName = "Save";
            if (LogGI != Guid.Parse("00000000-0000-0000-0000-000000000000"))
            {
                model = await _myProfileService.GetMyProfileFamily(LogGI);
                model.SliderName = "Modify";
            }
            ViewBag.Fam = new SelectList(dropmodel.FamilyRelation, "Code", "Name");
            ViewBag.Sta = new SelectList(dropmodel.Status, "Code", "Name");

            return PartialView("_FamilyDetailsSave", model);

        }
        public async Task<IActionResult> PrevEmploymentSave(Guid LogGI)
        {

            MyProfile model = new MyProfile();
            model.SliderName = "Save";
            if (LogGI != Guid.Parse("00000000-0000-0000-0000-000000000000"))
            {
                model = await _myProfileService.GetMyProfilePrevEmployment(LogGI);
                model.SliderName = "Modify";
            }
            return PartialView("_PreviousEmploymentSave", model);

        }

        [HttpPost]
        public async Task<IActionResult> familyCreate(string Name, int relation, DateTime dob, string occupation, int status, string Tabindex, Guid EmpGI, Guid fmlyGI)
        {
            MyProfile model = new MyProfile();
            model.EmployeeGI = EmpGI;
            model.TabIndex = Tabindex;
            model.GetFamilyDetails = new FamilyDetails();
            model.GetFamilyDetails.Relation = new Shared.DataBank.Generic.Master.FamilyRelation();
            model.GetFamilyDetails.Status = new Shared.DataBank.Generic.Master.LivingStatus();
            model.GetFamilyDetails.Name = Name;
            model.GetFamilyDetails.Relation.Code = relation;
            model.GetFamilyDetails.DateOfBirth = dob;
            model.GetFamilyDetails.Occupation = occupation;
            model.GetFamilyDetails.Status.Code = status;
            model.GetFamilyDetails.FamilyLogGI = fmlyGI;
            var response = await _myProfileService.SaveMyProfileDetails(model);
            if (response.Success == true)
            {
                if (Guid.Parse("00000000-0000-0000-0000-000000000000") != fmlyGI)
                {
                    response.Message = "Modified Successfully";
                    return Json(response);
                }
                else
                {
                    response.Message = "Saved Successfully";
                    return Json(response);
                }
            }
            return Json(response);
        }
        [HttpPost]
        public async Task<IActionResult> PreviousEmploymentCreate(string company, string location, string designation, DateTime from, DateTime to, decimal exp, string Tabindex, Guid EmpGI, Guid prevEmpGI)
        {
            MyProfile model = new MyProfile();
            model.EmployeeGI = EmpGI;
            model.TabIndex = Tabindex;
            model.GetPreviousEmployment = new PreviousEmployment();
            model.GetPreviousEmployment.CompanyName = company;
            model.GetPreviousEmployment.Location = location;
            model.GetPreviousEmployment.Designation = designation;
            model.GetPreviousEmployment.Fromdate = from;
            model.GetPreviousEmployment.Todate = to;
            model.GetPreviousEmployment.Experience = exp;
            model.GetPreviousEmployment.PrevEmploymentLogGI = prevEmpGI;
            var response = await _myProfileService.SaveMyProfileDetails(model);
            if (response.Success == true)
            {
                if (Guid.Parse("00000000-0000-0000-0000-000000000000") != prevEmpGI)
                {
                    response.Message = "Modified Successfully";
                    return Json(response);
                }
                else
                {
                    response.Message = "Saved Successfully";
                    return Json(response);
                }
            }
            return Json(response);
        }

        public async Task<IActionResult> GetFamilyList(Guid EmployeeGI)
        {
            MyProfile model = new MyProfile();
            model.GetFamilyDetails = new FamilyDetails();
            PersonalDetailsDropDown dropmodel = new PersonalDetailsDropDown();
            dropmodel = await _myProfileService.GetPersonalDetailsDropDown();
            Guid EmpGI = Global.Global_EmpGI;
            model = await _myProfileService.GetPersonalDetails();
            ViewBag.Fam = new SelectList(dropmodel.FamilyRelation, "Code", "Name");
            ViewBag.Sta = new SelectList(dropmodel.Status, "Code", "Name");
            return PartialView("_FamilyDetails", model);
        }

        public async Task<IActionResult> GetEducationList()
        {
            MyProfile model = new MyProfile();
            PersonalDetailsDropDown dropmodel = new PersonalDetailsDropDown();
            dropmodel = await _myProfileService.GetPersonalDetailsDropDown();
            model = await _myProfileService.GetPersonalDetails();
            ViewBag.Qty = new SelectList(dropmodel.QualificationType, "Code", "Name");
            ViewBag.Yoc = new SelectList(dropmodel.YearOfCompletion, "Code", "Name");
            ViewBag.Qua = new SelectList(await _dropdownService.GetQualificationDropDown(0), "Code", "Name");
            ViewBag.Spc = new SelectList(await _dropdownService.GetSpecialisationDropDown(0), "Code", "Name");
            return PartialView("_Education", model);
        }
        public async Task<IActionResult> GetPreviousEmploymentList()
        {
            MyProfile model = new MyProfile();
            PersonalDetailsDropDown dropmodel = new PersonalDetailsDropDown();
            dropmodel = await _myProfileService.GetPersonalDetailsDropDown();
            model = await _myProfileService.GetPersonalDetails();
            return PartialView("_PreviousEmployment", model);
        }

        [HttpPost]
        public async Task<IActionResult> EducationDelete(Guid LogGI)
        {

            var response = await _myProfileService.DeleteMyProfileEducation(LogGI);
            if (response.Success == true)
            {

                response.Message = "Deleted Successfully";
                return Json(response);

            }
            return Json(response);
        }
        [HttpPost]
        public async Task<IActionResult> FamilyDelete(Guid LogGI)
        {

            var response = await _myProfileService.DeleteMyProfileFamilyDetails(LogGI);
            if (response.Success == true)
            {

                response.Message = "Deleted Successfully";
                return Json(response);

            }
            return Json(response);
        }
        public async Task<IActionResult> PrevEmploymentDelete(Guid LogGI)
        {

            var response = await _myProfileService.DeleteMyProfilePrevEmployment(LogGI);
            if (response.Success == true)
            {

                response.Message = "Deleted Successfully";
                return Json(response);

            }
            return Json(response);
        }

    }
}
