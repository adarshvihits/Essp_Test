﻿using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Globalization;
using Microsoft.AspNetCore.Http;
using ClosedXML.Excel;
using System.IO;
using System.Collections.Generic;
using System.Linq;

using Hrms.Lite.Essp.Shared.Master;
using Hrms.Lite.Essp.Services.IServices.General;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Infrastructure.Helpers;
using Hrms.Lite.Essp.Shared.Essp.Leave;
using Hrms.Lite.Essp.Shared.Essp.Generic;

namespace Hrms.Lite.UI.Areas.ESSP.Controllers
{
    [Area("ESSP")]
    public class WFHApplicationController : Controller
    {
        private readonly IDropdownService _dropdownService;
        private readonly IWFHApplicationService _WFHApplicationService;
        private readonly ICommonService _commonService;
        private readonly IBlob _blob;
        public static class Global
        {
            public static int LeavePeriod;
            public static int LeaveGroup;
            public static int Leave;
            public static Filter GlobalFilter;

        }
        public WFHApplicationController(IWFHApplicationService WFHApplicationService, IDropdownService dropdownService, ICommonService commonService, IBlob blob)
        {
            _WFHApplicationService = WFHApplicationService;
            _dropdownService = dropdownService;
            _commonService = commonService;
            _blob = blob;
        }
        public async Task<IActionResult> Index()
        {
            WFHApplication model = new WFHApplication();

            EmployeeAuthority emodel = new EmployeeAuthority();//sree

            model.FromType = new MasterBase();
            model.ToType = new MasterBase();

            ViewBag.SessionTo = new SelectList(await _dropdownService.GetDayStatusWithoutSecondHalfDropDown(), "Code", "Name");

            //  ViewBag.ODLeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("od"), "Code", "Name");

            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");
            ViewBag.Session = new SelectList(await _dropdownService.GetDayStatusDropDown(), "Code", "Name");


            model.ToType = new MasterBase();


            //  ViewBag.LeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("Leave"), "Code", "Name");
            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            ViewBag.Date = DateTime.Now.Date.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture);
            model.DateOfApplication = DateTime.Now.Date;

            model.FromType.Code = 1;//Full day
            model.ToType.Code = 1;//Full day

            await fillfilterDropdown();

            emodel.EmployeeAuthorityList = await _commonService.GetEmployeeAuthorityDetails();

            model.EmployeeAuthority = emodel.EmployeeAuthorityList;

            return View(model);

        }
        public async Task<IActionResult> AbsenteeismBasedIndex(DateTime FromTodate, int status)
        {
            WFHApplication model = new WFHApplication();
            model.FromType = new MasterBase();
            model.ToType = new MasterBase();
            ViewBag.SessionToSecondHalf = new SelectList(await _dropdownService.GetDayStatusWithoutSecondHalfDropDown(), "Code", "Name");

            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            ViewBag.LeavePeriod = new SelectList(await _dropdownService.GetLeavePeriodFilterDropdown(), "Code", "Name");

            model.FromType = new MasterBase();
            model.ToType = new MasterBase();

            ViewBag.WFHLeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("WFH"), "Code", "Name");

            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");
            ViewBag.Session = new SelectList(await _dropdownService.GetDayStatusDropDown(), "Code", "Name");
            var SessionTo = new SelectList(await _dropdownService.GetDayStatusDropDown(), "Code", "Name");

            model.ToType = new MasterBase();
            ViewBag.SessionTo = new SelectList(SessionTo.Where(o => o.Value != "3"), "Code", "Name");

