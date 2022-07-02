
var MonthCode;
var Month;
var DedCode;
var Deduction;

function getList() {
    debugger;
    if (validateDropdowns()) {
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        var url = "/PayRoll/VariableDeduction/GetList";
        $('#VariableDeductionList').load(url, { Month: $('#DeductionMonth_Code').val(), Deduction: $('#Deduction_Code').val() }, function () { });
    }
}



function validateDropdowns() {
    if (validateById('#DeductionMonth_Code', 'Month') && validateById('#Deduction_Code', 'deduction'))
    {
        return true;
    }
    else {
        return false;
    }
}

function onBatchUpdateClick()
{
    debugger;

    MonthCode = $('#DeductionMonth_Code').val();
    Month = $('#DeductionMonth_Code option:selected').text();
    DedCode = $('#Deduction_Code').val();
    Deduction = $('#Deduction_Code option:selected').text();
   
    

    if (validateDropdowns())
    {
        $('body').append('<div class="form-overlay"></div>');
        var url = "/PayRoll/VariableDeduction/GetBatchUpdateDetails";

        $('#batchUpdate').load(url,
            {
                MonthCode: MonthCode,
                Month: Month,
                DedCode: DedCode,
                Deduction: Deduction
            },
            function () { });
    }
}


function BatchUpdate() {
    debugger;
    $.ajax({
        type: 'POST',
        url: '/PayRoll/VariableDeduction/BatchUpdate',
        dataType: 'json',
        data: $('#VariableDeductionBatchUpdate').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    //var url = "/PayRoll/VariableDeduction/GetList";
                    //$('#VariableDeductionlist').load(url, { Month: DeductionMonth_Code, Deduction: Deduction_Code }, function () { });
                    ApplyFilter('reset');
                    CloseSlider('batchupdatevariablededuction');
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


function onEditClick(index) {
    debugger
    $('#hideAction_' + index).hide();
    $('#hideAmount_' + index).hide();
    $('#row_' + index).show();
    $('.save_Cancel_' + index).show();
  
}


function onUpdateClick(index, EmployeeGI) {
    debugger;
    UpdatedAmount = $('#newAmount_' + index).val();
    MonthCode = $('#DeductionMonth_Code').val();
    DedCode = $('#Deduction_Code').val();

      $.ajax({
        type: 'POST',
        url: '/PayRoll/VariableDeduction/EmployeeWiseSave',
        dataType: 'json',
          data: { UpdatedAmount: UpdatedAmount, DeductionMonth: MonthCode, DeductionType: DedCode, EmployeeGI: EmployeeGI },
        success: function (result) {
            debugger;
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    var url = "/PayRoll/VariableDeduction/GetList";
                    $('#VariableDeductionList').load(url, { Month: MonthCode, Deduction:DedCode }, function () { });

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

function OnCancelClick(index) {
    debugger;
    $('#hideAmount_' + index).show();
    $('#hideAction_' + index).show();
    $('.save_Cancel_' + index).hide();
    $('#row_' + index).hide();


    
    
}


function ExportToExcel() {
    debugger;
    if (validateDropdowns()) {

        var TableLength = document.getElementById("VariableDeductionTable").rows.length - 1;
        if (TableLength > 0) {
            url = "/PayRoll/VariableDeduction/ExportToExcel?Month=" + $('#DeductionMonth_Code').val() + "&Deduction=" + $('#Deduction_Code').val() + "&MName=" + $('#DeductionMonth_Code option:selected').text() + "&DName=" + $('#Deduction_Code option:selected').text();
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
                url: '/PayRoll/VariableDeduction/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#VariableDeductionList').html("");
                    $('#VariableDeductionList').html(result);

                    $('#VariableDeductionList').removeClass('hide');

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
                url: '/PayRoll/VariableDeduction/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#VariableDeductionList').html("");
                    $('#VariableDeductionList').html(result);

                    $('#VariableDeductionList').removeClass('hide');

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
            url: '/PayRoll/VariableDeduction/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');s


                $('#VariableDeductionList').html("");
                $('#VariableDeductionList').html(result);

                $('#VariableDeductionList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}