
var prevTab = 'ActiveTab';
var currentTab='ACTIVE';
var Type;

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/District/GetDistrictList";
    $('#tabsDropdownDistrict').val(currentTab);
    /*  window.location.href = url + "?TabIndex=" + TabIndex;*/
    $('#districtlist').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}

function tabClick(val)
{
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
    var url = "/Master/District/GetDistrictList";
    $('#districtlist').load(url, { TabIndex: currentTab }, function () { });

}




function onAddOrEditClick(Type,  LogGI,GI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#DistrictList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/District/Edit?LogGI=" + LogGI + "&DistrictGI=" + GI;

            $('#AddNewOrEditDistrictSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/District/Create";
        $('#AddNewOrEditDistrictSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}




function onDeleteClick(LogGI, GI,Type, index) {

    debugger;

    if ($("#DistrictList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/District/Delete?LogGI=" + LogGI + "&DistrictGI=" + GI;
        $('#DeleteDistrictSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}


function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#DistrictList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/District/Approve?LogGI=" + LogGI + "&DistrictGI=" + GI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}




function confirmApproveDistrict(GI, LogGI) {
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
                url: '/Master/District/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/District/GetDistrictList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#districtlist').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#districtlist").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/District/Approve?DistrictGI=" + GI + "&LogGI=" + LogGI;
                            $('#PendingApprove').load(url, function () { });
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







function confirmRejectDistrict(GI, LogGI) {
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
                url: '/Master/District/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/District/GetDistrictList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#districtlist').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".AtiveTab").removeClassaddClass("active");
                            $("#districtlist").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/District/Approve?DistrictGI=" + GI + "&LogGI=" + LogGI;
                            $('#PendingApprove').load(url, function () { });
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
                url: '/Master/District/Delete',
                dataType: 'json',
                data: $('#DistrictDelete').serialize(),
                success: function (result) {
                    debugger
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/District/GetDistrictList?TabIndex=" + 'ACTIVE';
                            $('#districtlist').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#districtlist").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/District/Delete?DistrictGI=" + GI + "&LogGI=" + LogGI;
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
        var pendingTableLength = document.getElementById("PendingDistrictTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/District/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("DistrictTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/District/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("DistrictTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/District/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}

//function validateDistrict() {    
//    debugger;

//    if ($('.dName').val() == '') {

//        $('#Name').addClass('is-invalid');
//        $("#districtName").addClass('error-message');
//        $('#districtName').html("This field is required");
//        $('#Name').focus();
//        return false;
//    }


//    else if ($('.dShortName').val() == '') {

//        $('#ShortName').addClass('is-invalid');
//        $("#districtshortName").addClass('error-message');
//        $('#districtshortName').html("This field is required");
//        $('#ShortName').focus();
//        return false;
//    }
//    else if ($('.Cname').val() == '') {

//        $('#Country_Code').addClass('is-invalid');
//        $("#CountryName").addClass('error-message');
//        $('#CountryName').html("This field is required");
//        $('#Country_Code').focus();
//        return false;
//    }
//    else if ($('.dStCode').val() == '') {

//        $('#State_Code').addClass('is-invalid');
//        $("#stateName").addClass('error-message');
//        $('#stateName').html("This field is required");
//        $('#State_Code').focus();
//        return false;
//    }

    

//    else
//        return true;
//}




function validateByClass(elementId, spanId) {
    debugger;
    if ($(elementId).val() == "") {
        $(elementId).addClass('is-invalid');
        $("#" + spanId + "").addClass('error-message');
        $("#" + spanId + "").html("This field is required");
        return false;
    }
    else {
        $(elementId).removeClass('is-invalid');
        $("#" + spanId + "").removeClass('error-message');
        $("#" + spanId + "").html("");
        //trim(val);        
        return true;
    }
}




function validateDistrict() {

    if (!validateById('#Name', 'districtName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'districtshortName')) {
        return false;
    }
    else if (!validateById('#Country_Code', 'CountryName')) {
        return false;
    }
    else if (!validateByClass('.dStCode', 'stateName')) {
        return false;
    }

    else {
        return true;
    }
}





function onCountryChange(sender, id) {

    debugger
    var cid = $(sender).val();
    if (cid == "") {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
   
      $.getJSON("/Master/District/GetState", { id: cid }, function (data) {

          $('.dStCode option').remove();
          $('.dStCode').append('<option value>--Select--</option');

        for (var i = 0; i < data.length; i++) {
            debugger
            $('.dStCode').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });

   
   
    
}

function DistrictSaveClick() {
    debugger;
     if (validateDistrict()) {
    console.log($("#State_Code").val());

       
        $.ajax({

            type: 'POST',
            url: '/Master/District/Save',
            dataType: 'json',
            data: $('#DistrictSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewDiv');
                        var url = "/Master/District/GetDistrictList?TabIndex=" + currentTab;
                        $('#districtlist').load(url, function () { });

                     
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

