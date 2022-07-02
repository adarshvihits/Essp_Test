var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';


function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Allowance/GetAllowanceList";
    $('#tabsDropdownAllowance').val(currentTab);
    $('#AllowanceList').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/Allowance/GetAllowanceList";
    $('#AllowanceList').load(url, { TabIndex: currentTab }, function () { });

}




function onAddNewOrEditClick(Type, GI, LogGI,index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {
    
        if ($("#AllowanceList_" + index + "__EditActive").val() =='True')
            swal.fire("APPROVAL PENDING");
             

        else
        {
            var url = "/Master/Allowance/Edit?AllowanceGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }
       
    }

    else {
        var url = "/Master/Allowance/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
  

}




function onAllowanceSaveClick() {
    debugger;
    var TabIndex;
    if (validateAllowance()) {

        console.log($('#AllowanceSave').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/Allowance/Save',
            dataType: 'json',
            data: $('#AllowanceSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/Allowance/GetAllowanceList?TabIndex=" + currentTab;
                        $('#AllowanceList').load(url, function () { });

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







function onApproveClick(GI, LogGI,Type, index)
{

    debugger;
    if ($("#AllowanceList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");
      
    else
    {
        var url = "/Master/Allowance/Approve?AllowanceGI=" + GI + "&LogGI=" + LogGI;

        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}



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
                url: '/Master/Allowance/Approve',
                dataType: 'json',
                data: $('#approveAllowance').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');

                            var url = "/Master/Allowance/GetAllowanceList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#AllowanceList').load(url, function () { });

                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            debugger;
                            var url = "/Master/Allowance/Approve?AllowanceGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Allowance/Reject',
                dataType: 'json',
                data: $('#approveAllowance').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Allowance/GetAllowanceList?TabIndex=" + 'APPROVAL_PENDING';
                            window.location.href = url;
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Allowance/Approve?AllowanceGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Allowance/Delete',
                dataType: 'json',
                data: $('#deleteAllowance').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/Allowance/GetAllowanceList?TabIndex=" + 'ACTIVE';
                            $('#AllowanceList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#AllowanceList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Allowance/Delete?AllowanceGI=" + GI + "&LogGI=" + LogGI;
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







function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#AllowanceList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Allowance/Delete?AllowanceGI=" + GI + "&LogGI=" + LogGI;

        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}



function ExportToExcel() {
    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingAllowanceTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Allowance/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("AllowanceTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Allowance/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("AllowanceTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Allowance/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }

    }
}

//function validateAllowance() {
//    debugger;
//    if ($('.AName').val() == '') {

//        $('#Name').addClass('is-invalid');
//        $("#AllowanceName").addClass('error-message');
//        $('#AllowanceName').html("This field is required");
//        $('#Name').focus();
//        return false;
//    }

//    else if ($('.AShtName').val() == '') {

//        $('#ShortName').addClass('is-invalid');
//        $("#AllowanceShort").addClass('error-message');
//        $('#AllowanceShort').html("This field is required");
//        $('#ShortName').focus();
//        return false;
//    }
   
//    else
//        return true;
//}



function validateAllowance() {
    if (!validateById('#Name', 'AllowanceName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'AllowanceShort')) {
        return false;
    }

    else {
        return true;
    }
}
