using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ClosedXML.Excel;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Services.IServices.General;
using Hrms.Lite.Essp.Shared.Essp.Leave;
using Hrms.Lite.Essp.Shared.ESSP.Regularization;
using Hrms.Lite.Essp.Shared.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Hrms.Lite.Essp.UI.Areas.ESSP.Controllers
{
    [Area("ESSP")]
    public class AttendanceRegularizationController : Controller
    {
        private readonly IDropdownService _dropdownService;
        private readonly ICommonService _commonService;
        private readonly IAttendanceRegularizationService _service;
        public AttendanceRegularizationController(IAttendanceRegularizationService AttendanceRegularizationService, IDropdownService dropdownService, ICommonService commonService)
        {
            _service = AttendanceRegularizationService;
            _dropdownService = dropdownService;
            _commonService = commonService;
        }
        public async Task<IActionResult> Index()
        {
            AttendanceRegularization model = new AttendanceRegularization();

            ViewBag.LeavePeriod = new SelectList(await _dropdownService.GetLeavePeriodFilterDropdown(), "Code", "Name");
            ViewBag.LeaveType = new SelectList(await _dropdownService.GetLeaveDropDown("OD"), "Code", "Name");

            return View(await _service.GetAttendanceRegularizationList("ALL"));
        }
        public async Task<IActionResult> GetAttendanceList(string TabIndex)
        {
            AttendanceRegularization model = new AttendanceRegularization();
            var response = await _commonService.GetCurrentLeavePeriod();

            int LeavePeriod = Convert.ToInt32(response.Data);
            if (TabIndex == "PreviousHistory")
                return PartialView("_PreviousHistoryList", await _service.GetAttendanceRegularizationPreviousList(LeavePeriod, 0));
            else
                return PartialView("_AttendanceRegularizationList", await _service.GetAttendanceRegularizationList(TabIndex));
        }


        public async Task<IActionResult> GetPreviousList(int period, int type)
        {
            AttendanceRegularization model = new AttendanceRegularization();
            model = await _service.GetAttendanceRegularizationPreviousList(period, type);


            return PartialView("_PreviousHistoryList", model);

        }




        public async Task<IActionResult> TrackerDetails(Guid LeaveApplicationGI, string Type, string mode, int AttendanceStatusTypeCode)
        {

            AttendanceRegularization model = (await _service.GetTrackerDetails(LeaveApplicationGI, Type));
            model.AttendanceStatusTypeCode = AttendanceStatusTypeCode;

            ViewBag.TotalLeaveBalance = model.AttendanceRegularizationLeaveBalance.Sum(x => x.Balance);
            if (mode == "APPROVAL")

                return PartialView("_LeaveApproval", model);

            else
                return PartialView("_ApplicationTracker", model);

        }
        [HttpPost]
        public async Task<IActionResult> ApproveAttendance(Guid LeaveApplicationGI, int AttendanceStatusTypeCode, String LeaveType)
        {
            AttendanceRegularization model = new AttendanceRegularization();
            model.LeaveApplication = new LeaveApplication();
            model.LeaveApplication.LeaveApplicationGI = LeaveApplicationGI;
            model.AttendanceStatusTypeCode = AttendanceStatusTypeCode;
            model.LeaveType = new MasterBase();
            model.LeaveType.Name = LeaveType;
            var response = await _service.AttendanceRegularizationApprove(model);
            return Json(response);
        }

        [HttpPost]
        public async Task<IActionResult> RejectAttendance(Guid LeaveApplicationGI, int AttendanceStatusTypeCode, String LeaveType)
        {
            AttendanceRegularization model = new AttendanceRegularization();
            model.LeaveApplication = new LeaveApplication();
            model.LeaveApplication.LeaveApplicationGI = LeaveApplicationGI;
            model.AttendanceStatusTypeCode = AttendanceStatusTypeCode;
            model.LeaveType = new MasterBase();
            model.LeaveType.Name = LeaveType;
            var response = await _service.AttendanceRegularizationReject(model);
            return Json(response);
        }



        public async Task<ActionResult> ExportToExcel(int TabIndex, string TabName, string Ltype, string Lperiod)
        {


            AttendanceRegularization model = new AttendanceRegularization();
            int slno = 0;
            string[] Date = System.DateTime.Now.GetDateTimeFormats();
            string currDateTime = Date[44];
            model = await _service.GetAttendanceRegularizationPreviousList(0, 1);
            string LoginUser = HttpContext.Session.GetString("LoginUser");
            var CompanyName = HttpContext.Session.GetString("CompanyName");

            if (TabName == "All")
            {

                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Previous History List");

                    int PendingCountnum = model.PreviousHistoryCount + 6;


                    worksheet.Range("A1:I" + PendingCountnum).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:I" + PendingCountnum).Style.Border.TopBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:I" + PendingCountnum).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:I" + PendingCountnum).Style.Border.RightBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:I" + PendingCountnum).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
                    var wsReportNameHeaderRange = worksheet.Range(string.Format("A{0}:{1}{0}", 1, Char.ConvertFromUtf32(65 + 8)));


                    wsReportNameHeaderRange.Style.Font.Bold = true;
                    wsReportNameHeaderRange.Style.Font.FontSize = 15;
                    wsReportNameHeaderRange.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    wsReportNameHeaderRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    wsReportNameHeaderRange.Merge();
                    wsReportNameHeaderRange.Style.Fill.BackgroundColor = XLColor.FromArgb(191, 191, 191);
                    wsReportNameHeaderRange.Style.Font.FontSize = 15;
                    wsReportNameHeaderRange.Value = "Attendance Regularization " + "(" + TabName + ")";
                    worksheet.Range("A6:I6").Style.Fill.BackgroundColor = XLColor.FromArgb(217, 217, 217);
                    worksheet.Cell(2, 1).Style.Font.Bold = true;
                    worksheet.Cell(2, 1).Value = "Company Name";
                    worksheet.Cell(2, 2).Value = CompanyName.ToUpper();
                    worksheet.Cell(2, 3).Style.Font.Bold = true;
                    worksheet.Cell(2, 3).Value = "Leave Type";
                    worksheet.Cell(2, 4).Value = Ltype;
                    worksheet.Cell(2, 5).Style.Font.Bold = true;
                    worksheet.Cell(2, 5).Value = "Leave Period";
                    worksheet.Cell(2, 6).Value = Lperiod;




                    worksheet.Cell(3, 1).Style.Font.Bold = true;
                    worksheet.Cell(3, 1).Value = "Login User";
                    worksheet.Cell(3, 2).Value = LoginUser;
                    worksheet.Cell(4, 1).Style.Font.Bold = true;
                    worksheet.Cell(4, 1).Value = "Date & Time";
                    worksheet.Cell(4, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(4, 2).Style.DateFormat.Format = "dd-MMM-yyyy   h:mm AM/PM";
                    worksheet.Cell(4, 2).Value = currDateTime.ToString();
                    worksheet.Cell(5, 1).Style.Font.Bold = true;
                    worksheet.Cell(5, 1).Value = "Total Count";
                    worksheet.Cell(5, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(5, 2).Value = model.PreviousHistoryCount;







                    var currentRow = 6;

                    #region Header
                    worksheet.Cell(currentRow, 1).Value = "Sl.No";
                    worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 2).Value = "ID";
                    worksheet.Cell(currentRow, 2).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 3).Value = "Employee Name";
                    worksheet.Cell(currentRow, 3).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 4).Value = "From";
                    worksheet.Cell(currentRow, 4).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 5).Value = "To";
                    worksheet.Cell(currentRow, 5).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 6).Value = "No.of Days";
                    worksheet.Cell(currentRow, 6).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 7).Value = "Type";
                    worksheet.Cell(currentRow, 7).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 8).Value = "Date of Application";
                    worksheet.Cell(currentRow, 8).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 9).Value = "Status";
                    worksheet.Cell(currentRow, 9).Style.Font.Bold = true;




                    #endregion

                    #region Body
                    foreach (var item in model.AttendanceRegularizationList)
                    {
                        currentRow++;
                        slno = slno + 1;
                        worksheet.Cell(currentRow, 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

                        worksheet.Cell(currentRow, 1).Value = slno;
                        worksheet.Cell(currentRow, 2).Value = item.ID;
                        worksheet.Cell(currentRow, 3).Value = item.EmployeeName;
                        worksheet.Cell(currentRow, 4).Value = item.From;
                        worksheet.Cell(currentRow, 5).Value = item.To;
                        worksheet.Cell(currentRow, 6).Value = item.NoOfDays;
                        worksheet.Cell(currentRow, 7).Value = item.Type;
                        worksheet.Cell(currentRow, 8).Value = item.AppliedOn;
                        worksheet.Cell(currentRow, 9).Value = item.Status;

                        worksheet.Columns(1, 9).Style.Alignment.WrapText = true;

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
                            "Attendance Regularization Previous History List.xlsx"
                            );
                    }
                }

            }
            else
            {
                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Attendance Regularization List");
                    //int count = model.AttendanceRegularizationList.Count + 6;
                    int count = model.AllCount + 6;


                    worksheet.Range("A1:J" + count).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:J" + count).Style.Border.TopBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:J" + count).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:J" + count).Style.Border.RightBorder = XLBorderStyleValues.Thin;
                    worksheet.Range("A1:J" + count).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
                    var wsReportNameHeaderRange = worksheet.Range(string.Format("A{0}:{1}{0}", 1, Char.ConvertFromUtf32(65 + 9)));
                    wsReportNameHeaderRange.Style.Font.Bold = true;
                    wsReportNameHeaderRange.Style.Font.FontSize = 15;
                    wsReportNameHeaderRange.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    wsReportNameHeaderRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    wsReportNameHeaderRange.Merge();
                    wsReportNameHeaderRange.Style.Fill.BackgroundColor = XLColor.FromArgb(191, 191, 191);
                    wsReportNameHeaderRange.Value = "Attendance Regularization" + "(" + TabName + ")";
                    worksheet.Range("A6:J6").Style.Fill.BackgroundColor = XLColor.FromArgb(217, 217, 217);
                    worksheet.Cell(2, 1).Style.Font.Bold = true;
                    worksheet.Cell(2, 1).Value = "Company Name";
                    worksheet.Cell(2, 2).Value = CompanyName.ToUpper();
                    worksheet.Cell(3, 1).Style.Font.Bold = true;
                    worksheet.Cell(3, 1).Value = "Login User";
                    worksheet.Cell(3, 2).Value = LoginUser;
                    worksheet.Cell(4, 1).Style.Font.Bold = true;
                    worksheet.Cell(4, 1).Value = "Date & Time";
                    worksheet.Cell(4, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(4, 2).Style.DateFormat.Format = "dd-MMM-yyyy   h:mm AM/PM";
                    worksheet.Cell(4, 2).Value = currDateTime.ToString();
                    worksheet.Cell(5, 1).Style.Font.Bold = true;
                    worksheet.Cell(5, 1).Value = "Total Count";
                    worksheet.Cell(5, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell(5, 2).Value = model.AllCount;




                    var currentRow = 6;

                    #region Header

                    worksheet.Cell(currentRow, 1).Value = "Sl.No";
                    worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 2).Value = "ID";
                    worksheet.Cell(currentRow, 2).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 3).Value = "Employee Name";
                    worksheet.Cell(currentRow, 3).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 4).Value = "Applied On";
                    worksheet.Cell(currentRow, 4).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 5).Value = "Type";
                    worksheet.Cell(currentRow, 5).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 6).Value = "From";
                    worksheet.Cell(currentRow, 6).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 7).Value = "To";
                    worksheet.Cell(currentRow, 7).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 8).Value = "No of Days";
                    worksheet.Cell(currentRow, 8).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 9).Value = "Reason";
                    worksheet.Cell(currentRow, 9).Style.Font.Bold = true;
                    worksheet.Cell(currentRow, 10).Value = "Aging";
                    worksheet.Cell(currentRow, 10).Style.Font.Bold = true;



                    #endregion

                    #region Body
                    foreach (var item in model.AttendanceRegularizationList)
                    {

                        currentRow++;
                        slno = slno + 1;
                        worksheet.Cell(currentRow, 1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet.Cell(currentRow, 1).Value = slno;
                        worksheet.Cell(currentRow, 2).Value = item.ID;
                        worksheet.Cell(currentRow, 3).Value = item.EmployeeName;
                        worksheet.Cell(currentRow, 4).Value = item.AppliedOn;
                        worksheet.Cell(currentRow, 5).Value = item.Type;
                        worksheet.Cell(currentRow, 6).Value = item.From;
                        worksheet.Cell(currentRow, 7).Value = item.To;
                        worksheet.Cell(currentRow, 8).Value = item.NoOfDays;
                        worksheet.Cell(currentRow, 9).Value = item.Reason;
                        worksheet.Cell(currentRow, 10).Value = item.Aging;
                        worksheet.Columns(1, 10).Style.Alignment.WrapText = true;


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
                            "Attendance Rgularization " + TabName + " List.xlsx"
                            );
                    }
                }


            }
        }





    }
}
