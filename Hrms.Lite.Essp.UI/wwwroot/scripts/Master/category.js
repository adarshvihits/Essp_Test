var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Category/GetCategoryList";
    $('#tabsDropdownCategory').val(currentTab);
    $('#CategoryList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/Category/GetCategoryList";
    $('#CategoryList').load(url, { TabIndex: currentTab }, function () { });

}

//function Approve(GI,LogGI) {
//    debugger;
//    var url = "/Master/Category/Approve?CategoryGI=" + GI + "&LogGI=" + LogGI;
//    $('.ApprovalPending').load(url, function () { });
//    $('body').append('<div class="form-overlay"></div>');
//    $("#ApproveSlider").removeClass("hide");
//    $(".ApprovalPending").show();

//}

function onApproveClick(GI, LogGI, Type, index) {

    debugger;
    if ($("#CategoryList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {
        var url = "/Master/Category/Approve?CategoryGI=" + GI + "&LogGI=" + LogGI;

        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}






//function AddNewOrEdit(Action,GI,LogGI) {
//    debugger;
//    if (Action == 'MODIFY') {
//        var url = "/Master/Category/Edit?CategoryGI=" + GI + "&LogGI=" + LogGI;
//    }
//    else {
//        var url = "/Master/Category/Create";
//    }
//    $('.AddNewDiv').load(url, function () { });
//    $("#CreateOrEditSlider").removeClass("hide");
//    $('body').append('<div class="form-overlay"></div>');
//    $(".AddNewDiv").show();
//}



function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#CategoryList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/Category/Edit?CategoryGI=" + GI + "&LogGI=" + LogGI;

            $('#CreateOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/Category/Create";
        $('#CreateOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}







function CategorySave() {
    debugger;
    if (validateCategory()) {

        console.log($('#Save-category').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/Category/Save',
            dataType: 'json',
            data: $('#Save-category').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewDiv');                       
                        var url = "/Master/Category/GetCategoryList?TabIndex=" + currentTab;
                        $('#CategoryList').load(url, function () { });

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



//function Delete(GI,LogGI) {

//    debugger;
//    var url = "/Master/Category/Delete?CategoryGI=" + GI + "&LogGI=" + LogGI;
//    $('#DeleteSlider').load(url, function () { });
//    $('body').append('<div class="form-overlay"></div>');
//    //$("#DeleteSlider").removeClass("hide");
//    //$(".delete").show();
//}

function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#CategoryList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Category/Delete?CategoryGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}






//function validateCategory() {
//    debugger;
//    if ($('.CName').val() == '') {
//        $('#CategoryName').html("This field is required");
//        $('#Name').focus();
//        return false;
//    }
//    else if ($('.CShtName').val() == '') {
//        $('#CategoryShortName').html("This field is required");
//        $('#ShortName').focus();
//        return false;
//    }
//    else if ($('.CType').val() == '') {
//        $('#CategoryType').html("This field is required");
//        $('#CategoryType_Code').focus();
//        return false;
//    }
    
//    else if ($('.CExpiryPeriod').val() == '') {
//        $('#Period').html("This field is required");
//        $('#ExpiryPeriod').focus();
//        return false;
//    }
//    else if ($('.CDescription').val() == '')
//    {
        
//            $('#CategoryDescription').html("This field is required");
//            $('#Descriprtion').focus();
//            return false;
//    }
//     else
//        return true;
//}

function validateCategory() {
    debugger;
    if ($('.CName').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#CategoryName").addClass('error-message');
        $('#CategoryName').html("This field is required");
        $('#Name').focus();
        return false;
    }
   else if ($('.CShtName').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#CategoryShortName").addClass('error-message');
        $('#CategoryShortName').html("This field is required");
        $('#ShortName').focus();
        return false;
    }
    else if ($('.CType').val() == '') {

        $('#CategoryType_Code').addClass('is-invalid');
        $("#CategoryType").addClass('error-message');
        $('#CategoryType').html("This field is required");
        $('#CategoryType_Code').focus();
        return false;
    }
    else if ($('.CExpiryPeriod').val() == '') {

        $('#ExpiryPeriod').addClass('is-invalid');
        $("#Period").addClass('error-message');
        $('#Period').html("This field is required");
        $('#ExpiryPeriod').focus();
        return false;
    }
    else
      return true;

}




//function confirmApprove(GI,LogGI) {

//    if (confirm("Do you want to Approve?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/Category/Approve',
//            dataType: 'json',
//            data: $('#approve').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('ApprovalPending');
//                        var url = "/Master/Category/GetCategoryList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#CategoryList').load(url, function () { });
//                        $(".PendingTab").addClass("active");
//                        $(".ActiveTab").removeClass("active");
//                        $("#CategoryList").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/Category/Approve?CategoryGI=" + GI + "&LogGI=" + LogGI;
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


//function confirmReject(GI, LogGI) {

//    if (confirm("Do you want to Reject?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/Category/Reject',
//            dataType: 'json',
//            data: $('#approve').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('ApprovalPending');
//                        var url = "/Master/Category/GetCategoryList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#CategoryList').load(url, { TabIndex: currentTab }, function () { });


//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/Category/Approve?CategoryGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Category/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApprovalPending');
                            var url = "/Master/Category/GetCategoryList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#CategoryList').load(url, { TabIndex: currentTab }, function () { });


                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Category/Approve?CategoryGI=" + GI + "&LogGI=" + LogGI;
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
    //$.ajaxSetup({
    //    async: false
    //});
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
                url: '/Master/Category/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApprovalPending');
                            var url = "/Master/Category/GetCategoryList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#CategoryList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#CategoryList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Category/Approve?CategoryGI=" + GI + "&LogGI=" + LogGI;
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
//            url: '/Master/Category/Delete',
//            dataType: 'json',
//            data: $('#Deletecategory').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('delete');
//                        var url = "/Master/Category/GetCategoryList?TabIndex=" + 'ACTIVE';
//                        $('#CategoryList').load(url, function () { });
//                        $(".PendingTab").removeClass("active");
//                        $(".ActiveTab").addClass("active");
//                        $("#CategoryList").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/Category/Delete?CategoryGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Category/Delete',
                dataType: 'json',
                data: $('#Deletecategory').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/Category/GetCategoryList?TabIndex=" + 'ACTIVE';
                            $('#CategoryList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#CategoryList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Category/Delete?CategoryGI=" + GI + "&LogGI=" + LogGI;
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
        var pendingTableLength = document.getElementById("Pendingcategorytable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Category/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("CategoryTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Category/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("CategoryTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Category/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}


function process(input)
{
    debugger;
    let value = input.value;
    let numbers = value.replace(/[^0-9]/g, "");
    input.value = numbers;
}