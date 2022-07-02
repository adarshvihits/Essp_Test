using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Services.IServices.General;
using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.ESSP.Regularization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Hrms.Lite.UI.Areas.ESSP.Controllers
{
    [Area("ESSP")]
    public class AbsenteeismRegularizationController : Controller
    {
        private readonly IDropdownService _dropdownService;
        private readonly ICommonService _commonService;
        private readonly IAbsenteeismRegularizationService _absenteeismRegularizationService;
        public AbsenteeismRegularizationController(IAbsenteeismRegularizationService AbsenteeismRegularizationService, IDropdownService dropdownService, ICommonService commonService)
        {
            _absenteeismRegularizationService = AbsenteeismRegularizationService;
            _dropdownService = dropdownService;
            _commonService = commonService;
        }
        public async Task<IActionResult> Index()
        {
            AbsenteeismRegularization model = new AbsenteeismRegularization();
            ViewBag.Month = new SelectList(await _dropdownService.GetMonthDropdown(), "Code", "Name");
            ViewBag.Abs = new SelectList(await _dropdownService.GetAbsenteeismRegularizationDropDown(), "Code", "Name");
            model = await _absenteeismRegularizationService.GetAbsenteeismList(5, "NotRegularizedDays");
            return View(model);
        }
        public async Task<IActionResult> GetShiftDetails()
        {
            ShiftDetails model = new ShiftDetails();
            model.ShiftList = (List<ShiftDetails>)await _absenteeismRegularizationService.GetShiftDetails();
            return PartialView("_ShiftDetails", model);
        }
        public async Task<IActionResult> GetList(int month, string TabIndex)
        {
            if (TabIndex == "PENDING")
            {
                AbsenteeismRegularization model = new AbsenteeismRegularization();
                model = await _absenteeismRegularizationService.GetAbsenteeismList(month, TabIndex);
                return PartialView("_PendingList", model);
            }
            else
            {
                ViewBag.Abs = new SelectList(await _dropdownService.GetAbsenteeismRegularizationDropDown(), "Code", "Name");
                return PartialView("_NotRegularizedList", await _absenteeismRegularizationService.GetAbsenteeismList(month, TabIndex));
            }

        }
        public async Task<IActionResult> TrackerView(Guid LeaveGI, string Type)
        {
            AbsenteeismRegularization model = new AbsenteeismRegularization();
            model = await _absenteeismRegularizationService.GetTracker(LeaveGI, Type);
            return PartialView("_Tracker", model);

        }
        //public async Task<IActionResult> ExportToExcel(int month,string TabIndex)
        //{
        //    AbsenteeismRegularization model = new AbsenteeismRegularization();
        //    model = await _absenteeismRegularizationService.GetAbsenteeismList(month, TabIndex);

        //    int slno = 0;
        //    string[] Date = System.DateTime.Now.GetDateTimeFormats();
        //    string currDateTime = Date[44];
        //    var LoginUser = HttpContext.Session.GetString("LoginUser");
        //    var CompanyName = HttpContext.Session.GetString("CompanyName");
        //    if (TabIndex != "APPROVAL_PENDING")
        //    {

        //        using (var workbook = new XLWorkbook())
        //        {
        //            var worksheet = workbook.Worksheets.Add("Evaluation Period");
        //            int count = model.EvaluationPeriodMasterList.Count + 6;


        //            worksheet.Range("A1:C" + count).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
        //            worksheet.Range("A1:C" + count).Style.Border.TopBorder = XLBorderStyleValues.Thin;
        //            worksheet.Range("A1:C" + count).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
        //            worksheet.Range("A1:C" + count).Style.Border.RightBorder = XLBorderStyleValues.Thin;
        //            worksheet.Range("A1:C" + count).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
        //            var wsReportNameHeaderRange = worksheet.Range(string.Format("A{0}:{1}{0}", 1, Char.ConvertFromUtf32(65 + 2)));
        //            wsReportNameHeaderRange.Style.Font.Bold = true;
        //            wsReportNameHeaderRange.Style.Font.FontSize = 15;
        //            wsReportNameHeaderRange.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        //            wsReportNameHeaderRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
        //            wsReportNameHeaderRange.Merge();
        //            wsReportNameHeaderRange.Style.Fill.BackgroundColor = XLColor.FromArgb(191, 191, 191);
        //            wsReportNameHeaderRange.Value = "Evaluation Period" + "(" + TabIndex + ")";
        //            worksheet.Range("A6:C6").Style.Fill.BackgroundColor = XLColor.FromArgb(217, 217, 217);
        //            worksheet.Cell(2, 1).Style.Font.Bold = true;
        //            worksheet.Cell(2, 1).Value = "Company Name";
        //            worksheet.Cell(2, 2).Value = CompanyName.ToUpper();
        //            worksheet.Cell(3, 1).Style.Font.Bold = true;
        //            worksheet.Cell(3, 1).Value = "Login User";
        //            worksheet.Cell(3, 2).Value = LoginUser;
        //            worksheet.Cell(4, 1).Style.Font.Bold = true;
        //            worksheet.Cell(4, 1).Value = "Date & Time";
        //            worksheet.Cell(4, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
        //            worksheet.Cell(4, 2).Style.DateFormat.Format = "dd-MMMM-yyyy   h:mm AM/PM";
        //            worksheet.Cell(4, 2).Value = currDateTime.ToString();
        //            worksheet.Cell(5, 1).Style.Font.Bold = true;
        //            worksheet.Cell(5, 1).Value = "Total Count";
        //            worksheet.Cell(5, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
        //            worksheet.Cell(5, 2).Value = model.EvaluationPeriodMasterList.Count;

        //            var currentRow = 6;
        //            #region Header
        //            worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
        //            worksheet.Cell(currentRow, 1).Value = "Sl.No";
        //            worksheet.Cell(currentRow, 2).Style.Font.Bold = true;
        //            worksheet.Cell(currentRow, 2).Value = "Name";
        //            worksheet.Cell(currentRow, 3).Style.Font.Bold = true;
        //            worksheet.Cell(currentRow, 3).Value = "Short Name";

        //            #endregion

        //            #region Body
        //            foreach (var item in model.EvaluationPeriodMasterList)
        //            {

        //                currentRow++;
        //                slno = slno + 1;
        //                worksheet.Cell(currentRow, 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
        //                worksheet.Cell(currentRow, 1).Value = slno;
        //                worksheet.Cell(currentRow, 2).Value = item.Name;
        //                worksheet.Cell(currentRow, 3).Value = item.ShortName;
        //                worksheet.Columns(1, 5).Style.Alignment.WrapText = true;

        //            }
        //            #endregion
        //            worksheet.Columns().AdjustToContents();
        //            using (var stream = new MemoryStream())
        //            {
        //                workbook.SaveAs(stream);
        //                var content = stream.ToArray();
        //                return File(
        //                    content,
        //                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //                    "Evaluation Period Master List.xlsx"
        //                    );
        //            }
        //        }

        //    }
        //    else
        //    {
        //        using (var workbook = new XLWorkbook())
        //        {
        //            var worksheet = workbook.Worksheets.Add("EvaluationPeriod Pending List");
        //            int PendingCountnum = model.PendingCount + 6;


        //            worksheet.Range("A1:D" + PendingCountnum).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
        //            worksheet.Range("A1:D" + PendingCountnum).Style.Border.TopBorder = XLBorderStyleValues.Thin;
        //            worksheet.Range("A1:D" + PendingCountnum).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
        //            worksheet.Range("A1:D" + PendingCountnum).Style.Border.RightBorder = XLBorderStyleValues.Thin;
        //            worksheet.Range("A1:D" + PendingCountnum).Style.Border.LeftBorder = XLBorderStyleValues.Thin;



        //            var wsReportNameHeaderRange = worksheet.Range(string.Format("A{0}:{1}{0}", 1, Char.ConvertFromUtf32(65 + 3)));
        //            wsReportNameHeaderRange.Style.Font.Bold = true;
        //            wsReportNameHeaderRange.Style.Font.FontSize = 15;
        //            wsReportNameHeaderRange.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        //            wsReportNameHeaderRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
        //            wsReportNameHeaderRange.Merge();


        //            wsReportNameHeaderRange.Style.Fill.BackgroundColor = XLColor.FromArgb(191, 191, 191);
        //            wsReportNameHeaderRange.Style.Font.FontSize = 15;
        //            wsReportNameHeaderRange.Value = "Evaluation" + "(" + TabIndex + ")";
        //            worksheet.Range("A6:D6").Style.Fill.BackgroundColor = XLColor.FromArgb(217, 217, 217);
        //            worksheet.Cell(2, 1).Style.Font.Bold = true;
        //            worksheet.Cell(2, 1).Value = "Company Name";
        //            worksheet.Cell(2, 2).Value = CompanyName.ToUpper();
        //            worksheet.Cell(3, 1).Style.Font.Bold = true;
        //            worksheet.Cell(3, 1).Value = "Login User";
        //            worksheet.Cell(3, 2).Value = LoginUser;
        //            worksheet.Cell(4, 1).Style.Font.Bold = true;
        //            worksheet.Cell(4, 1).Value = "Date & Time";
        //            worksheet.Cell(4, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
        //            worksheet.Cell(4, 2).Style.DateFormat.Format = "dd-MMMM-yyyy   h:mm AM/PM";
        //            worksheet.Cell(4, 2).Value = currDateTime.ToString();
        //            worksheet.Cell(5, 1).Style.Font.Bold = true;
        //            worksheet.Cell(5, 1).Value = "Total Count";
        //            worksheet.Cell(5, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
        //            worksheet.Cell(5, 2).Value = model.PendingCount;
        //            var currentRow = 6;

        //            #region Header
        //            worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
        //            worksheet.Cell(currentRow, 1).Value = "Sl.No";
        //            worksheet.Cell(currentRow, 2).Style.Font.Bold = true;
        //            worksheet.Cell(currentRow, 2).Value = "Name";
        //            worksheet.Cell(currentRow, 3).Style.Font.Bold = true;
        //            worksheet.Cell(currentRow, 3).Value = "ShortName";
        //            worksheet.Cell(currentRow, 4).Style.Font.Bold = true;
        //            worksheet.Cell(currentRow, 4).Value = "EntryMode";
        //            #endregion

        //            #region Body
        //            foreach (var item in model.EvaluationPeriodMasterList)
        //            {
        //                currentRow++;
        //                slno = slno + 1;
        //                worksheet.Cell(currentRow, 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
        //                worksheet.Cell(currentRow, 1).Value = slno;
        //                worksheet.Cell(currentRow, 2).Value = item.Name;
        //                worksheet.Cell(currentRow, 3).Value = item.ShortName;
        //                worksheet.Cell(currentRow, 4).Value = item.EntryType;
        //                worksheet.Columns(1, 5).Style.Alignment.WrapText = true;
        //            }
        //            #endregion
        //            worksheet.Columns().AdjustToContents();
        //            using (var stream = new MemoryStream())
        //            {
        //                workbook.SaveAs(stream);
        //                var content = stream.ToArray();
        //                return File(
        //                    content,
        //                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //                    "Evaluation Period Pending List.xlsx"
        //                    );
        //            }
        //        }
        //    }
        //}
    }
}
