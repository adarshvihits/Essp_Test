var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';


//function AddNewOrEdit(Action, GI, LogGI) {
//    debugger;
//    var Code = 1;
//    debugger;
//    if (Action == 'Edit') {
//        var url = "/Master/EvaluationPeriod/Edit?EvaluationPeriodGI=" + GI + "&LogGI=" + LogGI;
//    }
//    else {
//        var url = "/Master/EvaluationPeriod/Create";
//    }
//    $('#newRequestSlider').load(url, function () { });

//    $('body').append('<div class="form-overlay"></div>');
//}




function onAddOrEditClick(Type, GI, LogGI, index) {
    debugger;
    currentTab = 'ACTIVE';

    if (Type == 'MODIFY') {

        if ($("#EvaluationPeriodMasterList_" + index + "__EditActive").val() == 'True')
            swal.fire("APPROVAL PENDING");


        else {
            var url = "/Master/EvaluationPeriod/Edit?EvaluationPeriodGI=" + GI + "&LogGI=" + LogGI;

            $('#newRequestSlider').load(url, function () { });
            $('body').append('<div class="form-overlay"></div>');
        }

    }

    else {
        var url = "/Master/EvaluationPeriod/Create";
        $('#newRequestSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}





function tabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/EvaluationPeriod/GetEvaluationPeriodList";
    if (TabIndex != 'PendingTab')
        $('#ActiveList').load(url, { TabIndex: TabIndex }, function () { });
    else
        $('#PendingList').load(url, { TabIndex: TabIndex }, function () { });
    prevTab = Tab;
}

//function Delete(GI, LogGI) {

//    debugger;
//    var url = "/Master/EvaluationPeriod/Delete?EvaluationPeriodGI=" + GI + "&LogGI=" + LogGI;
//    $('#deleteEvaluationSlider').load(url, function () { });
//    $('body').append('<div class="form-overlay"></div>');

//}


function onDeleteClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#EvaluationPeriodMasterList_" + index + "__EditActive").val() == 'True')
        swal.fire("APPROVAL PENDING");


    else {
        var url = "/Master/EvaluationPeriod/Delete?EvaluationPeriodGI=" + GI + "&LogGI=" + LogGI;
        $('#deleteEvaluationSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }
}





//function onDeleteEvaluation(EvaluationPeriodGI) {
//    debugger;
//    url = "/Master/EvaluationPeriod/EvaluationPeriodDelete?EvaluationPeriodGI=" + EvaluationPeriodGI;
//    window.location.href = url;
//}





function validateAllEvaluationPeriodSave(GI) {
    debugger;
 
    if (!validateById('#Name', 'epName')) {
        return false;
    }
    else if (!validateById('#ShortName', 'epShortName')) {
        return false;
    }
    else if (!validateById('#From', 'epFrom')) {
        return false;
    }
    else if (!validateById('#To', 'epTo')) {
        return false;
    }
    
    else {
        $.ajax({

            type: 'POST',
            url: '/Master/EvaluationPeriod/EvaluationPeriodSave',
            dataType: 'json',
            data: { name: $('#Name').val(), shortname: $('#ShortName').val(), from: $('.fromdp').val(), to: $('.todp').val(), gi: GI, status: $('#Active').val(), mode: $('#Mode').val(), des: $('#Description').val()},
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        //$('.tabOne').removeClass('active');
                        //$('#tabOne').removeClass('active');
                        //$('#tabOne').css('display', 'none');
                        //$('.tabContactDetails').addClass('active');
                        //$('#tabContactDetails').addClass('active');
                        CloseSlider('evaluationSaveclose');
                       var url = "/Master/EvaluationPeriod/GetEvaluationPeriodList?TabIndex=" + currentTab;
                        $('#ActiveList').load(url, function () { });


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
}

//function Approve(GI, LogGI) {
   
//    debugger;
//    var url = "/Master/EvaluationPeriod/Approve?EvaluationPeriodGI=" + GI + "&LogGI=" + LogGI;
//    $('#approveSlider').load(url, function () { });
//    $('body').append('<div class="form-overlay"></div>');
//}



function onApproveClick(GI, LogGI, Type, index) {

    debugger;

    if ($("#EvaluationPeriodMasterList_" + index + "__MakerChecker").val() == 'True')
        swal.fire("MAKER AND CHECKER SHOULD BE DIFFERENT");

    else {

        var url = "/Master/EvaluationPeriod/Approve?EvaluationPeriodGI=" + GI + "&LogGI=" + LogGI;
        $('#approveSlider').load(url, function () { });
        $('body').append('<div class="form-overlay"></div>');
    }

}



//function confirmReject() {

//    if (confirm("Do you want to Confirm?")) {
//        debugger;
//        $.ajax({

//            type: 'POST',
//            url: '/Master/EvaluationPeriod/Reject',
//            dataType: 'json',
//            data: $('#approve').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('PendingApprove');
//                        var url = '/Master/EvaluationPeriod/Index';
//                        window.location.href = url;
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {

//                    });
//                }

//            },
//            error: function (xhr, textStatus, errorThrown) {
//                swal.fire(xhr.responseText);
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
                url: '/Master/EvaluationPeriod/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                         
                            var url = "/Master/EvaluationPeriod/GetEvaluationPeriodList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#ActiveList').load(url, function () { });
                     
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




function confirmDelete(EvaluationPeriodGI) {
    debugger
    console.log('EvaluationPeriodGI');
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
                url: '/Master/EvaluationPeriod/EvaluationPeriodDelete',
                dataType: 'json',
                /* data: $('#EvaluationDelete').serialize(),*/
                data: { EvaluationPeriodGI: EvaluationPeriodGI },
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('DeleteDiv');
                            debugger
                            var url = "/Master/EvaluationPeriod/GetEvaluationPeriodList?TabIndex=" + 'ACTIVE';
                            $('#ActiveList').load(url, function () { });
                            $(".PendingTab").removeClass("active");
                            $(".ActiveTab").addClass("active");
                            $("#ActiveList").removeClass("hide");
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            debugger;
                       
                            url = "/Master/EvaluationPeriod/EvaluationPeriodDelete?EvaluationPeriodGI=" + EvaluationPeriodGI;
                            $('#DeleteDiv').load(url, function () { });
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

        var trainingMasterTableLength = document.getElementById("EvaluationMasterTable").rows.length - 1;
        if (trainingMasterTableLength > 0) {
            url = "/Master/EvaluationPeriod/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var trainingMasterPendingTableLength = document.getElementById("PendingTable").rows.length - 1;
        if (trainingMasterPendingTableLength > 0) {
            url = "/Master/EvaluationPeriod/ExportToExcel?TabIndex=" + currentTab; 
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
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
                url: '/Master/EvaluationPeriod/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {

                    if (result.success == true) {
                        debugger
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/EvaluationPeriod/GetEvaluationPeriodList?TabIndex=" + 'APPROVAL_PENDING';
                            $('#ActiveList').load(url, function () { });
                            $(".PendingTab").addClass("active");
                            $(".ActiveTab").removeClass("active");
                            $("#ActiveList").removeClass("hide");
                        });

                    }

                    else {
                        debugger;
                        swal.fire(result.message).then(function () {
                            var url = "/Master/EvaluationPeriod/Approve?EvaluationPeriodGI=" + GI + "&LogGI=" + LogGI;
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







