var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function onTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Holiday/GetHolidayList";
    $('#tabsDropdownHoliday').val(currentTab);
    $('#HolidayList').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}


function tabClick(val) {
    debugger;
    currentTab = $(val).val();
    $("." + prevTab).removeClass("active");
    if (currentTab == "ACTIVE")
        prevTab = 'ActiveTab'
    else if (currentTab == "INACTIVE")
        prevTab = 'InctiveTab';
    else
        prevTab = 'PendingTab';

    $("." + prevTab).addClass("active");
    var url = "/Master/Holiday/GetHolidayList";
    $('#HolidayList').load(url, { TabIndex: currentTab }, function () { });

}




function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#HolidayList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/Holiday/Edit?HolidayGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/Holiday/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}



function onDeleteClick(GI, LogGI, Type, index)
{

    debugger;

    if ($("#HolidayList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Holiday/Delete?HolidayGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}




function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#HolidayList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/Holiday/Approve?HolidayGI=" + GI + "&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}



function SaveHoliday() {
    debugger;
    var TabIndex;
    if (validateHoliday()) {
        $.ajax({

            type: 'POST',
            url: '/Master/Holiday/Save',
            dataType: 'json',
            data: $('#hollidaySave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewDiv');
                        var url = "/Master/Holiday/GetHolidayList?TabIndex=" + currentTab;
                        $('#HolidayList').load(url, function () { });

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
}



function confirmApprove(GI, LogGI) {
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
                url: '/Master/Holiday/Approve',
                dataType: 'json',
                data: $('#HolidayApprove').serialize(),
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Holiday/GetHolidayList?TabIndex=" + 'APPROVAL_PENDING';
                            debugger

                            $('#HolidayList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#HolidayList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Holiday/Approve?HolidayGI=" + GI + "&LogGI=" + LogGI;
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
    })

}


function confirmReject(GI, LogGI) {
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
                url: '/Master/Holiday/Reject',
                dataType: 'json',
                data: $('#HolidayApprove').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Holiday/GetHolidayList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#HolidayList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#HolidayList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Holiday/Approve?HolidayGI=" + GI + "&LogGI=" + LogGI;
                            $('#ApproveSlider').load(url, function () { });
                            $('body').append('<div class="form-overlay"></div>');

                        });
                    }

                },

                error: function (xhr, textStatus, errorThrown) {
                    swal.fire(xhr.responseText);
                }
            });
        }
        else {
            return false;
        }
    })

}





function ConfirmDelete(GI, LogGI) {
    debugger
    swal.fire({
        text: "Do you want to Delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({

                type: 'POST',
                url: '/Master/Holiday/Delete',
                dataType: 'json',
                data: $('#DeleteHoliday').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Delete');
                            var url = "/Master/Holiday/GetHolidayList?TabIndex=" + 'ACTIVE';
                            $('#HolidayList').load(url, function () { });
                            //$(".PendingTab").removeClass("active");
                            //$(".ActiveTab").addClass("active");
                            //$("#HolidayList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Holiday/Delete?HolidayGI=" + GI + "&LogGI=" + LogGI;
                            $('#delete').load(url, function () { });
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
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("HolidayPendingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Holiday/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("HolidayTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Holiday/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("HolidayTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Holiday/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}



//function validateHoliday() {
//    debugger;
//    if ($('.HYear').val() == '') {

//        $('#Year_Code').addClass('is-invalid');
//        $("#year").addClass('error-message');
//        $('#year').html("This field is required");
//        $('#Year_Code').focus();
//        return false;
//    }
//    else if ($('.HType').val() == '') {

//        $('#HolidayType_Code').addClass('is-invalid');
//        $("#HType").addClass('error-message');
//        $('#HType').html("This field is required");
//        $('#HolidayType_Code').focus();
//        return false;
//    }
//    else if ($('.Date').val() == '') {

//        $('#HolidayDate').addClass('is-invalid');
//        $("#HDate").addClass('error-message');
//        $('#HDate').html("This field is required");
//        $('#HolidayDate').focus();
//        return false;
//    }
//    else if ($('.HSession').val() == '') {

//        $('#HolidaySession_Code').addClass('is-invalid');
//        $("#HSession").addClass('error-message');
//        $('#HSession').html("This field is required");
//        $('#HolidaySession_Code').focus();
//        return false;
//    }
//    else if ($('.HDescription').val() == '') {

//        $('#HolidayDescription').addClass('is-invalid');
//        $("#HDescription").addClass('error-message');
//        $('#HDescription').html("This field is required");
//        $('#HolidayDescription').focus();
//        return false;
//    }

//    else
//        return true;
//}

function validateHoliday() {

    if (!validateById('#Year_Code', 'year')) {
        return false;
    }
    else if (!validateById('#HolidayType_Code', 'HType')) {
        return false;
    }

    else if (!validateById('#HolidayDate', 'HDate')) {
        return false;
    }
    else if (!validateById('#HolidaySession_Code', 'HSession')) {
        return false;
    }
   

    else {
        return true;
    }
}
