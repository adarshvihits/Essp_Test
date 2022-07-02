var prevTab = "tab1";
var currentTab = "Essp";


function onCreateHRBackofficeUsersClick() {
    url = "/Master/User/Create";
    window.location.href = url;
}

function onFullPermissionClick() {
    //$("input[type=checkbox]").prop('checked', true);
    debugger;
    if ($('#FullPermission').is(':checked')) {
        $('#dsg').find('input[type=checkbox]').prop('checked', true);
        $('#dept').find('input[type=checkbox]').prop('checked', true);
        $('#loc').find('input[type=checkbox]').prop('checked', true);
        $('#cat').find('input[type=checkbox]').prop('checked', true);
        $('#grd').find('input[type=checkbox]').prop('checked', true);
        $('#pay').find('input[type=checkbox]').prop('checked', true);
        $('#div').find('input[type=checkbox]').prop('checked', true);
        $('#sec').find('input[type=checkbox]').prop('checked', true);
        $('#empType').find('input[type=checkbox]').prop('checked', true);
    }
    else {

        $('#dsg').find('input[type=checkbox]').prop('checked', false);
        $('#dept').find('input[type=checkbox]').prop('checked', false);
        $('#loc').find('input[type=checkbox]').prop('checked', false);
        $('#cat').find('input[type=checkbox]').prop('checked', false);
        $('#grd').find('input[type=checkbox]').prop('checked', false);
        $('#pay').find('input[type=checkbox]').prop('checked', false);
        $('#div').find('input[type=checkbox]').prop('checked', false);
        $('#sec').find('input[type=checkbox]').prop('checked', false);
        $('#empType').find('input[type=checkbox]').prop('checked', false);
    }
}
function onAllClick(chkid, tableid) {
    if ($('#' + chkid).is(':checked'))
        $('#' + tableid).find('input[type=checkbox]').prop('checked', true);
    else
        $('#' + tableid).find('input[type=checkbox]').prop('checked', false);
}

function onHRCheckboxClick() {
    if ($('#coupon_question').is(':checked')) {
        $('.showCheckBox').css("display","block")
    }
    else {
        $('.showCheckBox').css("display", "none")
    }
}

function onViewApplicableMenuClick() {
    debugger;
    var URCode = $('#UserRole_Code').val();
    //if (URCode == 0) {

    //    swal.fire("Please select a User Role");
    //    closePopUp();
    //}
    //else {
        url = "/Master/User/GetApplicableMenus";        
        $('#applicableMenus').load(url, { UserRoleCode: URCode }, function () { });
        $("#applicableMenus").removeClass('hide');
    //}

}

function closePopUp() {
    $('.applicable-menus-popup').hide();
    $('.modal-backdrop').hide();
}

function tabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");   
    var url = "/Master/User/GetUserList";
    if (TabIndex == "ESSP") {

        $('#esspList').load(url, { TabIndex: TabIndex }, function () { });
        $('#esspList').removeClass('hide');
        $('#hrList').addClass('hide');
        $('#nonEmployeeUsersList').addClass('hide');
        $('#inActiveList').addClass('hide');
        $('#approvalPendingList').addClass('hide');
    }
    else if (TabIndex == "HR") {
        $('#hrList').load(url, { TabIndex: TabIndex }, function () { });
        $('#hrList').removeClass('hide');
        $('#esspList').addClass('hide');
        $('#nonEmployeeUsersList').addClass('hide');
        $('#inActiveList').addClass('hide');
        $('#approvalPendingList').addClass('hide');
    }
    else if (TabIndex == "Non_Employee") {
        $('#nonEmployeeUsersList').load(url, { TabIndex: TabIndex }, function () { });
        $('#nonEmployeeUsersList').removeClass('hide');
        $('#esspList').addClass('hide');
        $('#hrList').addClass('hide');
        $('#inActiveList').addClass('hide');
        $('#approvalPendingList').addClass('hide');
    }
    else if (TabIndex == "INACTIVE") {
        $('#inActiveList').load(url, { TabIndex: TabIndex }, function () { });
        $('#inActiveList').removeClass('hide');
        $('#nonEmployeeUsersList').addClass('hide');
        $('#esspList').addClass('hide');
        $('#hrList').addClass('hide');
        $('#approvalPendingList').addClass('hide');
    }
    else {
        $('#approvalPendingList').load(url, { TabIndex: TabIndex }, function () { });
        $('#approvalPendingList').removeClass('hide');
        $('#inActiveList').addClass('hide');
        $('#nonEmployeeUsersList').addClass('hide');
        $('#esspList').addClass('hide');
        $('#hrList').addClass('hide');
    }
    prevTab = Tab;
}




