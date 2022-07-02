const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function onProceedClick() {
    debugger
    var month = $("#Month_Code").val();
  
    if (validateById('#Month_Code', 'EmployeeWiseAttendanceMonth')) {
        var url = "/TimeOffice/EmployeeWiseAttendanceEntry/EmployeeWiseAttendanceList";
        /* window.location.href = url + "?month=" + month + "&PayRollGrp=" + PayrollGroup + "&TabIndex=" + currentTab;*/
        $('#eaEntry_List_Partial').load(url, { month: month }, function () { });
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
    }
   

}

function onAbsentDaysCheckboxChange(EmpGuid) {
    debugger
    var month = $("#Month_Code").val();
    var checkBox = document.getElementById("ShowAbsentDays");
    if (checkBox.checked == true)
        var ABSTATUS = 1;
    else
        var ABSTATUS = 0;
    var url = '/TimeOffice/EmployeeWiseAttendanceEntry/EmployeeWiseAttendanceEditList' + "?EmployeeGI=" + EmpGuid + "&Month=" + month + "&ABSTATUS=" + ABSTATUS;
    $('#eaEntry_Edit_List_Partial').load(url, function () { });
    /*  window.location.href = url + "?EmployeeGI=" + EmpGuid + "&Month=" + month + "&ABSTATUS=" + ABSTATUS ;*/
}


function onEmpWiseProceedClick(EmployeeGI) {
    debugger;
    var month = $("#Month_Code").val();
    if (validateById('#Month_Code', 'eaEntry_EditMonth')) {

        url = '/TimeOffice/EmployeeWiseAttendanceEntry/EmployeeWiseAttendanceEdit';
        window.location.href = url + "?EmployeeGI=" + EmployeeGI + "&Month=" + month;
    }
}

function onfilterClick() {
    debugger

    var url = "/TimeOffice/EmployeeWiseAttendanceEntry/ApplyFilter";
    $('body').append('<div class="form-overlay"></div>');
   
    $('#eaEntry_Filter_Partial').load(url, function () { });
    
}

function ApplyFilter(mode) {
    debugger

    if (mode == 'apply') {
        $.ajax({

            type: 'POST',
            url: '/TimeOffice/EmployeeWiseAttendanceEntry/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('basicFilter');

                $('#eaEntry_List_Partial').html("");
                $('#eaEntry_List_Partial').html(result);

                $('#eaEntry_List_Partial').removeClass('hide');

                //$('#rewardsListPartial').addClass('hide');               
            },


            error: function (xhr, textStatus, errorThrown) {
                debugger
                swal.fire(xhr.responseText);
            }
        });
        $('#filterForm').addClass('filter-apply');
    }
    else {
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $.ajax({

            type: 'POST',
            url: '/TimeOffice/EmployeeWiseAttendanceEntry/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#eaEntry_List_Partial').html("");
                $('#eaEntry_List_Partial').html(result);

                $('#eaEntry_List_Partial').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
        $('#filterForm').removeClass('filter-apply');
    }
}




function onEmpWiseBatchUpdateClick(EmployeeGI, selectedDate) {
    debugger;
    var HeaderDate = new Date(selectedDate);
    let name = month[HeaderDate.getMonth()];
    $.ajax(
        {
            url: "/TimeOffice/EmployeeWiseAttendanceEntry/BatchUpdate?EmployeeGI=" + EmployeeGI + "&MonthName=" + name,
            dataType: "html",
            success: function (data) {
                $('body').append('<div class="form-overlay"></div>');
                $('#eaEntry_BatchUpdateSlider').html("");
                $('#eaEntry_BatchUpdateSlider').html(data);
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
            url: '/TimeOffice/EmployeeWiseAttendanceEntry/BatchUpdateSave',
            dataType: 'json',
            data: $('#eaEntry_Batch_Form').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('eaEntry_Batch_Slider');
                        debugger
                     var   url='/TimeOffice/EmployeeWiseAttendanceEntry/EmployeeWiseAttendanceEdit';
                        window.location.href = url + "?EmployeeGI=" + EmpGuid + "&Month=" + month;


                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = "/TimeOffice/EmployeeWiseAttendanceEntry/BatchUpdate?EmployeeGI=" + EmpGuid + "&MonthName=" + name;
                            $('#eaEntry_BatchUpdateSlider').load(url, function () { });
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

function onEmployeeDailyAttendEditClick(EmployeeGI, Date) {
    debugger

    var url = "/TimeOffice/EmployeeWiseAttendanceEntry/Edit";
    $('body').append('<div class="form-overlay"></div>');

    $('#eaEntry_Edit_Slider').load(url, { EmployeeGI: EmployeeGI, Date: Date }, function () { });
}


function onEmployeeDailyAttendSaveClick() {
    debugger;
    var Date = $('#DailyAttendanceEditDetails_SelectedDate').val();
    var month = $('#Month_Code').val();
    var EmpGuid = $('#DailyAttendanceEditDetails_EmployeeGI').val();

    debugger;

    $.ajax({

        type: 'POST',
        url: '/TimeOffice/EmployeeWiseAttendanceEntry/EditSave',
        dataType: 'json',
        data: $('#eaEntry_Edit_Form').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    debugger
                    CloseSlider('eaEntry_Edit');
                    url = '/TimeOffice/EmployeeWiseAttendanceEntry/EmployeeWiseAttendanceEdit';
                    window.location.href = url + "?EmployeeGI=" + EmpGuid + "&Month=" + month;


                });

            }
            else {
                swal.fire(result.message).then(function () {
                    debugger
                    var url = '/TimeOffice/EmployeeWiseAttendanceEntry/Edit';
                    $('#eaEntry_Edit_Slider').load(url, { EmployeeGI: EmpGuid, Date: Date }, function () { });
                    $('body').append('<div class="form-overlay"></div>');

                });
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            toastr.error(xhr.responseText);
        }
    });
}
function ExportToExcel_EmployeeAttendanceList() {
    debugger;
    var Month = $("#Month_Code").val();
    if (!($('#eaEntry_Summary_table').length))
        swal.fire("No data found to export");
    var TableLength = document.getElementById("eaEntry_Summary_table").rows.length - 1;
    if (TableLength > 0) {
        url = '/TimeOffice/EmployeeWiseAttendanceEntry/ExportToExcel_EmployeeAttendanceList';
        window.location.href = url + "?Month=" + Month + "&Mname=" + $('#Month_Code option:selected').text();
    }
    else {
        swal.fire("No data found to export");
    }
}

function ExportToExcel_EmployeeAttendanceEDitList(EmployeeGI) {
    debugger;
    if (!($('#eaEntry_edit_Table').length))
        swal.fire("No data found to export");
    var Month = $("#Month_Code").val();


    var checkBox = document.getElementById("ShowAbsentDays");
    if (checkBox.checked == true)
        var ABSTATUS = 1;
    else
        var ABSTATUS = 0;
  
    var TableLength = document.getElementById("eaEntry_edit_Table").rows.length - 1;

    if (TableLength > 0) {
        url = '/TimeOffice/EmployeeWiseAttendanceEntry/ExportToExcel_EmployeeAttendanceEDitList';
        window.location.href = url + "?EmployeeGI=" + EmployeeGI + "&Month=" + Month + "&ABSTATUS=" + ABSTATUS + "&Mname=" + $('#Month_Code option:selected').text();
    }
    else {
        swal.fire("No data found to export");
    }
}