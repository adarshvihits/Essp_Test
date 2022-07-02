

var LeaveType;
var fromDate;
var SessionFrom;
var ToDate;
var SessionTo;
var DateOfApplication;
var LeaveApplicationGIvalue;

var prevTab = 'AllTab';
var currentTab = "ALL";
var currentTabName = "ALL";


function validateDropdowns() {
    if (validateById('#DateOfApplication', 'applev') && validateById('#LeaveType_Code', 'levType') && validateById('#From', 'fromDate') && validateById('#FromType_Code', 'sessionFrom') && validateById('#To', 'toDate') && validateById('#ToType_Code', 'sessionTo') && validateById('#LeavePeriod_Code', 'levperiod')) {
        return true
    }
    else {
        return false;
    }
}
function GetLeaveBalanceeDetails() {
    LeaveType = $('#LeaveType_Code').val();
    var url = "/ESSP/LeaveApplication/GetLeaveBalanceeDetails";
    //$('.daywiseleave').load(url, {DateOfApplication: DateOfApplication ,LeaveType:LeaveType ,fromDate: fromDate ,SessionFrom:SessionFrom ,ToDate:ToDate,SessionTo:SessionTo} ,function () { });
    window.location.href = url + "?LeaveType=" + LeaveType;

}


function CursorFocusOnSearch() {
    if (focus == 0) {
        $('.DataSearchField').focus();
        focus = 1;
    }
    else {
        focus = 0;
    }
}

function GetLeaveDayWiseDetails() {
    //debugger;
    LeaveType = $('#LeaveType_Code').val();
    fromDate = $('#From').val();
    SessionFrom = $('#FromType_Code').val();
    ToDate = $('#To').val();
    SessionTo = $('#ToType_Code').val();
    DateOfApplication = $('#DateOfApplication').val();

    if (fromDate != ToDate) {
        $('#sessiontoshow').show();

    }
    setToDate();
    disabletodate();
    showsessionto();
    GetLeaveBalanceeDetails();

    if (validateDropdowns()) {
        var url = "/ESSP/LeaveApplication/GetLeaveDayWiseDetails";
        //$('.daywiseleave').load(url, {DateOfApplication: DateOfApplication ,LeaveType:LeaveType ,fromDate: fromDate ,SessionFrom:SessionFrom ,ToDate:ToDate,SessionTo:SessionTo} ,function () { });
        window.location.href = url + "?DateOfApplication=" + DateOfApplication + "&LeaveType=" + LeaveType + "&fromDate=" + fromDate + "&SessionFrom=" + SessionFrom + "&ToDate=" + ToDate + "&SessionTo=" + SessionTo;

    }
}

