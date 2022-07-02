

var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';


function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/AttendanceStatus/GetAttendanceStatusList";

    $('#AttendanceStatusList').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}

function AddNewOrEdit(Action, GI, LogGI) {
    debugger;
    if (Action == 'MODIFY') {
        var url = "/Master/AttendanceStatus/Edit?AttendanceStatusGI=" + GI + "&LogGI=" + LogGI;
    }
    else {
        var url = "/Master/AttendanceStatus/Create";
    }
    $('.AddNewOrEdit').load(url, function () { });
    $("#AddNewOrEditSlider").removeClass("hide");
    $('body').append('<div class="form-overlay"></div>');
    $(".AddNewOrEdit").show();
}
function Approve(GI, LogGI) {
    debugger;
    var url = "/Master/AttendanceStatus/Approve?AttendanceStatusGI=" + GI + "&&LogGI=" + LogGI;
    $('.ApproveDiv').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
    $("#ApproveSlider").removeClass("hide");
    $(".ApproveDiv").show();

}
function confirmApprove(GI, LogGI) {

    if (confirm("Do you want to Confirm?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/AttendanceStatus/Approve',
            dataType: 'json',
            data: $('#approveAttendanceStatus').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('ApproveDiv');
                        var url = "/Master/AttendanceStatus/GetAttendanceStatusList?TabIndex=" + 'APPROVAL_PENDING';
                        window.location.href = url;

                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        debugger;
                        var url = "/Master/AttendanceStatus/Approve?AttendanceStatusGI=" + GI + "&LogGI=" + LogGI;
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
function confirmReject(GI, LogGI) {

    if (confirm("Do you want to Confirm?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/AttendanceStatus/Reject',
            dataType: 'json',
            data: $('#approveAttendanceStatus').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('ApproveDiv');
                        var url = "/Master/AttendanceStatus/GetAttendanceStatusList?TabIndex=" + 'APPROVAL_PENDING';
                        window.location.href = url;
                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = "/Master/AttendanceStatus/Approve?AttendanceStatusGI=" + GI + "&LogGI=" + LogGI;
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
function Delete(GI, LogGI) {

    debugger;

    var url = "/Master/AttendanceStatus/Delete?AttendanceStatusGI=" + GI + "&LogGI=" + LogGI;
    $('.delete').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
    $("#DeleteSlider").removeClass("hide");
    $(".delete").show();
}
function ExportToExcel() {
    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingAttendanceStatus").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/AttendanceStatus/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("AttendanceStatusTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/AttendanceStatus/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("AttendanceStatusTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/AttendanceStatus/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }

    }
}
}
function validateAttendanceStatus() {
    debugger;
    if ($('.AName').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#AllowanceName").addClass('error-message');
        $('#AllowanceName').html("This field is required");
        $('#Name').focus();
        return false;
    }

    else if ($('.AShtName').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#AllowanceShort").addClass('error-message');
        $('#AllowanceShort').html("This field is required");
        $('#ShortName').focus();
        return false;
    }

    else
        return true;
}