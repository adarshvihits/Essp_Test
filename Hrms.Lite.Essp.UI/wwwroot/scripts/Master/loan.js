var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/LoanSettings/GetLoanList";
    $('#tabsDropdownLoan').val(currentTab);
    $('#LoanList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/LoanSettings/GetLoanList";
    $('#LoanList').load(url, { TabIndex: currentTab }, function () { });

}




function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#LoanSettingsList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/LoanSettings/Approve?Loan=" + GI + "&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}


function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#LoanSettingsList_" + index + "__EditActive").val() == 'True') {
            swal.fire("APPROVAL PENDING");


        }
        else {
            var url = "/Master/LoanSettings/Edit?LoanGI=" + GI + "&LogGI=" + LogGI;

            $('#CreateOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/LoanSettings/Create";
        $('#CreateOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}




function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#LoanSettingsList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/LoanSettings/Delete?LoanGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
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
                url: '/Master/LoanSettings/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApprovalPending');
                            var url = "/Master/LoanSettings/GetLoanList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#LoanList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#LoanList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/LoanSettings/Approve?LoanGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/LoanSettings/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApprovalPending');
                            var url = "/Master/LoanSettings/GetLoanList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#LoanList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#LoanList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/LoanSettings/Approve?LoanGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/LoanSettings/Delete',
                dataType: 'json',
                data: $('#Deleteloan').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/LoanSettings/GetLoanList?TabIndex=" + 'ACTIVE';
                            $('#LoanList').load(url, function () { });
                            //$(".PendingTab").removeClass("active");
                            //$(".ActiveTab").addClass("active");
                            //$("#LoanList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/LoanSettings/Delete?LoanGI=" + GI + "&LogGI=" + LogGI;
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


function SaveLoanMaster() {
    debugger;
    if (validateLoan()) {

        $.ajax({

            type: 'POST',
            url: '/Master/LoanSettings/Save',
            dataType: 'json',
            data: $('#loanSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewDiv');
                        var url = "/Master/LoanSettings/GetLoanList?TabIndex=" + currentTab;
                        $('#LoanList').load(url, function () { });


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




function ExportToExcel() {

    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("Pendingloantable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/LoanSettings/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("LoanTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/LoanSettings/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("LoanTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/LoanSettings/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}

//function validateLoan() {
//    debugger;
//    if ($('.LName').val() == '') {

//        $('#Name').addClass('is-invalid');
//        $("#LoanName").addClass('error-message');
//        $('#LoanName').html("This field is required");
//        $('#Name').focus();
//        return false;
//    }
//    else if ($('.LShtName').val() == '') {

//        $('#ShortName').addClass('is-invalid');
//        $("#LoanShortName").addClass('error-message');
//        $('#LoanShortName').html("This field is required");
//        $('#ShortName').focus();
//        return false;
//    }
//    else if ($('.LPAmt').val() == '') {

//        $('#LPAmt_Code').addClass('is-invalid');
//        $("#LoanPAmt").addClass('error-message');
//        $('#LoanPAmt').html("This field is required");
//        $('#LPAmt_Code').focus();
//        return false;
//    }
//    else if ($('.LMaxLimit').val() == '') {

//        $('#MaxLimit').addClass('is-invalid');
//        $("#Limit").addClass('error-message');
//        $('#Limit').html("This field is required");
//        $('#MaxLimit').focus();
//        return false;
//    }

//    else if ($('.LRPMethod').val() == '') {

//        $('#LRPMethod').addClass('is-invalid');
//        $("#RPMethod").addClass('error-message');
//        $('#RPMethod').html("This field is required");
//        $('#LRPMethod').focus();
//        return false;
//    }
//    else if ($('.LMaxTen').val() == '') {

//        $('#LMaxTen').addClass('is-invalid');
//        $("#MaxTen").addClass('error-message');
//        $('#MaxTen').html("This field is required");
//        $('#LMaxTen').focus();
//        return false;
//    }

//    else if ($('.LRemarks').val() == '') {

//        $('#LRemarks').addClass('is-invalid');
//        $("#Remarks").addClass('error-message');
//        $('#Remarks').html("This field is required");
//        $('#LRemarks').focus();
//        return false;
//    }

//    else
//        return true;

//}


function validateLoan() {
    if (!validateById('#Name', 'LoanName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'LoanShortName')) {
        return false;
    }
    else if (!validateById('#CompanyLoanAmount', 'LoanPAmt')) {
        return false;
    }
    else if (!validateById('#MaximumLimitPerEmployee', 'Limit')) {
        return false;
    }
    else if (!validateById('#RepaymentMethods', 'RPMethod')) {
        return false;
    }
    else if (!validateById('#MaximumTenure', 'MaxTen')) {
        return false;
    }



    else {
        return true;
    }
}

