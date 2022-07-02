var prevTab = 'tab1';
var currentTab = 'ACTIVE';
function onAddNewClick() {
    debugger;
    var url = "/Master/TrainingMaster/Create";
    $('#training-master-create').load(url, {}, function () { });
    $('#training-master-create').removeClass('hide');
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

function ontabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");    
    var url = "/Master/TrainingMaster/GetTrainingMasterList";
    $('#tabsDropdownTraining').val(currentTab);
    $('#trainingMasterList').load(url, { TabIndex: TabIndex }, function () { });
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
    var url = "/Master/TrainingMaster/GetTrainingMasterList";
    $('#trainingMasterList').load(url, { TabIndex: currentTab }, function () { });

}

function onEditClick(GI) {
    debugger;
    $('body').append('<div class="form-overlay"></div>');
    var url = "/Master/TrainingMaster/Edit";
    $('#editTraining').load(url, { GI: GI}, function () { });
}
function onDeleteClick(GI) {
    debugger;
    var url = "/Master/TrainingMaster/Delete";

    $('#editTraining').load(url, { GI: GI }, function () { });
}
function Delete(GI) {

    var url = "/Master/TrainingMaster/DeleteTraining" + "?GI=" + GI;
    $.getJSON(url, function (result) {
        swal.fire(result.message).then(function () {
            CloseSlider('deleteTraining');
            if (result.success) {
                var url = "/Master/TrainingMaster/Index";
                window.location.href = url;
            }
        })
    })
    //window.location.href = url + "?GI=" + GI;
}
function onApproveClick(GI, LogGI, Mode) {
    debugger;
    $('body').append('<div class="form-overlay"></div>');
    var url = "/Master/TrainingMaster/Approve"; 
    //url = url + "?GI=" + GI + "&LogGI=" + LogGI +"&Mode=" + Mode;
    //window.location.href = url;
    $('#approveTraining').load(url, { GI: GI, LogGI: LogGI, Mode: Mode }, function () { });
}


function trainingSave() {
    if (validateAll()) {

        $.ajax({

            type: 'POST',
            url: '/Master/TrainingMaster/Save',
            dataType: 'json',
            data: $('#training-master-save').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('training-create-slider');
                        var url = "/Master/TrainingMaster/Index";
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
    else {
        return false;
    }
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
                url: '/Master/TrainingMaster/ApproveTraining',
                dataType: 'json',
                data: $('#ApproveOrRejectTraining').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('training-approve-slider');
                            var url = "/Master/TrainingMaster/GetTrainingMasterList";
                            $('#trainingMasterList').load(url, { TabIndex: currentTab }, function () { });
                        
                            //window.location.href = url;
                        });

                    }
                    else if (result.message == "MAKER_CHECKER") {
                        swal.fire("Maker and checker should be different.").then(function () {
                            //var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;
                            //$('#ApproveSlider').load(url, function () { });
                            //$('body').append('<div class="form-overlay"></div>');

                        });
                    }
                    else {
                        swal.fire("Something went wrong.").then(function () {
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
                url: '/Master/TrainingMaster/Reject',
                dataType: 'json',
                data: $('#ApproveOrRejectTraining').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        //window.location.href = url;
                        swal.fire(result.message).then(function () {
                            CloseSlider('training-approve-slider')
                            var url = "/Master/TrainingMaster/GetTrainingMasterList";
                            $('#trainingMasterList').load(url, { TabIndex: currentTab }, function () { });
                            //window.location.href = url;
                        });

                    }
                    else if (result.message == "MAKER_CHECKER") {
                        swal.fire("Maker and checker should be different.").then(function () {
                            //var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;
                            //$('#ApproveSlider').load(url, function () { });
                            //$('body').append('<div class="form-overlay"></div>');

                        });
                    }
                    else {
                        swal.fire(result.message).then(function () {

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


function validateAll()
{
    if (!validateById('#Name','TName')) {
        return false;
    }
    else if (!validateById('#ShortName','TShortName')) {
        return false;
    }
    else if (!validateById('#TrainingType_Code','TType')) {
        return false;
    }
    else if (!validateById('#AssesmentMode_Code','TMode')) {
        return false;
    }
    else {
        return true;
    }
}

function onExportToExcelClick() {
    debugger;   

    if (currentTab != "APPROVAL_PENDING") {

        var trainingMasterTableLength = document.getElementById("trainingMasterTable").rows.length - 1;
        if (trainingMasterTableLength > 0) {
            url = "/Master/TrainingMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var trainingMasterPendingTableLength = document.getElementById("trainingMasterPendingTable").rows.length - 1;
        if (trainingMasterPendingTableLength > 0) {
            url = "/Master/TrainingMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}