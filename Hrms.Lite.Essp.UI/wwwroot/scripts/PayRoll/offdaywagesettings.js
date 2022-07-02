



function validateDropdowns() {
    if (validateById('#Allowance_Code', 'Allowance')) {
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
    Allowance = $('#Allowance_Code').val();
    if (validateDropdowns()) {
        var url = "/PayRoll/OffdayWageSettings/GetSettingsEmployeeList";
        $('#SettingsEmployeeList').load(url, { Allowance: $('#Allowance_Code').val() }, function () { });
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
    }
}

function sliderChange() {
    debugger;

    AllowanceName = $('#Allowance_Code option:selected').text();
    Allowance = $('#Allowance_Code').val();
 if (validateDropdowns()) {
        $('body').append('<div class="form-overlay"></div>');
        var url = "/PayRoll/OffdayWageSettings/GetBatchUpdateDetails";
        $('#batchUpdate').load(url, { AllowanceCode: Allowance, AllowanceName: AllowanceName }, function () { });

    }

}
function getSettingsEmployeeList(AllowanceCode) {
    debugger;

    $.ajax({
        type: 'POST',
        url: '/PayRoll/OffdayWageSettings/GetSettingsEmployeeList',
        dataType: 'json',
        data: { Allowance: Allowance },
        success: function (result) {
            if (result.success == true) {
                swal.fire("Saved Successfully").then(function () {
                    
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

function ApplicableAllowanceSave() {
    debugger;
    $.ajax({
        type: 'POST',
        url: '/PayRoll/OffdayWageSettings/SaveApplicableAllowance',
        dataType: 'json',
        data: $('#ApplicableAllowanceSave').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    CloseSlider('applicableAllowanceSlider');
                     $('#applicableallowance').load(url, {}, function () { });

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
function applicableAllowanceClick() {
    debugger;
    var url = "/PayRoll/OffdayWageSettings/GetApplicableAllowanceList";
    $('#applicableallowance').load(url, {}, function () { });
    CloseSlider('applicableAllowanceSlider');
}
function onAllowanceCheckboxClick(chkid, tableid) {
    debugger;
    if ($('#' + chkid).is(':checked'))
        $('#' + tableid).find('input[type=checkbox]').prop('checked', true);
    else
        $('#' + tableid).find('input[type=checkbox]').prop('checked', false);
}
function onEditClick(index) {
    debugger

    $('#hideAction_' + index).hide();
    $('#hideRate_' + index).hide();
    $('#hidecalctype_' + index).hide();
    $('#raterow_' + index).show();
    $('#calctyperow_' + index).show();
    $('.save_Cancel_' + index).show();

}
function onCancelClick(index) {
    debugger;
    $('#hideRate_' + index).show();
    $('#hidecalctype_' + index).show();
    $('#hideAction_' + index).show();
    $('.save_Cancel_' + index).hide();
    $('#raterow_' + index).hide();
    $('#calctyperow_' + index).hide();

}

function onUpdateClick(index, EmployeeGI, CalcType) {
    debugger;
    UpdatedRate = $('#newRate_' + index).val();
    calculationType = $("#SettingsEmployeeList_" + index + "__CalcType_Code").val();

    Allowance = $('#Allowance_Code').val();
    if (validateDropdowns()) {
        $.ajax({
            type: 'POST',
            url: '/PayRoll/OffdayWageSettings/SaveEmployeeWiseSettings',
            dataType: 'json',
            data: { UpdatedRate: UpdatedRate, UpdatedCalcType: calculationType, EmployeeGI: EmployeeGI, AllowanceCode: Allowance },
            success: function (result) {
                debugger;
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        var url = "/PayRoll/OffdayWageSettings/GetSettingsEmployeeList";
                        $('#SettingsEmployeeList').load(url, { Allowance: $('#Allowance_Code').val() }, function () { });

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

}
function BatchUpdateClick() {
    debugger;
    if (validateDropdowns()) {
        $.ajax({
            type: 'POST',
            url: '/PayRoll/OffdayWageSettings/BatchUpdateEmployeeWiseSettings',
            dataType: 'json',
            data: $('#BatchUpdateAllowance').serialize(),
            success: function (result) {
                debugger;
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        var url = "/PayRoll/OffdayWageSettings/GetSettingsEmployeeList";
                        //$('#SettingsEmployeeList').load(url, { Allowance: $('#Allowance_Code').val() }, function () { });
                        ApplyFilter('apply');
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
}
function defaultSettingsClick() {
    debugger;
     var url = "/PayRoll/OffdayWageSettings/GetDefaultSettingsList";
      $('#defaultsettings').load(url, {}, function () { });
    CloseSlider('defaultSettingsSlider');


}
function DefaultSettingsUpdate() {
    debugger;

    $.ajax({
        type: 'POST',
        url: '/PayRoll/OffdayWageSettings/SaveDefaultSettings',
        dataType: 'json',
        data: $('#DefaultSettings').serialize(),
        success: function (result) {
            debugger;
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    var url = "/PayRoll/OffdayWageSettings/GetSettingsEmployeeList";
                    $('#SettingsEmployeeList').load(url, { Allowance: $('#Allowance_Code').val() }, function () { });
                    CloseSlider('defaultSettingsSlider');
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

        var SettingsEmployeeListTableLength = document.getElementById("SettingsEmployeeListtable").rows.length - 1;
        if (SettingsEmployeeListTableLength > 0) {
            url = "/PayRoll/OffdayWageSettings/ExportToExcel?Allowance=" + $('#Allowance_Code').val() + "&AllowanceName=" + $('#Allowance_Code option:selected').text();
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
                url: '/PayRoll/OffdayWageSettings/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#SettingsEmployeeList').html("");
                    $('#SettingsEmployeeList').html(result);

                    $('#SettingsEmployeeList').removeClass('hide');

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
                url: '/PayRoll/OffdayWageSettings/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#SettingsEmployeeList').html("");
                    $('#SettingsEmployeeList').html(result);

                    $('#SettingsEmployeeList').removeClass('hide');

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
            url: '/PayRoll/OffdayWageSettings/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#SettingsEmployeeList').html("");
                $('#SettingsEmployeeList').html(result);

                $('#SettingsEmployeeList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}