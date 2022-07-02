var prevTab = 'all';
var currentTab = 'All';

var prevTrackerTab = 'tabOne';
var prevTrackerTabActive = 'tabOne';

function TabClick(Tab, TabIndex) {
    debugger;

    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    currentTab = TabIndex;
    $('#tabsDropdownAttendanceRegularization').val(currentTab);
    var url = "/ESSP/AttendanceRegularization/GetAttendanceList";

    $('#attendanceRegularizationList').load(url, { TabIndex: TabIndex }, function () { });
    if (TabIndex == "PreviousHistory") {
        $('#combo1').removeClass('hide');
        $('#combo2').removeClass('hide');
        $('#attendancecombo1').removeClass('hide');
        $('#attendancecombo').removeClass('hide');
    }
    else {
        $('#combo1').addClass('hide');
        $('#combo2').addClass('hide');
        $('#attendancecombo1').addClass('hide');
        $('#attendancecombo').addClass('hide');
    }

    /* $('#tabsDropdownRewards').val(currentTab);*/
    prevTab = Tab;
}



function tabClick(val) {
    debugger;
    currentTab = $(val).val();
    $("." + prevTab).removeClass("active");
    if (currentTab == "All")
        prevTab = 'All'
    else if (currentTab == "LEAVE")
        prevTab = 'LEAVE';
    else if (currentTab == "ONDUTY")
        prevTab = 'ONDUTY';
    else if (currentTab == "COFF")
        prevTab = 'COFF';
    else if (currentTab == "WFH")
        prevTab = 'WFH';
    else if (currentTab == "AttendanceRegularization")
        prevTab = 'AttendanceRegularization';

    else
        prevTab = 'PreviousHistory';

    $("." + prevTab).addClass("active");

    var url = "/ESSP/AttendanceRegularization/GetAttendanceList";
    $('#attendanceRegularizationList').load(url, { TabIndex: currentTab }, function () { });
    debugger
    if (currentTab == "PreviousHistory") {
        $('#attendancecombo1').removeClass('hide');
        $('#attendancecombo').removeClass('hide');
        $('#combo1').removeClass('hide');
        $('#combo2').removeClass('hide');

    }
    else {
        $('#attendancecombo1').addClass('hide');
        $('#attendancecombo').addClass('hide');
        $('#combo1').addClass('hide');
        $('#combo2').addClass('hide');
    }

}







function onEmployeeTrackerClick(LeaveApplicationGI, LeaveType, mode, TypeCode) {
    debugger;

    var url = "/ESSP/AttendanceRegularization/TrackerDetails?LeaveApplicationGI=" + LeaveApplicationGI + "&&Type=" + LeaveType + "&&mode=" + mode + "&&AttendanceStatusTypeCode=" + TypeCode;
    $('#AttendanceRegularizationSlider').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
}




function onInnerTabClick(InnerTab) {
    debugger;
    $('.' + prevTrackerTabActive).removeClass('active');
    $('#' + prevTrackerTab).css('display', 'none');
    if (InnerTab == "tabTwo") {

        $('.tabTwo').addClass('active');

        $('#tabTwo').css('display', 'block');

    }
    else if (InnerTab == "tabThree") {
        $('.tabThree').addClass('active');

        $('#tabThree').css('display', 'block');


    }
    else {
        $('.tabOne').addClass('active');

        $('#tabOne').css('display', 'block');


    }
    prevTrackerTab = InnerTab;
    prevTrackerTabActive = InnerTab;
}



function viewFile() {
    debugger;
    var AbsoluteURI = $('#LeaveApplication_Attachment_AbsoluteUri').val();
    if (AbsoluteURI == "") {
        swal.fire("No file Uploaded")
    }
    else {
        window.open(AbsoluteURI);
    }
}


function onDropdownChange() {
    debugger
    var period = $("#LeavePeriod_Code").val();
    var type = $("#LeaveType_Code").val();

    //    var url = "/ESSP/AttendanceRegularization/GetPreviousList";
    //$('#attendanceRegularizationList').load(url, { period: period, type: type }, function () { });


    if (document.getElementById('LeavePeriod_Code').value !== '' &&
        document.getElementById('LeaveType_Code').value !== '') {
        var url = "/ESSP/AttendanceRegularization/GetPreviousList";
        $('#attendanceRegularizationList').load(url, { period: period, type: type }, function () { });

    }
    else {
        return false;
    }




}