            ViewBag.LeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("Leave"), "Code", "Name");
            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            ViewBag.Date = DateTime.Now.Date.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture);
            model.DateOfApplication = DateTime.Now.Date;
            model.From = FromTodate;
            model.To = FromTodate;
            model.FromType.Code = status;//Full day
            model.ToType.Code = 1;//Full day

            return View("Index", model);

        }

        //[HttpPost]
        public async Task<IActionResult> GetLeaveDayWiseDetails(DateTime DateOfApplication, DateTime fromDate, int SessionFrom, DateTime ToDate, int SessionTo)
        {
            //WFHApplication model = new WFHApplication();


            //model.FromType = new MasterBase();
            //model.ToType = new MasterBase();

            //model.DateOfApplication = DateOfApplication;

            //model.FromType.Code = SessionFrom;
            //model.ToType.Code = SessionTo;
            //model.From = fromDate;
            //model.To = ToDate;

            ////dateformat issue
            //string DateFrom = fromDate.ToString("dd-MMM-yyyy");
            //string DateTo = ToDate.ToString("dd-MMM-yyyy");
            //model.From = Convert.ToDateTime(DateFrom);
            //model.To = Convert.ToDateTime(DateTo);

            //model.LeaveDetails = await _WFHApplicationService.GetLeaveDayWiseDetails(model);


            //ViewBag.SessionToSecondHalf = new SelectList(await _dropdownService.GetDayStatusWithoutSecondHalfDropDown(), "Code", "Name");

            //ViewBag.Session = new SelectList(await _dropdownService.GetDayStatusDropDown(), "Code", "Name");
            //ViewBag.WFHLeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("Leave"), "Code", "Name");
            //ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            //ViewBag.Date = DateTime.Now.Date.ToString("dd-MMMM-yyyy", CultureInfo.InvariantCulture);
            //ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");


            //EmployeeAuthority modelempauth = new EmployeeAuthority();

            //modelempauth.EmployeeAuthorityList = (List<EmployeeAuthority>)await _commonService.GetEmployeeAuthorityDetails();

            //model.EmployeeAuthority = modelempauth.EmployeeAuthorityList;


            //return View("~/Areas/ESSP/Views/WFHApplication/Index.cshtml", model);



            WFHApplication model = new WFHApplication();

            model.FromType = new MasterBase();
            model.ToType = new MasterBase();

            model.DateOfApplication = DateOfApplication;

            model.FromType.Code = SessionFrom;
            model.ToType.Code = SessionTo;
            model.From = fromDate;
            model.To = ToDate;

            //dateformat issue
            string DateFrom = fromDate.ToString("dd-MMM-yyyy");
            string DateTo = ToDate.ToString("dd-MMM-yyyy");
            model.From = Convert.ToDateTime(DateFrom);
            model.To = Convert.ToDateTime(DateTo);


            model.LeaveDetails = await _WFHApplicationService.GetLeaveDayWiseDetails(model);
            //double Count = 0.0;
            //for (int i = 0; i < model.LeaveDetails.DayWiseDetails.Count; i++)
            //{
            //    if (model.LeaveDetails.DayWiseDetails[i].Session.Name == "Second Half    ")
            //    {
            //        Count = Count + 0.5;
            //    }
            //    else if (model.LeaveDetails.DayWiseDetails[i].Session.Name == "First Half     ")
            //    {
            //        Count = Count + 0.5;
            //    }
            //    else
            //    {
            //        Count = Count + 1;
            //    }

            //}

            //model.TotalDays = (decimal)Count;

            double leavesapplied = 0;

            leavesapplied = model.LeaveDetails.DayWiseDetails.Count;
            for (int j = 0; j < model.LeaveDetails.DayWiseDetails.Count; j++)
            {
                if (model.LeaveDetails.DayWiseDetails[j].Session.Code == 3)
                {
                    leavesapplied = leavesapplied - 0.5;
                }
                else
                {
                    if (model.LeaveDetails.DayWiseDetails[j].Session.Code == 2)
                    {
                        leavesapplied = leavesapplied - 0.5;
                    }
                }

            }
            model.TotalDays = (decimal)leavesapplied;
            ViewBag.LeavesApplied = leavesapplied;

            //ViewBag.Count = Count;
            ViewBag.SessionTo = new SelectList(await _dropdownService.GetDayStatusWithoutSecondHalfDropDown(), "Code", "Name");
            ViewBag.SessionToSecondHalf = new SelectList(await _dropdownService.GetDayStatusWithoutSecondHalfDropDown(), "Code", "Name");

            ViewBag.Session = new SelectList(await _dropdownService.GetDayStatusDropDown(), "Code", "Name");
            ViewBag.ODLeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("od"), "Code", "Name");
            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            ViewBag.Date = DateTime.Now.Date.ToString("dd-MMMM-yyyy", CultureInfo.InvariantCulture);
            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");

            EmployeeAuthority modelempauth = new EmployeeAuthority();

            modelempauth.EmployeeAuthorityList = (List<EmployeeAuthority>)await _commonService.GetEmployeeAuthorityDetails();

            model.EmployeeAuthority = modelempauth.EmployeeAuthorityList;


            return View("~/Areas/ESSP/Views/WFHApplication/Index.cshtml", model);

        }

        [HttpPost]
        public async Task<IActionResult> Save(WFHApplication model)
        {
            //model.Attachment = new Shared.File();

            //if (model.Attachment.FileData != null)
            //{
            //    var FileData = model.Attachment.FileData;
            //    model.Attachment = await _blob.UploadToAzureAsync(model.Attachment);
            //    string filename = model.Attachment.FileName;
            //}
            //model.Attachment.FileData = null;


            //model.LeaveDetails = await _WFHApplicationService.GetLeaveDayWiseDetails(model);
            //model.TotalDays = model.LeaveDetails.DayWiseDetails.Count;
            //var response = await _WFHApplicationService.Save(model);
            //if (response.Success == true)
            //{
            //    TempData["Message"] = "Applied Successfully";
            //    return RedirectToAction("Index", "WFHApplication");
            //}
            //else
            //{
            //    TempData["Message"] = response.Message;
            //    return RedirectToAction("Index", "WFHApplication");
            //}



            model.Attachment = new Essp.Shared.File();

            if (model.Attachment.FileData != null)
            {
                var FileData = model.Attachment.FileData;
                model.Attachment = await _blob.UploadToAzureAsync(model.Attachment);
                string filename = model.Attachment.FileName;
            }
            model.Attachment.FileData = null;


            model.LeaveDetails = await _WFHApplicationService.GetLeaveDayWiseDetails(model);
            //   model.TotalDays = model.LeaveDetails.DayWiseDetails.Count;

            //double Count = 0.0;
            //for (int i = 0; i < model.LeaveDetails.DayWiseDetails.Count; i++)
            //{
            //    if (model.LeaveDetails.DayWiseDetails[i].Session.Name == "Second Half    ")
            //    {
            //        Count = Count + 0.5;
            //    }
            //    else if (model.LeaveDetails.DayWiseDetails[i].Session.Name == "First Half     ")
            //    {
            //        Count = Count + 0.5;
            //    }
            //    else
            //    {
            //        Count = Count + 1;
            //    }

            //}

            //model.TotalDays = (decimal)Count;

            double leavesapplied = 0;

            leavesapplied = model.LeaveDetails.DayWiseDetails.Count;
            for (int j = 0; j < model.LeaveDetails.DayWiseDetails.Count; j++)
            {
                if (model.LeaveDetails.DayWiseDetails[j].Session.Code == 3)
                {
                    leavesapplied = leavesapplied - 0.5;
                }
                else
                {
                    if (model.LeaveDetails.DayWiseDetails[j].Session.Code == 2)
                    {
                        leavesapplied = leavesapplied - 0.5;
                    }
                }

            }
            model.TotalDays = (decimal)leavesapplied;
            ViewBag.LeavesApplied = leavesapplied;


            var response = await _WFHApplicationService.Save(model);
            if (response.Success == true)
            {
                TempData["Message"] = "Applied Successfully";
                return RedirectToAction("Index", "WFHApplication");
            }
            else
            {
                TempData["Message"] = response.Message;
                return RedirectToAction("Index", "WFHApplication");
            }


        }

        public async Task<IActionResult> GetLeaveApplicationList(string TabIndex)
        {
            WFHApplication model = new WFHApplication();
            var leavePeriodCode = 0;
            var leaveType = 0;


            WFHApplication m = new WFHApplication();
            model = await _WFHApplicationService.GetLeaveApplicationList(leavePeriodCode, leaveType, TabIndex/*, filter*/);

            for (int i = 0; i < model.LeaveApplicationList.Count; i++)
            {
                model.LeaveApplicationList[i].TotalDays = decimal.Round(model.LeaveApplicationList[i].TotalDays, 1, MidpointRounding.AwayFromZero);
            }
            Global.LeavePeriod = leavePeriodCode;
            Global.LeaveGroup = leaveType;

            ViewBag.LeavePeriod = new SelectList(await _dropdownService.GetLeavePeriodFilterDropdown(), "Code", "Name");
            //  ViewBag.WFHLeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("WFH"), "Code", "Name");
            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            ViewBag.LeaveReasonWithAll = new SelectList(await _dropdownService.GetLeaveReasonsDropDownWithAll(), "Code", "Name");

            if (TabIndex == "ALL")
            {
                return PartialView("_AllList", model);

            }
            else if (TabIndex == "PENDING")
            {
                return PartialView("_AllList", model);

            }
            else if (TabIndex == "APPROVED")
            {
                return PartialView("_AllList", model);
            }
            else
            {
                return PartialView("_AllList", model);
            }


        }
        public async Task<IActionResult> ApplicationHistory()
        {
            ViewBag.LeavePeriod = new SelectList(await _dropdownService.GetLeavePeriodFilterDropdown(), "Code", "Name");
            //  ViewBag.WFHLeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("WFH"), "Code", "Name");
            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            ViewBag.ReasonWithAll = new SelectList(await _dropdownService.GetLeaveReasonsDropDownWithAll(), "Code", "Name");

            WFHApplication model = new WFHApplication();

            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");
            var leavePeriodCode = 0;
            var leaveType = 0;
            if (leavePeriodCode == 0)
            {
                var response = await _commonService.GetCurrentLeavePeriod();

                leavePeriodCode = Convert.ToInt32(response.Data);
            }
            model = await _WFHApplicationService.GetLeaveApplicationList(leavePeriodCode, leaveType, "ALL"/*, Global.GlobalFilter*/);

            await fillfilterDropdown();
            for (int i = 0; i < model.LeaveApplicationList.Count; i++)
            {
                model.LeaveApplicationList[i].TotalDays = decimal.Round(model.LeaveApplicationList[i].TotalDays, 1, MidpointRounding.AwayFromZero);
            }
            model.LeavePeriod = new MasterBase();
            model.LeaveType.Code = 0;//LeaveReason to set to deafult ALL
            model.LeavePeriod.Code = leavePeriodCode;//LeavePeriod set to current leaveperiod
            return View("ApplicationHistory", model);
        }

        public async Task<IActionResult> GetTrackerDetails(Guid LeaveApplicationGI)
        {
            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");

            WFHApplication model = new WFHApplication();

            model = await _WFHApplicationService.GetTrackerDetails(LeaveApplicationGI);
            for (int i = 0; i < model.Tracker.Count; i++)
            {
                model.TotalDays = decimal.Round(model.TotalDays, 1, MidpointRounding.AwayFromZero);
            }
            return PartialView("_ApplicationTracker", model);

        }
        public string GetFilterValues(Filter filter)
        {
            string FilterValues = "";
            if (filter.Basic_Filter != null)
            {

                if (filter.Basic_Filter.Designation.Code != null)
                {
                    FilterValues = FilterValues + "Designation: " + filter.Basic_Filter.Designation.Name;
                }
                if (filter.Basic_Filter.Department.Code != null)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "Department: " + filter.Basic_Filter.Department.Name;
                    else
                        FilterValues = FilterValues + ", " + "Department: " + filter.Basic_Filter.Department.Name;
                }
                if (filter.Basic_Filter.Location.Code != null)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "Location: " + filter.Basic_Filter.Location.Name;
                    else
                        FilterValues = FilterValues + ", " + "Location: " + filter.Basic_Filter.Location.Name;
                }
                if (filter.Basic_Filter.Category.Code != null)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "Category: " + filter.Basic_Filter.Category.Name;
                    else
                        FilterValues = FilterValues + ", " + "Category: " + filter.Basic_Filter.Category.Name;
                }
                if (filter.Basic_Filter.Grade.Code != null)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "Grade: " + filter.Basic_Filter.Grade.Name;
                    else
                        FilterValues = FilterValues + ", " + "Grade: " + filter.Basic_Filter.Grade.Name;
                }
                if (filter.Basic_Filter.PayrollGroup.Code != null)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "PayrollGroup: " + filter.Basic_Filter.PayrollGroup.Name;
                    else
                        FilterValues = FilterValues + ", " + "PayrollGroup: " + filter.Basic_Filter.PayrollGroup.Name;
                }
            }
            if (filter.Optional_Filter != null)
            {

                if (filter.Optional_Filter.Division.Code != null)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "Division: " + filter.Optional_Filter.Division.Name;
                    else
                        FilterValues = FilterValues + ", " + "Division: " + filter.Optional_Filter.Division.Name;
                }
                if (filter.Optional_Filter.Section.Code != null)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "Section: " + filter.Optional_Filter.Section.Name;
                    else
                        FilterValues = FilterValues + ", " + "Section: " + filter.Optional_Filter.Section.Name;
                }
                if (filter.Optional_Filter.EmploymentType.Code != null)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "Employment Type: " + filter.Optional_Filter.EmploymentType.Name;
                    else
                        FilterValues = FilterValues + ", " + "Employment Type: " + filter.Optional_Filter.EmploymentType.Name;
                }
                if (filter.Optional_Filter.WorkLocation.Code != null)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "Work Location: " + filter.Optional_Filter.WorkLocation.Name;
                    else
                        FilterValues = FilterValues + ", " + "Work Location: " + filter.Optional_Filter.WorkLocation.Name;
                }
                if (filter.Optional_Filter.WageGradeMaster.Code != null)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "Wage Grade: " + filter.Optional_Filter.WageGradeMaster.Name;
                    else
                        FilterValues = FilterValues + ", " + "Wage Grade: " + filter.Optional_Filter.WageGradeMaster.Name;
                }
                if (filter.Optional_Filter.EmploymentStatus.Code != 0)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "Employment Status: " + filter.Optional_Filter.EmploymentStatus.Name;
                    else
                        FilterValues = FilterValues + ", " + "Employment Status: " + filter.Optional_Filter.EmploymentStatus.Name;
                }
                if (filter.Optional_Filter.Gender.Code != null)
                {
                    if (FilterValues == "")
                        FilterValues = FilterValues + "Gender: " + filter.Optional_Filter.Gender.Name;
                    else
                        FilterValues = FilterValues + ", " + "Gender: " + filter.Optional_Filter.Gender.Name;
                }
            }
            return FilterValues;
        }
        public async Task<IActionResult> ExportToExcel(string TabIndex, string TabName, int LeavePeriod, int LeaveType)
        {
            WFHApplication model = new WFHApplication();

            if (Global.GlobalFilter == null)
                Global.GlobalFilter = new Filter();
            string FilterValues = GetFilterValues(Global.GlobalFilter);
            model = await _WFHApplicationService.GetLeaveApplicationList(LeavePeriod, LeaveType, TabName/*, filter*/);
            var LoginUser = HttpContext.Session.GetString("LoginUser");
            var CompanyName = HttpContext.Session.GetString("CompanyName");
            int slNo = 0;
            if (FilterValues == "")
            {
                FilterValues = "All";
            }
            string[] Date = System.DateTime.Now.GetDateTimeFormats();
            string currDateTime = Date[44];

            if (TabIndex == "ALL")
            {
                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add(TabName + " List");


                    int count = model.LeaveApplicationList.Count + 5;


                    worksheet.Range("A1:G" + count).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:G" + count).Style.Border.TopBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:G" + count).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:G" + count).Style.Border.RightBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:G" + count).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
                    var wsReportNameHeaderRange = worksheet.Range(string.Format("A{0}:{1}{0}", 1, Char.ConvertFromUtf32(65 + 7)));
                    wsReportNameHeaderRange.Style.Font.Bold = true;
                    wsReportNameHeaderRange.Style.Font.FontSize = 15;
                    wsReportNameHeaderRange.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    wsReportNameHeaderRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    wsReportNameHeaderRange.Merge();
                    wsReportNameHeaderRange.Style.Fill.BackgroundColor = XLColor.FromArgb(191, 191, 191); ;

                    wsReportNameHeaderRange.Value = "Work From Home";
                    worksheet.Cell(2, 1).Style.Font.Bold = true;
                    worksheet.Cell(2, 1).Value = "Company Name";
                    worksheet.Cell(2, 2).Value = CompanyName.ToUpper();

                    worksheet.Cell(3, 1).Style.Font.Bold = true;
                    worksheet.Cell(3, 1).Value = "Login User";
                    worksheet.Cell(3, 2).Value = LoginUser;
                    worksheet.Cell(3, 3).Style.Font.Bold = true;
                    worksheet.Cell(3, 3).Value = "Date & Time";
                    worksheet.Cell(3, 4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(3, 4).Style.DateFormat.Format = "dd-MMM-yyyy   h:mm AM/PM";
                    worksheet.Cell(3, 4).Value = currDateTime.ToString();
                    worksheet.Cell(3, 5).Style.Font.Bold = true;
                    worksheet.Cell(3, 5).Value = "Total Count";
                    worksheet.Cell(3, 6).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(3, 6).Value = model.LeaveApplicationList.Count;
                    worksheet.Cell(4, 1).Style.Font.Bold = true;
                    worksheet.Cell(4, 1).Value = "Filter Applied";
                    worksheet.Range("B4:G4").Merge();
                    worksheet.Cell("B4").Value = FilterValues;

                    var currentRow = 5;
                    #region Header
                    worksheet.Cell(currentRow, 1).Value = "From";
                    worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 2).Value = "To";
                    worksheet.Cell(currentRow, 2).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 3).Value = "TotalDays";
                    worksheet.Cell(currentRow, 3).Style.Font.Bold = true;

                    worksheet.Cell(currentRow, 4).Value = "LeaveType";
                    worksheet.Cell(currentRow, 4).Style.Font.Bold = true;

                    worksheet.Cell(currentRow, 5).Value = "LeaveReason";
                    worksheet.Cell(currentRow, 5).Style.Font.Bold = true;

                    worksheet.Cell(currentRow, 6).Value = "DateOfApplication";
                    worksheet.Cell(currentRow, 6).Style.Font.Bold = true;

                    worksheet.Cell(currentRow, 7).Value = "Status";
                    worksheet.Cell(currentRow, 7).Style.Font.Bold = true;




                    #endregion

                    #region Body
                    foreach (var item in model.LeaveApplicationList)
                    {
                        currentRow++;
                        slNo = slNo + 1;
                        worksheet.Cell(currentRow, 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet.Range("A5:G5").Style.Fill.BackgroundColor = XLColor.FromArgb(217, 217, 217);
                        worksheet.Cell(currentRow, 1).Value = item.From;


                        worksheet.Cell(currentRow, 2).Value = item.To;
                        worksheet.Cell(currentRow, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet.Cell(currentRow, 3).Value = item.TotalDays;
                        worksheet.Cell(currentRow, 3).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

                        worksheet.Cell(currentRow, 4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

                        worksheet.Cell(currentRow, 4).Value = item.LeaveType.Name;
                        worksheet.Cell(currentRow, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

                        worksheet.Cell(currentRow, 5).Value = item.LeaveReason.Name;
                        worksheet.Cell(currentRow, 6).Value = item.DateOfApplication;
                        worksheet.Cell(currentRow, 6).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

                        worksheet.Cell(currentRow, 7).Value = item.Status;
                        worksheet.Cell(currentRow, 7).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);


                        worksheet.Columns(1, 7).Style.Alignment.WrapText = true;
                        worksheet.Rows().Style.Alignment.WrapText = true;

                    }
                    #endregion
                    worksheet.Columns().AdjustToContents();
                    worksheet.Rows().AdjustToContents();
                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        var content = stream.ToArray();
                        return File(
                            content,
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            TabName + " List.xlsx"
                            );
                    }
                }

            }

            else
            {
                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add(TabName + " List");
                    var currentRow = 1;
                    #region Header
                    worksheet.Cell(currentRow, 1).Value = "From";
                    worksheet.Cell(currentRow, 2).Value = "To";
                    worksheet.Cell(currentRow, 3).Value = "No.of Days";
                    worksheet.Cell(currentRow, 4).Value = "Type";
                    worksheet.Cell(currentRow, 5).Value = "Reason";
                    worksheet.Cell(currentRow, 6).Value = "Date of Application";
                    worksheet.Cell(currentRow, 7).Value = "Status";

                    #endregion

                    #region Body
                    foreach (var item in model.LeaveApplicationList)
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = item.From;
                        worksheet.Cell(currentRow, 2).Value = item.To;
                        worksheet.Cell(currentRow, 3).Value = item.TotalDays;
                        worksheet.Cell(currentRow, 4).Value = item.LeaveType.Name;
                        worksheet.Cell(currentRow, 5).Value = item.LeaveReason.Name;
                        worksheet.Cell(currentRow, 6).Value = item.DateOfApplication;
                        worksheet.Cell(currentRow, 7).Value = item.Status;
                    }
                    #endregion

                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        var content = stream.ToArray();
                        return File(
                            content,
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            TabName + " List.xlsx"
                            );
                    }
                }
            }

        }
        public async Task fillfilterDropdown()
        {


            ViewBag.Gen = new SelectList(await _dropdownService.GetGenderDropDown(), "Code", "Name");
            ViewBag.Cat = new SelectList(await _dropdownService.GetCategoryDropdown(), "Code", "Name");
            ViewBag.Grd = new SelectList(await _dropdownService.GetGradeDropdown(), "Code", "Name");
            ViewBag.Dsg = new SelectList(await _dropdownService.GetDesignationDropdown(), "Code", "Name");
            ViewBag.Dept = new SelectList(await _dropdownService.GetDepartmentDropdown(), "Code", "Name");
            ViewBag.Loc = new SelectList(await _dropdownService.GetLocationDropdown(), "Code", "Name");
            ViewBag.PayrollGrp = new SelectList(await _dropdownService.GetPayrollGroupDropdown(), "Code", "Name");

            ViewBag.division = new SelectList(await _dropdownService.GetDivisionDropdown(), "Code", "Name");
            ViewBag.section = new SelectList(await _dropdownService.GetSectionDropdown(), "Code", "Name");
            ViewBag.EmploymentType = new SelectList(await _dropdownService.GetEmploymentTypeDropdown(), "Code", "Name");
            ViewBag.EmploymentStatus = new SelectList(await _dropdownService.GetEmploymentStatusDropdown(), "Code", "Name");
            ViewBag.WorkLocation = new SelectList(await _dropdownService.GetWorkLocationDropdown(), "Code", "Name");
            ViewBag.WageGrade = new SelectList(await _dropdownService.GetWageGradeDropdown(), "Code", "Name");

        }
        public async Task<IActionResult> ApplyFilter(int leavePeriodCode, int leaveType, string TabIndex)
        {
            WFHApplication model = new WFHApplication();

            model = await _WFHApplicationService.GetLeaveApplicationList(leavePeriodCode, leaveType, TabIndex);
            return PartialView("_AllList", model);
        }
        //public async Task<IActionResult> ExportToExcel(int LeavePeriod, int LeaveGroup, int Leave, string LPName, string LGName, string LName)
        //{
        //    LeaveOpening model = new LeaveOpening();
        //    Filter filter = new Filter();
        //    model = await _leaveOpeningService.LeaveOpeningList(LeavePeriod, LeaveGroup, Leave, filter);
        //    var LoginUser = HttpContext.Session.GetString("LoginUser");
        //    using (var workbook = new XLWorkbook())
        //    {
        //        var worksheet = workbook.Worksheets.Add("Leave Opening List");
        //        var wsReportNameHeaderRange = worksheet.Range(string.Format("A{0}:{1}{0}", 1, Char.ConvertFromUtf32(65 + 6)));
        //        wsReportNameHeaderRange.Style.Font.Bold = true;
        //        wsReportNameHeaderRange.Style.Font.FontSize = 15;
        //        wsReportNameHeaderRange.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        //        wsReportNameHeaderRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
        //        wsReportNameHeaderRange.Merge();
        //        wsReportNameHeaderRange.Value = "Leave Opening";

        //        worksheet.Cell(2, 1).Style.Font.Bold = true;
        //        worksheet.Cell(2, 1).Value = "Leave Period : ";
        //        worksheet.Cell(2, 2).Value = LPName;
        //        worksheet.Cell(2, 6).Style.Font.Bold = true;
        //        worksheet.Cell(2, 6).Value = "Login User : ";
        //        worksheet.Cell(2, 7).Value = LoginUser;
        //        worksheet.Cell(3, 1).Style.Font.Bold = true;
        //        worksheet.Cell(3, 1).Value = "Leave Group : ";
        //        worksheet.Cell(3, 2).Value = LGName;
        //        worksheet.Cell(3, 6).Style.Font.Bold = true;
        //        worksheet.Cell(3, 6).Value = "Date : ";
        //        worksheet.Cell(3, 7).Value = System.DateTime.Now.ToShortDateString();
        //        worksheet.Cell(4, 1).Style.Font.Bold = true;
        //        worksheet.Cell(4, 1).Value = "Leave : ";
        //        worksheet.Cell(4, 2).Value = LName;


        //        var currentRow = 6;
        //        #region Header
        //        worksheet.Cell(currentRow, 1).Value = "ID";
        //        worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
        //        worksheet.Cell(currentRow, 2).Value = "EmployeeName";
        //        worksheet.Cell(currentRow, 2).Style.Font.Bold = true;
        //        worksheet.Cell(currentRow, 3).Value = "Designation";
        //        worksheet.Cell(currentRow, 3).Style.Font.Bold = true;
        //        worksheet.Cell(currentRow, 4).Value = "Department";
        //        worksheet.Cell(currentRow, 4).Style.Font.Bold = true;
        //        worksheet.Cell(currentRow, 5).Value = "Location";
        //        worksheet.Cell(currentRow, 5).Style.Font.Bold = true;
        //        worksheet.Cell(currentRow, 6).Value = "DOJ";
        //        worksheet.Cell(currentRow, 6).Style.Font.Bold = true;
        //        worksheet.Cell(currentRow, 7).Value = "Opening";
        //        worksheet.Cell(currentRow, 7).Style.Font.Bold = true;

        //        #endregion

        //        #region Body
        //        foreach (var item in model.LeaveOpeningList)
        //        {
        //            currentRow++;
        //            worksheet.Cell(currentRow, 1).Value = item.EmployeeID;
        //            worksheet.Cell(currentRow, 2).Value = item.EmployeeName;
        //            worksheet.Cell(currentRow, 3).Value = item.Designation.Name;
        //            worksheet.Cell(currentRow, 4).Value = item.Department.Name;
        //            worksheet.Cell(currentRow, 5).Value = item.Location.Name;
        //            worksheet.Cell(currentRow, 6).Value = item.DOJ.ToShortDateString();
        //            worksheet.Cell(currentRow, 7).Value = item.Opening;
        //        }
        //        #endregion
        //        worksheet.Columns().AdjustToContents();
        //        using (var stream = new MemoryStream())
        //        {
        //            workbook.SaveAs(stream);
        //            var content = stream.ToArray();
        //            return File(
        //                content,
        //                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //                "Leave Opening List.xlsx"
        //                );
        //        }
        //    }

        //    //}
        //}
    }
}
