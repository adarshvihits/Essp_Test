
var prevTab = 'all';
var currentTab = 0;  //code for 'all'
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function onTabClick(tabName,tabIndex)
{
    debugger
    var month = $("#Month_Code").val();
    var PayrollGroup = $("#PayrollGroup_Code").val();
    $("." + prevTab).removeClass("active");
    $("." + tabName).addClass("active");
    currentTab = tabIndex;
    if (month == 0 || PayrollGroup == 0)
        $('#dailyAttendanceEntryList').hide();
    else
    {
        var url = "/TimeOffice/DailyAttendanceEntry/DailyAttendanceEntryList";
        $('.AttendanceEntryList').load(url, { month: month, PayRollGrp: PayrollGroup, TabIndex: tabIndex }, function () { });
    }
    prevTab = tabName;
}


function onAttendanceStatusChange(Date, sender) {
    debugger
    var AttenCode = $(sender).val();
    var url = "/TimeOffice/DailyAttendanceEntry/DailyAttendanceEditListPartial";
    $('#dailyAttenEditListPartial').load(url, { HeaderDate: Date, AttendanceStatusCode: AttenCode }, function () { });
}
   

function onAbsentDaysCheckboxChange(EmpGuid )
{
    debugger
    var month = $("#Month_Code").val();
    var checkBox = document.getElementById("ShowAbsentDays");
    if (checkBox.checked==true)
      var   ABSTATUS = 1;
    else
        var ABSTATUS = 0;
    var url = '/TimeOffice/DailyAttendanceEntry/EmployeeWiseAttendanceList' + "?EmployeeGI=" + EmpGuid + "&Month=" + month + "&ABSTATUS=" + ABSTATUS;
       $('#emp-Attend-List').load(url, function () { });
  /*  window.location.href = url + "?EmployeeGI=" + EmpGuid + "&Month=" + month + "&ABSTATUS=" + ABSTATUS ;*/
}

function onfilterClick(FormName) {
    debugger

    var url = "/TimeOffice/DailyAttendanceEntry/ApplyFilter?FormName="+FormName;
    $('body').append('<div class="form-overlay"></div>');
    if (FormName =='entryList')
        $('#FilterPartialEntry').load(url, function () { });
    else
        $('#FilterPartialEdit').load(url, function () { });
}

function ApplyFilter(Mode, form) {
    debugger
    if (form == 'outerList') {
        ApplyFilterEntry(Mode);
    }
    else {
        ApplyFilterEmpWiseAttendance(Mode);
    }
}

function ApplyFilterEmpWiseAttendance(Mode)
{
    debugger

    if (Mode == "apply") {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/TimeOffice/DailyAttendanceEntry/ApplyFilterEmpWiseAttendance',
                dataType: 'html',
                data: $('#Time_PayRoll_BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('TP_filter');

                    $('#dailyAttenEditListPartial').html("");
                    $('#dailyAttenEditListPartial').html(result);



                },


                error: function (xhr, textStatus, errorThrown) {
                    swal.fire(xhr.responseText);
                }
            });
            
        }
        else {
            $.ajax({

                type: 'POST',
                url: '/TimeOffice/DailyAttendanceEntry/ApplyFilterEmpWiseAttendance',
                dataType: 'html',
                data: $('#Time_PayRoll_BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('TP_filter');

                    $('#dailyAttenEditListPartial').html("");
                    $('#dailyAttenEditListPartial').html(result);



                },


                error: function (xhr, textStatus, errorThrown) {
                    swal.fire(xhr.responseText);
                }
            });
            $('#filterForm').addClass('filter-apply');
        }

        
    }
    else {


        filterApplicable = 1;
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');

        $.ajax({

            type: 'POST',
            url: '/TimeOffice/DailyAttendanceEntry/ApplyFilterEmpWiseAttendance',
            dataType: 'html',
            data: $('#Time_PayRoll_BasicFilter').serialize(),
            success: function (result) {
                debugger


                $('#dailyAttenEditListPartial').html("");
                $('#dailyAttenEditListPartial').html(result);



            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });


    }

}


function ApplyFilterEntry(Mode) {
    debugger
    if (Mode == "apply") {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/TimeOffice/DailyAttendanceEntry/ApplyFilter',
                dataType: 'html',
                data: $('#Time_PayRoll_BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('TP_filter');

                    $('.AttendanceEntryList').html("");
                    $('.AttendanceEntryList').html(result);



                },


                error: function (xhr, textStatus, errorThrown) {
                    swal.fire(xhr.responseText);
                }
            });           
        }
        else {
            $.ajax({

                type: 'POST',
                url: '/TimeOffice/DailyAttendanceEntry/ApplyFilter',
                dataType: 'html',
                data: $('#Time_PayRoll_BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('TP_filter');

                    $('.AttendanceEntryList').html("");
                    $('.AttendanceEntryList').html(result);



                },


                error: function (xhr, textStatus, errorThrown) {
                    swal.fire(xhr.responseText);
                }
            });
            $('#filterForm').addClass('filter-apply');
        }

       
    }
    else {

        filterApplicable = 1;

        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        $.ajax({

            type: 'POST',
            url: '/TimeOffice/DailyAttendanceEntry/ApplyFilter',
            dataType: 'html',
            data: $('#Time_PayRoll_BasicFilter').serialize(),
            success: function (result) {
                debugger
              

                $('.AttendanceEntryList').html("");
                $('.AttendanceEntryList').html(result);



            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });


    }

}

