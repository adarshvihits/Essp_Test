var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Department/GetDepartmentList";
    $('#tabsDropdownDepartment').val(currentTab);
    $('#DepartmentList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/Department/GetDepartmentList";
    $('#DepartmentList').load(url, { TabIndex: currentTab }, function () { });

}

//function OnTabClick(mode) {
//    debugger
//    currentTab = mode;
//    if (mode == 'ACTIVE') {
//        var url = "/Master/Department/GetDepartmentList?TabIndex=" + mode;
//        $('#DepartmentList').load(url, function () { });
//        debugger;
//        $(".PendingTab").removeClass("active");
//        $(".InActiveTab").removeClass("active");
//        $(".ActiveTab").addClass("active");
//        $("#DepartmentList").show();
//        $("#DepartmentPendingList").addClass("hide");

//    }
//    else if (mode == 'APPROVAL_PENDING') {
//        var url = "/Master/Department/GetDepartmentList?TabIndex=" + mode;

//        $('#DepartmentPendingList').load(url, function () { });
//        debugger;
//        $("#DepartmentList").hide();
//        $(".InActiveTab").removeClass("active");
//        $(".PendingTab").addClass("active");
//        $(".ActiveTab").removeClass("active");
//        $("#DepartmentPendingList").removeClass("hide");
//        $("#DepartmentPendingList").show();

//    }
//    else {
//        var url = "/Master/Department/GetDepartmentList?TabIndex=" + mode;
//        $('#DepartmentList').load(url, function () { });
//        debugger;
//        $("#DepartmentPendingList").addClass("hide");
//        $("#DepartmentList").show();
//        $(".PendingTab").removeClass("active");
//        $(".ActiveTab").removeClass("active");
//        $(".InActiveTab").addClass("active");
//    }

//}



function DepartmentSave() {
    debugger;
    if (validateDepartment()) {

        console.log($('#Departmentsave').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/Department/Save',
            dataType: 'json',
            data: $('#Departmentsave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddnewOrEditDiv');
                        var url = "/Master/Department/GetDepartmentList?TabIndex=" + currentTab;
                        $('#DepartmentList').load(url, function () { });

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


//function onAddOrEditClick(Type, GI, LogGI) {
//    debugger;

//    currentTab = 'ACTIVE';
//    if (Type == 'MODIFY') {
//        debugger;
//        $.ajax({

//            url: "/Master/Department/ValidationChecks?DepartmentGI=" + GI + "&LogGI=" + LogGI + "&Type=" + Type,
//            dataType: 'json',
//            success: function (result) {
//                debugger

//                if (result.success == true) {

//                    var url = "/Master/Department/Edit?DepartmentGI=" + GI + "&LogGI=" + LogGI;

//                    $('#AddNewOrEditSlider').load(url, function () { });
//                    $('body').append('<div class="form-overlay"></div>');
//                }
//                else {
//                    debugger
//                    swal.fire(result.message).then(function () {
//                        debugger
//                        var url = "/Master/Department/GetDepartmentList?TabIndex=" + currentTab;
//                        $('#DepartmentList').load(url, function () { });

//                    });
//                }

//            },
//            error: function (xhr, textStatus, errorThrown) {
//                toastr.error(xhr.responseText);
//            }
//        });
//    }
//    else {
//        debugger;
//        var url = "/Master/Department/Create";

//        $('#AddNewOrEditSlider').load(url, function () { });
//        $('body').append('<div class="form-overlay"></div>');

//    }
//}




function AddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#DepartmentList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/Department/Edit?DepartmentGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/Department/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}




//function onApproveClick(GI, LogGI, Type) {
//    debugger;
//    $.ajax({

//        url: "/Master/Department/ValidationChecks",
//        data: { CountryGI: GI, LogGI: LogGI, Type: Type },
//        success: function (result) {
//            debugger

//            if (result.success == true) {

//                var url = "/Master/Department/Approve?DepartmentGI=" + GI + "&LogGI=" + LogGI;

//                $('#ApproveSlider').load(url, function () { });
//                $('body').append('<div class="form-overlay"></div>');
//            }
//            else {
//                debugger
//                swal.fire(result.message).then(function () {
//                    debugger;
//                    var url = "/Master/Department/GetDepartmentList?TabIndex=" + currentTab;
//                    $('#DepartmentList').load(url, function () { });

//                });
//            }

//        },
//        error: function (xhr, textStatus, errorThrown) {
//            toastr.error(xhr.responseText);
       
//        }
//    });

//}




function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#DepartmentList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/Department/Approve?DepartmentGI=" + GI + "&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}



//function onDeleteClick(GI, LogGI, Type) {
//    debugger

//    $.ajax({

//        url: "/Master/Department/ValidationChecks",
//        data: { DepartmentGI: GI, LogGI: LogGI, Type: Type },
//        success: function (result) {
//            debugger

//            if (result.success) {

//                var url = "/Master/Department/Delete?DepartmentGI=" + GI + "&LogGI=" + LogGI;

//                $('#DeleteSlider').load(url, function () { });
//                $('body').append('<div class="form-overlay"></div>');
//            }
//            else {
//                debugger
//                swal.fire(result.message).then(function () {

//                    var url = "/Master/Department/GetDepartmentList?TabIndex=" + currentTab;
//                    $('#DepartmentList').load(url, function () { });
                    

//                });
//            }

//        },
//        error: function (xhr, textStatus, errorThrown) {
//            toastr.error(xhr.responseText);
//        }
//    });


//}



function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#DepartmentList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Department/Delete?DepartmentGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}








function validateDepartment() {
    if (!validateById('#Name', 'DepartmentName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'DeptShortName')) {
        return false;
    }

    else {
        return true;
    }
}




function confirmApprove(GI, LogGI) {
    debugger
    swal.fire({
        text: "Do you want to Approve",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({

                type: 'POST',
                url: '/Master/Department/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Approve');
                            var url = "/Master/Department/GetDepartmentList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#DepartmentList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#DepartmentList").removeClass("hide");
                        });

                    }
                    else {
                        debugger
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Department/Approve?DepartmentGI=" + GI + "&LogGI=" + LogGI;
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
        text: "Do you want to Reject",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({

                type: 'POST',
                url: '/Master/Department/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/Department/GetDepartmentList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#DepartmentList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#DepartmentList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Department/Approve?DepartmentGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Department/Delete',
                dataType: 'json',
                data: $('#DeleteDepartment').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/Department/GetDepartmentList?TabIndex=" + 'ACTIVE';
                            $('#DepartmentList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#DepartmentList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Department/Delete?DepartmentGI=" + GI + "&LogGI=" + LogGI;
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




function clickOnExportToExcel() {

    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingdepartmentTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Department/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("Departmenttable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Department/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("Departmenttable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Department/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}