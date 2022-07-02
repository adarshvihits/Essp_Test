var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    debugger;
   
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/DisciplinaryMaster/GetDisciplinaryList";
  
    $('#ActiveList').load(url, { TabIndex: TabIndex }, function () { });
    currentTab = TabIndex;
    $('#tabsDropdown').val(currentTab);
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
    var url = "/Master/DisciplinaryMaster/GetDisciplinaryList";
    $('#ActiveList').load(url, { TabIndex: currentTab }, function () { });

}


//function onAddNewOrEditClick(Type, GI, LogGI) {
//    debugger;
//    var TabIndex;
//    if (Type == 'MODIFY') {
//        $.ajax({

//            url: "/Master/DisciplinaryMaster/ValidationChecks?IncidentsGI=" + GI + "&LogGI=" + LogGI + "&Type=" + Type,
//            dataType: 'json',
//            success: function (result) {
//                debugger

//                if (result.success) {

//                    var url = "/Master/DisciplinaryMaster/Edit?IncidentsGI=" + GI + "&LogGI=" + LogGI;

//                    $('#newRequestSlider').load(url, function () { });
//                    $('body').append('<div class="form-overlay"></div>');
//                }
//                else {
//                    debugger
//                    swal.fire(result.message).then(function () {

//                        var url = "/Master/DisciplinaryMaster/GetDisciplinaryList?TabIndex=" + currentTab;
//                        $('#ActiveList').load(url, function () { });

//                    });
//                }

//            },
//            error: function (xhr, textStatus, errorThrown) {
//                toastr.error(xhr.responseText);
//            }
//        });
//    }
   
//    else {
//        var url = "/Master/DisciplinaryMaster/Create";
//        $('#newRequestSlider').load(url, function () { });
//        $('body').append('<div class="form-overlay"></div>');
//    } 
//}



function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#DisciplinaryIncidentsList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/DisciplinaryMaster/Edit?IncidentsGI=" + GI + "&LogGI=" + LogGI;

            $('#newRequestSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/DisciplinaryMaster/Create";
        $('#newRequestSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}




//function onDeleteClick(GI, LogGI,Type) {
//    debugger;

//    $.ajax({

//        url: "/Master/DisciplinaryMaster/ValidationChecks",
//        data: { IncidentsGI: GI, LogGI: LogGI, Type: Type },
//        success: function (result) {
//            debugger

//            if (result.success) {

//                var url = "/Master/DisciplinaryMaster/Delete?IncidentsGI=" + GI + "&LogGI=" + LogGI;

//                $('#deleteDesSlider').load(url, function () { });
//                $('body').append('<div class="form-overlay"></div>');
//            }
//            else {
//                debugger
//                swal.fire(result.message).then(function () {

//                    var url = "/Master/DisciplinaryMaster/GetDisciplinaryList?TabIndex=" + currentTab;
//                    $('#ActiveList').load(url, function () { });

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

    if ($("#DisciplinaryIncidentsList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/DisciplinaryMaster/Delete?IncidentsGI=" + GI + "&LogGI=" + LogGI;
        $('#deleteDesSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}









function confirmDelete(GI, LogGI){

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
                url: '/Master/DisciplinaryMaster/Delete',
                dataType: 'json',
                data: $('#Deletedesciplinary').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('DeleteDiv');
                            var url = "/Master/DisciplinaryMaster/GetDisciplinaryIncidentsList?TabIndex=" + 'ACTIVE';
                            $('#ActiveList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#ActiveList").removeClass("hide");
                        });

                    }
                    else {
                        debugger
                        swal.fire(result.message).then(function () {
                            var url = "/Master/DisciplinaryMaster/Delete?IncidentsGI=" + GI + "&LogGI=" + LogGI;
                            $('#deleteDesSlider').load(url, function () { });
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

    if ($("#DisciplinaryIncidentsList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {
        var url = "/Master/DisciplinaryMaster/Approve?IncidentsGI=" + GI + "&LogGI=" + LogGI;
        $('#approveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}






function disciplinarySave() {
    debugger;
    var TabIndex;
    if (validateDisciplinary()) {

        console.log($('#disciplinarySave').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/DisciplinaryMaster/Save',
            dataType: 'json',
            data: $('#disciplinarySave').serialize(),
            success: function (result) {
                if (result.success) {
                    debugger;
                    swal.fire(result.message).then(function () {
                        CloseSlider('disciplinarySaveclose');
                        var url = "/Master/DisciplinaryMaster/GetDisciplinaryList?TabIndex=" + currentTab;
                        $('#ActiveList').load(url, function () { });
                    });

                }

                else {
                    debugger;
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








function ConfirmDisciplinaryApprove(GI, LogGI) {

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
                url: '/Master/DisciplinaryMaster/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/DisciplinaryMaster/GetDisciplinaryList?TabIndex=" + 'APPROVAL_PENDING';


                            $('#ActiveList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#ActiveList").removeClass("hide");
                        });

                    }
                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            debugger;
                            var url = "/Master/DisciplinaryMaster/Approve?IncidentsGI=" + GI + "&LogGI=" + LogGI;
                            $('#approveSlider').load(url, function () { });
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

function ConfirmDisciplinaryReject() {
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
                url: '/Master/DisciplinaryMaster/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/DisciplinaryMaster/GetDisciplinaryList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#ActiveList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#ActiveList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/DisciplinaryMaster/Approve?IncidentsGI=" + GI + "&LogGI=" + LogGI;
                            $('#approveSlider').load(url, function () { });
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

        var trainingMasterTableLength = document.getElementById("DisciplinaryMasterTable").rows.length - 1;
        if (trainingMasterTableLength > 0) {
            url = "/Master/DisciplinaryMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var trainingMasterPendingTableLength = document.getElementById("DisciplinaryPendingTable").rows.length - 1;
        if (trainingMasterPendingTableLength > 0) {
            url = "/Master/DisciplinaryMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}






function validateDisciplinary() {
    if (!validateById('#Name', 'DisciplinaryName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'DisciplinaryShortName')) {
        return false;
    }
   
    else {
        return true;
    }
}