function onBatchUpdateClick(Date) {
    debugger;
    //var url = "/TimeOffice/DailyAttendanceEntry/DailyAttendanceBatchUpdate?Date="+Date;
   
    //    window.location.href = url;
    //$('#anju').load(url, function (data) {
    //    $('#test').html(data);
    //});
    $.ajax(
        {
            url: "/TimeOffice/DailyAttendanceEntry/DailyAttendanceBatchUpdate?Date=" + Date,
            dataType: "html",
            success: function (data)
            {
                $('body').append('<div class="form-overlay"></div>');
                $('#batchUpdateDailySlider').html("");
                $('#batchUpdateDailySlider').html(data);
            },
            error: function (e) {
                swal.fire('Error: ' + e);
            }
        });
}
function dailyAttendanceBatchUpdateSave(HeaderDate) {

    debugger;
    if (confirm("Do you want to Save?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/TimeOffice/DailyAttendanceEntry/DailyattendanceEntryBatchUpdate',
            dataType: 'json',
            data: $('#dailyAttendanceBatch').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('BatchUpdateDaily');
                       var url= '/TimeOffice/DailyAttendanceEntry/DailyAttendanceEditList?HeaderDate=' + HeaderDate;
                        window.location.href = url;


                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = '/TimeOffice/DailyAttendanceEntry/DailyAttendanceBatchUpdate';
                        $('#batchUpdateDailySlider').load(url, function () { });
                         $('body').append('<div class="form-overlay"></div>');

                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
    else {
        return false;
    }
}

function onEmpWiseBatchUpdateClick(EmployeeGI, selectedDate)
{
    debugger;
    var HeaderDate = new Date(selectedDate);
    let name = month[HeaderDate.getMonth()];
    $.ajax(
        {
            url: "/TimeOffice/DailyAttendanceEntry/EmployeeWiseDailyAttendanceBatchUpdate?EmployeeGI=" + EmployeeGI + "&MonthName=" + name,
            dataType: "html",
            success: function (data) {
                $('body').append('<div class="form-overlay"></div>');
                $('#empAttedBatchUpdateSlider').html("");
                $('#empAttedBatchUpdateSlider').html(data);
            },
            error: function (e) {
                swal.fire('Error: ' + e);
            }
        });

 
}

function EmployeedailyAttendanceBatchUpdateSave() {
    debugger;
  

    var month = $('#Month_Code').val();
    var EmpGuid = $('#Employee_DailyAttendanceBatchUpdate_EmployeeGI').val();
    var MonthName = $('#Employee_DailyAttendanceBatchUpdate_Month_Name').val();

    if (confirm("Do you want to Save?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/TimeOffice/DailyAttendanceEntry/EmployeeWiseAttendanceEntryBatchUpdate',
            dataType: 'json',
            data: $('#empAttendanceBatch').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('BatchUpdateEmp');
                       var  url='/TimeOffice/DailyAttendanceEntry/EmployeeWiseAttendance';
                        window.location.href = url + "?EmployeeGI=" + EmpGuid + "&Month=" + month;


                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = "/TimeOffice/DailyAttendanceEntry/EmployeeWiseDailyAttendanceBatchUpdate?EmployeeGI=" + EmpGuid + "&MonthName=" + name;
                        $('#empAttedBatchUpdateSlider').load(url, function () { });
                        $('body').append('<div class="form-overlay"></div>');

                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
    else {
        return false;
    }
}

function onDailyAttedEditClick(EmployeeGI, HeaderDate) {
    debugger
    var url = "/TimeOffice/DailyAttendanceEntry/DailyAttendanceEdit";
    $('body').append('<div class="form-overlay"></div>');

    $('#DailyAttedEditSlider').load(url, { EmployeeGI: EmployeeGI, HeaderDate: HeaderDate }, function () { });
}
function dailyAttendanceSave() {
    debugger;

   
    var selectedDate = $('#DailyAttendanceEditDetails_SelectedDate').val();

    var date_string = moment(selectedDate, "DD.MM.YYYY").format("YYYY-MM-DD");
    var EmpGuid = $('#DailyAttendanceEditDetails_EmployeeGI').val();

    debugger;

    $.ajax({

        type: 'POST',
        url: '/TimeOffice/DailyAttendanceEntry/DailyAttendanceEditSave',
        dataType: 'json',
        data: $('#daily_Edit').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    debugger
                    CloseSlider('dailyAttenEdit');
                    url = '/TimeOffice/DailyAttendanceEntry/DailyAttendanceEditList';
                    window.location.href = url + "?HeaderDate=" + date_string;


                });

            }
            else {
                swal.fire(result.message).then(function () {
                    debugger
                    var url = '/TimeOffice/DailyAttendanceEntry/DailyAttendanceEdit';
                    $('#DailyAttedEditSlider').load(url, { EmployeeGI: EmpGuid, HeaderDate: selectedDate }, function () { });
                    $('body').append('<div class="form-overlay"></div>');

                });
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            toastr.error(xhr.responseText);
        }
    });
}


function onEmployeeDailyAttendEditClick(EmployeeGI,Date) {
    debugger

    var url = "/TimeOffice/DailyAttendanceEntry/EmployeeDailyAttendanceEdit";
    $('body').append('<div class="form-overlay"></div>');

    $('#empAttedEditSlider').load(url, { EmployeeGI: EmployeeGI, Date: Date }, function () { });
}


function onEmployeeDailyAttendSaveClick() {
    debugger;
    var Date = $('#DailyAttendanceEditDetails_SelectedDate').val();
    var month = $('#Month_Code').val();
    var EmpGuid = $('#DailyAttendanceEditDetails_EmployeeGI').val();

    debugger;

    $.ajax({

        type: 'POST',
        url: '/TimeOffice/DailyAttendanceEntry/DailyAttendanceEditSave',
        dataType: 'json',
        data: $('#employee_Edit').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    debugger
                    CloseSlider('employee-wise-edit');
                    url = '/TimeOffice/DailyAttendanceEntry/EmployeeWiseAttendance';
                    window.location.href = url + "?EmployeeGI=" + EmpGuid + "&Month=" + month;


                });

            }
            else {
                swal.fire(result.message).then(function () {
                    debugger
                    var url = '/TimeOffice/DailyAttendanceEntry/EmployeeDailyAttendanceEdit';
                    $('#DailyAttedEditSlider').load(url, { EmployeeGI: EmpGuid, Date: Date }, function () { });
                    $('body').append('<div class="form-overlay"></div>');

                });
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            toastr.error(xhr.responseText);
        }
    });
}




