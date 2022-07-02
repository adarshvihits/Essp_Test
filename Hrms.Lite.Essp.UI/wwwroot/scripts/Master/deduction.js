var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Deduction/GetDeductionList";
    $('#tabsDropdownDeduction').val(currentTab);
    $('#DeductionList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/Deduction/GetDeductionList";
    $('#DeductionList').load(url, { TabIndex: currentTab }, function () { });

}



//function onAddNewOrEditClick(Type,GI,LogGI) {
//    debugger;
   
//    if (Type == 'MODIFY') {
//        $.ajax({

//            url: "/Master/Deduction/ValidationChecks?DeductionGI=" + GI + "&LogGI=" + LogGI + "&Type=" + Type,
//            dataType: 'json',
//            success: function (result) {
//                debugger

//                if (result.success == true) {

//                    var url = "/Master/Deduction/Edit?DeductionGI=" + GI + "&LogGI=" + LogGI;

//                    $('#AddNewOrEditSlider').load(url, function () { });
//                    $('body').append('<div class="form-overlay"></div>');
//                }
//                else {
//                    debugger
//                    swal.fire(result.message).then(function () {
//                        debugger;
//                        var url = "/Master/Deduction/GetDeductionList?TabIndex=" + currentTab;
//                        $('#DeductionList').load(url, function () { });

//                    });
//                }

//            },
//            error: function (xhr, textStatus, errorThrown) {
//                toastr.error(xhr.responseText);
//            }
//        });
//    }


//    else {
//        var url = "/Master/Deduction/Create";


//        $('#AddNewOrEditSlider').load(url, function () { });
//        $('body').append('<div class="form-overlay"></div>');
//    }

//}





function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#DeductionList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/Deduction/Edit?DeductionGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/Deduction/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}











function onSaveDeductionClick() {
    debugger;
    var TabIndex;
    if (validateDeduction()) {

        console.log($('#SaveDeduction').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/Deduction/Save',
            dataType: 'json',
            data: $('#SaveDeduction').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEditDiv');
                        var url = "/Master/Deduction/GetDeductionList?TabIndex=" + currentTab;
                        $('#DeductionList').load(url, function () { });
                    });

                }

                else {
                    swal.fire(result.message).then(function ()
                    {

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




//function onDeleteClick(GI,LogGI,Type) {
//    debugger;


//    $.ajax({

//        url: "/Master/Deduction/ValidationChecks",
//        data: { DeductionGI: GI, LogGI: LogGI, Type: Type },
//        success: function (result) {
//            debugger

//            if (result.success == true) {

//                var url = "/Master/Deduction/Delete?DeductionGI=" + GI + "&LogGI=" + LogGI;

//                $('#DeleteSlider').load(url, function () { });
//                $('body').append('<div class="form-overlay"></div>');
//            }
//            else {
//                debugger
//                swal.fire(result.message).then(function () {

//                    var url = "/Master/Deduction/GetDeductionList?TabIndex=" + currentTab;
//                    $('#DeductionList').load(url, function () { });

//                });
//            }

//        },
//        error: function (xhr, textStatus, errorThrown) {
//            toastr.error(xhr.responseText);
//        }
//    });


//}




function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#DeductionList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Deduction/Delete?DeductionGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}






//function onApproveClick(GI,LogGI,Type) {
//    debugger;

//    $.ajax({

//        url: "/Master/Deduction/ValidationChecks",
//        data: { DeductionGI: GI, LogGI: LogGI, Type: Type },
//        success: function (result) {
//            debugger

//            if (result.success) {

//                var url = "/Master/Deduction/Approve?DeductionGI=" + GI + "&LogGI=" + LogGI;

//                $('#ApproveSlider').load(url, function () { });
//                $('body').append('<div class="form-overlay"></div>');
//            }
//            else {
//                debugger
//                swal.fire(result.message).then(function () {

//                    var url = "/Master/Deduction/GetDeductionList?TabIndex=" + currentTab;
//                    $('#DeductionList').load(url, function () { });

//                });
//            }

//        },
//        error: function (xhr, textStatus, errorThrown) {
//            toastr.error(xhr.responseText);
//        }
//    });


//}




function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#DeductionList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {
        
        var url = "/Master/Deduction/Approve?DeductionGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Deduction/Approve',
                dataType: 'json',
                data: $('#deduction').serialize(),
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Deduction/GetDeductionList?TabIndex=" + 'APPROVAL_PENDING';
                            debugger


                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#DeductionList").removeClass("hide");
                            $('#DeductionList').load(url, function () { });

                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Deduction/Approve?DeductionGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Deduction/Reject',
                dataType: 'json',
                data: $('#deduction').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Deduction/GetDeductionList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#DeductionList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#DeductionList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Deduction/Approve?DeductionGI=" + GI + "&LogGI=" + LogGI;
                            $('#ApproveSlider').load(url, function () { });
                            $('body').append('<div class="form-overlay"></div>');

                        });
                    }

                },

                error: function (xhr, textStatus, errorThrown) {
                    swal.fire(xhr.responseText);
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
//            url: '/Master/Deduction/Delete',
//            dataType: 'json',
//            data: $('#DeleteDeduction').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('Delete');
//                        debugger
//                        var url = "/Master/Deduction/GetDeductionList?TabIndex=" + 'ACTIVE';
//                        $('#DeductionList').load(url, function () { });
//                        $(".PendingTab").removeClass("active");
//                        $(".ActiveTab").addClass("active");
//                        $("#DeductionList").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/Deduction/Delete?DeductionGI=" + GI + "&LogGI=" + LogGI;
//                        $('#Delete').load(url, function () { });
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
                url: '/Master/Deduction/Delete',
                dataType: 'json',
                data: $('#DeleteDeduction').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Delete');
                            debugger
                            var url = "/Master/Deduction/GetDeductionList?TabIndex=" + 'ACTIVE';
                            $('#DeductionList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#DeductionList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Deduction/Delete?DeductionGI=" + GI + "&LogGI=" + LogGI;
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








function ExportToExcel() {

    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingDeductionTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Deduction/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("DeductionTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Deduction/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("DeductionTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Deduction/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}


function validateDeduction() {
    if (!validateById('#Name', 'DeductionName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'DeductionShortName')) {
        return false;
    }

    else {
        return true;
    }
}