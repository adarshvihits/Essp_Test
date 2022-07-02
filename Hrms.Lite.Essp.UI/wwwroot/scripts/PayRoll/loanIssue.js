var prevTab = "all";
var currentTab = 0;
var currentTabName = "All";
function tabClick(Tab, TabIndex, TabName) {
    debugger;
    currentTab = TabIndex;
    currentTabName = TabName;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/PayRoll/LoanIssue/GetLoanIssueList";
    $('#allList').load(url, { TabIndex: TabIndex }, function () { });
    prevTab = Tab;
}

function onEmployeeClick(LoanIssueGI, EmployeeGI, Tab) {
    debugger;
    

    if (Tab == "AllList") {
        var url = "/PayRoll/LoanIssue/GetLoanIssueDetails";

        $('body').append('<div class="form-overlay"></div>');
        $('.EditLoanIssueSlider').load(url, { LoanIssueGI: LoanIssueGI, EmployeeGI: EmployeeGI }, function () { });

        $('#editSlider').removeClass('hide');
     
    }
    else if (Tab == "pending") {
        var url = "/PayRoll/LoanIssue/LoanIssueApproveRejectDetails";
        $('body').append('<div class="form-overlay"></div>');
        $('#ApproveSlider').load(url, { LoanIssueGI: LoanIssueGI, EmployeeGI: EmployeeGI }, function () { });

     //   $('.rewrd_Rec_Approve').load(url, { LoanIssueGI: LoanIssueGI, EmployeeGI: EmployeeGI }, function () { });

     //   $('#ApproveSlider').removeClass('hide');


    }
}
function onAddNewClick() {
    debugger;
    var url = "/PayRoll/LoanIssue/NewRequest";
    $('#addNewLoan').load(url, {}, function () { });
    $('#addNewLoan').removeClass('hide');
}


function OnEmpChange(sender) {
    debugger;
    var Code = $(sender).val();
    if (Code != 0) {
        var url = "/PayRoll/LoanIssue/EmployeeCard";
        $('.search-profile-details').load(url, { EmpCode: Code }, function () { });
        $('.search-profile-details').show(300);
    }

}

function approveSubmit(LoanIssueGI,mode) {
    debugger;
    if (confirm("Do you want to Approve?")) {
        debugger;
       /* return true;*/

    $.ajax({
        type: 'POST',
        url: '/PayRoll/LoanIssue/ApproveOrReject',
        dataType: 'json',
        data: { LoanIssueGI: LoanIssueGI, Mode: mode},
        success: function (result) {
            if (result.success == true) {
                swal.fire("Approved Successfully").then(function () {
                    CloseSlider('LoanIssue_Approve');
                    //result.message
                   // var url = "/PayRoll/LoanIssue/Index";
                    var url = "/PayRoll/LoanIssue/GetLoanIssueList?Tab=" + 'tab1';
                    $('#allList').load(url, function () { });
                    $(".Tab").addClass("active");
                   /* $(".prevTab").removeClass("active");*/
                    $("#allList").removeClass("hide");
                });

            }
            else {
                swal.fire(result.message).then(function () {

                });
            }

        },
        error: function (xhr, textStatus, errorThrown) {

        }
    });
    }
    else {
        return false;
    }

}
function confirmReject(LoanIssueGI, mode) {
    debugger;
    if (confirm("Do you want to Reject?")) {
        debugger;
       /* return true;*/

    $.ajax({
        type: 'POST',
        url: '/PayRoll/LoanIssue/ApproveOrReject',
        dataType: 'json',
        data: { LoanIssueGI: LoanIssueGI, Mode: mode },
        success: function (result) {
            if (result.success == true) {
                swal.fire("Rejected Successfully").then(function () {
                    CloseSlider('LoanIssue_Approve');
                   //var url = "/PayRoll/LoanIssue/GetLoanIssueList?Tab=" + 'AllList';
                    //var url = "/PayRoll/LoanIssue/LoanIssueApproveRejectDetails";
                    var url = "/PayRoll/LoanIssue/GetLoanIssueList?Tab=" + 'tab1';
                    $('#allList').load(url, function () { });
                    $(".Tab").addClass("active");
                    $('#ApproveSlider').load(url, { LoanIssueGI: LoanIssueGI, EmployeeGI: EmployeeGI }, function () { });
                    $("#allList").removeClass("hide");
                });

            }
            else {
                swal.fire(result.message).then(function () {

                });
            }

        },
        error: function (xhr, textStatus, errorThrown) {

        }
    });
    }
    else {
        return false;
    }

}


