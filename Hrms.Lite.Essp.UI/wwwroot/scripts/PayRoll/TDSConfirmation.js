
var Month;
var Deduction;

function validateDropdowns() {
    if (validateById('#TDSMonth_Code', 'Month') && validateById('#Deduction_Code', 'deduction')) {
        return true;
    }
    else {
        return false;
    }
}



function getList() {
    debugger;
    $("#edit").css("display", "block");
    $("#updatecancel").css("display", "none");
     Month = $('#TDSMonth_Code').val();
    Deduction = $('#Deduction_Code').val();
    SMonth = $('#TDSMonth_Code option:selected').text();
    SDeduction = $('#Deduction_Code option:selected').text();

    if (validateDropdowns()) {
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        var url = "/PayRoll/TDSConfirmation/GetList";
        $('#TDSConfirmationList').load(url, { Month: $('#TDSMonth_Code').val(), Deduction: $('#Deduction_Code').val() }, function () { });
    }
}

function onEditClick(index) {
    debugger
    $('#hideAmount_' + index).hide();
    $('#row_' + index).append($('<input type="text" class="form-control form-control-sm"id="correctedamt" placeholder="Amount" maxlength="8">'));
    $('#updatecancel_' + index).css("display", "block");
    $('#edit_' + index).css("display", "none");
}
//function GenerateTextbox(value) {
//    return '<input id="newvalue" name = "CreateTextbox" type="text" value = "' + value + '" /> '
//}
function onCancelClick(index) {
    debugger
    $('#updatecancel_' + index).css("display", "none");
    $('#edit_' + index).css("display", "block");
    
    getList();
    

}
function EmployeeWiseTDSConfirmationSave(EmployeeGI) {
    debugger
    var EmployeeGIValue = EmployeeGI;
    var Amt = $("#correctedamt").val();
    var ded = $('#Deduction_Code').val();
    var mon = $('#TDSMonth_Code').val();
  
    //var dataobject = {};
    // dataobject.EmployeeGIValue = EmployeeGI;
    //dataobject.Amount = $("#correctedamt").val();
    //dataobject.Deduction = $('#Deduction_Code').val();
    //dataobject.TDSMonth = $('#TDSMonth_Code').val();
    $.ajax({
        type: 'POST',
        url: '/PayRoll/TDSConfirmation/Edit',
        dataType: 'json',
        data: "EmployeeGIValue=" + EmployeeGIValue + "&TDSMonth=" + mon + "&Deduction=" + ded + "&Amount=" + Amt,
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    getList();
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

        var tdsConfirmationTableLength = document.getElementById("TDSConfirmationlist").rows.length - 1;
        if (tdsConfirmationTableLength > 0) {
            url = "/PayRoll/TDSConfirmation/ExportToExcel?Month=" + $('#TDSMonth_Code').val() + "&Deduction=" + $('#Deduction_Code').val() + "&SMonth=" + $('#TDSMonth_Code option:selected').text() + "&SDeduction=" + $('#Deduction_Code option:selected').text() ;
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
                url: '/PayRoll/TDSConfirmation/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#TDSConfirmationList').html("");
                    $('#TDSConfirmationList').html(result);

                    $('#TDSConfirmationList').removeClass('hide');

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
                url: '/PayRoll/TDSConfirmation/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#TDSConfirmationList').html("");
                    $('#TDSConfirmationList').html(result);

                    $('#TDSConfirmationList').removeClass('hide');

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
            url: '/PayRoll/TDSConfirmation/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#TDSConfirmationList').html("");
                $('#TDSConfirmationList').html(result);

                $('#TDSConfirmationList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}