function onProceedClick()
{
    debugger
    var month = $("#Month_Code").val();
    var PayrollGroup = $("#PayrollGroup_Code").val();
    if (validateById('#Month_Code', 'dailyMonth') && validateById('#PayrollGroup_Code', 'dailyPayRoll'))
    {
        var url = "/TimeOffice/DailyAttendanceEntry/DailyAttendanceEntryList";
        /* window.location.href = url + "?month=" + month + "&PayRollGrp=" + PayrollGroup + "&TabIndex=" + currentTab;*/
        $('.AttendanceEntryList').load(url, { month: month, PayRollGrp: PayrollGroup, TabIndex: currentTab }, function () { });
    }
     
}

function onEmpWiseProceedClick(EmployeeGI) {
    debugger;
    var month = $("#Month_Code").val();
    if (validateById('#Month_Code', 'employeeMonth')) {

        url = '/TimeOffice/DailyAttendanceEntry/EmployeeWiseAttendance';
        window.location.href = url + "?EmployeeGI=" + EmployeeGI + "&Month=" + month;
    }
}


function exportToexcel_DailyAttendanceEntry()
{
    debugger;
    if (!($('#daily-attendance-entry-list-table').length))
        swal.fire("No data found to export");
   var TableLength = document.getElementById("daily-attendance-entry-list-table").rows.length - 1;
    if (TableLength > 0) {
        url = '/TimeOffice/DailyAttendanceEntry/ExportToexcel_DailyAttendanceEntryList';
            window.location.href = url;
            }
            else {
                swal.fire("No data found to export");
            }
}






function ExportToExcel_EmployeeAttendanceEDitList(EmployeeGI) {
    debugger;
    var Month = $("#Month_Code").val();
    var MonthName = $("#Month_Code option:selected").text();
    var checkBox = document.getElementById("ShowAbsentDays");
    if (checkBox.checked == true)
        var ABSTATUS = 1;
    else
        var ABSTATUS = 0;

    var TableLength = document.getElementById("employee-wise-attendance-entry-list-table").rows.length - 1;

    if (TableLength > 0) {
        url = '/TimeOffice/DailyAttendanceEntry/ExportToExcel_EmployeeAttendanceEDitList';
        window.location.href = url + "?EmployeeGI=" + EmployeeGI + "&Month=" + Month + "&ABSTATUS=" + ABSTATUS + "&MonthName=" + MonthName;
    }
    else {
        swal.fire("No data found to export");
    }
}



function exportToExcel_DailyAttendanceEDitList (HeaderDate) {
    debugger
    var AttenCode = $("#AttnDay_Code").val();
    var AttenName = $("#AttnDay_Code option:selected").text();
    var TableLength = document.getElementById("daily-attendance-edit-list-table").rows.length - 1;
    if (TableLength > 0) {
        url = '/TimeOffice/DailyAttendanceEntry/ExportToExcel_DailyAttendanceEDitList';
        window.location.href = url + "?HeaderDate=" + HeaderDate + "&AttendanceStatusCode=" + AttenCode + "&AttendanceStatusName=" + AttenName;
    }
    else {
        swal.fire("No data found to export");
    }
}