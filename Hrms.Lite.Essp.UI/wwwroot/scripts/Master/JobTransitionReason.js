var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';

function tabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/JobTransitionReason/GetJobTransitionReasonList";

    $('#JobTransitionReasonList').load(url, { TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}






function onAddNewOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#JobTransitionReasonList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/JobTransitionReason/Edit?ReasonGI=" + GI + "&LogGI=" + LogGI;

            $('#AddNewOrEditSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/JobTransitionReason/Create";
        $('#AddNewOrEditSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }


}


function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#JobTransitionReasonList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/JobTransitionReason/Approve?ReasonGI=" + GI + "&LogGI=" + LogGI;
        $('#ApproveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}

function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#JobTransitionReasonList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/JobTransitionReason/Delete?ReasonGI=" + GI + "&LogGI=" + LogGI;
        $('#DeleteSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}




function JobTransitionReasonSave(Action, GI, LogGI) {
    debugger;
    if (validateJobTransitionReason()) {
        $.ajax({

            type: 'POST',
            url: '/Master/JobTransitionReason/Save',
            dataType: 'json',
            data: $('#JobTransitionReasonsave').serialize(),
            success: function (result) {
                debugger;
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('AddNewOrEdit');
                        var url = "/Master/JobTransitionReason/GetJobTransitionReasonList?TabIndex=" + currentTab;
                        $('#JobTransitionReasonList').load(url, function () { });

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
                url: '/Master/JobTransitionReason/Approve',
                dataType: 'json',
                data: $('#jobReasonapprove').serialize(),
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/JobTransitionReason/GetJobTransitionReasonList?TabIndex=" + 'APPROVAL_PENDING';
                            debugger
                            /*  window.location.href = url;*/
                            $('#JobTransitionReasonList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#JobTransitionReasonList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/JobTransitionReason/Approve?ReasonGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/JobTransitionReason/Reject',
                dataType: 'json',
                data: $('#jobReasonapprove').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {            
                            CloseSlider('ApproveDiv');
                            var url = "/Master/JobTransitionReason/GetJobTransitionReasonList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#JobTransitionReasonList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#JobTransitionReasonList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/JobTransitionReason/Approve?ReasonGI=" + GI + "&LogGI=" + LogGI;
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
                url: '/Master/JobTransitionReason/Delete',
                dataType: 'json',
                data: $('#jobReasonDelete').serialize(),
                success: function (result) {
                    debugger
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('delete');
                            var url = "/Master/JobTransitionReason/GetJobTransitionReasonList?TabIndex=" + 'ACTIVE';
                            $('#JobTransitionReasonList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#JobTransitionReasonList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/JobTransitionReason/Delete?ReasonGI=" + GI + "&LogGI=" + LogGI;
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
        var pendingTableLength = document.getElementById("PendingTableJob").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/JobTransitionReason/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'ACTIVE') {
        var activeTableLength = document.getElementById("JobTransitionReason").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/JobTransitionReason/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 'INACTIVE') {
        var inActiveTableLength = document.getElementById("JobTransitionReason").rows.length - 1;
        if (inActiveTableLength > 0) {
            url = "/Master/JobTransitionReason/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}



function validateJobTransitionReason() {
    if (!validateById('#Name', 'JobTransitionReasonName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'JobTransitionReasonShortName')) {
        return false;
    }
    else if (!validateById('#JobTransitionsTypes', 'JobTransitionReasonType')) {
        return false;
    }

    else {
        return true;
    }
}
    


    
  