 var global_FROM=0;
 var global_TO=0;
 var global_Month=0;
 var global_CIRCLE=0;
 var global_PayrollGroup=0;
function onProceedClick()
{
    debugger
    if (validateById('#Month_Code', 'dutymonth') && validateById('#PayrollGroup_Code', 'duty') && validateById('#Frome', 'dutyfrom') && validateById('#To', 'dutyto') && validateById('#Circle_Code', 'dutycircle') )
    {

        var from = $('#From').val();
        var to = $('#To').val();
        date1 = new Date(from);
        date2 = new Date(to);
        if (date1 > date2) {
            swal.fire("From Date Should Be greater than To date");
            return false;
        }
        debugger
        var url = "/TimeOffice/DutyRoster/DutyRosterEntryList";
        var FROM = $("#From").val();
        var TO = $("#To").val();
        var Month = $("#Month_Code").val();
        var CIRCLE = $("#Circle_Code").val();
        var PayrollGroup = $("#PayrollGroup_Code").val();
       


        $("#F_Month_Code").val(global_Month);
        $("#F_PayrollGroup_Code").val(global_PayrollGroup);
        $("#F_Circle_Code").val(global_CIRCLE);
        $("#F_From").val(global_FROM);
        $("#F_To").val(global_TO);
  
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');

        /*window.location.href = url + "?Month=" + Month + "&PayrollGroup=" + PayrollGroup + "&FROM=" + FROM + "&TO=" + TO + "&CIRCLE=" + CIRCLE;*/
        $('#dutyRosterList').load(url, { Month: Month, PayrollGroup: PayrollGroup, FROM: FROM, TO: TO, CIRCLE: CIRCLE }, function () { });
        global_FROM = FROM;
        global_TO = TO;
        global_Month = Month;
        global_CIRCLE = CIRCLE;
        global_PayrollGroup = PayrollGroup;
       /* ApplyFilter('apply','outerList');*/
    }
}



function onDutyCancelClick(index)
{
    $('.shift_Label_' + index).removeClass('hide');
    $('.edit_Button_' + index).removeClass('hide');
    $('.shift_ID_' + index).addClass('hide');
    $('.save_Cancel_' + index).css("display", "none");
  /*  $('.save_Cancel_' + index).addClass('hide');*/
}

