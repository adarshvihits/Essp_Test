var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Division/GetDivisionList";

    $('#DivisionList').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}







function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#DivisionList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/Division/Edit?DivisionGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/Division/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}



function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#DivisionList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Division/Delete?DivisionGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}





function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#DivisionList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/Division/Approve?DivisionGI=" + GI + "&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}



//function validateDivision() {
//    debugger;
//    if ($('.DName').val() == '') {
//        $('#divisionName').html("This field is required");
//        $('#Name').focus();
//        return false;
//    }
//    else if ($('.DShtName').val() == '') {
//        $('#divisionShortName').html("This field is required");
//        $('#ShortName').focus();
//        return false;
//    }
//    else if ($('.DDescription').val() == '') {
//        $('#DivisionDescription').html("This field is required");
//        $('#Description').focus();
//        return false;
//    }
//    else if ($('.LStreet').val() == '') {
//        $('#LocStreet').html("This field is required");
//        $('#Street').focus();
//        return false;
//    }
//    else
//        return true;
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
                url: '/Master/Division/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Division/GetDivisionList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#DivisionList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#DivisionList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Division/Approve?DivisionGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Division/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/Division/GetDivisionList?TabIndex=" + 'APPROVAL_PENDING';
                            debugger
                        
                            $('#DivisionList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#DivisionList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Division/Approve?DivisionGI=" + GI + "&LogGI=" + LogGI;
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
        var pendingTableLength = document.getElementById("PendingDivisiontable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Division/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("DivisionTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Division/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("DivisionTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Division/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}

//function validateDivision() {
//    debugger;
//    if ($('.DName').val() == '') {

//        $('#Name').addClass('is-invalid');
//        $("#divisionName").addClass('error-message');
//        $('#divisionName').html("This field is required");
//        $('#Name').focus();
//        return false;
//    }
//    else if ($('.DShtName').val() == '') {

//        $('#ShortName').addClass('is-invalid');
//        $("#divisionShortName").addClass('error-message');
//        $('#divisionShortName').html("This field is required");
//        $('#ShortName').focus();
//        return false;
//    }
   
//    else
//        return true;
//}




function validateDivision() {

    if (!validateById('#Name', 'divisionName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'divisionShortName')) {
        return false;
    }
  
    else {
        return true;
    }
}




function DivisionSave() {
    debugger;
    var TabIndex;
    if (validateDivision()) {
         $.ajax({

            type: 'POST',
            url: '/Master/Division/Save',
            dataType: 'json',
            data: $('#divisionSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewDiv');
                        var url = "/Master/Division/GetDivisionList?TabIndex=" + currentTab;
                        $('#DivisionList').load(url, function () { });

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
                url: '/Master/Division/Delete',
                dataType: 'json',
                data: $('#divisionDelete').serialize(),
                success: function (result) {
                    debugger
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Delete');
                            var url = "/Master/Division/GetDivisionList?TabIndex=" + 'ACTIVE';
                            $('#DivisionList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#DivisionList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Division/Delete?DistrictGI=" + GI + "&LogGI=" + LogGI;
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
