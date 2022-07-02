var prevTab = 'all';
var currentTab = 0;  //code for 'all'
function ontabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    //var searchID = $("#Filter_Code").val();;
    //var url = "/DataBank/JobTransition/GetJobTransitionList";
    //$('#jobTransition-Approval-PendingList').load(url, { TabIndex: TabIndex, SearchId: searchID }, function () { });
    ApplyFilter('apply');

    //if (TabIndex != 1001) {
    //    $('#jobTransition-Confirm-Approval-Pending-List').hide();
    //    $('#jobTransition-Approval-PendingList').load(url, { TabIndex: TabIndex, SearchId: searchID }, function () { });
    //}
    //else {
    //    $('#jobTransition-Approval-PendingList').hide();
    //    $('#jobTransition-Confirm-Approval-Pending-List').load(url, { TabIndex: TabIndex, SearchId: searchID }, function () { });
    //}
    prevTab = Tab;
}

function onFilterDropdownChange(sender) {
    debugger;

    //var url = "/DataBank/JobTransition/GetJobTransitionList";
    
    //var search = $(sender).val();
    ApplyFilter('reset');
   // $('#jobTransition-Approval-PendingList').load(url, { TabIndex: currentTab, SearchId: search }, function () { });
    //if (currentTab!=1001)
    //    $('#jobTransition-Approval-PendingList').load(url, { TabIndex: currentTab, SearchId: search }, function () { });
    //else
    //    $('#jobTransition-Confirm-Approval-Pending-List').load(url, { TabIndex: currentTab, SearchId: search }, function () { });
}


function OnEmployeeChange(sender) {
    debugger;
    var EmpCode = $(sender).val();
    var url = "/DataBank/JobTransition/EmployeeCard";
    /*window.location.href = url + "?EmpCode=" + EmpCode;*/
    $('.search-profile-details').load(url, { EmpCode: EmpCode }, function () { });
    $('.search-profile-details').show(300);

}



function onNewRequestClick() {
    debugger;
  
    var url = "/DataBank/JobTransition/NewRequest";
    $('#newRequestSlider').load(url, function () { });

    $('#newRequestSlider').removeClass("hide");
}
function CloseSlider(id) {
    $("." + id).removeClass('slider-forms-open');
    $(".form-overlay").remove();

}
function CTCCalculation() {
    debugger;
   
    var TotAmt = parseFloat("0");
    var TotGrossAmt = parseFloat("0");
    $('.AllowanceAmount').each(function (i, obj) {
        var Amt = parseFloat($("#JobTransition_Allowance_" + i + "__NewAmount").val());
      /*  var type = $("#JobTransition_Allowance_" + i + "__AllowanceType").val();*/
        var type = $(".AllowanceType").text();
       
        debugger;
        if (isNaN(Amt)) {
            Amt = parseFloat("0");
        }
        TotAmt = TotAmt + Amt;
        if (type != 'CTC Component') {
            TotGrossAmt = TotGrossAmt + Amt;
        }
     
        $("#JobTransition_JobDetail_NewGrossSalary").val(TotGrossAmt.toFixed(2));
        $("#JobTransition_JobDetail_NewCTC").val(TotAmt.toFixed(2));
        $("#jobTrn_newGrossSalary").html(TotGrossAmt.toFixed(2));
        $("#jobTrn_newCTC").html(TotAmt.toFixed(2));
    });
   
}
function onProgressTabClick(TabIndex)
{
    debugger;

    if (TabIndex == 'growth-history')
    {
        $('#transition-type').addClass('hide');
        $('#growth-history').removeClass('hide');
        $('#job-details').addClass('hide');
        $('#compensation-benefits').addClass('hide');

    }


    else if (TabIndex == 'transition-type') {
        $('#job-details').addClass('hide');
        $('#transition-type').removeClass('hide');
        $('#growth-history').addClass('hide');
        $('#compensation-benefits').addClass('hide');
    }

    else  //job-details
    {
        $('#compensation-benefits').addClass('hide');
        $('#job-details').removeClass('hide');
        $('#transition-type').addClass('hide');
        $('#growth-history').addClass('hide');


    }




}

