

var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';


function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/FieldOfStudy/GetFieldOfStudyList";

    $('#FieldOfStudyList').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}




function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#FieldOfStudyList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/FieldOfStudy/Edit?FieldOfStudyGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/FieldOfStudy/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}




function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#FieldOfStudyList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/FieldOfStudy/Approve?FieldOfStudyGI=" + GI + "&&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}




function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#FieldOfStudyList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/FieldOfStudy/Delete?FieldOfStudyGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}





function ExportToExcel()
{
    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("FieldPendingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/FieldOfStudy/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("FieldOfStudyTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/FieldOfStudy/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("FieldOfStudyTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/FieldOfStudy/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }

    }
}





function validateFieldOfStudy() {

    if (!validateById('#Name', 'FieldName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'FieldShortName')) {
        return false;
    }

    else {
        return true;
    }
}





function FieldOfStudySave() {
    debugger;
    if (validateFieldOfStudy()) {

        $.ajax({

            type: 'POST',
            url: '/Master/FieldOfStudy/Save',
            dataType: 'json',
            data: $('#saveFieldOfStudy').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/FieldOfStudy/GetFieldOfStudyList?TabIndex=" + currentTab;
                        $('#FieldOfStudyList').load(url, function () { });


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
                url: '/Master/FieldOfStudy/Delete',
                dataType: 'json',
                data: $('#deleteField').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            debugger
                            var url = "/Master/FieldOfStudy/GetFieldOfStudyList?TabIndex=" + 'ACTIVE';
                            $('#FieldOfStudyList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#FieldOfStudyList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/FieldOfStudy/Delete?FieldOfStudyGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/FieldOfStudy/Approve',
                dataType: 'json',
                data: $('#approveFieldOfStudy').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/FieldOfStudy/GetFieldOfStudyList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#FieldOfStudyList').load(url, function () { });

                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            debugger;
                            var url = "/Master/FieldOfStudy/Approve?FieldOfStudyGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/FieldOfStudy/Reject',
                dataType: 'json',
                data: $('#approveFieldOfStudy').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/FieldOfStudy/GetFieldOfStudyList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#FieldOfStudyList').load(url, function () { });
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/FieldOfStudy/Approve?FieldOfStudyGI=" + GI + "&LogGI=" + LogGI;
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



