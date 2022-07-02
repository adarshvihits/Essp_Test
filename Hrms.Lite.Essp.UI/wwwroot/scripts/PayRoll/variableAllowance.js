var AllowanceMonthName;
var AllowanceTypeName;
var Month;
var Allowance;
var UpdatedAmount;


function onEditClick(index)
{
     debugger
   
    $('#hideAction_' + index).hide();
    $('#hideAmount_' + index).hide();
    $('#row_' + index).show();
     $('.save_Cancel_' + index).show();

}

function onCancelClick(index)
{
    debugger

    $('#hideAmount_' + index).show();
    $('#hideAction_' + index).show();
    $('.save_Cancel_' + index).hide(); 
    $('#row_' + index).hide();
    //GetList()

}


function onUpdateClick(index,EmployeeGI) {
   debugger;
    UpdatedAmount = $("#newAmount_"+index).val();
    Month = $('#AllowanceMonth_Code').val();
    Allowance = $('#Allowance_Code').val();
   
        //var url = "/PayRoll/VariableAllowance/EmployeeWiseSave";
        //$('#Variableallowancelist').load(url, { UpdatedAmount: $('#editAmount').val(), Month: Month, Allowance: Allowance }, function () { });
    $.ajax({
        type: 'POST',
        url: '/PayRoll/VariableAllowance/EmployeeWiseSave',
        dataType: 'json',
        data: { UpdatedAmount: UpdatedAmount, allowanceMonth: Month, allowanceType: Allowance, EmployeeGI: EmployeeGI },
        success: function (result) {
            debugger;
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    var url = "/PayRoll/VariableAllowance/GetList";
                    $('#Variableallowancelist').load(url, { Month: Month, Allowance: Allowance }, function () { });
                
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




function validateDropdowns() {
    if (validateById('#AllowanceMonth_Code', 'AllMonth') && validateById('#Allowance_Code', 'Alltype')) {
        return true;
    }
    else {
        return false;
    }
}

function GetList() {
    debugger;
    //AllowanceMonth = $('#AllowanceMonth_Code').val();
    //Allowance = $('#Allowance_Code').val();
  
    //Amonth = $('#AllowanceMonth_Code:selected').text();
    //AType = $('#Allowance_Code option:selected').text();
    
    if (validateDropdowns()) {
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        var url = "/PayRoll/VariableAllowance/GetList";
        $('#Variableallowancelist').load(url, { Month: $('#AllowanceMonth_Code').val(), Allowance: $('#Allowance_Code').val()}, function () { });
    }
}

function clickOnBatchUpdate() {
    debugger
    MonthName = $('#AllowanceMonth_Code option:selected').text();
    AllowanceName = $('#Allowance_Code option:selected').text();
    Month = $('#AllowanceMonth_Code').val();
    Allowance = $('#Allowance_Code').val();

    if (validateDropdowns()) {
        $('body').append('<div class="form-overlay"></div>');
        var url = "/PayRoll/VariableAllowance/GetBatchUpdateSlider";
        $('#batchUpdate').load(url, { MonthCode: Month, AllowanceCode: Allowance, MonthName: MonthName, AllowanceName: AllowanceName},function () { });
       
    }
}


function BatchUpdateClick() {
    debugger;
   
    $.ajax({
        type: 'POST',
        url: '/PayRoll/VariableAllowance/BatchUpdate',
        dataType: 'json',
        data: $('#BatchUpdateAllowance').serialize(),
        success: function (result) {
            debugger;
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    //var url = "/PayRoll/VariableAllowance/GetList";
                    //$('#Variableallowancelist').load(url, { Month: Month, Allowance: Allowance}, function () { });
                    ApplyFilter('reset');
                    CloseSlider('batchUpdateDiv');
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

function ExportToExcel() {
    debugger;
    if (validateDropdowns()) {

        var leaveOpeningTableLength = document.getElementById("variableAllowanceTable").rows.length - 1;
        if (leaveOpeningTableLength > 0) {
            url = "/PayRoll/VariableAllowance/ExportToExcel?Month=" + $('#AllowanceMonth_Code').val() + "&Allowance=" + $('#Allowance_Code').val() + "&AllowanceMonth=" + $('#AllowanceMonth_Code option:selected').text() + "&AllowanceType=" + $('#Allowance_Code option:selected').text();
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}


function ApplyFilter(mode) {
    debugger

    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/PayRoll/VariableAllowance/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#Variableallowancelist').html("");
                    $('#Variableallowancelist').html(result);

                    $('#Variableallowancelist').removeClass('hide');

                    //$('#rewardsListPartial').addClass('hide');               
                },


                error: function (xhr, textStatus, errorThrown) {
                    debugger
                    swal.fire(xhr.responseText);
                }
            });
            $('#filterForm').removeClass('filter-apply');
        }
        else {
            $.ajax({

                type: 'POST',
                url: '/PayRoll/VariableAllowance/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#Variableallowancelist').html("");
                    $('#Variableallowancelist').html(result);

                    $('#Variableallowancelist').removeClass('hide');

                    //$('#rewardsListPartial').addClass('hide');               
                },


                error: function (xhr, textStatus, errorThrown) {
                    debugger
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
            url: '/PayRoll/VariableAllowance/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#Variableallowancelist').html("");
                $('#Variableallowancelist').html(result);

                $('#Variableallowancelist').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}