function onNextClick(TabIndex)
{
    debugger
    if (TabIndex == 'growth-history')
    {
        $('#transition-type').removeClass('hide');
        $('#growth-history').addClass('hide');
        $('#job-details').addClass('hide');
        $('#compensation-benefits').addClass('hide');
    }
    else if (TabIndex =='transition-type')
    {
        $('#job-details').removeClass('hide');
        $('#transition-type').addClass('hide');
        $('#growth-history').addClass('hide');
        $('#compensation-benefits').addClass('hide');
    }

    else  //job-details
    {
        var PR = $("#JobTransition_JobDetail_PRApplicability_Code option:selected").text();
        if (PR == "NO") {
            $(".deductionAmnt").prop("readonly", true);
            $(".AllowanceAmount").prop("readonly", true);
        }
        else {
            $(".deductionAmnt").prop("readonly", false
            );
            $(".AllowanceAmount").prop("readonly", false);
        }
        $('#compensation-benefits').removeClass('hide');
        $('#job-details').addClass('hide');
        $('#transition-type').addClass('hide');
        $('#growth-history').addClass('hide');
       

    }
  
}
function onJObTrnTypechange(sender) {
    var code = $(sender).val();
    $.getJSON("/DataBank/JobTransition/GetTransitionReasonDrpDwn", { TypeCode: code }, function (data) {
        $('#JobTransition_JobDetail_JobTransitionReason_Code option').remove();
        $('#JobTransition_JobDetail_JobTransitionReason_Code').append('<option value="0">Select Reason</option');
        debugger;
        for (var i = 0; i < data.length; i++) {
            $('#JobTransition_JobDetail_JobTransitionReason_Code').append('<option value="' + data[i].code + '">' + data[i].name + '</option');
        }

    });
   

}

function Reject(employeeGI, HistoryGI, REJECTMOde) {
    if (REJECTMOde=="REJECT")
    {


        if (confirm("Do you want to Confirm?")) {
            debugger;
            $.ajax({

                type: 'POST',
                url: '/DataBank/JobTransition/Reject',
                dataType: 'json',
                data: $('#jobTransitionApprove').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        var url = '/DataBank/JobTransition/Index';
                        window.location.href = url;
                        swal.fire(result.message).then(function () {
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = '/DataBank/JobTransition/Approve';
                            window.location.href = url + "?EmployeeGI" + employeeGI + "&HistoryGI=" + HistoryGI;
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
    else
    {
        if (confirm("Do you want to Confirm?")) {
            debugger;
            $.ajax({

                type: 'POST',
                url: '/DataBank/JobTransition/ConfirmReject',
                dataType: 'json',
                data: $('#jobTransitionApprove').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        var url = '/DataBank/JobTransition/Index';
                        window.location.href = url;
                        swal.fire(result.message).then(function () {
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = '/DataBank/JobTransition/ConfirmApprove';
                            window.location.href = url + "?EmployeeGI" + employeeGI + "&HistoryGI=" + HistoryGI;
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
}

function onExportToExcelClick() {
    debugger;
    var searchid = $('#Filter_Code').val();
   
    var TableLength = document.getElementById("jobTransitionTable").rows.length - 1;
    if (TableLength > 0) {
        url = "/DataBank/JobTransition/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchid;
        window.location.href = url;
    }
    else {
        swal.fire("No data found to export");
    }
}

function ApplyFilter(mode) {
    debugger
    var tabIndex = $('#Tabindex').val();
    var search = $('#SearchId').val();
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#Filter_Code').val())
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/JobTransition/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#jobTransition-Approval-PendingList').html("");
                    $('#jobTransition-Approval-PendingList').html(result);

                    $('#jobTransition-Approval-PendingList').removeClass('hide');

                    //$('#rewardsListPartial').addClass('hide');               
                },


                error: function (xhr, textStatus, errorThrown) {
                    swal.fire(xhr.responseText);
                }
            });
            $('#filterForm').removeClass('filter-apply');
        }
        else {
            $.ajax({

                type: 'POST',
                url: '/DataBank/JobTransition/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#jobTransition-Approval-PendingList').html("");
                    $('#jobTransition-Approval-PendingList').html(result);

                    $('#jobTransition-Approval-PendingList').removeClass('hide');

                    //$('#rewardsListPartial').addClass('hide');               
                },


                error: function (xhr, textStatus, errorThrown) {
                    swal.fire(xhr.responseText);
                }
            });
            $('#filterForm').addClass('filter-apply');
        }
       
    }
    else {
        filterApplicable = 1;
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        $.ajax({

            type: 'POST',
            url: '/DataBank/JobTransition/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#jobTransition-Approval-PendingList').html("");
                $('#jobTransition-Approval-PendingList').html(result);

                $('#jobTransition-Approval-PendingList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}