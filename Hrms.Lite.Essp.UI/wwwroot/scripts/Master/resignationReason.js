var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/ResignationReason/GetResignationReasonList";
    $('#tabsDropdownResignationReason').val(currentTab);
    $('#ResignationReasonList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/ResignationReason/GetResignationReasonList";
    $('#ResignationReasonList').load(url, { TabIndex: currentTab }, function () { });

}



function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#ResigantionReasonList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/ResignationReason/Edit?ResignationReasonGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/ResignationReason/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}


function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#ResigantionReasonList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/ResignationReason/Delete?ResignationReasonGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/ResignationReason/Delete',
                dataType: 'json',
                data: $('#deleteResignationReason').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Delete');
                            var url = "/Master/ResignationReason/GetResignationReasonList?TabIndex=" + 'ACTIVE';
                            $('#ResignationReasonList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#ResignationReasonList").removeClass("hide");
                        });

                    }
                    else {
                        debugger
                        swal.fire(result.message).then(function () {
                            var url = "/Master/ResignationReason/Delete?ResignationReasonGI=" + GI + "&LogGI=" + LogGI;
                            $('#Delete').load(url, function () { });
                            $('body').append('<div class="form-overlay"></div>');

                        });
                    }

                },

                error: function (xhr, textStatus, errorThrown) {

                    console.log(xhr.responseText);
                }
            });
        }
        else {
            return false;
        }
    })

}




function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#ResigantionReasonList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        debugger;
        var url = "/Master/ResignationReason/Approve?ResignationReasonGI=" + GI + "&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

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
                url: '/Master/ResignationReason/Reject',
                dataType: 'json',
                data: $('#ResignationReasonApprove').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/ResignationReason/GetResignationReasonList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#ResignationReasonList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#ResignationReasonList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/ResignationReason/Approve?ResignationReasonGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/ResignationReason/Approve',
                dataType: 'json',
                data: $('#ResignationReasonApprove').serialize(),
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/ResignationReason/GetResignationReasonList?TabIndex=" + 'APPROVAL_PENDING';
                            debugger

                            $('#ResignationReasonList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#ResignationReasonList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/ResignationReason/Approve?ResignationReasonGI=" + GI + "&LogGI=" + LogGI;
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


function ExportToExcel() {

    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingResignationReasonTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/ResignationReason/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("ResignationReasonTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/ResignationReason/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("ResignationReasonTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/ResignationReason/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}



function validateResignationReason() {
    if (!validateById('#Name', 'ResignationReasonName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'ResignationReasonShortName')) {
        return false;
    }
    else if (!validateById('#ResignationReasonTypes', 'ResignationReasonType')) {
        return false;
    }
    
    else {
        return true;
    }
}




function ExportToExcel() {

    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingResignationReasonTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/ResignationReason/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("ResignationReasonTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/ResignationReason/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("ResignationReasonTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/ResignationReason/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}



function ResignationReasonSave() {
    debugger;
    if (validateResignationReason()) {

        console.log($('#validateResignationReason').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/ResignationReason/Save',
            dataType: 'json',
            data: $('#validateResignationReason').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewDiv');
                        var url = "/Master/ResignationReason/GetResignationReasonList?TabIndex=" + 'ACTIVE';
                        $('#ResignationReasonList').load(url, function () { });
                      
                        $(".PendingTab").removeClass("active");
                        $(".ActiveTab").addClass("active");
                        $("#ResignationReasonList").removeClass("hide");

                    });

                }

                else {
                    swal.fire(result.message).then(function () {

                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
            /*    console.log(xhr.responseText);*/
                toastr.error(xhr.responseText);
            }
        });
    }
    else {
        return false;
    }
}
