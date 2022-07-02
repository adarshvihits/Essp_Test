using ClosedXML.Excel;
using Hrms.Lite.Essp.Infrastructure.Helpers;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Services.IServices.General;
using Hrms.Lite.Essp.Shared.Account;
using Hrms.Lite.Essp.Shared.Essp.Leave;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Infrastructure.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.UI.Areas.ESSP.Controllers
{
    [Area("ESSP")]
    public class CoffApplicationController : Controller
    {
        private readonly IDropdownService _dropdownService;
        private readonly ICommonService _commonService;
        private readonly IBlob _blob;
        private readonly ICoffApplicationService _coffApplicationService;
        public CoffApplicationController(ICoffApplicationService coffApplicationService, IDropdownService dropdownService, ICommonService commonService, IBlob blob)
        {
            _coffApplicationService = coffApplicationService;
            _dropdownService = dropdownService;
            _commonService = commonService;
            _blob = blob;
        }

        public async Task<IActionResult> Create()
        {
            CoffApplication model = new CoffApplication();
            GetCurrentUser();
            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            model.LeaveDetails = new CoffLeaveDetails();
            model.CoffBalance = new CoffBalance();
            model.LeaveDetails = await _coffApplicationService.GetLeaveDayWiseDetails(null);
            model.LeaveDetails.DayWiseDetails = new List<CoffLeaveDayWiseDetails>();
            model.DateOfApplication = DateTime.Now;
            return View(model);
        }
        public async Task<IActionResult> AbsenteeismBasedIndex(DateTime Leaveon)
        {
            CoffApplication model = new CoffApplication();
            GetCurrentUser();
            ViewBag.Reason = new SelectList(await _dropdownService.GetLeaveReasonsDropDown(), "Code", "Name");
            model.LeaveDetails = new CoffLeaveDetails();
            model.CoffBalance = new CoffBalance();
            model.LeaveDetails = await _coffApplicationService.GetLeaveDayWiseDetails(Leaveon.ToString("yyyy-MMM-dd"));
            model.LeaveDetails.DayWiseDetails = new List<CoffLeaveDayWiseDetails>();
            model.DateOfApplication = DateTime.Now;
            return View("Create", model);
        }
        public async Task<IActionResult> GetLeaveDayWiseDetails(DateTime Leaveon)
        {

            CoffApplication model = new CoffApplication();
            CoffBalance coffBalance = new CoffBalance();

            coffBalance = await _coffApplicationService.GetAvailableBalance();
            model.LeaveDetails = new CoffLeaveDetails();
            model.LeaveDetails = await _coffApplicationService.GetLeaveDayWiseDetails(Leaveon.ToString("yyyy-MMM-dd"));
            model.CoffBalance = coffBalance;
            model.LeaveOn = Leaveon;
            return PartialView("_CoffDayWiseDetails", model);

        }

        [HttpPost]
        public async Task<IActionResult> Create(CoffApplication model)
        {
            CoffBalance coffBalance = new CoffBalance();
            coffBalance = await _coffApplicationService.GetAvailableBalance();
            model.CoffBalance = coffBalance;

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
            //model.LeaveDetails = await _.GetLeaveDayWiseDetails(model);
            //model.TotalDays = model.LeaveDetails.DayWiseDetails.Count;
            var response = await _coffApplicationService.SaveLeave(model);
            if (response.Success == true)
            {
                TempData["Message"] = "Applied Successfully";
                return RedirectToAction("ApplicationHistory", "CoffApplication");
            }
            else
            {
                TempData["Message"] = response.Message;
                return RedirectToAction("Create", "CoffApplication");
            }


        }
        public async Task<IActionResult> GetCoffBalance(int leavePeriodCode, string Mode)
        {
            if (leavePeriodCode == 0)
            {
                var response = await _commonService.GetCurrentLeavePeriod();

                leavePeriodCode = Convert.ToInt32(response.Data);
            }
            CoffBalance model = new CoffBalance();
            if (Mode == "Create")
            {

                ViewBag.LeavePeriod = new SelectList(await _dropdownService.GetLeavePeriodFilterDropdown(), "Code", "Name");
                GetCurrentUser();

                model = await _coffApplicationService.GetLeaveBalance(leavePeriodCode);

                model.LeavePeriod = new MasterBase();
                model.LeavePeriod.Code = leavePeriodCode;
                return View("CoffBalance", model);
            }
            else
            {
                model = await _coffApplicationService.GetLeaveBalance(leavePeriodCode);
                return PartialView("_CoffBalanceList", model);

            }

        }
        public async Task<IActionResult> ApplicationHistory()
        {
            CoffApplication model = new CoffApplication();
            var response = await _commonService.GetCurrentLeavePeriod();
            ViewBag.LeaveReasonsDropDownWithAll = new SelectList(await _dropdownService.GetLeaveReasonsDropDownWithAll(), "Code", "Name");
            ViewBag.LeavePeriod = new SelectList(await _dropdownService.GetLeavePeriodFilterDropdown(), "Code", "Name");
            var leavePeriodCode = Convert.ToInt32(response.Data);
            model = await _coffApplicationService.GetLeaveApplicationList(leavePeriodCode, 0, "Pending");
            model.LeavePeriod = new MasterBase();
            model.LeaveReason = new MasterBase();
            model.LeavePeriod.Code = leavePeriodCode;
            model.LeaveReason.Code = 0;
            return View("CoffApplicationHistory", model);
        }


        public async Task<IActionResult> HistoryList(int leavePeriodCode, int Reason, string TabIndex)
        {
            CoffApplication model = new CoffApplication();
            model = await _coffApplicationService.GetLeaveApplicationList(leavePeriodCode, Reason, TabIndex);

            return PartialView("_CoffHistoryList", model);
        }

        public async Task<IActionResult> CoffTracker(Guid LeaveApplicationGI)
        {
            CoffApplication model = new CoffApplication();
            model = await _coffApplicationService.GetTrackerDetails(LeaveApplicationGI);
            GetCurrentUser();

            return PartialView("_CoffTracker", model);
        }
        public void GetCurrentUser()
        {
            Login CurrentUser = JsonConvert.DeserializeObject<Login>(HttpContext.Session.GetString("User"));

            ViewBag.CurrentUser = CurrentUser.authUser.EmployeeName + "( " + CurrentUser.authUser.EmployeeID + " )";
        }
        public async Task<IActionResult> ExportToExcel(int leaveperiodCode, int ReasonCode, string leaveperiodName, string ReasonName, string TabIndex)
        {
            CoffApplication model = new CoffApplication();
            model = await _coffApplicationService.GetLeaveApplicationList(leaveperiodCode, ReasonCode, TabIndex);
            var LoginUser = HttpContext.Session.GetString("LoginUser");
            var CompanyName = HttpContext.Session.GetString("CompanyName");
            int slNo = 0;

            string[] Date = System.DateTime.Now.GetDateTimeFormats();
            string currDateTime = Date[44];
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Coff Application History");
                int count = model.LeaveApplicationList.Count + 4;


                worksheet.Range("A1:H" + count).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                worksheet.Range("A1:H" + count).Style.Border.TopBorder = XLBorderStyleValues.Thin;
                worksheet.Range("A1:H" + count).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                worksheet.Range("A1:H" + count).Style.Border.RightBorder = XLBorderStyleValues.Thin;
                worksheet.Range("A1:H" + count).Style.Border.LeftBorder = XLBorderStyleValues.Thin;

                var wsReportNameHeaderRange = worksheet.Range(string.Format("A{0}:{1}{0}", 1, Char.ConvertFromUtf32(65 + 7)));
                wsReportNameHeaderRange.Style.Font.Bold = true;
                wsReportNameHeaderRange.Style.Font.FontSize = 15;
                wsReportNameHeaderRange.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                wsReportNameHeaderRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                wsReportNameHeaderRange.Merge();
                wsReportNameHeaderRange.Style.Fill.BackgroundColor = XLColor.FromArgb(217, 217, 217);
                wsReportNameHeaderRange.Value = "Coff-Application(" + TabIndex + " )";

                worksheet.Cell(2, 1).Style.Font.Bold = true;
                worksheet.Cell(2, 1).Value = "Company Name";
                worksheet.Cell(2, 2).Value = CompanyName.ToUpper();
                worksheet.Cell(2, 3).Style.Font.Bold = true;
                worksheet.Cell(2, 3).Value = "LeavePeriod";
                worksheet.Cell(2, 4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                worksheet.Cell(2, 4).Value = leaveperiodName;
                worksheet.Cell(2, 5).Style.Font.Bold = true;
                worksheet.Cell(2, 5).Value = "Reason";
                worksheet.Cell(2, 6).Value = ReasonName;
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


                var currentRow = 4;
                #region Header
                worksheet.Range("A4:H4").Style.Fill.BackgroundColor = XLColor.FromArgb(217, 217, 217);
                worksheet.Cell(currentRow, 1).Value = "Sl.No";
                worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
                worksheet.Cell(currentRow, 2).Value = "Leave On";
                worksheet.Cell(currentRow, 2).Style.Font.Bold = true;
                worksheet.Cell(currentRow, 3).Value = "Entitle Date";
                worksheet.Cell(currentRow, 3).Style.Font.Bold = true;
                worksheet.Cell(currentRow, 4).Value = "No.of Days";
                worksheet.Cell(currentRow, 4).Style.Font.Bold = true;
                worksheet.Cell(currentRow, 5).Value = "Type";
                worksheet.Cell(currentRow, 5).Style.Font.Bold = true;
                worksheet.Cell(currentRow, 6).Value = "Reason";
                worksheet.Cell(currentRow, 6).Style.Font.Bold = true;
                worksheet.Cell(currentRow, 7).Value = "Date of Application";
                worksheet.Cell(currentRow, 7).Style.Font.Bold = true;
                worksheet.Cell(currentRow, 8).Value = "Status";
                worksheet.Cell(currentRow, 8).Style.Font.Bold = true;



                #endregion

                #region Body
                foreach (var item in model.LeaveApplicationList)
                {
                    currentRow++;
                    slNo = slNo + 1;

                    worksheet.Cell(currentRow, 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(currentRow, 1).Value = slNo;
                    worksheet.Cell(currentRow, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(currentRow, 2).Value = item.LeaveOn;
                    worksheet.Cell(currentRow, 2).Style.DateFormat.Format = "dd-MMM-yyyy";
                    worksheet.Cell(currentRow, 3).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(currentRow, 3).Value = item.EntitleDate;
                    worksheet.Cell(currentRow, 3).Style.DateFormat.Format = "dd-MMM-yyyy";
                    worksheet.Cell(currentRow, 4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(currentRow, 4).Value = item.TotalDays;
                    worksheet.Cell(currentRow, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(currentRow, 5).Value = item.LeaveType.Name;
                    worksheet.Cell(currentRow, 6).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(currentRow, 6).Value = item.LeaveReason.Name;
                    worksheet.Cell(currentRow, 7).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(currentRow, 7).Value = item.DateOfApplication;
                    worksheet.Cell(currentRow, 8).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(currentRow, 8).Value = item.Status;


                    worksheet.Columns(1, 8).Style.Alignment.WrapText = true;
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
                        "Coff Application History.xlsx"
                        );
                }
            }


        }
    }
}