function onLogClick(LoanIssueGI) {
    debugger;
    /*if (Tab == 'All') {*/
    var url = "/PayRoll/LoanIssue/LoanIssueLogDetails";
    $('body').append('<div class="form-overlay"></div>');
    $('#LoanIssueLogDetailsSlider').load(url, { LoanIssueGI: LoanIssueGI}, function () { });

  /*  $('#LoanIssueLogDetailsSlider').removeClass('hide');*/
}



function ViewFile(absoluteURI) {
    window.open(absoluteURI, "_blank");
}


function PreviewImage() {
    var path = URL.createObjectURL($('.previewImage')[0].files[0]);
    window.open(path, "_blank");
}



function onExportToExcelClick() {
    debugger;
    if (currentTab == 0) {
        var AllTableLength = document.getElementById("AllTable").rows.length - 1;
        if (AllTableLength > 0) {
            url = "/PayRoll/LoanIssue/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 1) {
        var PersonalLoanTableLength = document.getElementById("PersonalLoanTable").rows.length - 1;
        if (PersonalLoanTableLength > 0) {
            url = "/PayRoll/LoanIssue/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 2) {
        var resignationExitChecklistTableLength = document.getElementById("CarLoanTable").rows.length - 1;
        if (resignationExitChecklistTableLength > 0) {
            url = "/PayRoll/LoanIssue/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 3) {
        var resignationRelivingTableLength = document.getElementById("HomeLoanTable").rows.length - 1;
        if (resignationRelivingTableLength > 0) {
            url = "/PayRoll/LoanIssue/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 4) {
        var resignationRelivingTableLength = document.getElementById("HomeLoanTable").rows.length - 1;
        if (resignationRelivingTableLength > 0) {
            url = "/PayRoll/LoanIssue/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 5) {
        var resignationRelivingTableLength = document.getElementById("MoreTable").rows.length - 1;
        if (resignationRelivingTableLength > 0) {
            url = "/PayRoll/LoanIssue/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var resignationRetirementTableLength = document.getElementById("ApprovalPendingTable").rows.length - 1;
        if (resignationRetirementTableLength > 0) {
            url = "/PayRoll/LoanIssue/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }

    }
}

function onfilterClick() {
    debugger
    var tabIndex = currentTab;
    var searchId = $('#LoanIssueFilterCombo_Code').val();
    var url = "/PayRoll/LoanIssue/ApplyFilter?TabIndex=" + tabIndex + '&SearChId=' + searchId;
    $('body').append('<div class="form-overlay"></div>');
    $('#FilterPartial').load(url, function () { });
}


function ApplyFilter(mode) {
    debugger
    var tabIndex = $('#Tabindex').val();    
    $("#Tabindex").val(currentTab);
    
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/PayRoll/LoanIssue/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#allList').html("");
                    $('#allList').html(result);

                    $('#allList').removeClass('hide');

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
                url: '/PayRoll/LoanIssue/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#allList').html("");
                    $('#allList').html(result);

                    $('#allList').removeClass('hide');

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
        $('#filterForm').removeClass('filter-apply');
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $.ajax({
            type: 'POST',
            url: '/PayRoll/LoanIssue/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger
                //CloseSlider('assetAllocationFilter');
                $('#allList').html("");
                $('#allList').html(result);

                $('#allList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },
            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}
function validateLoanIssue() {
    debugger
    if (!validateById('#LoanIssueRequest_LoanType_Code', 'loanType'))
        return false;

    else if (!validateById('#LoanIssueRequest_RepaymentStartMonth_Code', 'repaymentStartMonth'))
        return false;
    else if (!validateById('#LoanIssueRequest_RepaymentMethod_Code', 'repaymentMethod'))
        return false;
    else if (!validateById('#LoanIssueRequest_DisbursementDate', 'disbursementDate'))
        return false;
    else if (!validateById('#LoanIssueRequest_Pourpose', 'purpose'))
        return false;

    else if (!validateById('#LoanIssueRequest_LoanAmount', 'loanAmount'))
        return false;
    else if (!validateById('#LoanIssueRequest_MonthlyEMI', 'monthlyEMI'))
        return false;
    else if (!validateById('#LoanIssueRequest_Tenure', 'tenure'))
        return false;
    else {
        return true;
    }

}
function autopopulateEMITenure() {
    debugger;
    loanAmount = $('#LoanIssueRequest_LoanAmount').val();
    emi = $('#LoanIssueRequest_MonthlyEMI').val();
    repaymentMethod = $('#LoanIssueRequest_RepaymentMethod_Code').val();
    tenure = $('#LoanIssueRequest_Tenure').val();
    //one time settlement:1
    //EMI:2
    if (validateById('#LoanIssueRequest_RepaymentMethod_Code', 'repaymentMethod')) {
        repaymentMethod = $('#LoanIssueRequest_RepaymentMethod_Code').val();
   
    if (repaymentMethod == 1) {
        $('#LoanIssueRequest_Tenure').val(1);
        $('#LoanIssueRequest_Tenure').attr('readonly', 'true');
        $('#LoanIssueRequest_MonthlyEMI').val(loanAmount);
    }
    if (repaymentMethod == 2) {
        if (loanAmount != '' && tenure != '') {
            monthlyEmi = loanAmount / tenure;
            $('#LoanIssueRequest_MonthlyEMI').val(monthlyEmi);
        }
        else if (loanAmount != '' && emi != '') {
            tenure = loanAmount / emi;
            $('#LoanIssueRequest_Tenure').val(tenure);
            $('#LoanIssueRequest_Tenure').attr('readonly', 'true');
        }
            
       
        }
    }

}
function repaymentMethodChange() {
    debugger;
    $('#LoanIssueRequest_MonthlyEMI').val('');
    $('#LoanIssueRequest_Tenure').val('');
    $('#LoanIssueRequest_Tenure').removeAttr("readonly");

    loanAmount = $('#LoanIssueRequest_LoanAmount').val();
    emi = $('#LoanIssueRequest_MonthlyEMI').val();
    repaymentMethod = $('#LoanIssueRequest_RepaymentMethod_Code').val();
    tenure = $('#LoanIssueRequest_Tenure').val();
    if (repaymentMethod == 1 && loanAmount!="") {
        $('#LoanIssueRequest_Tenure').val(1);
        $('#LoanIssueRequest_Tenure').attr('readonly', 'true');
        $('#LoanIssueRequest_MonthlyEMI').val(loanAmount);
    }
    if (repaymentMethod == 2) {
        if (loanAmount != '' && tenure != '') {
            monthlyEmi = loanAmount / tenure;
            $('#LoanIssueRequest_MonthlyEMI').val(monthlyEmi);
        }
        else if (loanAmount != '' && emi != '') {
            tenure = loanAmount / emi;
            $('#LoanIssueRequest_Tenure').val(tenure);
            $('#LoanIssueRequest_Tenure').attr('readonly', 'true');
        }


    }
}
function monthlyEMIChange() {
    debugger;
   

    loanAmount = $('#LoanIssueRequest_LoanAmount').val();
    emi = $('#LoanIssueRequest_MonthlyEMI').val();
    repaymentMethod = $('#LoanIssueRequest_RepaymentMethod_Code').val();
    tenure = $('#LoanIssueRequest_Tenure').val();
    if (repaymentMethod == 1 && loanAmount != "") {
        $('#LoanIssueRequest_Tenure').val(1);
        $('#LoanIssueRequest_Tenure').attr('readonly', 'true');
        $('#LoanIssueRequest_LoanAmount').val(emi);
    }
    if (repaymentMethod == 2) {
        //if (loanAmount != "" && tenure != "") {
        //    monthlyEmi = loanAmount / tenure;
        //    $('#LoanIssueRequest_MonthlyEMI').val(monthlyEmi);
        //}
        //else
            if (loanAmount != "" && emi != "") {
            tenure = loanAmount / emi;
            $('#LoanIssueRequest_Tenure').val(tenure);
           /* $('#LoanIssueRequest_Tenure').attr('readonly', 'true');*/
        }


    }

}
function tenureChange() {
    debugger;


    loanAmount = $('#LoanIssueRequest_LoanAmount').val();
    emi = $('#LoanIssueRequest_MonthlyEMI').val();
    repaymentMethod = $('#LoanIssueRequest_RepaymentMethod_Code').val();
    tenure = $('#LoanIssueRequest_Tenure').val();
    if (repaymentMethod == 1 && loanAmount != "") {
        $('#LoanIssueRequest_Tenure').val(1);
        $('#LoanIssueRequest_Tenure').attr('readonly', 'true');
        $('#LoanIssueRequest_LoanAmount').val(emi);
    }
    if (repaymentMethod == 2) {
        if (loanAmount != "" && tenure != "") {
            monthlyEmi = loanAmount / tenure;
            $('#LoanIssueRequest_MonthlyEMI').val(monthlyEmi);
        }
        else if (loanAmount != "" && emi != "") {
            tenure = loanAmount / emi;
            $('#LoanIssueRequest_Tenure').val(tenure);
            /* $('#LoanIssueRequest_Tenure').attr('readonly', 'true');*/
        }


    }

}