function confirmApproveIconClick(LeaveApplicationGI, AttendanceStatusTypeCode, LeaveType) {
    debugger
    swal.fire({
        text: "Do you want to Approve?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({

                type: 'POST',
                url: '/ESSP/AttendanceRegularization/ApproveAttendance',
                dataType: 'json',
                data: { LeaveApplicationGI: LeaveApplicationGI, AttendanceStatusTypeCode: AttendanceStatusTypeCode, LeaveType: LeaveType },
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {

                            var url = "/ESSP/AttendanceRegularization/GetAttendanceList?TabIndex=" + currentTab;
                            debugger

                            $('#attendanceRegularizationList').load(url, function () { });

                            $("#attendanceRegularizationList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {

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
    })

}


function confirmRejectIconClick(LeaveApplicationGI, AttendanceStatusTypeCode, LeaveType) {
    debugger
    swal.fire({
        text: "Do you want to Reject?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {


            $.ajax({

                type: 'POST',
                url: '/ESSP/AttendanceRegularization/RejectAttendance',
                dataType: 'json',
                data: { LeaveApplicationGI: LeaveApplicationGI, AttendanceStatusTypeCode: AttendanceStatusTypeCode, LeaveType: LeaveType },
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {

                            var url = "/ESSP/AttendanceRegularization/GetAttendanceList?TabIndex=" + currentTab;
                            debugger

                            $('#attendanceRegularizationList').load(url, function () { });

                            $("#attendanceRegularizationList").removeClass("hide");
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
        else {
            return false;
        }
    })

}


function confirmReject(LeaveApplicationGI, AttendanceStatusTypeCode, LeaveType) {
    debugger
    swal.fire({
        text: "Do you want to Reject?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {


            $.ajax({

                type: 'POST',
                url: '/ESSP/AttendanceRegularization/RejectAttendance',
                dataType: 'json',
                data: { LeaveApplicationGI: LeaveApplicationGI, AttendanceStatusTypeCode: AttendanceStatusTypeCode, LeaveType: LeaveType },
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('LeaveApproval');
                            var url = "/ESSP/AttendanceRegularization/GetAttendanceList?TabIndex=" + currentTab;
                            debugger

                            $('#attendanceRegularizationList').load(url, function () { });

                            $("#attendanceRegularizationList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/ESSP/AttendanceRegularization/RejectAttendance?LeaveApplicationGI=" + LeaveApplicationGI + "&AttendanceStatusTypeCode=" + AttendanceStatusTypeCode + "&LeaveType=" + LeaveType;
                            $('#AttendanceRegularizationSlider').load(url, function () { });
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
    })

}


function confirmApprove(LeaveApplicationGI, AttendanceStatusTypeCode, LeaveType) {
    debugger
    swal.fire({
        text: "Do you want to Approve?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({

                type: 'POST',
                url: '/ESSP/AttendanceRegularization/ApproveAttendance',
                dataType: 'json',
                data: { LeaveApplicationGI: LeaveApplicationGI, AttendanceStatusTypeCode: AttendanceStatusTypeCode, LeaveType: LeaveType },
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('LeaveApproval');
                            var url = "/ESSP/AttendanceRegularization/GetAttendanceList?TabIndex=" + currentTab;
                            debugger

                            $('#attendanceRegularizationList').load(url, function () { });

                            $("#attendanceRegularizationList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/ESSP/AttendanceRegularization/ApproveAttendance?LeaveApplicationGI=" + LeaveApplicationGI + "&AttendanceStatusTypeCode=" + AttendanceStatusTypeCode + "&LeaveType=" + LeaveType;
                            $('#AttendanceRegularizationSlider').load(url, function () { });
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
    })

}





function ExportToExcel() {
    debugger;
    var Tab = 0;
    var Ltype = $('#LeavePeriod_Code option:selected').text();
    var Lperiod = $('#LeaveType_Code option:selected').text();
    if (Tab == 6) {
        var TableLength = document.getElementById("PreviousHistoryList").rows.length - 1;
        if (TableLength > 1) {
            url = "/ESSP/AttendanceRegularization/ExportToExcel?TabIndex=" + Tab + "&TabName=" + currentTab + "&Ltype=" + Ltype + "&Lperiod=" + Lperiod;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var TableLength = document.getElementById("AttendanceregularizationTable").rows.length - 1;
        if (TableLength > 1) {
            url = "/ESSP/AttendanceRegularization/ExportToExcel?TabIndex=" + Tab + "&TabName=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

}