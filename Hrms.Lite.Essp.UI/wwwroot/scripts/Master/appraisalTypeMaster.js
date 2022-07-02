var prevTab = 'tab1';
var currentTab = 'ACTIVE';
function tabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/AppraisalTypeMaster/GetAppraisalTypeMasterList";
    $('#appraisalTypeList').load(url, { TabIndex: TabIndex }, function () { });
    prevTab = Tab;
}

function firstLetterCaps(val, id) {

    debugger;
    stringval = val.value;
    if (val.value == "") {
        $(val).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(val).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
        val.value = val.value.toLowerCase();
        val.value = val.value.
            replace(/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
            replace(/[ ]{2,}/gi, "").       // replaces multiple spaces with one space 
            replace(/\n +/, "\n");
        val.value = val.value.substr(0, 1).toUpperCase() + val.value.substr(1);
        return val.value;
    }
}

function onAddNewClick() {
    debugger;
    var url = "/Master/AppraisalTypeMaster/Create";
    $('#appraisalTypeCreate').load(url, {}, function () { });
    $('#appraisalTypeCreate').removeClass('hide');
}
function onEditClick(AppraisalTypeGI) {
    debugger
    $('body').append('<div class="form-overlay"></div>');
    var url = "/Master/AppraisalTypeMaster/Edit";
    $('#appraisalTypeCreate').load(url, { AppraisalTypeGI: AppraisalTypeGI}, function () { });
    $('#appraisalTypeCreate').removeClass('hide');
}
function onApproveClick(GI, LogGI, Mode) {
    debugger;
    $('body').append('<div class="form-overlay"></div>');
    var url = "/Master/AppraisalTypeMaster/Approve";
   // url = url + "?GI=" + GI + "&LogGI=" + LogGI +"&Mode=" + Mode;
    //window.location.href = url;
    $('#approveAppraisalMaster').load(url, { GI: GI, LogGI: LogGI, Mode: Mode }, function () { });
}

function OnDeleteClick(GI) {
    debugger
    var url = "/Master/AppraisalTypeMaster/DeleteGetDetails";
    $('#appraisalTypeCreate').load(url, { AppraisalTypeGI: GI }, function () { });
    $('#appraisalTypeCreate').removeClass('hide');
}
function Delete(GI) {
    debugger
    var url = "/Master/AppraisalTypeMaster/Delete" + "?AppraisalTypeGI=" + GI;
    //window.location.href = url + "?AppraisalTypeGI=" + GI;
    $.getJSON(url, function (result) {
        swal.fire(result.message).then(function () {
            CloseSlider('appraisalDelete');
            if (result.success) {
                var url = "/Master/AppraisalTypeMaster/Index";
                window.location.href = url;
            }
        })
    })
}


function confirmApprove() {

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
                url: '/Master/AppraisalTypeMaster/ApproveAppraisal',
                dataType: 'json',
                data: $('#appraisalApproveOrReject').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('appraisalTypeMasterApprove');
                            var url = "/Master/AppraisalTypeMaster/Index";
                            window.location.href = url;
                        });

                    }
                    else if (result.message == "MAKER_CHECKER") {
                        swal.fire("Maker and checker should be different.").then(function () {


                        });
                    }
                    else {
                        swal.fire("Something went wrong.").then(function () {


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


function confirmReject() {
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
                url: '/Master/AppraisalTypeMaster/Reject',
                dataType: 'json',
                data: $('#appraisalApproveOrReject').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('appraisalTypeMasterApprove');
                            var url = '/Master/AppraisalTypeMaster/Index';
                            window.location.href = url;
                        });


                    }
                    else if (result.message == "MAKER_CHECKER") {
                        swal.fire("Maker and checker should be different.").then(function () {


                        });
                    }
                    else {
                        debugger
                        swal.fire(result.message).then(function () {

                        });
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    debugger
                    swal.fire(xhr.responseText);
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

        var appraisaltypetableLength = document.getElementById("appraisaltypetable").rows.length - 1;
        if (appraisaltypetableLength > 0) {
            url = "/Master/AppraisalTypeMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var appraisalTypePendingTableLength = document.getElementById("appraisalTypePendingTable").rows.length - 1;
        if (appraisalTypePendingTableLength > 0) {
            url = "/Master/AppraisalTypeMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}

function appraisalSave() {
    if (validateAll()) {

        $.ajax({

            type: 'POST',
            url: '/Master/AppraisalTypeMaster/Save',
            dataType: 'json',
            data: $('#appraisal-save-slider').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('appraisalCreate');
                        var url = "/Master/AppraisalTypeMaster/Index";
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
                        //CloseSlider('appraisalCreate');
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
    else {
        return false;
    }
}


function validateAll() {
    if (!validateById('#Name', 'AName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'AShortName')) {
        return false;
    }  
    else if (!validateById('#AssesmentMode_Code', 'TMode')) {
        return false;
    }
    else {
        return true;
    }
}