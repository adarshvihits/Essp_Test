var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Bank/GetBankList";
    $('#tabsDropdownBank').val(currentTab);
    $('#BankList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/Bank/GetBankList";
    $('#BankList').load(url, { TabIndex: currentTab }, function () { });

}


//function AddNewOrEdit(Action,GI,LogGI) {
//    debugger;
//    if (Action == 'MODIFY') {
//        var url = "/Master/Bank/Edit?BankGI=" + GI + "&LogGI=" + LogGI;
//    }
//    else
//    {
//        var url = "/Master/Bank/Create";
//    }
//    $('#AddNewOrEditSlider').load(url, function () { });
//    $('body').append('<div class="form-overlay"></div>');
  
//}




function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#BankList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/Bank/Edit?BankGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/Bank/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}




function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#BankList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Bank/Delete?BankGI=" + GI + "&LogGI=" + LogGI;

        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}





function onApproveClick(GI, LogGI, Type, index) {

    debugger;
    if ($("#BankList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {
        var url = "/Master/Bank/Approve?BankGI=" + GI + "&LogGI=" + LogGI;

        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}




//function confirmReject(GI, LogGI) {
//    debugger;


//    if (confirm("Do you want to Reject?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/Bank/Reject',
//            dataType: 'json',
//            data: $('#bankApprove').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('ApproveDiv');
//                        var url = "/Master/Bank/GetBankList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#BankList').load(url, function () { });
//                        $(".PendingTab").addClass("active");
//                        $(".ActiveTab").removeClass("active");
//                        $("#BankList").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/Bank/Approve?BankGI=" + GI + "&LogGI=" + LogGI;
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

//function confirmApprove(GI, LogGI) {


//    if (confirm("Do you want to Approve?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/Bank/Approve',
//            dataType: 'json',
//            data: $('#bankApprove').serialize(),
//            success: function (result) {

//                if (result.success == true) {
//                    debugger
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('PendingApprove');
//                        var url = "/Master/Bank/GetBankList?TabIndex=" + 'APPROVAL_PENDING';
//                        debugger
                       
//                        $('#BankList').load(url, function () { });
//                        $(".PendingTab").addClass("active");
//                        $(".ActiveTab").removeClass("active");
//                        $("#BankList").removeClass("hide");
//                    });

//                }

//                else {
//                    debugger;
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/Bank/Approve?BankGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Bank/Approve',
                dataType: 'json',
                data: $('#bankApprove').serialize(),
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Bank/GetBankList?TabIndex=" + 'APPROVAL_PENDING';
                            debugger

                            $('#BankList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#BankList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Bank/Approve?BankGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Bank/Reject',
                dataType: 'json',
                data: $('#bankApprove').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Bank/GetBankList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#BankList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#BankList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Bank/Approve?BankGI=" + GI + "&LogGI=" + LogGI;
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



//function confirmDelete(GI, LogGI) {

//    if (confirm("Do you want to Delete?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/Bank/Delete',
//            dataType: 'json',
//            data: $('#bankDelete').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('delete');
//                        var url = "/Master/Bank/GetBankList?TabIndex=" + 'ACTIVE';
//                        $('#BankList').load(url, function () { });
//                        $(".PendingTab").removeClass("active");
//                        $(".ActiveTab").addClass("active");
//                        $("#BankList").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/Allowance/Delete?BankGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Bank/Delete',
                dataType: 'json',
                data: $('#bankDelete').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Delete');
                            var url = "/Master/Bank/GetBankList?TabIndex=" + 'ACTIVE';
                            $('#BankList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#BankList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Bank/Delete?BankGI=" + GI + "&LogGI=" + LogGI;
                            $('#DeleteSlider').load(url, function () { });
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
        var pendingTableLength = document.getElementById("PendingBankTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Bank/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("BankTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Bank/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("BankTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Bank/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}

function validateBank() {
    debugger;
    if ($('.BName').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#BankName").addClass('error-message');
        $('#BankName').html("This field is required");
        $('#Name').focus();
        return false;
    }
    else if ($('.BShtName').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#BankShortName").addClass('error-message');
        $('#BankShortName').html("This field is required");
        $('#ShortName').focus();
        return false;
    }
   
    else
        return true;
}