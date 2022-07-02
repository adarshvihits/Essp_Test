var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Section/GetSectionList";
    $('#tabsDropdownSection').val(currentTab);
    $('#SectionList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/Section/GetSectionList";
    $('#SectionList').load(url, { TabIndex: currentTab }, function () { });

}
function Approve(GI,LogGI) {
    debugger
    var url = "/Master/Section/Approve?SectionGI=" + GI + "&LogGI=" + LogGI;
    $('#ApproveSlider').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
}

function AddNewOrEdit(Action,GI,LogGI) {
    debugger;
    if (Action == 'MODIFY') {
        var url = "/Master/Section/Edit?SectionGI=" + GI + "&LogGI=" + LogGI;

    }
    else {
        var url = "/Master/Section/Create";
    }
    $('#AddNewOrEditSlider').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');

}
function Delete(GI,LogGI) {
  debugger; 
    var url = "/Master/Section/Delete?SectionGI=" + GI + "&LogGI=" + LogGI;
    $('#DeleteSlider').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
    
}

function confirmDelete(GI, LogGI) {

    if (confirm("Do you want to Delete?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/Section/Delete',
            dataType: 'json',
            data: $('#deleteSection').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('Delete');
                        var url = "/Master/Section/GetSectionList?TabIndex=" + 'ACTIVE';
                        $('#SectionList').load(url, function () { });
                        $(".PendingTab").removeClass("active");
                        $(".ActiveTab").addClass("active");
                        $("#SectionList").removeClass("hide");
                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = "/Master/Section/Delete?SectionGI=" + GI + "&LogGI=" + LogGI;
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

}


function confirmReject(GI, LogGI) {
    debugger;


    if (confirm("Do you want to Reject?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/Section/Reject',
            dataType: 'json',
            data: $('#approve').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('PendingApprove');
                        var url = "/Master/Section/GetSectionList?TabIndex=" + 'APPROVAL_PENDING';
                        $('#SectionList').load(url, function () { });
                        $(".PendingTab").addClass("active");
                        $(".ActiveTab").removeClass("active");
                        $("#SectionList").removeClass("hide");
                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = "/Master/Section/Approve?SectionGI=" + GI + "&LogGI=" + LogGI;
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

}

function confirmApprove(GI, LogGI) {


    if (confirm("Do you want to Approve?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/Section/Approve',
            dataType: 'json',
            data: $('#approve').serialize(),
            success: function (result) {

                if (result.success == true) {
                    debugger
                    swal.fire(result.message).then(function () {
                        CloseSlider('PendingApprove');
                        var url = "/Master/Section/GetSectionList?TabIndex=" + 'APPROVAL_PENDING';
                        debugger
                        window.location.href = url;
                        $('#SectionList').load(url, function () { });
                        $(".PendingTab").addClass("active");
                        $(".ActiveTab").removeClass("active");
                        $("#SectionList").removeClass("hide");
                    });

                }

                else {
                    debugger;
                    swal.fire(result.message).then(function () {
                        var url = "/Master/Section/Approve?SectionGI=" + GI + "&LogGI=" + LogGI;
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
}
function ExportToExcel() {

    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingSectiontable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Section/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("SectionTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Section/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("SectionTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Section/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}
function validateSection() {
    debugger;
    if ($('.secName').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#sectionName").addClass('error-message');
        $('#sectionName').html("This field is required");
        $('#Name').focus();
        return false;
    }
    else if ($('.secShtName').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#secShortName").addClass('error-message');
        $('#secShortName').html("This field is required");
        $('#ShortName').focus();
        return false;
    }
    
    else
        return true;
}

