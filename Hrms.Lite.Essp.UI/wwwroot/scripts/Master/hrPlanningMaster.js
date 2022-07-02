var prevTab = 'tab1';
var currentTab = 'ACTIVE';



function tabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");

    var url = "/Master/HrPlanningMaster/GetHrPlanningList";
    $('#activeList').load(url, { TabIndex: TabIndex }, function () { });
    prevTab = Tab;
}



function onAddNewClick() {
    debugger;
    var url = "/Master/HrPlanningMaster/Create";
    $('#hrPlanningCreate').load(url, {}, function () { });


}

//function OnEditClick(GI) {
//    $('body').append('<div class="form-overlay"></div>');
//    var url = "/Master/HrPlanningMaster/Edit";
//    $('#hrPlanningCreate').load(url, { GI: GI }, function () { });
//}

function OnEditClick(Type, GI, LogGI, index) {
    debugger;
   
    if ($("#HRPlanningMasterList_" + index + "__EditActive").val() == 'True') {
        swal.fire("APPROVAL PENDING");

    }
    else {
        var url = "/Master/HrPlanningMaster/Edit?GI=" + GI;

        $('#hrPlanningEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }
  
}



//function OnApproveClick(GI,LogGI,EntryType) {
//    var url = "/Master/HrPlanningMaster/ApproveOrReject";
//    $('body').append('<div class="form-overlay"></div>');
//    $('#approve').load(url, { GI : GI, LogGI: LogGI, EntryType: EntryType }, function () { });
//}



function OnApproveClick(GI, LogGI, EntryType, index) {

    debugger;

    if ($("#HRPlanningMasterList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {
        var url = "/Master/HrPlanningMaster/ApproveOrReject?GI=" + GI + "&LogGI=" + LogGI + "&EntryType=" + EntryType;
        $('#approve').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}



//function OnDeleteClick(GI) {
//    $('body').append('<div class="form-overlay"></div>');
//    var url = "/Master/HrPlanningMaster/DeleteHrPlanningDetails";
//    $('#EditOrDeleteHrPlanning').load(url, { GI: GI}, function () { });
//}




function OnDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#HRPlanningMasterList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/HrPlanningMaster/DeleteHrPlanningDetails?GI=" + GI;
        $('#EditOrDeleteHrPlanning').load(url, function () { });
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
                url: '/Master/HrPlanningMaster/Approve',
                dataType: 'json',
                data: $('#HrPlanningMasterApproveOrReject').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('hrPlanningApproveSlider');
                            var url = "/Master/HrPlanningMaster/GetHRPlanningList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#activeList').load(url, function () { });
                           
                        });

                    }
                    else {
                        swal.fire(result.message).then(function (){
                            //var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;
                            //$('#ApproveSlider').load(url, function () { });
                            //$('body').append('<div class="form-overlay"></div>');

                            var url = "/Master/HrPlanningMaster/Approve?GI=" + GI + "&LogGI=" + LogGI;
                            $('#hrPlanningApproveSlider').load(url, function () { });
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
                url: '/Master/HrPlanningMaster/Reject',
                dataType: 'json',
                data: $('#HrPlanningMasterApproveOrReject').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('hrPlanningApproveSlider');
                            var url = "/Master/HrPlanningMaster/GetHRPlanningList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#activeList').load(url, function () { });
                         
                        });

                    }
                    else  {
                        swal.fire.then(function () {


                            var url = "/Master/HrPlanningMaster/Approve?GI=" + GI + "&LogGI=" + LogGI;
                            $('#hrPlanningApproveSlider').load(url, function () { });
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








function onExportToExcelClick() {
    debugger;
    if (currentTab != "APPROVAL_PENDING") {

        var activeTableLength = document.getElementById("activeTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/HrPlanningMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }  
    else {
        var approvePendingTableLength = document.getElementById("approvePendingTable").rows.length - 1;
        if (approvePendingTableLength > 0) {
            url = "/Master/HrPlanningMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}





function DeleteHrPlanning(GI) {
    var url = "/Master/HrPlanningMaster/DeleteHrPlanning?GI=" + GI;
    window.location.href = url;
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
                url: '/Master/HrPlanningMaster/DeleteHrPlanning',
                dataType: 'json',
                data: { GI: GI },
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('hrPlanningMasterDeleteSlider');
                            var url = "/Master/HrPlanningMaster/GetHRPlanningList?TabIndex=" + 'ACTIVE';
                            debugger

                            $('#activeList').load(url, function () { });
                            $(".ActiveTab").addClass("active");
                            $(".PendingTab").removeClass("active");
                            $("#activeList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/HrPlanningMaster/DeleteHrPlanningDetails?GI=" + GI + "&LogGI=" + LogGI;
                            $('#hrPlanningMasterDeleteSlider').load(url, function () { });
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

function HrPlanningSave() {
   
    debugger;
    var TabIndex;
    if (validateHRPlanning()) {
        $.ajax({

            type: 'POST',
            url: '/Master/HrPlanningMaster/Save',
            dataType: 'json',
            data: $('#saveHrPlanning').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('hrPlanningCreateSlider');
                        debugger;
                        var url = "/Master/HrPlanningMaster/GetHRPlanningList?TabIndex=" + currentTab;
                        $('#activeList').load(url, function () { });

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


function HrPlanningEditSave() {
  
    debugger;
   
   /* if (validateHRPlanning(mode)) {*/
        $.ajax({

            type: 'POST',
            url: '/Master/HrPlanningMaster/Save',
            dataType: 'json',
            data: $('#HrEditSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('hrPlanningMasterEdit');
                        debugger;
                        var url = "/Master/HrPlanningMaster/GetHRPlanningList?TabIndex=" + currentTab;
                        $('#activeList').load(url, function () { });

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
//    else {
//        return false;
//    }
//}

function validateHRPlanning(mode) {
   
        if (!validateById('#Name', 'hrname') ) {
            return false;
        }
        else if (!validateById('#ShortName', 'hrshortname')) {
            return false;
        }
        else if (!validateById('#FromDate', 'hrFrom')) {
            return false;
        }
        else if (!validateById('#FromDate', 'hrTo')) {
            return false;
        }
        else if (!validateById('#Combination1_Code', 'combinationhr')) {
            return false;
        }
        else if (!validateById('#Combination2_Code', 'combination2hr')) {
            return false;
        }

        else {
            return true;
        }
    

}



