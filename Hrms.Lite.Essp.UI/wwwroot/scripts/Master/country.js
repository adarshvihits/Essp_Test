var currentTab = 'ACTIVE';
var prevTab = 'ActiveTab';
function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Country/GetCountryList";
    $('#tabsDropdownCountry').val(currentTab);
    $('#countryMasterlist').load(url, { TabIndex: TabIndex }, function () { });

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
    var url = "/Master/Country/GetCountryList";
    $('#countryMasterlist').load(url, { TabIndex: currentTab }, function () { });

}




//function onAddOrEditClick(Type, LogGI, GI) {
//    debugger

//    currentTab = 'ACTIVE';
//    if (Type == 'MODIFY') {
//        $.ajax({

//            url: "/Master/Country/ValidationChecks?CountryGI=" + GI + "&LogGI=" + LogGI + "&Type=" + Type,
//            dataType: 'json',
//            success: function (result) {
//                debugger
              
//                if (result.success == true) {

//                    var url = "/Master/Country/Edit?CountryGI=" + GI + "&LogGI=" + LogGI;

//                    $('#AddNewCountrySlider').load(url, function () { });
//                    $('body').append('<div class="form-overlay"></div>');
//                }
//                else {
//                    debugger
//                    swal.fire(result.message).then(function () {

//                        var url = "/Master/Country/GetCountryList?TabIndex=" + currentTab;
//                        $('#countryMasterlist').load(url, function () { });
//                        $('body').remove('<div class="form-overlay"></div>');

//                    });
//                }

//            },
//            error: function (xhr, textStatus, errorThrown) {
//                toastr.error(xhr.responseText);
//            }
//        });
//    }
//    else {

//        var url = "/Master/Country/Create";

//        $('#AddNewCountrySlider').load(url, function () { });
//        $('body').append('<div class="form-overlay"></div>');

//    }
//}





function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#CountryList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/Country/Edit?CountryGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewCountrySlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/Country/Create";
        $('#AddNewCountrySlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}




function CountrySave() {
    debugger;
    var TabIndex;
    if (validateCountry()) {

        console.log($('#Country-save').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/Country/Save',
            dataType: 'json',
            data: $('#Country-save').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewDiv');
                        var url = "/Master/Country/GetCountryList?TabIndex=" + currentTab;
                        $('#countryMasterlist').load(url, function () { });

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



//function onDeleteClick(GI, LogGI, Type) {
//    debugger

//    $.ajax({

//        url: "/Master/Country/ValidationChecks",
//        data: { CountryGI: GI, LogGI: LogGI, Type: Type },
//        success: function (result) {
//            debugger

//            if (result.success == true) {

//                var url = "/Master/Country/Delete?CountryGI=" + GI + "&LogGI=" + LogGI;

//                $('#DeleteSlider').load(url, function () { });
//                $('body').append('<div class="form-overlay"></div>');
//            }
//            else {
//                debugger
//                swal.fire(result.message).then(function () {

//                    var url = "/Master/Country/GetCountryList?TabIndex=" + currentTab;
//                    $('#countryMasterlist').load(url, function () { });

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

    if ($("#CountryList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Country/Delete?CountryGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}



//function onApproveClick(GI, LogGI,Type) {
//    debugger;
//    $.ajax({

//        url: "/Master/Country/ValidationChecks",
//        data: { CountryGI: GI, LogGI: LogGI, Type: Type },
//        success: function (result) {
//            debugger
         
//            if (result.success == true) {

//                var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;

//                $('#ApproveSlider').load(url, function () { });
//                $('body').append('<div class="form-overlay"></div>');
//            }
//            else {
//                debugger
//                swal.fire(result.message).then(function () {

//                    var url = "/Master/Country/GetCountryList?TabIndex=" + currentTab;
//                    $('#countryMasterlist').load(url, function () { });

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

    if ($("#CountryList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {
        var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;

        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}





//function validateCountry() {
//    debugger;
//    if ($('.cName').val() == '') {
//        $('#Name').addClass('is-invalid');
//        $("#CounName").addClass('error-message');
//        $('#CounName').html("This field is required");
//        $('#Name').focus();
//        return false;
//    }

//    else if ($('.cShtName').val() == '') {

//        $('#ShortName').addClass('is-invalid');
//        $("#CountryShortName").addClass('error-message');
//        $('#CountryShortName').html("This field is required");
//        $('#ShortName').focus();
//        return false;
//    }

//    else
//        return true;
//}



function validateCountry() {
    if (!validateById('#Name', 'CounName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'CountryShortName')) {
        return false;
    }
   
    else {
        return true;
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
                url: '/Master/Country/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/Country/GetCountryList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#countryMasterlist').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#countryMasterlist").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Country/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/Country/GetCountryList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#countryMasterlist').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#countryMasterlist").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;
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




function ExportToExcel()
{
    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingCountryTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Country/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("CountryTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Country/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE')
    {
        var inActiveTableLength = document.getElementById("CountryTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Country/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}


//function confirmDelete(GI, LogGI) {

//    if (confirm("Do you want to Delete?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/Country/Delete',
//            dataType: 'json',
//            data: $('#Countrydelete').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('delete');
//                        var url = "/Master/Country/GetCountryList?TabIndex=" + 'ACTIVE';
//                        $('#countryMasterlist').load(url, function () { });
//                        $(".PendingTab").addClass("active");
//                        $(".ActiveTab").removeClass("active");
//                        $("#countryMasterlist").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/Country/Delete?CountryGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Country/Delete',
                dataType: 'json',
                data: $('#Countrydelete').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/Country/GetCountryList?TabIndex=" + 'ACTIVE';
                            $('#countryMasterlist').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#countryMasterlist").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Country/Delete?CountryGI=" + GI + "&LogGI=" + LogGI;
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


