
var prevTab = 'ActiveTab';
var CurrentTab = 'ACTIVE';

function OnTabClick(Tab, TabIndex) {
    $.ajaxSetup({
        async: false
    });
    debugger;

    
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/DisciplinaryIncidentsAction/GetDisciplinaryIncidentsActionList";
    
    $('#DisciplinaryIncidentsActionList').load(url, { TabIndex: TabIndex }, function () { });
    CurrentTab = TabIndex;
    prevTab = Tab;
 
}


//function AddNewOrEdit(Action, GI, LogGI) {
//    debugger;
//    if (Action == 'MODIFY') {
//        var url = "/Master/DisciplinaryIncidentsAction/Edit?IncidentActionGI=" + GI + "&LogGI=" + LogGI;
//    }
//    else {
//        var url = "/Master/DisciplinaryIncidentsAction/Create";
//    }
//    $('.AddNewOrEdit').load(url, function () { });
//    $("#AddNewOrEditSlider").removeClass("hide");
//    $('body').append('<div class="form-overlay"></div>');
//    $(".AddNewOrEdit").show();
//}





function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#DisciplinaryIncidentsActionList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/DisciplinaryIncidentsAction/Edit?IncidentActionGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/DisciplinaryIncidentsAction/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}






function DisciplinaryIncidentsActionSave() {
    debugger;
    if (validateDisciplinaryIncidentsAction()) {

        console.log($('#DisciplinaryIncidentsActionSave').serialize());
        $.ajax({

            type: 'POST',
            url: '/Master/DisciplinaryIncidentsAction/Save',
            dataType: 'json',
            data: $('#DisciplinaryIncidentsActionSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/DisciplinaryIncidentsAction/GetDisciplinaryIncidentsActionList";
                        $('#DisciplinaryIncidentsActionList').load(url, { TabIndex: currentTab }, function () { });
                        /* window.location.href = url;*/
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




function onApproveClick(GI, LogGI, Type, index)
{

    debugger;

    if ($("#DisciplinaryIncidentsActionList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/DisciplinaryIncidentsAction/Approve?IncidentActionGI=" + GI + "&&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}





//function Approve(GI, LogGI) {
//    debugger;
//    var url = "/Master/DisciplinaryIncidentsAction/Approve?IncidentActionGI=" + GI + "&&LogGI=" + LogGI;
//    $('.ApproveDiv').load(url, function () { });
//    $('body').append('<div class="form-overlay"></div>');
//    $("#ApproveSlider").removeClass("hide");
//    $(".ApproveDiv").show();

//}




//function confirmApprove(GI, LogGI) {

//    if (confirm("Do you want to Approve?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/DisciplinaryIncidentsAction/Approve',
//            dataType: 'json',
//            data: $('#approveDisciplinaryIncidentsAction').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('ApproveDiv');
//                        var url = "/Master/DisciplinaryIncidentsAction/GetDisciplinaryIncidentsActionList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#DisciplinaryIncidentsActionList').load(url, function () { });
//                        $(".PendingTab").removeClass("active");
//                        $(".ActiveTab").addClass("active");
//                        $("#DisciplinaryIncidentsActionList").removeClass("hide");

//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        debugger;
//                        var url = "/Master/DisciplinaryIncidentsAction/Approve?IncidentActionGI=" + GI + "&LogGI=" + LogGI;
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









function confirmApprove(GI, LogGI) {
    debugger
    swal.fire({
        text: "Do you want to Approve",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({

                type: 'POST',
                url: '/Master/DisciplinaryIncidentsAction/Approve',
                dataType: 'json',
                data: $('#approveDisciplinaryIncidentsAction').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/DisciplinaryIncidentsAction/GetDisciplinaryIncidentsActionList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#DisciplinaryIncidentsActionList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#DisciplinaryIncidentsActionList").removeClass("hide");

                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            debugger;
                            var url = "/Master/DisciplinaryIncidentsAction/Approve?IncidentActionGI=" + GI + "&LogGI=" + LogGI;
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



//function confirmReject(GI, LogGI) {

//    if (confirm("Do you want to Reject?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/DisciplinaryIncidentsAction/Reject',
//            dataType: 'json',
//            data: $('#approveDisciplinaryIncidentsAction').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('ApproveDiv');
//                        var url = "/Master/DisciplinaryIncidentsAction/GetDisciplinaryIncidentsActionList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#DisciplinaryIncidentsActionList').load(url, function () { });
//                        $(".PendingTab").removeClass("active");
//                        $(".ActiveTab").addClass("active");
//                        $("#DisciplinaryIncidentsActionList").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {
//                        var url = "/Master/DisciplinaryIncidentsAction/Approve?IncidentActionGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/DisciplinaryIncidentsAction/Reject',
                dataType: 'json',
                data: $('#approveDisciplinaryIncidentsAction').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/DisciplinaryIncidentsAction/GetDisciplinaryIncidentsActionList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#DisciplinaryIncidentsActionList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#DisciplinaryIncidentsActionList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/DisciplinaryIncidentsAction/Approve?IncidentActionGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/DisciplinaryIncidentsAction/Delete',
                dataType: 'json',
                data: $('#deleteDisciplinaryIncidentsAction').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/DisciplinaryIncidentsAction/GetDisciplinaryIncidentsActionList?TabIndex=" + 'ACTIVE';
                            $('#DisciplinaryIncidentsActionList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#DisciplinaryIncidentsActionList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/DisciplinaryIncidentsAction/Delete?IncidentActionGI=" + GI + "&LogGI=" + LogGI;
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





//function Delete(GI, LogGI) {

//    debugger;

//    var url = "/Master/DisciplinaryIncidentsAction/Delete?IncidentActionGI=" + GI + "&LogGI=" + LogGI;
//    $('.delete').load(url, function () { });
//    $('body').append('<div class="form-overlay"></div>');
//    $("#DeleteSlider").removeClass("hide");
//    $(".delete").show();
//}


function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#DisciplinaryIncidentsActionList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/DisciplinaryIncidentsAction/Delete?IncidentActionGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}








function ExportToExcel() {
    debugger;

    if (CurrentTab != "APPROVAL_PENDING") {

        var trainingMasterTableLength = document.getElementById("diciplinaryactionTable").rows.length - 1;
        if (trainingMasterTableLength > 0) {
            url = "/Master/DisciplinaryIncidentsAction/ExportToExcel?TabIndex=" + CurrentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var trainingMasterPendingTableLength = document.getElementById("DisciplinaryIncidentsActionpending").rows.length - 1;
        if (trainingMasterPendingTableLength > 0) {
            url = "/Master/DisciplinaryIncidentsAction/ExportToExcel?TabIndex=" + CurrentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}

//function ExportToExcel() {
//    debugger;
//    if (cuTab == 'APPROVAL_PENDING') {
//        var pendingTableLength = document.getElementById("DisciplinaryIncidentsActionpending").rows.length - 1;
//        if (pendingTableLength > 0) {
//            url = "/Master/DisciplinaryIncidentsAction/ExportToExcel?TabIndex=" + cuTab;
//            window.location.href = url;
//        }
//        else {
//            swal.fire("No data found to export");
//        }
//    }

//    else if (cuTab == 'ACTIVE')
//    {
//        var activeTableLength = document.getElementById("diciplinaryactionTable").rows.length - 1;
//        if (activeTableLength > 0) {
//            url = "/Master/DisciplinaryIncidentsAction/ExportToExcel?TabIndex=" + cuTab;
//            window.location.href = url;
//        }


//        else {
//            swal.fire("No data found to export");
//        }
//    }
//    else if (cuTab == 'INACTIVE') {
//        var activeTableLength = document.getElementById("diciplinaryactionTable").rows.length - 1;
//        if (activeTableLength > 0) {
//            url = "/Master/DisciplinaryIncidentsAction/ExportToExcel?TabIndex=" + cuTab;
//            window.location.href = url;
//        }


//        else {
//            swal.fire("No data found to export");
//        }
//    }
    


//    else if (cuTab == null)
//        debugger
//    {
//        cuTab = 'ACTIVE';
//        var activeTableLength = document.getElementById("diciplinaryactionTable").rows.length - 1;
//        if (activeTableLength > 0) {
//            url = "/Master/DisciplinaryIncidentsAction/ExportToExcel?TabIndex=" + cuTab;
//            window.location.href = url;
//        }

//        else {
//            swal.fire("No data found to export");
//        }
//    }

  

// }









function validateDisciplinaryIncidentsAction() {
    debugger;
    if ($('.DIAname').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#DIsIncident").addClass('error-message');
        $('#DIsIncident').html("This field is required");
        $('#Name').focus();
        return false;
    }

    else if ($('.DIAShtName').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#DisShort").addClass('error-message');
        $('#DisShort').html("This field is required");
        $('#ShortName').focus();
        return false;
    }

    else
        return true;
}