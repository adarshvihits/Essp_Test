
var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';




function OnTabClick(Tab, TabIndex) {
    $.ajaxSetup({
        async: false
    });
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Qualification/GetQualificationList";
    $('#tabsDropdownQualification').val(currentTab);
    $('#QualificationList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/Qualification/GetQualificationList";
    $('#QualificationList').load(url, { TabIndex: currentTab }, function () { });

}

function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#QualificationList_" + index + "__EditActive").val() == 'True') {
            swal.fire("APPROVAL PENDING");


        }
        else {
            var url = "/Master/Qualification/Edit?QualificationGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/Qualification/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');

    }


}



function QualificationSave() {
    debugger;
    if (validateQualification()) {

        console.log($('#Qualification-Save').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/Qualification/Save',
            dataType: 'json',
            data: $('#Qualification-Save').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/Qualification/Index";
                        
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





function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#QualificationList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/Qualification/Approve?QualificationGI=" + GI + "&&LogGI=" + LogGI;
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
                url: '/Master/Qualification/Approve',
                dataType: 'json',
                data: $('#Qualificationapprove').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Qualification/GetQualificationList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#QualificationList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#QualificationList").removeClass("hide");

                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            debugger;
                            var url = "/Master/Qualification/Approve?QualificationGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Qualification/Reject',
                dataType: 'json',
                data: $('#Qualificationapprove').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Qualification/GetQualificationList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#QualificationList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#QualificationList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Qualification/Approve?QualificationGI=" + GI + "&LogGI=" + LogGI;
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

    if ($("#QualificationList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Qualification/Delete?QualificationGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}





function ConfirmDelete(GI, LogGI) {
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
                url: '/Master/Qualification/Delete',
                dataType: 'json',
                data: $('#deleteQualification').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/Qualification/GetQualificationList?TabIndex=" + 'ACTIVE';
                            $('#AllowanceList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#AllowanceList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Allowance/Delete?AllowanceGI=" + GI + "&LogGI=" + LogGI;
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




function ExportToExcel() {
    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingTableQualification").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Qualification/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("QualificationTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Qualification/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("QualificationTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Qualification/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }

    }
}


function validateQualification() {

    if (!validateById('#Name', 'QualificationName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'QualshortName')) {
        return false;
    }

    else if (!validateById('#QualificationTypeCode_Code', 'QualType')) {
        return false;
    }
    else if (!validateById('#IsProfessional', 'QISprofessional')) {
        return false;
    }
    else {
        return true;
    }
}

