using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Hrms.Lite.Infrastructure.Helpers;
using Hrms.Lite.Essp.Shared.PayRoll.AllowanceSettings;
using Hrms.Lite.Essp.Shared.DataBank.DTO;
using Hrms.Lite.Essp.Shared.PayRoll;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.Essp.Generic;
using Hrms.Lite.Essp.Shared.Master;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Hrms.Lite.Essp.Shared.PayRoll.Generic.Master;
using System.Globalization;
using Hrms.Lite.Essp.Services.IServices.General;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Infrastructure.Helpers;
using Hrms.Lite.Essp.Shared.Essp.Leave;
using ClosedXML.Excel;

namespace Hrms.Lite.UI.Areas.ESSP.Controllers
{
    [Area("ESSP")]
    public class LeaveApplicationController : Controller
    {
        private readonly IDropdownService _dropdownService;
        private readonly ILeaveApplicationService _LeaveApplicationService;
        private readonly ICommonService _commonService;
        private readonly IBlob _blob;

        public LeaveApplicationController(ILeaveApplicationService LeaveApplicationService, IDropdownService dropdownService, ICommonService commonService, IBlob blob)
        {
            _LeaveApplicationService = LeaveApplicationService;
            _dropdownService = dropdownService;
            _commonService = commonService;
            _blob = blob;
        }
        public async Task<IActionResult> Index()
        {
            LeaveApplication model = new LeaveApplication();

            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");
            ViewBag.Session = new SelectList(await _dropdownService.GetDayStatusDropDown(), "Code", "Name");
            ViewBag.SessionTo = new SelectList(await _dropdownService.GetDayStatusWithoutSecondHalfDropDown(), "Code", "Name");



            ViewBag.LeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("Leave"), "Code", "Name");
            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            ViewBag.Date = DateTime.Now.Date.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture);
            model.DateOfApplication = DateTime.Now.Date;
            model.FromType = new MasterBase();
            model.ToType = new MasterBase();

            model.FromType.Code = 1;
            model.ToType.Code = 1;
            model.AvailableBalance = decimal.Round(model.AvailableBalance, 1, MidpointRounding.AwayFromZero);

            //model.LeaveDetails = await _LeaveApplicationService.GetLeaveDayWiseDetails(model);
            EmployeeAuthority modelempauth = new EmployeeAuthority();
            //  model.LeaveDetails.EmployeeAuthority 


            modelempauth.EmployeeAuthorityList = (List<EmployeeAuthority>)await _commonService.GetEmployeeAuthorityDetails();

            model.EmployeeAuthority = modelempauth.EmployeeAuthorityList;