function Preview() {
    //debugger
    //var path = URL.createObjectURL($('.PreviewImage')[0].files[0]);
    //window.open(path, "_blank");


    debugger;
    var path = URL.createObjectURL($('.PreviewImage')[0].files[0]);
    if (path == "") {
        swal.fire("No file Uploaded")
    }
    else {
        window.open(path);
    }
}
function CheckExtensionAndSize(e) {
    debugger;


    var size = $(e)[0].files[0].size; //Size is in Bytes
    var filename = $(e)[0].files[0].name;
    var fileExtension = ['pdf', 'jpg', 'png', 'jpeg', 'bmp'];
    if (size > 1024 * 1024)  //1,048,576 Bytes=1 MB
    {
        swal.fire("File size  should be less than 1 MB");
        $(e).val('');
    }
    else {
        if ($.inArray($(e).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
            swal.fire("Only pdf, jpg, png,jpeg  and bmp formats are allowed");
            $(e).val('');
        }
    }

}
function viewFileFromDT(AbsoluteUriname) {
    debugger;
    var AbsoluteUri = $('#Attachment_AbsoluteUri').val();
    /*window.open(AbsoluteURI, "_bank");*/
    if (AbsoluteUriname == "") {
        swal.fire("No file Uploaded")
    }
    else {
        window.open(AbsoluteUriname);
    }
}
function LeaveBalance(LeaveApplicationGI) {
    LeaveApplicationGIvalue = LeaveApplicationGI;
    var url = "/ESSP/LeaveApplication/IndexOfLeaveBalance";
    window.location.href = url;

}
function ApplnHistory() {
    var url = "/ESSP/LeaveApplication/ApplicationHistory";
    window.location.href = url;
}
function LeaveBalanceList(LeaveApplicationGI) {
    var selValue = $('#ddlLeavePeriod').val();
    LeaveApplicationGIvalue = LeaveApplicationGI;

    var url = "/ESSP/LeaveApplication/GetLeaveBalance";
    window.location.href = url + "?leavePeriodCode=" + selValue + "&LeaveApplicationGI=" + LeaveApplicationGIvalue;

}
//function TabClick(Tab, TabIndex, TabName) {
//    debugger;
//    currentTab = TabIndex;
//    currentTabName = TabName;
//    LeavePeriod = $('#LeavePeriod_Code').val();
//    LeaveType = $('#LeaveType_Code').val();
//    $("." + prevTab).removeClass("active");
//    $("." + Tab).addClass("active");
//    var url = "/ESSP/LeaveApplication/GetLeaveApplicationList";
//    $('#allList').load(url, { LeavePeriod: LeavePeriod, LeaveType: LeaveType, TabIndex: TabIndex }, function () { });
//    prevTab = Tab;
//}


//function OnTabClick(Tab, TabIndex) {
//    debugger;
//    currentTab = TabIndex;

//    LeavePeriod = $('#LeavePeriod_Code').val();
//    LeaveType = $('#LeaveType_Code').val();


//    $("." + prevTab).removeClass("active");
//    $("." + Tab).addClass("active");
//    var url = "/ESSP/LeaveApplication/GetLeaveApplicationList";
//    $('#allList').load(url, { LeavePeriod: LeavePeriod, LeaveType: LeaveType, TabIndex: TabIndex }, function () { });
//    prevTab = Tab;

//}
function OnTabclick(val) {
    debugger;
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
    var url = "/ESSP/LeaveApplication/GetLeaveApplicationList";
    $('#allList').load(url, { TabIndex: currentTab }, function () { });

}
function tabClick(Tab, TabIndex, TabName) {
    debugger;

    debugger;
    currentTab = TabIndex;
    currentTabName = TabName;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    $('#tabsDropdownLeaveApplication').val(currentTab);
    var url = "/ESSP/LeaveApplication/GetLeaveApplicationList";
    $('#alllist').load(url, { TabIndex: TabIndex }, function () { });
    prevTab = Tab;
}

function getList() {
    debugger;

    LeavePeriod = $('#ddlLeavePeriod').val();
    LeaveType = $('#ddlLeaveType').val();;
    //LeavePeriod = $('#LeavePeriod_Code').val();
    //LeaveType = $('#LeaveType_Code').val();


    if (LeavePeriod !== '' && LeaveType !== '') {
        var url = "/ESSP/LeaveApplication/GetLeaveApplicationList";
        $('#alllist').load(url, { leavePeriodCode: LeavePeriod, leaveType: LeaveType, TabIndex: currentTab }, function () { });

    }
    else {
        return false;
    }

    //    var url = "/ESSP/LeaveApplication/GetLeaveApplicationList";
    //$('#alllist').load(url, { leavePeriodCode: LeavePeriod, leaveType: LeaveType, TabIndex: currentTab }, function () { });

}

function ApplnTracker(LeaveApplicationGIforTracker) {

    debugger;
    $('body').append('<div class="form-overlay"></div>');

    var url = "/ESSP/LeaveApplication/GetTrackerDetails";

    $('#applntracker').load(url, { LeaveApplicationGI: LeaveApplicationGIforTracker }, function () { });



}

window.addEventListener('load',
    function () {
        LeaveType = $('#LeaveType_Code').val();
        fromDate = $('#From').val();
        SessionFrom = $('#FromType_Code').val();
        ToDate = $('#To').val();
        SessionTo = $('#ToType_Code').val();
        DateOfApplication = $('#DateOfApplication').val();
        if (fromDate != "") {
            if (fromDate != ToDate) {
                $('#sessiontoshow').show();

            }
        }
        else {
            $('#sessiontoshow').hide();

        }
        if (SessionFrom == 2) {
            $('.todate').prop('disabled', true);
        }
        else {
            $('.todate').prop('disabled', false);

        }
    }, false);


function ExportToExcel() {

    debugger;


    if (currentTab == 'PENDING') {
        var pendingTableLength = document.getElementById("ActiveListtable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/ESSP/LeaveApplication/ExportToExcel?leavePeriodCode=" + $('#LeaveGroup_Code').val() + "&leaveType=" + $('#LeaveType_Code').val() + "&TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'APPROVED') {
        var approvedTableLength = document.getElementById("ActiveListtable").rows.length - 1;
        if (approvedTableLength > 0) {
            url = "/ESSP/LeaveApplication/ExportToExcel?leavePeriodCode=" + $('#LeavePeriod_Code').val() + "&leaveType=" + $('#LeaveType_Code').val() + "&TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'REJECTED') {
        var rejectedTableLength = document.getElementById("ActiveListtable").rows.length - 1;
        if (rejectedTableLength > 0) {
            url = "/ESSP/LeaveApplication/ExportToExcel?leavePeriodCode=" + $('#LeavePeriod_Code').val() + "&leaveType=" + $('#LeaveType_Code').val() + "&TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'ALL') {
        var allTableLength = document.getElementById("ActiveListtable").rows.length - 1;
        if (allTableLength > 0) {
            url = "/ESSP/LeaveApplication/ExportToExcel?leavePeriodCode=" + $('#LeavePeriod_Code').val() + "&leaveType=" + $('#LeaveType_Code').val() + "&TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}


//function Validate(ctl, event) {
//    event.preventDefault();
//    swal.fire({
//        title: "Do you want to Apply?",
//        text: "Please check Information before Submiting!",
//        type: "warning",
//        showCancelButton: true,
//        confirmButtonColor: "#0000ff",
//        confirmButtonText: "OK",
//        cancelButtonText: "Cancel",

//    },
//        function (isConfirm) {
//            if (isConfirm) {

//                    $("#SaveForm").submit();

//            } else {
//                swal.fire("Cancelled", "You have Cancelled Form Submission!", "error");
//            }
//        });
//}

//$("body").on("submit", "#Form1", function () {
//    return confirm("Do you want to submit?");
//});


function validateOnLeaveApply() {
    debugger
    var i = 0;
    if (!validateById('#From', 'fromDate'))
        i++;

    if (!validateById('#FromType_Code', 'sessionFrom'))
        i++;
    if (!validateById('#To', 'toDate'))
        i++;
    if (!validateById('#ToType_Code', 'sessionTo'))
        i++;
    if (!validateById('#LeaveReason_Code', 'Reason'))
        i++;
    if (i == 0)
        return true;

    //else if (!validateById('#ContactDetails', 'contactDetails')) {
    //    return false;
    //}

    //debugger;
    //if (confirm("Do you want to Apply?")) {
    //    debugger;
    //    return true;
    //}
    else {
        return false;
    }
}






function setToDate() {
    if (!validateById('#From', 'fromDate'))
        return false;
    fromDate = $('#From').val();
    ToDate = $('#To').val();
    if (ToDate == "") {
        $('#To').val(fromDate);
    }

}
function disabletodate() {


    if (!validateById('#FromType_Code', 'sessionFrom'))
        return false;

    SessionFrom = $('#FromType_Code').val();

    if (SessionFrom == 2) {

        $('.todate').prop('disabled', true);
    }
    else {
        $('.todate').prop('disabled', false);

    }
}

function showsessionto() {
    if (!validateById('#To', 'toDate'))
        return false;
    fromDate = $('#From').val();
    ToDate = $('#To').val();


    if (Date.parse(fromDate) > Date.parse(ToDate)) {
        swal.fire("To Date should be greater than From Date");
        $('#To').val('');
    }
    else {
        if (fromDate != ToDate) {
            $('#sessiontoshow').show();


        }
        else {
            $('#sessiontoshow').hide();

        }

    }
}