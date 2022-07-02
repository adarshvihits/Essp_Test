var prevTab = 'ActiveTab';
var currentTab='ACTIVE';
//function TabChange(res) {
//    if (res == 'A') {
//        $('#ActiveList').removeClass('hide');
//        $('#InactiveList').addClass('hide');
//        $('#PendingList').addClass('hide');
//    }
//    else if (res == 'I') {
//        $('#UserRoleList').addClass('hide');
//        $('#InactiveList').removeClass('hide');
//        $('#PendingList').addClass('hide');
//    }
//    else {
//        $('#UserRoleList').addClass('hide');
//        $('#InactiveList').addClass('hide');
//        $('#PendingList').removeClass('hide');
//    }
//}


function OntabClick(val) {
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
    var url = "/Master/AssetMaster/GetAssetList";
    $('#ActiveList').load(url, { TabIndex: currentTab }, function () { });

}



function onAddNewClick() {
    debugger;
    var Code = 1;
    var url = "/Master/AssetMaster/AssetSave";
    $('.assetSaveclose').load(url, function () { });
    $('#newRequestSlider').removeClass('hide');
    $('.assetSaveclose').show();
}




//function AddNewOrEdit(Action, GI, LogGI) {
//    debugger;
//    var Code = 1;
//    debugger;
//    if (Action == 'Edit') {
//        var url = "/Master/AssetMaster/Edit?AssetGI=" + GI + "&LogGI=" + LogGI;
//    }
//    else {
//        var url = "/Master/AssetMaster/Create";
//    }
//    $('.assetSaveclose').load(url, function () { });
//    $('#newRequestSlider').removeClass('hide');
//    $('.assetSaveclose').show();
//}



function AddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {
        debugger
        if ($("#AssetList_" + index + "__EditActive").val() == 'True') {
            swal.fire("APPROVAL PENDING");

        }
        else {
            var url = "/Master/AssetMaster/Edit?AssetGI=" + GI + "&LogGI=" + LogGI;

            $('#newRequestSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        debugger
        var url = "/Master/AssetMaster/Create";
        $('#newRequestSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}



function tabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/AssetMaster/GetAssetList";
    $('#tabsDropdownAsset').val(currentTab);
    if (TabIndex !='PendingTab')
        $('#ActiveList').load(url, { TabIndex: TabIndex }, function () { });
    else
        $('#PendingList').load(url, { TabIndex: TabIndex }, function () { });
    prevTab = Tab;
}



function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#AssetList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/AssetMaster/GetDeleteAssetSlider?AssetGI=" + GI + "&LogGI=" + LogGI;
        $('#deleteAssetSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}



//function ConfirmDelete(GI, LogGI) {

//    if (confirm("Do you want to Delete?")) {
//        debugger;
//        var url = "/Master/AssetMaster/Delete" + "?GI=" + GI;
//        $.getJSON(url, function (result) {
//            swal.fire(result.message).then(function () {
//                CloseSlider('DeleteDiv');
//                if (result.success) {
//                    var url = "/Master/AssetMaster/Delete";
                   
//                }
//            })
//        })
       
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
                url: '/Master/AssetMaster/Delete',
                dataType: 'json',
                data: $('#DeleteAsset').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('DeleteDiv');
                            var url = "/Master/AssetMaster/GetAssetList?TabIndex=" + 'ACTIVE';
                            $('#ActiveList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#ActiveList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/AssetMaster/Delete?AssetGI=" + GI + "&LogGI=" + LogGI;
                            $('#DeleteDiv').load(url, function () { });
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








function onApproveClick(GI, LogGI, Type, index) {

    debugger;
  
    if ($("#AssetList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {
        var url = "/Master/AssetMaster/Approve?AssetGI=" + GI + "&LogGI=" + LogGI;

        $('#approveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}


//function ConfirmAssetApprove() {
//    if (confirm("Do you want to Confirm?")) {
//        debugger;
//        console.log($('#approve').serialize());
//        $.ajax({

//            type: 'POST',
//            url: '/Master/AssetMaster/Approve',
//            dataType: 'json',
//            data: $('#approve').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    debugger;
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('PendingApprove');
//                        var url = "/Master/AssetMaster/GetAssetList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#PendingList').load(url, function () { });
//                        $(".PendingTab").addClass("active");
//                        $(".ActiveTab").removeClass("active");
//                        $(".InctiveTab").removeClass("active");
//                        $("#pendingList").removeClass("hide");
//                    });
                   

//                }
//                else {
//                    debugger;
//                    if (result.message == "MAKER_CHECKER")
//                    {
//                        swal.fire("Maker and checker cannot be same.")
//                    }
//                    else {
//                        swal.fire(result.message).then(function () {


//                        });
//                    }
//                }

//            },
//            error: function (xhr, textStatus, errorThrown) {
//                debugger;
//                toastr.error(xhr.responseText);
//            }
//        });
//    }
//    else {
//        debugger;
//        return false;
//    }
//}

function ConfirmAssetApprove(GI, LogGI) {
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
                url: '/Master/AssetMaster/Approve',
                dataType: 'json',

                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/AssetMaster/GetAssetList?TabIndex=" + 'APPROVAL_PENDING';
                            debugger;
                            $('#ActiveList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $(".InctiveTab").removeClass("active");
                           /* $("#ActiveList").addClass("hide");*/
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/AssetMaster/Approve?AssetGI=" + GI + "&LogGI=" + LogGI;
                            $('#approveSlider').load(url, function () { });
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


function ConfirmAssetReject(GI, LogGI) {

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
                url: '/Master/AssetMaster/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/AssetMaster/GetAssetList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#pendingList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $(".InctiveTab").removeClass("active");
                            $("#pendingList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/AssetMaster/Approve?AssetGI=" + GI + "&LogGI=" + LogGI;
                            $('#approveSlider').load(url, function () { });
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

function onExportToExcelClick() {
    debugger;

    if (currentTab != "APPROVAL_PENDING") {

        var trainingMasterTableLength = document.getElementById("AssetMasterTable").rows.length - 1;
        if (trainingMasterTableLength > 0) {
            url = "/Master/AssetMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var trainingMasterPendingTableLength = document.getElementById("AssetMasterPendingTable").rows.length - 1;
        if (trainingMasterPendingTableLength > 0) {
            url = "/Master/AssetMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}



function assetSave() {

    var model = { Name: $('#Name').val(), shortname: $('#ShortName').val(), assetcategorycode: $('#AssetCategory_Code').val(), assetcode: $('#AssetCode').val(), dop: new Date($('.dop').val()), brand: $('#Brand').val(), model: $('#ModelNo').val(), cost: $('#Cost').val(), issuingdept: $('#IssuingDepartment_Code').val(), conditioncode: $('#Condition_Code').val(), status: $('#Active').val(), description: $('#Description').val(), mode: $('#Mode').val(), loggi: $('#LogGI').val(), gi: $('.assetgi').val() }
    
    $.ajax({

        type: 'POST',
        url: '/Master/AssetMaster/Save',
        dataType: 'json',
        data: { "json": JSON.stringify(model) },
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    CloseSlider('assetSaveclose');
                    var url = "/Master/AssetMaster/Index";
                    window.location.href = url;
                });

            }
            else if (result.message == "MAKER_CHECKER") {
                swal.fire("Maker and checker cannot be same.").then(function () {
                    //var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;
                    //$('#ApproveSlider').load(url, function () { });
                    //$('body').append('<div class="form-overlay"></div>');

                });
            }
            else {
                swal.fire(result.message).then(function () {
                    //var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;
                    //$('#ApproveSlider').load(url, function () { });
                    //$('body').append('<div class="form-overlay"></div>');

                });
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            toastr.error(xhr.responseText);
        }
    });
}

function validateAsset() {
    debugger;
    if ($('.AsName').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#AssetName").addClass('error-message');
        $('#AssetName').html("This field is required");
        $('#Name').focus();
        return false;
    }

    else if ($('.AsShort').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#AssetShortName").addClass('error-message');
        $('#AssetShortName').html("This field is required");
        $('#ShortName').focus();
        return false;
    }
    else if ($('.AsCat').val() == '') {

        $('#AssetCategory.Code').addClass('is-invalid');
        $("#AssetCategory").addClass('error-message');
        $('#AssetCategory').html("This field is required");
        $('#AssetCategory.Code').focus();
        return false;
    }
    else if ($('.Ascode').val() == '') {

        $('#AssetCode').addClass('is-invalid');
        $("#AssetCod").addClass('error-message');
        $('#AssetCod').html("This field is required");
        $('#AssetCode').focus();
        return false;
    }

    else if ($('.kt_datepicker_2').val() == '') {

        $('#DateOfPurchase').addClass('is-invalid');
        $("#DOP").addClass('error-message');
        $('#DOP').html("This field is required");
        $('#DateOfPurchase').focus();
 
       
     
    }
    else if ($('.AsBrand').val() == '') {

        $('#Brand').addClass('is-invalid');
        $("#AsBrand").addClass('error-message');
        $('#AsBrand').html("This field is required");
        $('#Brand').focus();
        return false;
    }
    else if ($('.Asmodelno').val() == '') {

        $('#Cost').addClass('is-invalid');
        $("#modelno").addClass('error-message');
        $('#modelno').html("This field is required");
        $('#Cost').focus();
        return false;
    }
    else if ($('.Asscost').val() == '') {

        $('#Cost').addClass('is-invalid');
        $("#Ascost").addClass('error-message');
        $('#Ascost').html("This field is required");
        $('#Cost').focus();
        return false;
    }
    else if ($('.Asdepart').val() == '') {

        $('#IssuingDepartment.Code').addClass('is-invalid');
        $("#assetdepartment").addClass('error-message');
        $('#assetdepartment').html("This field is required");
        $('#IssuingDepartment.Code').focus();
        return false;
    }
    else if ($('.Ascondition').val() == '') {

        $('#Condition.Code').addClass('is-invalid');
        $("#assetcondition").addClass('error-message');
        $('#assetcondition').html("This field is required");
        $('#Condition.Code').focus();
        return false;
    }
    else
        return true;
}
function firstLetterCaps(val, id) {
    debugger;

    stringval = val.value;
    if (val.value == "") {
        $("#" + id + "").html("This field is required");
    }
    else {
        val.value = val.value.toLowerCase();
        val.value = val.value.
            replace(/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
            replace(/[ ]{2,}/gi, "").       // replaces multiple spaces with one space 
            replace(/\n +/, "\n");
        val.value = val.value.substr(0, 1).toUpperCase() + val.value.substr(1).toLowerCase();
        $("#" + id + "").html("");
        return val.value;
    }
}

function process(input) {
    debugger;
    let value = input.value;
    let numbers = value.replace(/[^0-9]/g, "");
    input.value = numbers;
}


