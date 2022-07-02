
var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Shift/GetShiftList";

    $('#ShiftList').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}


function AddNewOrEdit(Action,GI,LogGI) {
    debugger;
    if (Action == 'MODIFY') {
         var url = "/Master/Shift/Edit?ShiftGI=" + GI + "&LogGI=" + LogGI;
       

    }
    else {
        var url = "/Master/Shift/Create";
    }
    /*  window.location.href = url;*/
    $('#AddNewOrEditSlider').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
    //$('#AddNewOrEditSlider').show();
}
function Delete(GI,LogGI) {

    debugger;
    var url = "/Master/Shift/Delete?ShiftGI=" + GI + "&LogGI=" + LogGI;
  
    $('#DeleteSlider').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');k

}
function Approve(GI,LogGI) {
    debugger;
    var url = "/Master/Shift/Approve?ShiftGI=" + GI + "&LogGI=" + LogGI;
  
    $('#ApproveSlider').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
}

function getBreakHour()
{
    var startTime = $('#BreakHourStartTime').val();
    var endTime = $('#BreakHourEndTime').val();
    /* var breakTime = $('#BreakHour').val();*/

    var todayDate = moment(new Date()).format("MM-DD-YYYY"); //Instead of today date, We can pass whatever date        

    var startDate = new Date(`${todayDate} ${startTime}`);
    var endDate = new Date(`${todayDate} ${endTime}`);
    var timeDiff = Math.abs(startDate.getTime() - endDate.getTime());

    var hh = Math.floor(timeDiff / 1000 / 60 / 60);
    hh = ('0' + hh).slice(-2)
    timeDiff -= hh * 1000 * 60 * 60;
    var mm = Math.floor(timeDiff / 1000 / 60);
    mm = ('0' + mm).slice(-2)
    var brkHr = hh + ": " + mm;

    $('#BreakHour').val(hh + ": " + mm);
    getScheduledHour(brkHr);
}


function getScheduledHour(brkHr) {
  
   var startTime = $('#ShiftStartTime').val();
    var endTime = $('#ShiftEndTime').val();  
    var shiftDiff = timeStringToFloat(endTime) - timeStringToFloat(startTime);
    var brkDiff = timeStringToFloat(brkHr);
    var totalHrs = shiftDiff - brkDiff;
   
    $('#ScheduledHour').val(totalHrs);  
}
function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
}

function confirmReject(GI, LogGI) {
    debugger;


    if (confirm("Do you want to Confirm?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/Shift/Reject',
            dataType: 'json',
            data: $('#ApproveShift').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('PendingApprove');
                        var url = "/Master/Shift/GetShiftList?TabIndex=" + 'APPROVAL_PENDING';
                        $('#ShiftList').load(url, function () { });
                        $(".PendingTab").addClass("active");
                        $(".ActiveTab").removeClass("active");
                        $("#ShiftList").removeClass("hide");
                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = "/Master/Shift/Approve?ShiftGI=" + GI + "&LogGI=" + LogGI;
                        $('#ApproveSlider').load(url, function () { });
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

function confirmApprove(GI, LogGI) {


    if (confirm("Do you want to Confirm?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/Shift/Approve',
            dataType: 'json',
            data: $('#ApproveShift').serialize(),
            success: function (result) {

                if (result.success == true) {
                    debugger
                    swal.fire(result.message).then(function () {
                        CloseSlider('PendingApprove');
                        var url = "/Master/Shift/GetShiftList?TabIndex=" + 'APPROVAL_PENDING';
                        debugger
                        window.location.href = url;
                        $('#ShiftList').load(url, function () { });
                        $(".PendingTab").addClass("active");
                        $(".ActiveTab").removeClass("active");
                        $("#ShiftList").removeClass("hide");
                    });

                }

                else {
                    debugger;
                    swal.fire(result.message).then(function () {
                        var url = "/Master/Shift/Approve?ShiftGI=" + GI + "&LogGI=" + LogGI;
                        $('#ApproveSlider').load(url, function () { });
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

function ExportToExcel() {

    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("ShiftPendingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Shift/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("ShiftTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Shift/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }

        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("ShiftTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Shift/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }

    }

}


function validateShift() {
    debugger;
    if ($('.SName').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#ShiftName").addClass('error-message');
        $('#ShiftName').html("This field is required");
        $('#Name').focus();
        return false;
    }
    else if ($('.SShortName').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#ShiftShtName").addClass('error-message');
        $('#ShiftShtName').html("This field is required");
        $('#ShortName').focus();
        return false;
    }
    else if ($('.SCode').val() == '') {

        $('#ShiftCode').addClass('is-invalid');
        $("#ShCode").addClass('error-message');
        $('#ShCode').html("This field is required");
        $('#ShiftCode').focus();
        return false;
    }
    else if ($('.SType').val() == '') {

        $('#ShiftType_Code').addClass('is-invalid');
        $("#ShiftType").addClass('error-message');
        $('#ShiftType').html("This field is required");
        $('#ShiftType_Code').focus();
        return false;
    }
    else if ($('.fDayHour').val() == '') {

        $('#FullDayHour').addClass('is-invalid');
        $("#FullDayHr").addClass('error-message');
        $('#FullDayHr').html("This field is required");
        $('#FullDayHour').focus();
        return false;
    }
    else if ($('.HDayHour').val() == '') {

        $('#HalfDayHour').addClass('is-invalid');
        $("#HalfDayHr").addClass('error-message');
        $('#HalfDayHr').html("This field is required");
        $('#HalfDayHour').focus();
        return false;
    }
    else
        return true;
}



