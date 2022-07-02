var prevTab = 'ActiveTab';
var currentTab;

function ontabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/WageGrade/GetWageGradeList";
    $('#tabsDropdownWageGrade').val(currentTab);
    $('#WageGradelist').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/WageGrade/GetWageGradeList";
    $('#WageGradelist').load(url, { TabIndex: currentTab }, function () { });

}





function AddNewOrEdit(Action, GI, LogGI) {
    debugger;
    if (Action == 'Edit') {
        var url = "/Master/WageGrade/Edit?WageGradeGI=" + GI + "&LogGI=" + LogGI;
    }
    else {
        var url = "/Master/WageGrade/Create";
    }
    $('#CreateOrEditSlider').load(url, function () { });  
    $('body').append('<div class="form-overlay"></div>');

}


function Approve(GI, LogGI) {
    debugger;
    var url = "/Master/WageGrade/Approve?WageGradeGI=" + GI + "&LogGI=" + LogGI;
    $('#ApproveSlider').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
  
}
function confirmApprove() {

    if (confirm("Do you want to Approve?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/WageGrade/Approve',
            dataType: 'json',
            data: $('#approve').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('ApproveDiv');
                        var url = "/Master/WageGrade/GetWageGradeList?TabIndex=" + 'APPROVAL_PENDING';
                        $('#WageGradelist').load(url, function () { });
                        $(".PendingTab").addClass("active");
                        $(".ActiveTab").removeClass("active");
                        $("#WageGradelist").removeClass("hide");
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
function confirmReject() {

    if (confirm("Do you want to Reject?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/WageGrade/Reject',
            dataType: 'json',
            data: $('#approve').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('PendingApprove');
                        var url = "/Master/WageGrade/GetWageGradeList?TabIndex=" + 'APPROVAL_PENDING';
                        $('#pendinglist').load(url, function () { });
                        $(".PendingTab").addClass("active");
                        $(".ActiveTab").removeClass("active");
                        $("#pendinglist").removeClass("hide");
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
function validateWageGrade() {
    debugger;
    if ($('.wName').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#WageGradeName").addClass('error-message');
        $('#WageGradeName').html("This field is required");
        $('#Name').focus();
        return false;
    }

    else if ($('.wShtName').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#WageGradeShortName").addClass('error-message');
        $('#WageGradeShortName').html("This field is required");
        $('#ShortName').focus();
        return false;
    }
   
    else
        return true;
}
function Delete(GI, LogGI) {

    debugger;

    var url = "/Master/WageGrade/Delete?WageGradeGI=" + GI + "&LogGI=" + LogGI;
    $('#DeleteSlider'.load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
    
}
//function onDeleteClick(GI) {
//    var url = "/Master/WageGrade/DeleteWageGrade?GI=" + GI;
//    window.location.href = url;
//}

function confirmDelete(GI, LogGI) {

    if (confirm("Do you want to Delete?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/WageGrade/Delete',
            dataType: 'json',
            data: $('#deleteWageGrade').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('delete');
                        var url = "/Master/WageGrade/GetWageGradeList?TabIndex=" + 'APPROVAL_PENDING';
                        $('#WageGradelist').load(url, function () { });
                        $(".PendingTab").removeClass("active");
                        $(".ActiveTab").addClass("active");
                        $("#WageGradelist").removeClass("hide");
                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = "/Master/WageGrade/Delete?WageGradeGI=" + GI + "&LogGI=" + LogGI;
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

}


function ExportToExcel() {

    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("WageGradePendingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/WageGrade/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("WageGradetable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/WageGrade/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("WageGradetable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/WageGrade/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}




function SaveWageGrade() {
    debugger;
    if (validateWageGrade()) {

        console.log($('#WageGradeId').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/WageGrade/Save',
            dataType: 'json',
            data: $('#WageGradeId').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/WageGrade/Index";

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