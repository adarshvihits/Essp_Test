var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/LeaveGroup/GetLeaveGroupList";

    $('#LeaveGroupList').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}




function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#LeaveGroupList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/LeaveGroup/Edit?LeaveGroupGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/LeaveGroup/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}



function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#LeaveGroupList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/LeaveGroup/Delete?LeaveGroupGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}




function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#LeaveGroupList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/LeaveGroup/Approve?LeaveGroupGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/LeaveGroup/Approve',
                dataType: 'json',
                data: $('#leaveGroupApprove').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Approve');
                            var url = "/Master/LeaveGroup/GetLeaveGroupList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#LeaveGroupList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#LeaveGroupList").removeClass("hide");
                        });

                    }
                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/LeaveGroup/Approve?LeaveGroupGI=" + GI + "&LogGI=" + LogGI;

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
                url: '/Master/LeaveGroup/Reject',
                dataType: 'json',
                data: $('#leaveGroupApprove').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Approve');
                            var url = "/Master/LeaveGroup/GetLeaveGroupList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#LeaveGroupList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#LeaveGroupList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/LeaveGroup/Approve?LeaveGroupGI=" + GI + "&LogGI=" + LogGI;
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





function SaveLeaveGroup() {
    debugger;
    if (validateLeaveGroup()) {

        $.ajax({

            type: 'POST',
            url: '/Master/LeaveGroup/Save',
            dataType: 'json',
            data: $('#saveLeaveGroup').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewDiv');
                        var url = "/Master/LeaveGroup/GetLeaveGroupList?TabIndex=" + currentTab;
                        $('#LeaveGroupList').load(url, function () { });


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
        var pendingTableLength = document.getElementById("LanguagesPendingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Languages/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("LanguageTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Languages/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("LanguageTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Languages/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}





function validateLeaveGroup() {
    if (!validateById('#Name', 'LGName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'LGShortName')) {
        return false;
    }
   
    else {
        return true;
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
                url: '/Master/LeaveGroup/Delete',
                dataType: 'json',
                data: $('#deleteConfirm').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Delete');
                            var url = "/Master/LeaveGroup/GetLeaveGroupList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#LeaveGroupList').load(url, function () { });
                            $(".ActiveTab").addClass("active");
                            $(".PendingTab").removeClass("active");
                            $("#LeaveGroupList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/LeaveGroup/Delete?LeaveGroupGI=" + GI + "&LogGI=" + LogGI;
                            $('#Delete').load(url, function () { });
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
        var pendingTableLength = document.getElementById("LeaveGroupPendingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/LeaveGroup/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("LeaveGroupTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/LeaveGroup/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("LeaveGroupTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/LeaveGroup/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}