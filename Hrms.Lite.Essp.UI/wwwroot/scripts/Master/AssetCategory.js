


var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';


function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/AssetCategory/GetAssetCategoryList";
    $('#tabsDropdownAssetCategory').val(currentTab);
    $('#AssetCategoryList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/AssetCategory/GetAssetCategoryList";
    $('#AssetCategoryList').load(url, { TabIndex: currentTab }, function () { });

}




function AddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';
 
    if (Type == 'MODIFY') {
      
        if ($("#AssetCategoryList_" + index + "__EditActive").val() == 'True')
        {
            swal.fire("APPROVAL PENDING");
         
          
        }
        else {
            var url = "/Master/AssetCategory/Edit?AssetCategoryGI=" + GI + "&LogGI=" + LogGI;
            $("#AddNewOrEditSlider").load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/AssetCategory/Create";
        $("#AddNewOrEditSlider").load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}














function AssetCategorySave() {
    debugger;
    if (validateAssetCategory()) {

        console.log($('#AssetCtaegory-save').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/AssetCategory/Save',
            dataType: 'json',
            data: $('#AssetCtaegory-save').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/AssetCategory/GetAssetCategoryList";;
                        $('#AssetCategoryList').load(url, { TabIndex: currentTab }, function () { });
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
    if ($("#AssetCategoryList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {
        var url = "/Master/AssetCategory/Approve?AssetCategoryGI=" + GI + "&LogGI=" + LogGI;

        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}


//function confirmDelete(GI, LogGI) {

//    if (confirm("Do you want to Delete?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/AssetCategory/Delete',
//            dataType: 'json',
//            data: $('#deleteAssetCategory').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('delete');
//                        var url = "/Master/AssetCategory/GetAssetCategoryList?TabIndex=" + 'ACTIVE';
//                        $('#AssetCategory').load(url, function () { });
//                        $(".PendingTab").removeClass("active");
//                        $(".ActiveTab").addClass("active");
//                        $("#AssetCategoryList").removeClass("hide");
//                    });

//                }
//                else {
//                    debugger
//                    swal.fire(result.message).then(function () {
//                       /* var url = "/Master/AssetCategory/Delete?AssetCategoryGI=" + GI + "&LogGI=" + LogGI;*/
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
                url: '/Master/AssetCategory/Delete',
                dataType: 'json',
                data: $('#deleteAssetCategory').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/AssetCategory/GetAssetCategoryList?TabIndex=" + 'ACTIVE';
                            $('#AssetCategory').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#AssetCategoryList").removeClass("hide");
                        });

                    }
                    else {
                        debugger
                        swal.fire(result.message).then(function () {
                            /* var url = "/Master/AssetCategory/Delete?AssetCategoryGI=" + GI + "&LogGI=" + LogGI;*/
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






//function confirmReject(GI, LogGI) {

//    if (confirm("Do you want to Reject?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/AssetCategory/Reject',
//            dataType: 'json',
//            data: $('#approveAssetCategory').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('ApproveDiv');
//                        var url = "/Master/AssetCategory/GetAssetCategoryList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#AssetCategoryList').load(url, { TabIndex: currentTab }, function () { });

                       
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/AssetCategory/Approve?AssetCategoryGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/AssetCategory/Reject',
                dataType: 'json',
                data: $('#approveAssetCategory').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/AssetCategory/GetAssetCategoryList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#AssetCategoryList').load(url, { TabIndex: currentTab }, function () { });


                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/AssetCategory/Approve?AssetCategoryGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/AssetCategory/Approve',
                dataType: 'json',
                data: $('#approveAssetCategory').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/AssetCategory/GetAssetCategoryList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#AssetCategoryList').load(url, { TabIndex: currentTab }, function () { });


                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            debugger;
                            var url = "/Master/AssetCategory/Approve?AssetCategoryGI=" + GI + "&LogGI=" + LogGI;
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






//function confirmApprove(GI, LogGI) {

//    if (confirm("Do you want to Approve?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/AssetCategory/Approve',
//            dataType: 'json',
//            data: $('#approveAssetCategory').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('ApproveDiv');
//                        var url = "/Master/AssetCategory/GetAssetCategoryList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#AssetCategoryList').load(url, { TabIndex: currentTab }, function () { });


//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        debugger;
//                        var url = "/Master/AssetCategory/Approve?AssetCategoryGI=" + GI + "&LogGI=" + LogGI;
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





function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#AssetCategoryList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/AssetCategory/Delete?AssetCategoryGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}








function ExportToExcel() {
    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("AssetCategoryPending").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/AssetCategory/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("AssetCategoryTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/AssetCategory/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("AssetCategoryTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/AssetCategory/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }

    }
}

function validateAssetCategory() {
    debugger;
    if ($('.AsName').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#AssetName").addClass('error-message');
        $('#AssetName').html("This field is required");
        $('#Name').focus();
        return false;
    }

    else if ($('.AsShtName').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#AssetShort").addClass('error-message');
        $('#AssetShort').html("This field is required");
        $('#ShortName').focus();
        return false;
    }

    else
        return true;
}

