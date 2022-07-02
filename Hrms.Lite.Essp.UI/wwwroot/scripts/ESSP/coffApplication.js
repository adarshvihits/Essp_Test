var prevTab = 'PendingTab';
var currentTab = 'Pending';
var TabIndex;
function onLeaveChange() {
    debugger
    if (!validateById("#LeaveOn", "coffLeaveOn"))
        return false;
    else {
        var url = "/ESSP/CoffApplication/GetLeaveDayWiseDetails";
        $("#TotalDays").val(1);
        $(".coffTotalDays").html(1);
        $('#coffDayWiseList').load(url, { Leaveon: $("#LeaveOn").val() }, function () { });
    }

}

function CheckExtensionAndSize(e) {
    debugger;


    var size = $(e)[0].files[0].size; //Size is in Bytes
    var filename = $(e)[0].files[0].name;
    var fileExtension = ['jpeg', 'jpg', 'png', 'bmp', 'pdf'];
    if (size > 1024 * 1024)  //1,048,576 Bytes=1 MB
    {
        swal.fire('File size should be less than 1 MB');
        $(e).val('');
    }
    if ($.inArray($(e).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        swal.fire("Only pdf, Jpeg,Jpg,Png and bmp files are allowed");
        $(e).val('');
    }

}
function validateCoffApply() {
    debugger
    var i = 0;
    if (!validateById("#LeaveOn", "coffLeaveOn"))
        i++;

    if (!validateById("#LeaveReason_Code", "coffReason"))
        i++;
    if (i == 0)
        return true;
    else
        return false;

}
function onCoffLeavePeriodChange(sender) {
    debugger
    var url = "/ESSP/CoffApplication/GetCoffBalance";
    $('.coff_list_Dashboard').load(url, { leavePeriodCode: $(sender).val(), Mode: "OnChange" }, function () { });

}
function onTabClick(TabIndex, Tab) {
    debugger;
    var period = $("#LeavePeriod_Code").val();
    var reason = $("#LeaveReason_Code").val();
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    $('#tabsDropdownCoffApplication').val(currentTab);
    var url = "/ESSP/CoffApplication/HistoryList";
    $('.coff-ApplicationList').load(url, { leavePeriodCode: period, Reason: reason, TabIndex: TabIndex }, function () { });
    prevTab = Tab;
    currentTab = TabIndex;

}


function tabClick(val) {
    debugger;
    var period = $("#LeavePeriod_Code").val();
    var reason = $("#LeaveReason_Code").val();
    currentTab = $(val).val();
    $("." + prevTab).removeClass("active");
    if (currentTab == "APPROVED")
        prevTab = 'ApproveTab'
    else if (currentTab == "PENDING")
        prevTab = 'PendingTab';
    else if (currentTab = "REJECTED")
        prevTab = 'RejectedTab';
    else
        prevTab = 'AllTab';

    $("." + prevTab).addClass("active");
    var url = "/ESSP/CoffApplication/HistoryList";
    $('.coff-ApplicationList').load(url, { leavePeriodCode: period, Reason: reason, TabIndex: currentTab }, function () { });

}


function onCoffHistoryComboChange() {
    debugger;
    var period = $("#LeavePeriod_Code").val();
    var reason = $("#LeaveReason_Code").val();


    if (document.getElementById('LeavePeriod_Code').value !== '' &&
        document.getElementById('LeaveReason_Code').value !== '') {
        var url = "/ESSP/CoffApplication/HistoryList";
        $('.coff-ApplicationList').load(url, { leavePeriodCode: period, Reason: reason, TabIndex: currentTab }, function () { });

    }
    else {
        return false;
    }


}

function onTrackerClick(coffGI) {
    debugger
    var url = "/ESSP/CoffApplication/CoffTracker";
    $('.coff-Tracker').load(url, { LeaveApplicationGI: coffGI }, function () { });
    $('body').append('<div class="form-overlay"></div>');
}
function onViewFileClick(URL) {
    debugger
    window.open(URL, "_blank");
}
function ExportToExcel() {
    debugger
    var period = $("#LeavePeriod_Code").val();
    var reason = $("#LeaveReason_Code").val();
    var periodname = $('#LeavePeriod_Code :selected').text();
    var reasonname = $('#LeaveReason_Code :selected').text();

    url = "/ESSP/CoffApplication/ExportToExcel?leavePeriodCode=" + period + "&Reason=" + reason + "&leaveperiodName=" + periodname + "&ReasonName=" + reasonname + "&TabIndex=" + currentTab;

    var TableLength = document.getElementById("coffApplicationHistoryTable").rows.length;
    if (TableLength > 1) {

        window.location.href = url;
    }
    else {
        swal.fire("No data found to export");
    }


}