            return View(model);
        }

        public async Task<IActionResult> AbsenteeismBasedIndex(DateTime FromTodate, int status)
        {
            LeaveApplication model = new LeaveApplication();

            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");
            ViewBag.Session = new SelectList(await _dropdownService.GetDayStatusDropDown(), "Code", "Name");
            ViewBag.SessionTo = new SelectList(await _dropdownService.GetDayStatusWithoutSecondHalfDropDown(), "Code", "Name");



            ViewBag.LeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("Leave"), "Code", "Name");
            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            ViewBag.Date = DateTime.Now.Date.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture);
            model.DateOfApplication = DateTime.Now.Date;
            model.FromType = new MasterBase();
            model.ToType = new MasterBase();
            model.From = FromTodate;
            model.To = FromTodate;
            model.FromType.Code = status;
            model.ToType.Code = 1;
            model.AvailableBalance = decimal.Round(model.AvailableBalance, 1, MidpointRounding.AwayFromZero);
            return View("Index", model);
        }
        public async Task<IActionResult> GetLeaveBalanceeDetails(int LeaveType)
        {
            LeaveApplication model = new LeaveApplication();


            LeaveBalance leavebalmodel = new LeaveBalance();
            leavebalmodel = await _LeaveApplicationService.GetAvailableBalance(LeaveType);

            ViewBag.Balance = leavebalmodel.Balance;

            ViewBag.Taken = decimal.Round(leavebalmodel.Taken, 1, MidpointRounding.AwayFromZero);
            ViewBag.SessionTo = new SelectList(await _dropdownService.GetDayStatusWithoutSecondHalfDropDown(), "Code", "Name");


            ViewBag.Session = new SelectList(await _dropdownService.GetDayStatusDropDown(), "Code", "Name");
            ViewBag.LeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("Leave"), "Code", "Name");
            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            ViewBag.Date = DateTime.Now.Date.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture);
            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");
            EmployeeAuthority modelempauth = new EmployeeAuthority();

            modelempauth.EmployeeAuthorityList = (List<EmployeeAuthority>)await _commonService.GetEmployeeAuthorityDetails();

            model.EmployeeAuthority = modelempauth.EmployeeAuthorityList;
            model.LeaveType = new MasterBase();
            model.LeaveType.Code = LeaveType;
            model.DateOfApplication = DateTime.Now.Date;
            model.FromType = new MasterBase();
            model.ToType = new MasterBase();

            model.FromType.Code = 1;
            model.ToType.Code = 1;

            return View("~/Areas/ESSP/Views/LeaveApplication/Index.cshtml", model);

        }
        public async Task<IActionResult> GetLeaveDayWiseDetails(DateTime DateOfApplication, int LeaveType, DateTime fromDate, int SessionFrom, DateTime ToDate, int SessionTo)
        {
            LeaveApplication model = new LeaveApplication();

            model.LeaveType = new MasterBase();
            model.FromType = new MasterBase();
            model.ToType = new MasterBase();

            model.DateOfApplication = DateOfApplication;
            model.LeaveType.Code = LeaveType;
            model.FromType.Code = SessionFrom;
            model.ToType.Code = SessionTo;

            //aleena::dateformat issue
            string DateFrom = fromDate.ToString("dd-MMM-yyyy");
            string DateTo = ToDate.ToString("dd-MMM-yyyy");
            model.From = Convert.ToDateTime(DateFrom);
            model.To = Convert.ToDateTime(DateTo);
            //08/06/2022

            model.LeaveDetails = await _LeaveApplicationService.GetLeaveDayWiseDetails(model);
            LeaveBalance leavebalmodel = new LeaveBalance();
            leavebalmodel = await _LeaveApplicationService.GetAvailableBalance(LeaveType);

            ViewBag.Balance = leavebalmodel.Balance;

            ViewBag.Taken = decimal.Round(leavebalmodel.Taken, 1, MidpointRounding.AwayFromZero);

            ViewBag.SessionTo = new SelectList(await _dropdownService.GetDayStatusWithoutSecondHalfDropDown(), "Code", "Name");


            ViewBag.Session = new SelectList(await _dropdownService.GetDayStatusDropDown(), "Code", "Name");
            ViewBag.LeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("Leave"), "Code", "Name");
            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            ViewBag.Date = DateTime.Now.Date.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture);
            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");
            EmployeeAuthority modelempauth = new EmployeeAuthority();

            modelempauth.EmployeeAuthorityList = (List<EmployeeAuthority>)await _commonService.GetEmployeeAuthorityDetails();

            model.EmployeeAuthority = modelempauth.EmployeeAuthorityList;

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
            ViewBag.LeavesApplied = leavesapplied;


            return View("~/Areas/ESSP/Views/LeaveApplication/Index.cshtml", model);


        }
        [HttpPost]
        public async Task<IActionResult> SaveLeave(LeaveApplication model)
        {
            if (model.Attachment != null)
            {
                if (model.Attachment.FileData != null)
                {
                    var FileData = model.Attachment.FileData;
                    model.Attachment = await _blob.UploadToAzureAsync(model.Attachment);
                    string filename = model.Attachment.FileName;
                    model.Attachment.FileData = null;


                }
            }


            model.LeaveDetails = await _LeaveApplicationService.GetLeaveDayWiseDetails(model);
            //model.TotalDays = model.LeaveDetails.DayWiseDetails.Count;

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


            var response = await _LeaveApplicationService.SaveLeave(model);
            if (response.Success == true)
            {
                TempData["Message"] = "Applied Successfully";
                return RedirectToAction("Index", "LeaveApplication");
            }
            else
            {
                TempData["Message"] = response.Message;
                return RedirectToAction("Index", "LeaveApplication");
            }



        }


        public async Task<IActionResult> GetLeaveApplicationList(int leavePeriodCode, int leaveType, string TabIndex)
        {
            LeaveApplication model = new LeaveApplication();


            ViewBag.LeavePeriod = new SelectList(await _dropdownService.GetLeavePeriodFilterDropdown(), "Code", "Name");
            ViewBag.LeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("Leave"), "Code", "Name");
            ViewBag.LeaveWithAll = new SelectList(await _dropdownService.GetLeaveDropDownWithAll("Leave"), "Code", "Name");

            model = await _LeaveApplicationService.GetLeaveApplicationList(leavePeriodCode, leaveType, TabIndex);



            for (int i = 0; i < model.LeaveApplicationList.Count; i++)
            {
                model.LeaveApplicationList[i].TotalDays = decimal.Round(model.LeaveApplicationList[i].TotalDays, 1, MidpointRounding.AwayFromZero);
            }
            if (TabIndex == "ALL")
            {
                return View("_ApplicationHistoryList", model);

            }
            else if (TabIndex == "PENDING")
            {
                return View("_ApplicationHistoryList", model);

            }
            else if (TabIndex == "APPROVED")
            {
                return View("_ApplicationHistoryList", model);
            }
            else
            {
                return View("_ApplicationHistoryList", model);
            }


            //  return PartialView("_ApplicationHistoryList", model);

        }
        public async Task<IActionResult> ApplicationHistory()
        {

            ViewBag.LeavePeriod = new SelectList(await _dropdownService.GetLeavePeriodFilterDropdown(), "Code", "Name");
            ViewBag.LeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("Leave"), "Code", "Name");
            ViewBag.LeaveWithAll = new SelectList(await _dropdownService.GetLeaveDropDownWithAll("Leave"), "Code", "Name");

            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");
            var leavePeriodCode = 0;
            var leaveType = 0;
            var response = await _commonService.GetCurrentLeavePeriod();

            leavePeriodCode = Convert.ToInt32(response.Data);

            LeaveApplication model = new LeaveApplication();



            model = await _LeaveApplicationService.GetLeaveApplicationList(leavePeriodCode, leaveType, "ALL");

            //DateTime FromDate = Convert.ToDateTime(model.From.ToString());
            //DateTime ToDate = Convert.ToDateTime(model.To.ToString());

            //model.From = Convert.ToDateTime(FromDate.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture));
            //model.To = Convert.ToDateTime(ToDate.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture));


            //model.DateOfApplication = Convert.ToDateTime(model.DateOfApplication.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture));
            // model.LeaveType.Code = 1;
            for (int i = 0; i < model.LeaveApplicationList.Count; i++)
            {
                model.LeaveApplicationList[i].TotalDays = decimal.Round(model.LeaveApplicationList[i].TotalDays, 1, MidpointRounding.AwayFromZero);
            }
            model.LeavePeriod = new MasterBase();
            model.LeavePeriod.Code = leavePeriodCode;
            return View("ApplicationHistory", model);
        }


        public async Task<IActionResult> GetTrackerDetails(Guid LeaveApplicationGI)
        {
            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");

            LeaveApplication model = new LeaveApplication();

            model = await _LeaveApplicationService.GetTrackerDetails(LeaveApplicationGI);
            DateTime FromDate = Convert.ToDateTime(model.From.ToString());
            DateTime ToDate = Convert.ToDateTime(model.To.ToString());

            model.From = Convert.ToDateTime(FromDate.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture));
            model.To = Convert.ToDateTime(ToDate.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture));


            model.DateOfApplication = Convert.ToDateTime(model.DateOfApplication.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture));


            model.TotalDays = decimal.Round(model.TotalDays, 1, MidpointRounding.AwayFromZero);

            return PartialView("_ApplicationTracker", model);

        }

        public async Task<IActionResult> GetLeaveBalance(int leavePeriodCode, Guid LeaveApplicationGI)
        {
            if (leavePeriodCode == 0)
            {
                var response = await _commonService.GetCurrentLeavePeriod();

                leavePeriodCode = Convert.ToInt32(response.Data);
            }
            ViewBag.LeavePeriod = new SelectList(await _dropdownService.GetLeavePeriodFilterDropdown(), "Code", "Name");
            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");

            LeaveBalance model = new LeaveBalance();

            model.LeaveBalanceList = (List<LeaveBalance>)await _LeaveApplicationService.GetLeaveBalance(leavePeriodCode, LeaveApplicationGI);



            for (int i = 0; i < model.LeaveBalanceList.Count; i++)
            {
                model.LeaveBalanceList[i].Taken = decimal.Round(model.LeaveBalanceList[i].Taken, 1, MidpointRounding.AwayFromZero);
            }

            model.LeavePeriod = new MasterBase();
            model.LeavePeriod.Code = leavePeriodCode;
            return View("~/Areas/ESSP/Views/LeaveApplication/LeaveBalance.cshtml", model);



        }

        public async Task<IActionResult> IndexOfLeaveBalance()
        {
            ViewBag.LeavePeriod = new SelectList(await _dropdownService.GetLeavePeriodFilterDropdown(), "Code", "Name");
            ViewBag.CurrentUser = HttpContext.Session.GetString("LoginUser");
            ViewBag.LeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("OD"), "Code", "Name");

            LeaveBalance model = new LeaveBalance();
            return View("LeaveBalance", model);
        }

        public async Task<IActionResult> ExportToExcel(int leavePeriodCode, int leaveType, string TabIndex)
        {
            LeaveApplication model = new LeaveApplication();
            model = await _LeaveApplicationService.GetLeaveApplicationList(leavePeriodCode, leaveType, TabIndex);
            var LoginUser = HttpContext.Session.GetString("LoginUser");
            if (TabIndex == "PENDING")
            {

                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Application History Pending List");
                    var wsReportNameHeaderRange = worksheet.Range(string.Format("A{0}:{1}{0}", 1, Char.ConvertFromUtf32(65 + 6)));
                    wsReportNameHeaderRange.Style.Font.Bold = true;
                    wsReportNameHeaderRange.Style.Font.FontSize = 15;
                    wsReportNameHeaderRange.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    wsReportNameHeaderRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    wsReportNameHeaderRange.Merge();
                    wsReportNameHeaderRange.Value = "Loan" + "(" + TabIndex + ")";
                    worksheet.Cell(2, 1).Style.Font.Bold = true;
                    worksheet.Cell(2, 1).Value = "Login User : ";
                    worksheet.Cell(2, 2).Value = LoginUser;
                    worksheet.Cell(3, 1).Style.Font.Bold = true;
                    worksheet.Cell(3, 1).Value = "Date : ";
                    worksheet.Cell(3, 2).Value = System.DateTime.Now.ToShortDateString();
                    // worksheet.Cell(3, 2).Style.Alignment.SetShrinkToFit();






                    var currentRow = 6;

                    #region Header
                    worksheet.Cell(currentRow, 1).Value = "From";
                    worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 2).Value = "To";
                    worksheet.Cell(currentRow, 2).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 3).Value = "No.of Days";
                    worksheet.Cell(currentRow, 3).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 4).Value = "Type";
                    worksheet.Cell(currentRow, 4).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 5).Value = "Date of Application";
                    worksheet.Cell(currentRow, 5).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 6).Value = "Status";
                    worksheet.Cell(currentRow, 6).Style.Font.Bold = true;



                    #endregion

                    #region Body
                    foreach (var item in model.LeaveApplicationList)
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = item.From;
                        worksheet.Cell(currentRow, 2).Value = item.To;
                        worksheet.Cell(currentRow, 3).Value = item.TotalDays;
                        worksheet.Cell(currentRow, 4).Value = item.LeaveType.Name;
                        worksheet.Cell(currentRow, 5).Value = item.DateOfApplication;
                        worksheet.Cell(currentRow, 6).Value = item.Status;


                    }
                    #endregion
                    worksheet.Columns().AdjustToContents();
                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        var content = stream.ToArray();
                        return File(
                            content,
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            "Leave Application List.xlsx"
                            );
                    }
                }



            }

            else
            {
                if (TabIndex == "APPROVED")
                {

                    using (var workbook = new XLWorkbook())
                    {
                        var worksheet = workbook.Worksheets.Add("Application History Approved List");
                        var wsReportNameHeaderRange = worksheet.Range(string.Format("A{0}:{1}{0}", 1, Char.ConvertFromUtf32(65 + 6)));
                        wsReportNameHeaderRange.Style.Font.Bold = true;
                        wsReportNameHeaderRange.Style.Font.FontSize = 15;
                        wsReportNameHeaderRange.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                        wsReportNameHeaderRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                        wsReportNameHeaderRange.Merge();
                        wsReportNameHeaderRange.Value = "Loan" + "(" + TabIndex + ")";
                        worksheet.Cell(2, 1).Style.Font.Bold = true;
                        worksheet.Cell(2, 1).Value = "Login User : ";
                        worksheet.Cell(2, 2).Value = LoginUser;
                        worksheet.Cell(3, 1).Style.Font.Bold = true;
                        worksheet.Cell(3, 1).Value = "Date : ";
                        worksheet.Cell(3, 2).Value = System.DateTime.Now.ToShortDateString();
                        // worksheet.Cell(3, 2).Style.Alignment.SetShrinkToFit();






                        var currentRow = 6;

                        #region Header
                        worksheet.Cell(currentRow, 1).Value = "From";
                        worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
                        worksheet.Cell(currentRow, 2).Value = "To";
                        worksheet.Cell(currentRow, 2).Style.Font.Bold = true;
                        worksheet.Cell(currentRow, 3).Value = "No.of Days";
                        worksheet.Cell(currentRow, 3).Style.Font.Bold = true;
                        worksheet.Cell(currentRow, 4).Value = "Type";
                        worksheet.Cell(currentRow, 4).Style.Font.Bold = true;
                        worksheet.Cell(currentRow, 5).Value = "Date of Application";
                        worksheet.Cell(currentRow, 5).Style.Font.Bold = true;
                        worksheet.Cell(currentRow, 6).Value = "Status";
                        worksheet.Cell(currentRow, 6).Style.Font.Bold = true;



                        #endregion

                        #region Body
                        foreach (var item in model.LeaveApplicationList)
                        {
                            currentRow++;
                            worksheet.Cell(currentRow, 1).Value = item.From;
                            worksheet.Cell(currentRow, 2).Value = item.To;
                            worksheet.Cell(currentRow, 3).Value = item.TotalDays;
                            worksheet.Cell(currentRow, 4).Value = item.LeaveType.Name;
                            worksheet.Cell(currentRow, 5).Value = item.DateOfApplication;
                            worksheet.Cell(currentRow, 6).Value = item.Status;


                        }
                        #endregion
                        worksheet.Columns().AdjustToContents();
                        using (var stream = new MemoryStream())
                        {
                            workbook.SaveAs(stream);
                            var content = stream.ToArray();
                            return File(
                                content,
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                "Leave Application List.xlsx"
                                );
                        }
                    }



                }

                else
                {
                    if (TabIndex == "REJECTED")
                    {

                        using (var workbook = new XLWorkbook())
                        {
                            var worksheet = workbook.Worksheets.Add("Application History Rejected List");
                            var wsReportNameHeaderRange = worksheet.Range(string.Format("A{0}:{1}{0}", 1, Char.ConvertFromUtf32(65 + 6)));
                            wsReportNameHeaderRange.Style.Font.Bold = true;
                            wsReportNameHeaderRange.Style.Font.FontSize = 15;
                            wsReportNameHeaderRange.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            wsReportNameHeaderRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                            wsReportNameHeaderRange.Merge();
                            wsReportNameHeaderRange.Value = "Loan" + "(" + TabIndex + ")";
                            worksheet.Cell(2, 1).Style.Font.Bold = true;
                            worksheet.Cell(2, 1).Value = "Login User : ";
                            worksheet.Cell(2, 2).Value = LoginUser;
                            worksheet.Cell(3, 1).Style.Font.Bold = true;
                            worksheet.Cell(3, 1).Value = "Date : ";
                            worksheet.Cell(3, 2).Value = System.DateTime.Now.ToShortDateString();
                            // worksheet.Cell(3, 2).Style.Alignment.SetShrinkToFit();






                            var currentRow = 6;
                            #region Header
                            worksheet.Cell(currentRow, 1).Value = "From";
                            worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
                            worksheet.Cell(currentRow, 2).Value = "To";
                            worksheet.Cell(currentRow, 2).Style.Font.Bold = true;
                            worksheet.Cell(currentRow, 3).Value = "No.of Days";
                            worksheet.Cell(currentRow, 3).Style.Font.Bold = true;
                            worksheet.Cell(currentRow, 4).Value = "Type";
                            worksheet.Cell(currentRow, 4).Style.Font.Bold = true;
                            worksheet.Cell(currentRow, 5).Value = "Date of Application";
                            worksheet.Cell(currentRow, 5).Style.Font.Bold = true;
                            worksheet.Cell(currentRow, 6).Value = "Status";
                            worksheet.Cell(currentRow, 6).Style.Font.Bold = true;



                            #endregion

                            #region Body
                            foreach (var item in model.LeaveApplicationList)
                            {
                                currentRow++;
                                worksheet.Cell(currentRow, 1).Value = item.From;
                                worksheet.Cell(currentRow, 2).Value = item.To;
                                worksheet.Cell(currentRow, 3).Value = item.TotalDays;
                                worksheet.Cell(currentRow, 4).Value = item.LeaveType.Name;
                                worksheet.Cell(currentRow, 5).Value = item.DateOfApplication;
                                worksheet.Cell(currentRow, 6).Value = item.Status;


                            }
                            #endregion
                            worksheet.Columns().AdjustToContents();
                            using (var stream = new MemoryStream())
                            {
                                workbook.SaveAs(stream);
                                var content = stream.ToArray();
                                return File(
                                    content,
                                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                    "Leave Application List.xlsx"
                                    );
                            }
                        }



                    }

                    else
                    {


                        using (var workbook = new XLWorkbook())
                        {
                            var worksheet = workbook.Worksheets.Add("Application History All List");
                            var wsReportNameHeaderRange = worksheet.Range(string.Format("A{0}:{1}{0}", 1, Char.ConvertFromUtf32(65 + 6)));
                            wsReportNameHeaderRange.Style.Font.Bold = true;
                            wsReportNameHeaderRange.Style.Font.FontSize = 15;
                            wsReportNameHeaderRange.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            wsReportNameHeaderRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                            wsReportNameHeaderRange.Merge();
                            wsReportNameHeaderRange.Value = "Loan" + "(" + TabIndex + ")";
                            worksheet.Cell(2, 1).Style.Font.Bold = true;
                            worksheet.Cell(2, 1).Value = "Login User : ";
                            worksheet.Cell(2, 2).Value = LoginUser;
                            worksheet.Cell(3, 1).Style.Font.Bold = true;
                            worksheet.Cell(3, 1).Value = "Date : ";
                            // worksheet.Cell(3, 2).Style.Alignment.SetShrinkToFit();

                            worksheet.Cell(3, 2).Value = System.DateTime.Now.ToShortDateString();




                            var currentRow = 6;

                            #region Header
                            worksheet.Cell(currentRow, 1).Value = "From";
                            worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
                            worksheet.Cell(currentRow, 2).Value = "To";
                            worksheet.Cell(currentRow, 2).Style.Font.Bold = true;
                            worksheet.Cell(currentRow, 3).Value = "No.of Days";
                            worksheet.Cell(currentRow, 3).Style.Font.Bold = true;
                            worksheet.Cell(currentRow, 4).Value = "Type";
                            worksheet.Cell(currentRow, 4).Style.Font.Bold = true;
                            worksheet.Cell(currentRow, 5).Value = "Date of Application";
                            worksheet.Cell(currentRow, 5).Style.Font.Bold = true;
                            worksheet.Cell(currentRow, 6).Value = "Status";
                            worksheet.Cell(currentRow, 6).Style.Font.Bold = true;



                            #endregion

                            #region Body
                            foreach (var item in model.LeaveApplicationList)
                            {
                                currentRow++;
                                worksheet.Cell(currentRow, 1).Value = item.From;
                                worksheet.Cell(currentRow, 2).Value = item.To;
                                worksheet.Cell(currentRow, 3).Value = item.TotalDays;
                                worksheet.Cell(currentRow, 4).Value = item.LeaveType.Name;
                                worksheet.Cell(currentRow, 5).Value = item.DateOfApplication;
                                worksheet.Cell(currentRow, 6).Value = item.Status;


                            }
                            #endregion
                            worksheet.Columns().AdjustToContents();
                            using (var stream = new MemoryStream())
                            {
                                workbook.SaveAs(stream);
                                var content = stream.ToArray();
                                return File(
                                    content,
                                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                    "Leave Application List.xlsx"
                                    );
                            }
                        }
                    }
                }


            }
        }
    }
}
