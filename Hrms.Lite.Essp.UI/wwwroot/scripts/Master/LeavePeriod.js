

var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';


function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/LeavePeriod/GetLeavePeriodList";

    $('#LeavePeriodList').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}



function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#LeavePeriodList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/LeavePeriod/Edit?LeavePeriodGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/LeavePeriod/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}





function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#LeavePeriodList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/LeavePeriod/Approve?LeavePeriodGI=" + GI + "&&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
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
                url: '/Master/LeavePeriod/Approve',
                dataType: 'json',
                data: $('#ApproveLeavePeriod').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/LeavePeriod/GetLeavePeriodList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#LeavePeriodList').load(url, function () { });

                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            debugger;
                            var url = "/Master/LeavePeriod/Approve?LeavePeriodGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/LeavePeriod/Reject',
                dataType: 'json',
                data: $('#ApproveLeavePeriod').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/LeavePeriod/GetLeavePeriodList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#LeavePeriodList').load(url, function () { });
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/LeavePeriod/Approve?LeavePeriodGI=" + GI + "&LogGI=" + LogGI;
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



function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#LeavePeriodList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/LeavePeriod/Delete?LeavePeriodGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}




function confirmDelete(GI, LogGI) {
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
                url: '/Master/LeavePeriod/Delete',
                dataType: 'json',
                data: $('#DeleteLeavePeriod').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/LeavePeriod/GetLeavePeriodList?TabIndex=" + 'ACTIVE';
                            $('#LeavePeriodList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#LeavePeriodList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/LeavePeriod/Delete?LeavePeriodGI=" + GI + "&LogGI=" + LogGI;
                            $('#DeleteSlider').load(url, function () { });
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
        var pendingTableLength = document.getElementById("LeavePeriodPending").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/LeavePeriod/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("LeavePeriodtable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/LeavePeriod/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("LeavePeriodtable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/LeavePeriod/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }

    }
}
function validateLeavePeriod() {
    debugger;
    if ($('.LPName').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#LeavePName").addClass('error-message');
        $('#LeavePName').html("This field is required");
        $('#Name').focus();
        return false;
    }

    else if ($('.LPShortName').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#LeavePShort").addClass('error-message');
        $('#LeavePShort').html("This field is required");
        $('#ShortName').focus();
        return false;
    }
    else if ($('.kt_datepicker_2').val() == '') {

        $('#From').addClass('is-invalid');
        $("#FromDate").addClass('error-message');
        $('#FromDate').html("This field is required");
        $('#From').focus();
        return false;
    }
    else if ($('.kt_datepicker_2').val() == '') {

        $('#To').addClass('is-invalid');
        $("#ToDate").addClass('error-message');
        $('#ToDate').html("This field is required");
        $('#To').focus();
        return false;
    }
    else
        return true;
}





function LeavePeriodSave() {
    debugger;
    if (validateLeavePeriod()) {

        $.ajax({

            type: 'POST',
            url: '/Master/LeavePeriod/Save',
            dataType: 'json',
            data: $('#leavePeriodsave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/LeavePeriod/GetLeavePeriodList?TabIndex=" + currentTab;
                        $('#LeavePeriodList').load(url, function () { });


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
