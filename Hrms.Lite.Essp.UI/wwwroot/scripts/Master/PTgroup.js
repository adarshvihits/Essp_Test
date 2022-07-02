var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/PTGroup/GetPTGroupList";
    $('#tabsDropdownPTGroup').val(currentTab);
    $('#PtgroupList').load(url, { TabIndex: TabIndex }, function () { });
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
    var url = "/Master/PTGroup/GetPTGroupList";
    $('#PtgroupList').load(url, { TabIndex: currentTab }, function () { });

}




function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#PTGroupList_" + index + "__EditActive").val() == 'True') {
            swal.fire("APPROVAL PENDING");


        }
        else {
            var url = "/Master/PTGroup/Edit?PtGroupGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/PTGroup/Create";;
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
       
    }


}



function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#PTGroupList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/PTGroup/Delete?PtGroupGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
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
                url: '/Master/PTGroup/Delete',
                dataType: 'json',
                data: $('#PTGroupDelete').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Delete');
                            var url = "/Master/PTGroup/GetPTGroupList?TabIndex=" + 'ACTIVE';
                            $('#PtgroupList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#PtgroupList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/PTGroup/Delete?PtGroupGI=" + GI + "&LogGI=" + LogGI;
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




function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#PTGroupList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/PTGroup/Approve?PtGroupGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/PTGroup/Approve',
                dataType: 'json',
                data: $('#ApprovePTGroup').serialize(),
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/PTGroup/GetPTGroupList?TabIndex=" + 'APPROVAL_PENDING';
                            debugger
                         
                            $('#PtgroupList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#PtgroupList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/PTGroup/Approve?PtGroupGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/PTGroup/Reject',
                dataType: 'json',
                data: $('#ApprovePTGroup').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/PTGroup/GetPTGroupList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#PtgroupList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#PtgroupList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/PTGroup/Approve?PtGroupGI=" + GI + "&LogGI=" + LogGI;
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


function PTGroupSave() {
   
    debugger;
   
    if (validatePTGroup()) {

       

        $.ajax({

            type: 'POST',
            url: '/Master/PTGroup/Save',
            dataType: 'json',
          
            data: $('#ptgroupsave').serialize(),
            success: function (result) {
              
                if (result.success == true) {
                   
                    
                    swal.fire(result.message).then(function () {
                        
                        CloseSlider('AddNewDiv');
                       
                       
                        var url = "/Master/PTGroup/GetPTGroupList?TabIndex=" + currentTab;
                        
                        $('#PtgroupList').load(url, function () {
                           
                            
                        });



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
        var pendingTableLength = document.getElementById("PendingPTGroupList").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/PTGroup/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("PTGroupList").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/PTGroup/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("PTGroupList").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/PTGroup/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}



function validatePTGroup() {

    if (!validateById('#Name', 'PTGName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'PTGShortName')) {
        return false;
    }
    else if (!validateById('#Duration_Code', 'PTGDuration')) {
        return false;
    }

    else {
        return true;
    }
}
