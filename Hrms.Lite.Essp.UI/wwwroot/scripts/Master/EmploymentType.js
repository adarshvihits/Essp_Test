

var prevTab = 'ActiveTab';
/*var currentTab;*/
var currentTab = 'ACTIVE';

//function OnTabClick(Tab, TabIndex) {
//    debugger;
//    currentTab = TabIndex;
//    $("." + prevTab).removeClass("active");
//    $("." + Tab).addClass("active");
//    var url = "/Master/EmploymentType/GetEmploymentTypeList";

//    $('#EmploymentTypeList').load(url, { TabIndex: TabIndex }, function () { });

//    prevTab = Tab;
//}




function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/EmploymentType/GetEmploymentTypeList";
    /*    $('#tabsDropdownAsset').val(currentTab);*/
    if (TabIndex != 'PendingTab')
        $('#EmploymentTypeList').load(url, { TabIndex: TabIndex }, function () { });
    else
        $('#PendingList').load(url, { TabIndex: TabIndex }, function () { });
    prevTab = Tab;
}









function AddNewOrEdit(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#EmploymentTypeList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/EmploymentType/Edit?EmploymentTypeGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/EmploymentType/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}





function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#EmploymentTypeList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/EmploymentType/Approve?EmploymentTypeGI=" + GI + "&&LogGI=" + LogGI
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

} c





//function confirmApprove(GI, LogGI) {

//    if (confirm("Do you want to Confirm?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/EmploymentType/Approve',
//            dataType: 'json',
//            data: $('#approve').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('ApproveDiv');
//                        var url = "/Master/EmploymentType/GetEmploymentTypeList?TabIndex=" + 'APPROVAL_PENDING';
//                        window.location.href = url;

//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        debugger;
//                        var url = "/Master/EmploymentType/Approve?EmploymentTypeGI=" + GI + "&LogGI=" + LogGI;
//                        $('#ApproveSlider').load(url, function () { });
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
                url: '/Master/EmploymentType/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/EmploymentType/GetEmploymentTypeList?TabIndex=" + 'APPROVAL_PENDING';

                            $('#EmploymentTypeList').load(url, function () { });

                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            debugger;
                            var url = "/Master/EmploymentType/Approve?EmploymentTypeGI=" + GI + "&LogGI=" + LogGI;
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









//function confirmReject(GI, LogGI) {

//    if (confirm("Do you want to Confirm?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/EmploymentType/Reject',
//            dataType: 'json',
//            data: $('#approve').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('ApproveDiv');
//                        var url = "/Master/EmploymentType/GetEmploymentTypeList?TabIndex=" + 'APPROVAL_PENDING';
//                        //$('#Gradelist').load(url, function () { });
//                        //$(".PendingTab").addClass("active");
//                        //$(".ActiveTab").removeClass("active");
//                        //$("#Gradelist").removeClass("hide");
//                        window.location.href = url;
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/EmploymentType/Approve?EmploymentTypeGI=" + GI + "&LogGI=" + LogGI;
//                        $('#ApproveSlider').load(url, function () { });
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
                url: '/Master/EmploymentType/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/EmploymentType/GetEmploymentTypeList?TabIndex=" + 'APPROVAL_PENDING';
                            //$('#Gradelist').load(url, function () { });
                            //$(".PendingTab").addClass("active");
                            //$(".ActiveTab").removeClass("active");
                            //$("#Gradelist").removeClass("hide");

                            $('#EmploymentTypeList').load(url, function () { });
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/EmploymentType/Approve?EmploymentTypeGI=" + GI + "&LogGI=" + LogGI;
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
        var pendingTableLength = document.getElementById("PendingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/EmploymentType/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("EmploymentTypeTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/EmploymentType/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("EmploymentTypeTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/EmploymentType/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}

//function validateEmploymentType() {
//    debugger;
//    if ($('.EName').val() == '') {
//        $('#Name').addClass('is-invalid');
//        $("#EmploymentName").addClass('error-message');
//        $('#EmploymentName').html("This field is required");
//        $('#Name').focus();
//        return false;
//    }

//    else if ($('.EShtName').val() == '') {
//        $('#ShortName').addClass('is-invalid');
//        $("#EmpShortName").addClass('error-message');
//        $('#EmpShortName').html("This field is required");
//        $('#ShortName').focus();
//        return false;
//    }

//    else
//        return true;
//}






function validateEmploymentType() {

    if (!validateById('#Name', 'EmploymentName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'EmpShortName')) {
        return false;
    }

    else {
        return true;
    }
}





function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#EmploymentTypeList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/EmploymentType/Delete?EmploymentTypeGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}




function EmployeeTypeSave() {
    debugger;
    var TabIndex;
    if (validateEmploymentType()) {
        $.ajax({

            type: 'POST',
            url: '/Master/EmploymentType/Save',
            dataType: 'json',
            data: $('#employeetypeSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/EmploymentType/GetEmploymentTypeList?TabIndex=" + currentTab;
                        $('#EmploymentTypeList').load(url, function () { });

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
                url: '/Master/EmploymentType/Delete',
                dataType: 'json',
                data: $('#deleteEmployee').serialize(),
                success: function (result) {
                    debugger
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/EmploymentType/GetEmploymentTypeList?TabIndex=" + 'ACTIVE';
                            $('#EmploymentTypeList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#EmploymentTypeList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/EmploymentType/Delete?EmploymentTypeGI=" + GI + "&LogGI=" + LogGI;
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