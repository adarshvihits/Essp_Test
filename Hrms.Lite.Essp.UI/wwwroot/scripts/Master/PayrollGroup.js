

var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/PayrollGroup/GetPayrollGroupList";
    $('#tabsDropdownPayrollGroup').val(currentTab);
    $('#PayrollGroupList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/PayrollGroup/GetPayrollGroupList";
    $('#PayrollGroupList').load(url, { TabIndex: currentTab }, function () { });

}


function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#PayrollGroupList_" + index + "__EditActive").val() == 'True') {
            swal.fire("APPROVAL PENDING");


        }
        else {
            var url = "/Master/PayrollGroup/Edit?PayrollGroupGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/PayrollGroup/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}


function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#PayrollGroupList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/PayrollGroup/Approve?PayrollGroupGI=" + GI + "&&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}


function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#PayrollGroupList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/PayrollGroup/Delete?PayrollGroupGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
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
                url: '/Master/PayrollGroup/Approve',
                dataType: 'json',
                data: $('#approvePayrollGroup').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/PayrollGroup/GetPayrollGroupList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#PayrollGroupList').load(url, function () { });

                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            debugger;
                            var url = "/Master/PayrollGroup/Approve?PayrollGroupGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/PayrollGroup/Reject',
                dataType: 'json',
                data: $('#approvePayrollGroup').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/PayrollGroup/GetPayrollGroupList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#PayrollGroupList').load(url, function () { });
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/PayrollGroup/Approve?PayrollGroupGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/PayrollGroup/Delete',
                dataType: 'json',
                data: $('#deletePayrollGroup').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/PayrollGroup/GetPayrollGroupList?TabIndex=" + 'ACTIVE';
                            $('#PayrollGroupList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#PayrollGroupList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/PayrollGroup/Delete?PayrollGroupGI=" + GI + "&LogGI=" + LogGI;
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


function SavePayrollGroup() {
    debugger;
    if (validatePayrollGroup()) {

        $.ajax({

            type: 'POST',
            url: '/Master/PayrollGroup/Save',
            dataType: 'json',
            data: $('#payrollgropusave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/PayrollGroup/GetPayrollGroupList?TabIndex=" + currentTab;
                        $('#PayrollGroupList').load(url, function () { });


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




function ExportToExcel() {
    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingPayrollGroup").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/PayrollGroup/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("PayrollGroupTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/PayrollGroup/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("PayrollGroupTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/PayrollGroup/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }

    }
}




function validatePayrollGroup() {

    if (!validateById('#Name', 'PayrollGroupName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'PayrollGroupShort')) {
        return false;
    }

    else {
        return true;
    }
}

