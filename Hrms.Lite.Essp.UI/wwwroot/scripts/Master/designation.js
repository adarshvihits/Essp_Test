

var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Designation/GetDesignationList";
    $('#tabsDropdownDesignation').val(currentTab);
    $('#designationList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/Designation/GetDesignationList";
    $('#designationList').load(url, { TabIndex: currentTab }, function () { });

}



//function onDeleteClick(GI,LogGI,Type) {

//    debugger;
//    $.ajax({

//        url: "/Master/Designation/ValidationChecks",
//        data: { DesignationGI: GI, LogGI: LogGI, Type: Type },
//        success: function (result) {
//            debugger

//            if (result.success) {

//                var url = "/Master/Designation/Delete?DesignationGI=" + GI + "&LogGI=" + LogGI;

//                $('#deleteDesSlider').load(url, function () { });
//                $('body').append('<div class="form-overlay"></div>');
//            }
//            else {
//                debugger
//                swal.fire(result.message).then(function () {

//                    var url = "/Master/Designation/GetDesignationList?TabIndex=" + currentTab;
//                    $('#designationList').load(url, function () { });

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

    if ($("#DesignationList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Designation/Delete?DesignationGI=" + GI + "&LogGI=" + LogGI;
        $('#deleteDesSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}



//function onAddNewOrEditClick(Type, GI, LogGI) {
//    debugger;

//    currentTab = 'ACTIVE';
//    if (Type == 'MODIFY') {
//        debugger;
//        $.ajax({

//            url: "/Master/Designation/ValidationChecks?DesignationGI=" + GI + "&LogGI=" + LogGI + "&Type=" + Type,
//            dataType: 'json',
//            success: function (result) {
//                debugger

//                if (result.success) {

//                    var url = "/Master/Designation/Edit?DesignationGI=" + GI + "&LogGI=" + LogGI;

//                    $('#addOrEditSlider').load(url, function () { });
//                    $('body').append('<div class="form-overlay"></div>');
//                }
//                else {
//                    debugger
//                    swal.fire(result.message).then(function () {
//                        debugger
//                        var url = "/Master/Designation/GetDesignationList?TabIndex=" + currentTab;
//                        $('#designationList').load(url, function () { });

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
//        var url = "/Master/Designation/Create";

//        $('#addOrEditSlider').load(url, function () { });
//        $('body').append('<div class="form-overlay"></div>');

//    }
//}



function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#DesignationList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/Designation/Edit?DesignationGI=" + GI + "&LogGI=" + LogGI;

            $('#addOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/Designation/Create";
        $('#addOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}





function onDesignationSaveClick() {
    debugger;
    if (validateDesigantion()) {

        console.log($('#DesignationSave').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/Designation/Save',
            dataType: 'json',
            data: $('#DesignationSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/Designation/GetDesignationList?TabIndex=" + currentTab;
                        $('#designationList').load(url, function () { });

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



//function validateDesigantion() {
//    debugger;
//    if ($('.DesName').val() == '') {

//        $('#Name').addClass('is-invalid');
//        $("#DesignationName").addClass('error-message');
//        $('#DesignationName').html("This field is required");
//        $('#Name').focus();
//        return false;
//    }
//    if ($('.DesShtName').val() == '') {

//        $('#ShortName').addClass('is-invalid');
//        $("#DesignationShortName").addClass('error-message');
//        $('#DesignationShortName').html("This field is required");
//        $('#ShortName').focus();
//        return false;
//    }
   
//}



function validateDesigantion() {
    if (!validateById('#Name', 'DesignationName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'DesignationShortName')) {
        return false;
    }

    else {
        return true;
    }
}



//function ConfirmDesignationApprove(GI,LogGI) {
//    if (confirm("Do you want to Confirm?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/Designation/Approve',
//            dataType: 'json',
//            data: $('#approve').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('PendingApprove');
//                        var url = "/Master/Designation/GetDesignationList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#designationList').load(url, function () { });
//                        $(".PendingTab").addClass("active");
//                        $(".ActiveTab").removeClass("active");
//                        $("#designationList").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/Designation/Approve?DesignationGI=" + GI + "&LogGI=" + LogGI;
//                        $('#approveSlider').load(url, function () { });
//                        $('body').append('<div class="form-overlay"></div>');
                       
//                    });
//                }

//            },
//            error: function (xhr, textStatus, errorThrown) {
//                toastr.error(xhr.responseText);
//            }
//        });
//    }
//    else {
//        return false;
//    }
//}





function ConfirmDesignationApprove(GI, LogGI) {
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
                url: '/Master/Designation/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/Designation/GetDesignationList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#designationList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#designationList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Designation/Approve?DesignationGI=" + GI + "&LogGI=" + LogGI;
                            $('#approveSlider').load(url, function () { });
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





//function ConfirmDesignationReject(GI,LogGI) {
//    if (confirm("Do you want to Confirm?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/Designation/Reject',
//            dataType: 'json',
//            data: $('#approve').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('PendingApprove');
//                        var url = "/Master/Designation/GetDesignationList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#designationList').load(url, function () { });
//                        $(".PendingTab").addClass("active");
//                        $(".ActiveTab").removeClass("active");
//                        $("#designationList").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/Designation/Approve?DesignationGI=" + GI + "&LogGI=" + LogGI;
//                        $('#approveSlider').load(url, function () { });
//                        $('body').append('<div class="form-overlay"></div>');

//                    });
//                }

//            },
//            error: function (xhr, textStatus, errorThrown) {
//                toastr.error(xhr.responseText);
//            }
//        });
//    }
//    else {
//        return false;
//    }

//}







function ConfirmDesignationReject(GI, LogGI) {
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
                url: '/Master/Designation/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/Designation/GetDesignationList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#designationList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#designationList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Designation/Approve?DesignationGI=" + GI + "&LogGI=" + LogGI;
                            $('#approveSlider').load(url, function () { });
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


//function confirmDelete(GI, LogGI) {

//    if (confirm("Do you want to Delete?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/Designation/Delete',
//            dataType: 'json',
//            data: $('#DeleteDesignation').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('DeleteDiv');
//                        var url = "/Master/Designation/GetDesignationList?TabIndex=" + 'ACTIVE';
//                        $('#designationList').load(url, function () { });
//                        $(".PendingTab").removeClass("active");
//                        $(".ActiveTab").addClass("active");
//                        $("#designationList").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/Designation/Delete?DesignationGI=" + GI + "&LogGI=" + LogGI;
//                        $('#delete').load(url, function () { });
//                        $('body').append('<div class="form-overlay"></div>');

//                    });
//                }

//            },
//            error: function (xhr, textStatus, errorThrown) {
//                toastr.error(xhr.responseText);
//            }
//        });
//    }
//    else {
//        return false;
//    }

//}





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
                url: '/Master/Designation/Delete',
                dataType: 'json',
                data: $('#DeleteDesignation').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('DeleteDiv');
                            var url = "/Master/Designation/GetDesignationList?TabIndex=" + 'ACTIVE';
                            $('#designationList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#designationList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Designation/Delete?DesignationGI=" + GI + "&LogGI=" + LogGI;
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







//function onApproveClick(GI, LogGI,Type) {
//    debugger;

//    $.ajax({

//        url: "/Master/Designation/ValidationChecks",
//        data: { DesignationGI: GI, LogGI: LogGI, Type: Type },
//        success: function (result) {
//            debugger

//            if (result.success) {

//                var url = "/Master/Designation/Approve?DesignationGI=" + GI + "&LogGI=" + LogGI;

//                $('#approveSlider').load(url, function () { });
//                $('body').append('<div class="form-overlay"></div>');
//            }
//            else {
//                debugger
//                swal.fire(result.message).then(function () {

//                    var url = "/Master/Designation/GetDesignationList?TabIndex=" + currentTab;
//                    $('#designationList').load(url, function () { });

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

    if ($("#DesignationList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/Designation/Approve?DesignationGI=" + GI + "&LogGI=" + LogGI;
        $('#approveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}



function ExportToExcel() {
   
        debugger;
        if (currentTab == 'APPROVAL_PENDING') {
            var pendingTableLength = document.getElementById("PendingDesignationTable").rows.length - 1;
            if (pendingTableLength > 0) {
                url = "/Master/Designation/ExportToExcel?TabIndex=" + currentTab;
                window.location.href = url;
            }
            else {
                swal.fire("No data found to export");
            }
        }

        else if (currentTab == 'ACTIVE') {
            var activeTableLength = document.getElementById("DesignationTable").rows.length - 1;
            if (activeTableLength > 0) {
                url = "/Master/Designation/ExportToExcel?TabIndex=" + currentTab;
                window.location.href = url;
            }
            else {
                swal.fire("No data found to export");
            }
        }
        else if (currentTab == 'INACTIVE') {
            var inActiveTableLength = document.getElementById("DesignationTable").rows.length - 1;
            if (inActiveTableLength > 0) {
                url = "/Master/Designation/ExportToExcel?TabIndex=" + currentTab;
                window.location.href = url;
            }
            else {
                swal.fire("No data found to export");
            }

        }
    }




//function ExportToExcel() {

//    debugger;
//    if (currenttab == 'APPROVAL_PENDING') {
//        var pendingTableLength = document.getElementById("PendingDesignationTable").rows.length - 1;
//        if (pendingTableLength > 0) {
//            url = "/Master/Designation/ExportToExcel?TabIndex=" + currenttab;
//            window.location.href = url;
//        }
//        else {
//            swal.fire("No data found to export");
//        }
//    }

//    else if (currenttab == 'ACTIVE') {
//        var activeTableLength = document.getElementById("DesignationTable").rows.length - 1;
//        if (activeTableLength > 0) {
//            url = "/Master/Designation/ExportToExcel?TabIndex=" + currenttab;
//            window.location.href = url;
//        }
//        else {
//            swal.fire("No data found to export");
//        }
//    }
//    else if (currenttab == 'INACTIVE') {
//        var inActiveTableLength = document.getElementById("DesignationTable").rows.length - 1;
//        if (inActiveTableLength > 0) {
//            url = "/Master/Designation/ExportToExcel?TabIndex=" + currenttab;
//            window.location.href = url;
//        }
//        else {
//            swal.fire("No data found to export");
//        }
//    }
//}


