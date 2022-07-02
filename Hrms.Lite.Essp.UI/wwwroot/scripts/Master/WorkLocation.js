var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';


function OnTabClick(Tab, TabIndex) {
    debugger;
    $.ajaxSetup({
        async: false
    });
 /*   currentTab = TabIndex;*/
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/WorkLocation/GetWorkLocationList";
    $('#WorkLocationList').load(url, { TabIndex: TabIndex }, function () { });
    currentTab = TabIndex;
    $('#tabsDropdownWorkLocation').val(currentTab);
   
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
    var url = "/Master/WorkLocation/GetWorkLocationList";
    $('#WorkLocationList').load(url, { TabIndex: currentTab }, function () { });

}


function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#WorkLocationList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/WorkLocation/Edit?WorkLocationGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/WorkLocation/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}


//function onAddNewOrEditClick(Type, GI, LogGI, index) {
//    debugger;
    
//    if (Action == 'MODIFY') {
//        var url = "/Master/WorkLocation/Edit?WorkLocationGI=" + GI + "&LogGI=" + LogGI;
//    }
//    else {
//        var url = "/Master/WorkLocation/Create";
//    }
//    $('#AddNewOrEditSlider').load(url, function () { });    
//    $('body').append('<div class="form-overlay"></div>');

//}
//function Approve(GI, LogGI) {
//    debugger;
//    var url = "/Master/WorkLocation/Approve?WorkLocationGI=" + GI + "&&LogGI=" + LogGI;
//    $("#ApproveSlider").load(url, function () { });
//    $('body').append('<div class="form-overlay"></div>');
  
  

//}
function onApproveClick(GI, LogGI, Type, index) {

    debugger;
    if ($("#WorkLocationList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {
        var url = "/Master/WorkLocation/Approve?WorkLocationGI=" + GI + "&LogGI=" + LogGI;

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
                url: '/Master/WorkLocation/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/WorkLocation/GetWorkLocationList?TabIndex=" + 'APPROVAL_PENDING';


                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            debugger;
                            //var url = "/Master/WorkLocation/Approve?WorkLocationGI=" + GI + "&LogGI=" + LogGI;
                            //$('#ApproveSlider').load(url, function () { });
                            //$('body').append('<div class="form-overlay"></div>');
                            CloseSlider('ApproveDiv');


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
                url: '/Master/WorkLocation/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/WorkLocation/GetWorkLocationList?TabIndex=" + 'APPROVAL_PENDING';

                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/WorkLocation/Approve?WorkLocationGI=" + GI + "&LogGI=" + LogGI;
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

//function Delete(GI, LogGI) {

//    debugger;

//    var url = "/Master/WorkLocation/Delete?WorkLocationGI=" + GI + "&LogGI=" + LogGI;
//    $("#DeleteSlider").load(url, function () { });
//    $('body').append('<div class="form-overlay"></div>');
    
//}

function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#WorkLocationList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/WorkLocation/Delete?WorkLocationGI=" + GI + "&LogGI=" + LogGI;

        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
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
                url: '/Master/WorkLocation/Delete',
                dataType: 'json',
                data: $('#deleteWorkLocation').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/WorkLocation/GetWorkLocationList?TabIndex=" + 'ACTIVE';
                            $('#WorkLocationList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#WorkLocationList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/WorkLocation/Delete?WorkLocationGI=" + GI + "&LogGI=" + LogGI;
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






function WorkLocationSave() {
    debugger;
    if (validateWorkLocation()) {

        console.log($('#worklocationId').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/WorkLocation/Save',
            dataType: 'json',
            data: $('#worklocationId').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/WorkLocation/Index";

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
        var pendingTableLength = document.getElementById("PendingWorkLocation").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/WorkLocation/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else {
        var activeTableLength = document.getElementById("WorkLocationTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/WorkLocation/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    //else if (currentTab == 'INACTIVE') {
    //    var inActiveTableLength = document.getElementById("WorkLocationTable").rows.length - 1;
    //    if (inActiveTableLength > 0) {
    //        url = "/Master/WorkLocation/ExportToExcel?TabIndex=" + currentTab;
    //        window.location.href = url;
    //    }
    //    else {
    //        swal.fire("No data found to export");
    //    }

    //}

}



    //function validateWorkLocation()
    //{
    //        debugger;
    //    if ($('.WLName').val() == '')
    //    {

    //        $('#Name').addClass('is-invalid');
    //        $("#WLName").addClass('error-message');
    //        $('#WLName').html("This field is required");
    //            $('#Name').focus();
    //            return false;
    //    }
       
    //    else if ($('.WLShtName').val() == '')
    //    {

    //        $('#ShortName').addClass('is-invalid');
    //        $("#WLShortName").addClass('error-message');
    //        $('#WLShortName').html("This field is required");
    //        $('#ShortName').focus();
    //            return false;
    //    }
        
    //        else
    //            return true;
    //    }




function validateWorkLocation() {
    if (!validateById('#Name', 'WLName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'WLShortName')) {
        return false;
    }

    else {
        return true;
    }
}
