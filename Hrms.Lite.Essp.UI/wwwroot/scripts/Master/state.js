
var currentTab='ACTIVE';
var prevTab = 'ActiveTab';
//function validateState() {
//    debugger;
  

//    if ($('.sName').val() == '') {

//        $('#Name').addClass('is-invalid');
//        $("#StateName").addClass('error-message');
//        $('#StateName').html("This field is required");
//        $('#Name').focus();
//        return false;
//    }

//    else if ($('.sShtName').val() == '') {

//        $('#ShortName').addClass('is-invalid');
//        $("#StateShortName").addClass('error-message');
//        $('#StateShortName').html("This field is required");
//        $('#ShortName').focus();
//        return false;
//    }


//    else if ($('.sCountry').val() == '') {

//        $('#Country_code').addClass('is-invalid');
//        $("#CountryName").addClass('error-message');
//        $('#CountryName').html("This field is required");
//        $('#Country_code').focus();
//        return false;
//    }

//    else
//        return true;
//}


function validateState() {
    if (!validateById('#Name', 'StateName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'StateShortName')) {
        return false;
    }
    else if (!validateById('#Country_Code', 'CountryName')) {
        return false;
    }

    else {
        return true;
    }
}






function onTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/State/GetStateList";
   $('#tabsDropdownState').val(currentTab);
  /*  window.location.href = url + "?TabIndex=" + TabIndex;*/
    $('#Statelist').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/State/GetStateList";
    $('#Statelist').load(url, { TabIndex: currentTab }, function () { });

}


//function onTabClick(Mode)
//{
//     currentTab=Mode;
//    debugger;
//    if (Mode == 'ACTIVE') {
//        var url = "/Master/State/GetStateList?TabIndex=" + Mode;
//        $('#Statelist').load(url, function () { });
//        $("#Statelist").show();
//        $(".PendingTabState").removeClass("active");
//        $(".ActiveTabState").addClass("active");
//        $("#pendingStatelist").addClass("hide");
//        $(".InActiveTab").removeClass("active");

//    }
//    else if (Mode == 'APPROVAL_PENDING') {
       
//        var url = "/Master/State/GetStateList?TabIndex=" + Mode;
       
//        $('#pendingStatelist').load(url, function () { });
//        $("#Statelist").hide();
//        $(".PendingTabState").addClass("active");
//        $(".ActiveTabState").removeClass("active");
//        $("#pendingStatelist").removeClass("hide");
//        $(".InActiveTab").removeClass("active");
//    }
//    else {

//        var url = "/Master/State/GetStateList?TabIndex=" + Mode;
//        $('#Statelist').load(url, function () { });
     
//        $("#pendingStatelist").addClass("hide");
//        $("#Statelist").show();
//        $(".PendingTabState").removeClass("active");
//        $(".ActiveTabState").removeClass("active");
//        $(".InActiveTab").addClass("active");
//    }

//}