function onDutyDateWiseCancelClick(index) {
    debugger
    $('.shift_Label_DateWise_' + index).removeClass('hide');
    $('.edit_Button_DateWise_' + index).removeClass('hide');
    $('.shift_ID_DateWise_' + index).addClass('hide');
 /*   $('.save_Cancel_DateWise_' + index).addClass('hide');*/
    $('.save_Cancel_DateWise_' + index).css("display", "none");
}
function onDutyEditClick(index) {
    debugger;

    $('.shift_Label_' + index).addClass('hide');
    $('.edit_Button_' + index).addClass('hide');
    $('.shift_ID_' + index).removeClass('hide');
    $('.save_Cancel_' + index).show();

}
function onDutyDateWiseEditClick(index, EmployeeGi) {
    debugger;
    $.getJSON("/TimeOffice/DutyRoster/GetEmpWiseShiftDrpDown", { EmployeeGI: EmployeeGi }, function (data) {
        console.log(data);
        $('#DateWise_DutyRosterEditDetails_' + index + '__ShiftDetails_Code option').remove();
        $('#DateWise_DutyRosterEditDetails_' + index + '__ShiftDetails_Code').append('<option value>Shift Code</option');
        
        for (var i = 0; i < data.length; i++) {
            $('#DateWise_DutyRosterEditDetails_' + index + '__ShiftDetails_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });

    $('.shift_Label_DateWise_' + index).addClass('hide');
    $('.edit_Button_DateWise_' + index).addClass('hide');
    $('.shift_ID_DateWise_' + index).removeClass('hide');
    $('.save_Cancel_DateWise_' + index).show();

}
function onShiftChange(sender, index)
{
    debugger
    var Shift = $(sender).val();
    $.getJSON("/TimeOffice/DutyRoster/GetShiftDetails", { ShiftCode: Shift }, function (data) {
        console.log(data);
        $(".dutyShiftName_Row_" + index).html(data.name);
        $(".dutyShiftStart_Row_" + index).html(data.shiftStartTime);
        $(".dutyShiftEnd_Row_" + index).html(data.shiftEndTime);

     

    });


}

function onDateWiseShiftChange(sender, index) {
    debugger
    var Shift = $(sender).val();
    $.getJSON("/TimeOffice/DutyRoster/GetShiftDetails", { ShiftCode: Shift }, function (data) {
        console.log(data);
        $(".dutyShiftName_DateWise_Row_" + index).html(data.name);
        $(".dutyShiftStart_DateWise_Row_" + index).html(data.shiftStartTime);
        $(".dutyShiftEnd_DateWise_Row_" + index).html(data.shiftEndTime);



    });


}

function OnDutySaveClick(EmployeeGI, index) {
    debugger;
    if (!validateById('#Employee_DutyRosterEditDetails_' + index + '__ShiftDetails_Code', 'dutyDREmpShift'))
        return false;
    else {
        var Shift = $("#Employee_DutyRosterEditDetails_" + index + "__ShiftDetails_Code").val();
        var Date = $("#Employee_DutyRosterEditDetails_" + index + "__Date").val();
         $.ajax({
            type: 'POST',
            url: '/TimeOffice/DutyRoster/DutyRosterSave',
            dataType: 'json',
            data: { EmployeeGI: EmployeeGI, Date: Date, ShiftCode: Shift },
            success: function (result) {
                debugger;
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        var url = "/TimeOffice/DutyRoster/EmployeeDutyRosterEditDetails";
                        window.location.href = url + "?EmployeeGI=" + EmployeeGI;


                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = "/TimeOffice/DutyRoster/EmployeeDutyRosterEditDetails";
                        window.location.href = url + "?EmployeeGI=" + EmployeeGI;

                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}
function OnDutyDateWiseSaveClick(EmployeeGI, index, date) {
    debugger;
    if (!validateById('#DateWise_DutyRosterEditDetails_' + index + '__ShiftDetails_Code', 'dutyRrDateShift'))
        return false;
    else {
        var Shift = $("#DateWise_DutyRosterEditDetails_" + index + "__ShiftDetails_Code").val();
        $.ajax({
            type: 'POST',
            url: '/TimeOffice/DutyRoster/DutyRosterSave',
            dataType: 'json',
            data: { EmployeeGI: EmployeeGI, Date: date, ShiftCode: Shift },
            success: function (result) {
                debugger;

                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        var url = "/TimeOffice/DutyRoster/DutyRosterDateWiseEntryList";
                        /* window.location.href = url + "?SelectedDate=" + date;*/
                        debugger
                   
                        $('#dateWiseDutyList').load(url, { SelectedDate: date }, function () { });
                        $('.shift_Label_DateWise_' + index).removeClass('hide');
                        $('.edit_Button_DateWise_' + index).removeClass('hide');

                        $('.shift_ID_DateWise_' + index).addClass('hide');
                        $('.save_Cancel_DateWise_' + index).css("display", "none");


                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = "/TimeOffice/DutyRoster/DutyRosterDateWise";
                        window.location.href = url + "?SelectedDate=" + date;

                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}
function onDutyRostrAllClick(colchkid, tableid) {
    debugger
    if ($('#' + colchkid).is(':checked'))
        $('#' + tableid).find('input[type=checkbox]').prop('checked', true);
    else
        $('#' + tableid).find('input[type=checkbox]').prop('checked', false);
}

function onFromDATEChange(sender)
{
    debugger
    datefrom = new Date($(sender).val());
    var GF = global_FROM;
    var GT = global_TO;
    dateFGlobal = new Date(GF.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    dateTGlobal = new Date(GT.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

    if (datefrom < dateFGlobal || datefrom > dateTGlobal) {
        swal.fire("Date Range Should be in Between " + global_FROM.split(' ')[0] + " and  " + global_TO.split(' ')[0]);
        return false;
    }
   
}
function onTODATEChange(sender) {
    debugger

    dateTo = new Date($(sender).val());
    var GF = global_FROM;
    var GT = global_TO;
    dateFGlobal = new Date(GF.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    dateTGlobal = new Date(GT.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
   
    if (dateTo > dateTGlobal || dateTo < dateFGlobal) {
        swal.fire("Date Range Should be in Between " + global_FROM.split(' ')[0] + " and  " + global_TO.split(' ')[0]);
        return false;
    }
}




function onFilterClick(FormName)
{
    debugger
    var url = '/TimeOffice/DutyRoster/Filter';
    $('#dutyFilter').load(url, { FormName: FormName  }, function () { });
    
}
function ApplyFilter(Mode, form)
{
    debugger
    if (form == 'outerList')
    {
        ApplyFilterEntry(Mode);
    }
    else
    {
        ApplyFilterDateWise(Mode);
    }
}
function ApplyFilterEntry(Mode) {
    debugger
    //$("#Month_Code").val(global_Month);
    //$("#PayrollGroup_Code").val(global_PayrollGroup);
    //$("#Circle_Code").val(global_CIRCLE);
    //$("#From").val(global_FROM);
    //$("#To").val(global_TO);
    //console.log($('#Time_PayRoll_BasicFilter').serialize());
    if (Mode == "apply") {


        $.ajax({

            type: 'POST',
            url: '/TimeOffice/DutyRoster/ApplyFilterEntry',
            dataType: 'html',
            data: $('#Time_PayRoll_BasicFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('TP_filter');

                $('#dutyRosterList').html("");
                $('#dutyRosterList').html(result);



            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
        $('#filterForm').addClass('filter-apply');
    }
    else {



        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        $.ajax({

            type: 'POST',
            url: '/TimeOffice/TimeOffice/ApplyFilter',
            dataType: 'html',
            data: $('#Time_PayRoll_BasicFilter').serialize(),
            success: function (result) {
                debugger

                $('#dutyRosterList').html("");
                $('#dutyRosterList').html(result);

              



            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });


    }

}

function ApplyFilterDateWise(Mode) {
    debugger
    //$("#Month_Code").val(global_Month);
    //$("#PayrollGroup_Code").val(global_PayrollGroup);
    //$("#Circle_Code").val(global_CIRCLE);
    //$("#From").val(global_FROM);
    //$("#To").val(global_TO);
    //console.log($('#Time_PayRoll_BasicFilter').serialize());
    if (Mode == "apply") {


        $.ajax({

            type: 'POST',
            url: '/TimeOffice/DutyRoster/ApplyFilterDateWise',
            dataType: 'html',
            data: $('#Time_PayRoll_BasicFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('TP_filter');

                $('#dateWiseDutyList').html("");
                $('#dateWiseDutyList').html(result);



            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
        $('#filterForm').addClass('filter-apply');
    }
    else {



        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        $.ajax({

            type: 'POST',
            url: '/TimeOffice/DutyRoster/ApplyFilterDateWise',
            dataType: 'html',
            data: $('#Time_PayRoll_BasicFilter').serialize(),
            success: function (result) {
                debugger

                $('#dateWiseDutyList').html("");
                $('#dateWiseDutyList').html(result);





            },


            error: function (xhr, textStatus, errorThrown) {
                
                swal.fire(xhr.responseText);
            }
        });


    }

}

//BatchUpdate
function onEntryBatchUpdateClick()
{
    
    debugger
    var a = global_FROM;
    var url = '/TimeOffice/DutyRoster/EntryBatchUpdate';

    $('#dutyEntryBatch').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
}

function onDutyBatchShiftCHnage(sender,formName)
{
    debugger
    shiftCode = $(sender).val();
    var url = '/TimeOffice/DutyRoster/GetEntryBatchUpdateEmployeeList';
    if (formName == 'entry')
        $('#dutyEntryBatchList').load(url, { ShiftCode: shiftCode, FormName: formName }, function () { });
    else
        $('#dutyDateWiseBatchList').load(url, { ShiftCode: shiftCode, FormName: formName}, function () { });
}

function ondutyDateWiseBatchUpdateClick(selecteddate)
{
    debugger
    var url = '/TimeOffice/DutyRoster/DateWiseBatchUpdate';
    $('#dateWiseDutyBatch').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
}

function onDateWiseBatchUpdateSaveClick(selecteddate) {
    debugger
   

    if (!validateById('#ShiftDetails_Code', 'dutyDatewiseShift'))
        return false;
    else
        $.ajax({

            type: 'POST',
            url: '/TimeOffice/DutyRoster/EntryBatchUpdateSave',
            dataType: 'json',
            data: $('#dutyDateWise_Batch_Form').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('dutyDateWise_Batch');
                        var url = "/TimeOffice/DutyRoster/DutyRosterDateWise";
                        debugger

                        window.location.href = url + "?SelectedDate=" + selecteddate;
                 
                        //var url = "/TimeOffice/DutyRoster/DutyRosterEntryList";
                        //$('#dutyRosterList').load(url, { Month: global_Month, PayrollGroup: global_PayrollGroup, FROM: global_FROM, TO: global_TO, CIRCLE: global_CIRCLE }, function () { });


                    });

                }
                else {
                    swal.fire(result.message).then(function () {


                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
}
function onEmpWiseBatchUpdateClick(employeeGI)
{
    debugger
    var url = '/TimeOffice/DutyRoster/EmpWiseBatchUpdate';

    $('#employeeWiseDutyBatch').load(url, { EmployeeGI: employeeGI }, function () { });
    $('body').append('<div class="form-overlay"></div>');
}

function onEmpWiseBatchSAveClick(employeeGI)
{
    debugger
    $.ajax({

        type: 'POST',
        url: '/TimeOffice/DutyRoster/DutyRoster_Employeewise_BatchUpDate',
        dataType: 'json',
        data: $('#dutyEmp_Batch_Form').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    CloseSlider('dutyEmpBatch');
                    var url = "/TimeOffice/DutyRoster/EmployeeDutyRosterEditDetails";
                    window.location.href = url + "?EmployeeGI=" + employeeGI;

                });

            }
            else {
                swal.fire(result.message).then(function () {


                });
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            toastr.error(xhr.responseText);
        }
    });
}
function onEntryBatchUpdateSaveClick()
{
    if (!validateById('#ShiftDetails_Code', 'dutyBatchShift'))
        return false;
    else
        $.ajax({

            type: 'POST',
            url: '/TimeOffice/DutyRoster/EntryBatchUpdateSave',
            dataType: 'json',
            data: $('#dutyEntry_Batch_Form').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('dutyBatchupdate');
                        var url = "/TimeOffice/DutyRoster/DutyRosterEntryList";
                        debugger
                        ApplyFilterEntry('apply');
                        //$('#dutyRosterList').load(url, { Month: global_Month, PayrollGroup: global_PayrollGroup, FROM: global_FROM, TO: global_TO, CIRCLE: global_CIRCLE }, function () { });


                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                     

                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
}
function onEmployeeWiseExportClick(emp)
{
    debugger
    var TableLength = document.getElementById("dutyRosterDetailsListTable").rows.length - 1;
    if (TableLength > 0) {
        url = '/TimeOffice/DutyRoster/ExportToexcel_DutyRosterEmployeeWiseList';
        window.location.href = url + "?EmployeeGI=" + emp ;
    }
    else {
        swal.fire("No data found to export");
    }
}

function onDateWiseExportClick()
{
    debugger
    var TableLength = document.getElementById("dutyDateWiseEntrytable").rows.length - 1;
    if (TableLength > 0) {
        url = '/TimeOffice/DutyRoster/ExportToexcel_DutyRosterDateWiseList';
        window.location.href = url;
    }
    else {
        swal.fire("No data found to export");
    }
}

function onDutyRosterListExportClick() {
    debugger
    if (!($('#dutyRoasterEntryListTable').length))
        swal.fire("No data found to export");
    var TableLength = document.getElementById("dutyRoasterEntryListTable").rows.length - 1;
    if (TableLength > 0) {
        url = '/TimeOffice/DutyRoster/ExportToexcel_DutyRosterEntryList';
        window.location.href = url;
    }
    else {
        swal.fire("No data found to export");
    }
}

