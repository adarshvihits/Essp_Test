var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/FieldOfCertification/GetFieldOfCertificationList";

    $('#FieldOfCertificationList').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}



function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#FieldOfCertificationList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/FieldOfCertification/Edit?FieldOfCertificationGI=" + GI + "&LogGI=" + LogGI;

            $('#AddOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/FieldOfCertification/Create";
        $('#AddOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}



function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#FieldOfCertificationList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/FieldOfCertification/Approve?FieldOfCertificationGI=" + GI + "&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}






function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#FieldOfCertificationList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/FieldOfCertification/Delete?FieldOfCertificationGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
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
                url: '/Master/FieldOfCertification/Reject',
                dataType: 'json',
                data: $('#FieldOfcertificationApprove').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/FieldOfCertification/GetFieldOfCertificationList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#FieldOfCertificationList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#FieldOfCertificationList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/FieldOfCertification/Approve?FieldOfCertificationGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/FieldOfCertification/Approve',
                dataType: 'json',
                data: $('#FieldOfcertificationApprove').serialize(),
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/FieldOfCertification/GetFieldOfCertificationList?TabIndex=" + 'APPROVAL_PENDING';
                            debugger
                           
                            $('#FieldOfCertificationList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#FieldOfCertificationList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/FieldOfCertification/Approve?FieldOfCertificationGI=" + GI + "&LogGI=" + LogGI;
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
        var pendingTableLength = document.getElementById("FieldOfcertificationPendingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/FieldOfCertification/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("FieldOfCertificationTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/FieldOfCertification/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }

        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("FieldOfCertificationTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/FieldOfCertification/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }

    }

}



function validateFieldOfCertification() {

    if (!validateById('#Name', 'FieldName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'FieldShtName')) {
        return false;
    }

    else {
        return true;
    }
}



function FieldOfCertificationSave() {
    debugger;


    if (validateFieldOfCertification()) {
      
        $.ajax({

            type: 'POST',
            url: '/Master/FieldOfCertification/Save',
            dataType: 'json',
            
            data: $('#SaveFieldofCertification').serialize(),
         
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewDiv');
                        debugger;
                        var url = "/Master/FieldOfCertification/GetFieldOfCertificationList?TabIndex=" + currentTab;
                        $('#FieldOfCertificationList').load(url, function () { });


                    });

                }

                else {
                    swal.fire(result.message).then(function () {

                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                debugger;
                console.log(xhr.responseText);
             /*   swal.fire(xhr.responseText);*/
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
                url: '/Master/FieldOfCertification/Delete',
                dataType: 'json',
                data: $('#deleteConfirm').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Delete');
                            debugger
                            var url = "/Master/FieldOfCertification/GetFieldOfCertificationList?TabIndex=" + 'ACTIVE';
                          
                            $('#FieldOfCertificationList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#FieldOfCertificationList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/FieldOfCertification/Delete?FieldOfCertificationGI=" + GI + "&LogGI=" + LogGI;
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