function onAddNewOrEditClick(Type, GI, LogGI)
{
    debugger;

    if (Type == 'MODIFY') {
        $.ajax({

            url: "/Master/State/ValidationChecks?StateGI=" + GI + "&LogGI=" + LogGI + "&Type=" + Type,
            dataType: 'json',
            success: function (result) {
                debugger

                if (result.success) {

                    var url = "/Master/State/Edit?StateGI=" + GI + "&LogGI=" + LogGI;

                    $('#CreateOrEditSlider').load(url, function () { });
                    $('body').append('<div class="form-overlay"></div>');
                }
                else {
                    debugger
                    swal.fire(result.message).then(function () {

                        var url = "/Master/State/GetStateList?TabIndex=" + currentTab;
                        $('#Statelist').load(url, function () { });

                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
    else
    {
        var url = "/Master/State/Create";
        $('#CreateOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');

    }
    
   

}

function onDeleteClick(GI, LogGI,Type) {



    $.ajax({

        url: "/Master/State/ValidationChecks",
        data: { StateGI: GI, LogGI: LogGI, Type: Type },
        success: function (result) {
            debugger

            if (result.success) {

                var url = "/Master/State/Delete?StateGI=" + GI + "&LogGI=" + LogGI;

                $('#deleteSlider').load(url, function () { });
                $('body').append('<div class="form-overlay"></div>');
            }
            else {
                debugger
                swal.fire(result.message).then(function () {

                    var url = "/Master/State/GetStateList?TabIndex=" + currentTab;
                    $('#Statelist').load(url, function () { });

                });
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            toastr.error(xhr.responseText);
        }
    });


}


function onApproveClick(GI, LogGI,Type) {
    debugger;



    $.ajax({

        url: "/Master/State/ValidationChecks",
        data: { StateGI: GI, LogGI: LogGI, Type: Type },
        success: function (result) {
            debugger

            if (result.success) {

                var url = "/Master/State/Approve?StateGI=" + GI + "&LogGI=" + LogGI;

                $('#ApproveSlider').load(url, function () { });
                $('body').append('<div class="form-overlay"></div>');
            }
            else {
                debugger
                swal.fire(result.message).then(function () {

                    var url = "/Master/State/GetStateList?TabIndex=" + currentTab;
                    $('#Statelist').load(url, function () { });

                });
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            toastr.error(xhr.responseText);
        }
    });



}







function confirmApproval(GI, LogGI) {
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
                url: '/Master/State/Approve',
                dataType: 'json',
                data: $('#ApproveState').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingapproveDiv');
                            var url = "/Master/State/GetStateList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#Statelist').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#Statelist").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/State/Approve?StateGI=" + GI + "&LogGI=" + LogGI;
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






//function confirmApproval(GI,LogGI) {

//    if (confirm("Do you want to Approve?")) {
//        debugger;

//        $.ajax({
           
//            type: 'POST',
//            url: '/Master/State/Approve',
//            dataType: 'json',
//            data: $('#ApproveState').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('PendingapproveDiv');
//                        var url = "/Master/State/GetStateList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#Statelist').load(url, function () { });
//                        $(".PendingTab").addClass("active");
//                        $(".ActiveTab").removeClass("active");
//                        $("#Statelist").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/State/Approve?StateGI=" + GI + "&LogGI=" + LogGI;
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


function confirmRejection(GI, LogGI) {
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
                url: '/Master/State/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingapproveDiv');
                            var url = "/Master/State/GetStateList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#Statelist').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#Statelist").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/State/Approve?StateGI=" + GI + "&LogGI=" + LogGI;
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








function ExportToExcel() {
    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingStateTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/State/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("StateTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/State/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("StateTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/State/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}

function confirmDelete(GI, LogGI) {

    if (confirm("Do you want to Delete?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/State/Delete',
            dataType: 'json',
            data: $('#Statedelete').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('deleteDiv');
                        var url = "/Master/State/GetStateList?TabIndex=" + 'ACTIVE';
                        $('#Statelist').load(url, function () { });
                        $(".ActiveTab").addClass("active");
                        $(".PendingTab").removeClass("active");
                        $("#Statelist").removeClass("hide");
                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = "/Master/State/Delete?StateGI=" + GI + "&LogGI=" + LogGI;
                        $('#deleteSlider').load(url, function () { });
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
}




function StateSaveClick() {
    debugger;
    if (validateState()) {

        console.log($('#StateSave').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/State/Save',
            dataType: 'json',
            data: $('#StateSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewStateDiv');
                      
                        var url = "/Master/State/GetStateList?TabIndex=" + currentTab;
                        $('#Statelist').load(url, function () { });
                        
                    });

                }

                else {
                    swal.fire(result.message).then(function () {

                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                /*    console.log(xhr.responseText);*/
                toastr.error(xhr.responseText);
            }
        });
    }
    else {
        return false;
    }
}


