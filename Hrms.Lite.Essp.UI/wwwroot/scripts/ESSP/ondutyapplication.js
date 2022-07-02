var LeaveType;
var fromDate;
var SessionFrom;
var ToDate;
var SessionTo;
var DateOfApplication;

var prevTab = 'AllTab';
var currentTab = "ALL";
var currentTabName = "ALL";





function validateDropdowns() {
    debugger



    if (validateById('#DateOfApplication', 'applev') && validateById('#From', 'fromDate') && validateById('#FromType_Code', 'sessionFrom') && validateById('#To', 'toDate') && validateById('#ToType_Code', 'sessionTo')) {
        return true
    }
    else {
        return false;
    }
}

function validateOnDutyApply() {
    debugger
    var i = 0;
    if (!validateById('#From', 'fromDate'))
        i++;

    if (!validateById('#To', 'toDate'))
        i++;

    if (!validateById('#LeaveReason_Code', 'Reason'))
        i++;

    if (i == 0)
        return true;
    else
        return false;


}



function getLeaveDayWiseDetails() {
    /* debugger;*/



    fromDate = $('#From').val();
    SessionFrom = $('#FromType_Code').val();
    ToDate = $('#To').val();
    SessionTo = $('#ToType_Code').val();
    DateOfApplication = $('#DateOfApplication').val();
    if (fromDate != ToDate) {
        $('#sessiontoshow').show();

    }
    debugger;
    setToDate();
    disabletodate();
    showsessionto();


    if (validateDropdowns()) {

        var url = "/ESSP/OnDutyApplication/GetLeaveDayWiseDetails";


        window.location.href = url + "?DateOfApplication=" + DateOfApplication + "&fromDate=" + fromDate + "&SessionFrom=" + SessionFrom + "&ToDate=" + ToDate + "&SessionTo=" + SessionTo;

    }


}
function showsessionto() {
    if (!validateById('#To', 'toDate'))
        return false;
    fromDate = $('#From').val();
    ToDate = $('#To').val();

    /*debugger;*/

    if (Date.parse(fromDate) > Date.parse(ToDate)) {
        swal.fire("To date should be greater than From date");
        /* $(e).val('');*/
        $('#To').val('');
        $('#DayWiseLeaveListTable').DataTable().clear().draw();
        return false;
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
    $('.todate').prop('disabled', false);
    SessionFrom = $('#FromType_Code').val();

    if (SessionFrom == 2) {

        $('.todate').prop('disabled', true);

    }
    else {
        $('.todate').prop('enabled', true);


    }



}
//function Apply() {
//    debugger;
//    fromDate = $('#From').val();
//    SessionFrom = $('#FromType_Code').val();
//    ToDate = $('#To').val();
//    SessionTo = $('#ToType_Code').val();
//    LeaveReason = $('#LeaveReason').val();
//    AdditionalRemarks = $('#AdditionalRemarks').val();
//    HandOverDetails = $('#HandOverDetails').val();
//    ContactDetails = $('#ContactDetails').val();

//    DateOfApplication = '2022-05-06 12:00:00 AM'
//    FileData = $('#FileData').val();
//    $.ajax({
//        type: 'POST',
//        url: '/ESSP/OnDutyApplication/Save',
//        dataType: 'json',
//        data: "fromDate=" + fromDate + "&SessionFrom=" + SessionFrom + "&ToDate=" + ToDate + "&SessionTo=" + SessionTo + "&LeaveReason=" + LeaveReason + "&AdditionalRemarks=" + AdditionalRemarks + "&HandOverDetails=" + HandOverDetails + "&ContactDetails=" + ContactDetails + "&FileData=" + FileData,
//        success: function (result) {
//            if (result.success == true) {
//                swal.fire(result.message).then(function () {
//                    getList();
//                });

//            }
//            else {
//                swal.fire(result.message).then(function () {

//                });
//            }

//        },
//        error: function (xhr, textStatus, errorThrown) {

//        }
//    });
//}
function OnApplicationHistory_Click() {
    var url = "/ESSP/OnDutyApplication/ApplicationHistory";
    window.location.href = url;
}


function Preview() {
    debugger
    var path = URL.createObjectURL($('.PreviewImage')[0].files[0]);
    window.open(path, "_blank");
}
function CheckExtensionAndSize(e) {
    debugger;


    var size = $(e)[0].files[0].size; //Size is in Bytes
    var filename = $(e)[0].files[0].name;
    var fileExtension = ['pdf', 'jpg', 'png', 'jpeg', 'bmp'];
    if (size > 1024 * 1024)  //1,048,576 Bytes=1 MB
    {
        swal.fire('File size should be less than 1 MB');
        $(e).val('');
    }
    else if ($.inArray($(e).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        swal.fire("Only pdf, Jpeg,Jpg,Png and bmp files are allowed");
        $(e).val('');
    }

}
function onTrackerClick(LeaveApplicationGI) {
    debugger;

    var url = "/ESSP/OnDutyApplication/GetTrackerDetails";

    $('body').append('<div class="form-overlay"></div>');
    $('#trackerSlider').load(url, { LeaveApplicationGI: LeaveApplicationGI }, function () { });

    /* $('#trackerSlider').removeClass('hide');*/


}

function CloseSlider(id) {
    $("." + id).removeClass('slider-forms-open');
    $(".form-overlay").remove();

}
function tabClick(Tab, TabIndex, TabName) {
    debugger;

    debugger;
    currentTab = TabIndex;
    currentTabName = TabName;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    $('#tabsDropdownOnduty').val(currentTab);
    var url = "/ESSP/OnDutyApplication/GetLeaveApplicationList";
    $('#alllist').load(url, { TabIndex: TabIndex }, function () { });
    prevTab = Tab;
}

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
    var url = "/ESSP/OnDutyApplication/GetLeaveApplicationList";
    $('#allList').load(url, { TabIndex: currentTab }, function () { });

}

function onExportToExcelClick() {
    debugger;

    var AllTableLength = document.getElementById("AllListtable").rows.length - 1;
    if (AllTableLength > 0) {
        url = "/ESSP/OnDutyApplication/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
        window.location.href = url;
    }
    else {
        swal.fire("No data found to export");
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
function onFilterDropdownChange(SearchId) {
    debugger;
    var url = "/ESSP/OnDutyApplication/ApplyFilter";
    $("." + prevTab).removeClass("active");
    $(".all").addClass("active");
    var search = SearchId.value;
    var LeavePeriod = $('#LeavePeriod_Code').val();
    var LeaveType = $('#LeaveType_Code').val();
    var TabIndex = currentTab;
    $('#alllist').load(url, { leavePeriodCode: LeavePeriod, leaveType: LeaveType, TabIndex: TabIndex, }, function () { });
    /* ApplyFilter('apply');*/

}
function ApplyFilter(mode) {
    debugger

    var LeavePeriod = $('#LeavePeriod_Code').val();
    var LeaveType = $('#LeaveType_Code').val();

    var tabIndex = $('#Tabindex').val();
    var search = $('#SearchId').val();
    var TabIndex = currentTab;

    $("#Tabindex").val(currentTab);
    /* $("#SearchId").val($('#DurationwiseFilterSlab_Code').val())*/
    if (mode == 'apply') {
        $.ajax({

            type: 'POST',
            url: '/ESSP/OnDutyApplication/ApplyFilter?TabIndex=' + currentTab + "&leavePeriodCode" + LeavePeriod + "&leaveType" + LeaveType,
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('basicFilter');

                $('#alllist').html("");
                $('#alllist').html(result);

                $('#alllist').removeClass('hide');

                //$('#rewardsListPartial').addClass('hide');               
            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
    else {
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $.ajax({

            type: 'POST',
            url: '/ESSP/OnDutyApplication/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#AppraisalList').html("");
                $('#AppraisalList').html(result);

                $('#AppraisalList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}




window.addEventListener('load',
    function () {
        //  LeaveType = $('#LeaveType_Code').val();
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
            $('.todate').prop('enabled', true);


        }

    }, false);
