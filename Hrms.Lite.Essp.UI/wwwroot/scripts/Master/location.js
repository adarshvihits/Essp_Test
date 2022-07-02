var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Location/GetLocationList";

    $('#LocationList').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}



function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#LocationList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/Location/Approve?LocationGI=" + GI + "&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}


function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#LocationList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/Location/Edit?LocationGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/Location/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}




function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#LocationList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/Location/Delete?LocationGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}



function onCountryChange(sender, id) {

    debugger
    var cid = $(sender).val();
    if (cid == "") {
        $("#" + id + "").html("This field is required");
    }
    else {
        $("#" + id + "").html("");
    }
    $.getJSON("/Master/Location/GetState", { id: cid }, function (data) {

        $('#State_Code option').remove();
        $('#State_Code').append('<option value="0">--Select--</option');

        for (var i = 0; i < data.length; i++) {
            $('#State_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
    //Make Dtsrict Dropdwn Empty when no Country is Selected
    //if (cid == 0) {
    $.getJSON("/Master/Location/GetDistrict", { id: 0 }, function (data) {

        $('#District_Code option').remove();
        $('#District_Code').append('<option value="0">--Select--</option');

        for (var i = 0; i < data.length; i++) {
            $('#District_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }
    });
    //}
}

function onStateChange(sender, id) {

    debugger;
    var cid = $(sender).val();
    if (cid == "" || cid == 0) {
        $("#" + id + "").html("This field is required");
    }
    else {
        $("#" + id + "").html("");
    }
    $.getJSON("/Master/Location/GetDistrict", { id: cid }, function (data) {

        $('#District_Code option').remove();
        $('#District_Code').append('<option value="0">--Select--</option');

        for (var i = 0; i < data.length; i++) {
            $('#District_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
}
function onDistrictChange(sender, id) {
    debugger;
    var cid = $(sender).val();
    if (cid == "" || cid == 0) {
        $("#" + id + "").html("This field is required");
    }
    else {
        $("#" + id + "").html("");
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
                url: '/Master/Location/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Location/GetLocationList?TabIndex=" + 'APPROVAL_PENDING';
                            debugger
                          
                            $('#LocationList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#LocationList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Location/Approve?LocationGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Location/Delete',
                dataType: 'json',
                data: $('#locationDelete').serialize(),
                success: function (result) {
                    debugger
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('Delete');
                            var url = "/Master/Location/GetLocationList?TabIndex=" + 'ACTIVE';
                            $('#LocationList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#LocationList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Location/Delete?LocationGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/Location/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/Location/GetLocationList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#LocationList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#LocationList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/Location/Approve?LocationGI=" + GI + "&LogGI=" + LogGI;
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




function SaveLocation() {
    debugger;
    if (validateLocation()) {

        $.ajax({

            type: 'POST',
            url: '/Master/Location/Save',
            dataType: 'json',
            data: $('#locationSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/Location/GetLocationList?TabIndex=" + currentTab;
                        $('#LocationList').load(url, function () { });


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
        var pendingTableLength = document.getElementById("PendingLocationTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Location/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("LocationTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Location/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("LocationTable").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/Location/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}

//function validateLocation() {
//    debugger;
//    if ($('.LName').val() == '') {
//        $('#LocationName').html("This field is required");
//        $('#Name').focus();
//        return false;
//    }
//    else if ($('.LShtName').val() == '') {
//        $('#locShortName').html("This field is required");
//        $('#ShortName').focus();
//        return false;
//    }
//    else if ($('.LDoorNum').val() == '') {
//        $('#LocDoorNumBuilding').html("This field is required");
//        $('#BoorNumAndBuilding').focus();
//        return false;
//    }
//    else if ($('.LStreet').val() == '') {
//        $('#LocStreet').html("This field is required");
//        $('#Street').focus();
//        return false;
//    }
//    else if ($('.LArea').val() == '') {
//        $('#LocArea').html("This field is required");
//        $('#Area').focus();
//        return false;
//    }
//    else if ($('.LocType').val() == '') {
//        $('#LocationType').html("This field is required");
//        $('#LocationType_Code').focus();
//        return false;
//    }
//    else if ($('.LReagion').val() == '') {
//        $('#LocRegion').html("This field is required");
//        $('#Region_Code').focus();
//        return false;
//    }
//    else if ($('.LDoorNum').val() == '') {
//        $('#LocDoorNumBuilding').html("This field is required");
//        $('#BoorNumAndBuilding').focus();
//        return false;
//    }
//    else if ($('.LCountry').val() == '') {
//        $('#LocCountry').html("This field is required");
//        $('#Country_Code').focus();
//        return false;
//    }
//    else if ($('.LState').val() == '') {
//        $('#LocState').html("This field is required");
//        $('#State_Code').focus();
//        return false;
//    }
//    else if ($('.LDistrict').val() == '') {
//        $('#LocDistrict').html("This field is required");
//        $('#District_Code').focus();
//        return false;
//    }
//    else if ($('.LanNumber').val() == '') {
//        $('#LocLanNum').html("This field is required");
//        $('#LanLineNum').focus();
//        return false;
//    }
//    else if ($('.LocMailId').val() == '') {
//        $('#MailId').html("This field is required");
//        $('#EmailId').focus();
//        return false;
//    }
//    else if ($('.Webaddress').val() == '') {
//        $('#LocWebAddress').html("This field is required");
//        $('#WebAdderss').focus();
//        return false;
//    }
//    else if ($('.Lattitude').val() == '') {
//        $('#LocLattitude').html("This field is required");
//        $('#Latitude').focus();
//        return false;
//    }
//    else if ($('.Longitude').val() == '') {
//        $('#LocLongitude').html("This field is required");
//        $('#Longitude').focus();
//        return false;
//    }
//    else if ($('.GeoAddress').val() == '') {
//        $('#LocGeoAddress').html("This field is required");
//        $('#GeoAdderss').focus();
//        return false;
//    }
//    else if ($('.LPTGroup').val() == '') {
//        $('#PTGroup').html("This field is required");
//        $('#PTgroup_Code').focus();
//        return false;
//    }
//    else if ($('.ESIGroup').val() == '') {
//        $('#ESIGroup').html("This field is required");
//        $('#ESIGroup_Code').focus();
//        return false;
//    }
    
//    else
//        return true;
//}




function validateLocation() {
    if (!validateById('#Name', 'LocationName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'locShortName')) {
        return false;
    }
    else if (!validateById('#BoorNumAndBuilding', 'LocDoorNumBuilding')) {
        return false;
    }
    else if (!validateById('#Street', 'LocStreet')) {
        return false;
    }
    else if (!validateById('#Area', 'LocArea')) {
        return false;
    }
    else if (!validateById('#LocationType_Code', 'LocationType')) {
        return false;
    }
    else if (!validateById('#Region_Code', 'LocRegion')) {
        return false;
    }
    else if (!validateById('#BoorNumAndBuilding', 'LocDoorNumBuilding')) {
        return false;
    }
    else if (!validateById('#Country_Code', 'LocCountry')) {
        return false;
    }

    else if (!validateById('#State_Code', 'LocState')) {
        return false;
    }
    else if (!validateById('#District_Code', 'LocDistrict')) {
        return false;
    }
    else if (!validateById('#LanLineNum', 'LocLanNum')) {
        return false;
    }
    else if (!validateById('#EmailId', 'MailId')) {
        return false;
    }
    else if (!validateById('#WebAdderss', 'LocWebAddress')) {
        return false;
    }
    else if (!validateById('#Latitude', 'LocLattitude')) {
        return false;
    }
    else if (!validateById('#Longitude', 'LocLongitude')) {
        return false;
    }
    else if (!validateById('#GeoAdderss', 'LocGeoAddress')) {
        return false;
    }
    else if (!validateById('#PTgroup_Code', 'PTGroup')) {
        return false;
    }
    else if (!validateById('#ESIGroup_Code', 'ESIGroup')) {
        return false;
    }
    else {
        return true;
    }
}
