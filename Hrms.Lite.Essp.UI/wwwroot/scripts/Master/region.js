var currentTab;
var currentTab = 'ACTIVE';
var prevTab = 'ActiveTab';


function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Region/GetRegionList";
    $('#tabsDropdownRegion').val(currentTab);
    $('#ActiveList').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}


function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#RegionList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/Region/Edit?RegionGI=" + GI + "&LogGI=" + LogGI;

            $('#newRequestSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/Region/Create";
        $('#newRequestSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}

function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#RegionList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Region/Delete?RegionGI=" + GI + "&LogGI=" + LogGI;
        $('#deleteRegSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
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
                url: '/Master/Region/Delete',
                dataType: 'json',
                data: $('#deleteRegionmaster').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('deleteRegion');
                            var url = "/Master/Region/GetRegionList?TabIndex=" + 'ACTIVE';
                            $('#ActiveList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#ActiveList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Region/Delete?RegionGI=" + GI + "&LogGI=" + LogGI;
                            $('#deleteRegion').load(url, function () { });
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


function SaveRegion() {
    debugger;
    var TabIndex;
    if (validateRegion()) {
        $.ajax({

            type: 'POST',
            url: '/Master/Region/Save',
            dataType: 'json',
            data: $('#regionSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('regionSaveclose');
                        var url = "/Master/Region/GetRegionList?TabIndex=" + currentTab;
                        $('#ActiveList').load(url, function () { });

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

    if ($("#RegionList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        debugger;
        var url = "/Master/Region/Approve?RegionGI=" + GI + "&LogGI=" + LogGI;
        $('#approveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}





function ConfirmRegionApprove(GI, LogGI) {
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
                url: '/Master/Region/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/Region/GetRegionList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#ActiveList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $(".InctiveTab").removeClass("active");
                            $("#ActiveList").removeClass("hide");
                        });

                    }
                    else {
                        debugger;
                        if (result.message == "MAKER_CHECKER") {
                            swal.fire("Maker and checker cannot be same.")
                        }
                        else {
                            swal.fire(result.message).then(function () {


                            });
                        }
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    debugger;
                    toastr.error(xhr.responseText);
                }
            });
        }
        else {
            return false;
        }
    })

}



function ConfirmRegionReject(GI, LogGI) {
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
                url: '/Master/Region/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/Region/GetRegionList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#ActiveList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $(".InctiveTab").removeClass("active");
                            $("#ActiveList").removeClass("hide");
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
    })

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
    var url = "/Master/Region/GetRegionList";
    $('#ActiveList').load(url, { TabIndex: currentTab }, function () { });

}
function CloseSlider(id) {
    debugger;
    $("." + id).removeClass('slider-forms-open');
    $(".form-overlay").remove();
}


function onExportToExcelClick() {
    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("Pendingtable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Region/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else {
        var activeTableLength = document.getElementById("RegionTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Region/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
  
}



function validateRegion() {

    if (!validateById('#Name', 'RegionName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'RegionShortName')) {
        return false;
    }

    else {
        return true;
    }
}