function onApproveClick(UserMasterGI, LogGI, UserType, Mode) {
    debugger;
    var url = "/Master/User/Approve";
    if (UserType == "Essp") {
        $('body').append('<div class="form-overlay"></div>');
        $('#Approve').load(url, { UserMasterGI: UserMasterGI, LogGI: LogGI, UserType: UserType, Mode: Mode }, function () { });
        $('#Approve').removeClass('hide');
    }
    else if (UserType == "Non Emp Users") {
        url = url + "?UserMasterGI=" + UserMasterGI + "&LogGI=" + LogGI + "&UserType=" + UserType + "&Mode=" + Mode;
        window.location.href = url;
    }
    else {
        url = url + "?UserMasterGI=" + UserMasterGI + "&LogGI=" + LogGI + "&UserType=" + UserType + "&Mode=" + Mode;
        window.location.href = url;
    }
}

function onEditEsspUserClick(UserMasterGI,UserType) {
    var url = "/Master/User/EditUserEssp?UserMasterGI=" + UserMasterGI + "&UserType=" + UserType;    
    window.location.href = url;
}
function onEditInActiveUserClick(UserMasterGI, UserType) {
    if (UserType == "Essp") {

        var url = "/Master/User/EditUserEssp?UserMasterGI=" + UserMasterGI + "&UserType=" + UserType;
        window.location.href = url;
    }
    else if (UserType == "HR") {
        var url = "/Master/User/EditUserHr?UserMasterGI=" + UserMasterGI;
        window.location.href = url;
    }
    else {
        var url = "/Master/User/EditUserNonEmployee?UserMasterGI=" + UserMasterGI;
        window.location.href = url;
    }
}

function onEditHrClick(UserMasterGI) {
    debugger;
    var url = "/Master/User/EditUserHr?UserMasterGI=" + UserMasterGI;
    window.location.href = url;
}
function onEditNonEmployeeUserClick(UserMasterGI) {
    var url = "/Master/User/EditUserNonEmployee?UserMasterGI=" + UserMasterGI;
    window.location.href = url;
}
function onDeleteNonEmployeeUserClick(UserMasterGI) {
    var url = "/Master/User/DeleteUserNonEmployee?UserMasterGI=" + UserMasterGI;
    window.location.href = url;
}
function onDeleteHrClick(UserMasterGI) {
    var url = "/Master/User/DeleteUserHr?UserMasterGI=" + UserMasterGI;
    window.location.href = url;
}
function onDeleteInActiveClick(UserMasterGI) {
    var url = "/Master/User/DeleteUserInActive?UserMasterGI=" + UserMasterGI;
    window.location.href = url;
}
function onDeleteEsspClick(UserMasterGI) {
    var url = "/Master/User/DeleteUserEssp";
    $('body').append('<div class="form-overlay"></div>');
    $('#deleteEsspUser').load(url, { UserMasterGI: UserMasterGI }, function () { });
}
function onDeleteInActiveEsspClick(UserMasterGI) {
    var url = "/Master/User/DeleteUserEssp";
    $('body').append('<div class="form-overlay"></div>');
    $('#deleteInActiveUser').removeClass('hide');
    $('#deleteInActiveUser').load(url, { UserMasterGI: UserMasterGI }, function () { });
}
function DeleteUser(UserMasterGI) {
    var url = "/Master/User/DeleteUser?UserMasterGI=" + UserMasterGI;
    window.location.href = url;
}
function confirmReject() {

    if (confirm("Do you want to Confirm?")) {
        debugger;
        $.ajax({

            type: 'POST',
            url: '/Master/User/Reject',
            dataType: 'json',
            data: $('#ApproveOrRejectNonEmp').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {   
                        var url = '/Master/User/Index'
                        window.location.href = url;
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

function onExportToExcelClick() {
    debugger;
    if (currentTab == "ESSP") {

        var esspTableLength = document.getElementById("esspTable").rows.length - 1;
        if (esspTableLength > 0) {
            url = "/Master/User/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == "HR") {
        var hrTableLength = document.getElementById("hrTable").rows.length - 1;
        if (hrTableLength > 0) {
            url = "/Master/User/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == "Non_Employee") {
        var nonEmployeeTableLength = document.getElementById("nonEmployeeTable").rows.length - 1;
        if (nonEmployeeTableLength > 0) {
            url = "/Master/User/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == "INACTIVE") {
        var inActiveTableLength = document.getElementById("inActiveTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/User/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var approvePendingTableLength = document.getElementById("approvePendingTable").rows.length - 1;
        if (approvePendingTableLength > 0) {
            url = "/Master/User/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}
