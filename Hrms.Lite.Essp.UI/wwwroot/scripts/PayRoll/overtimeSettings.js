function validateDropdowns() {
    if (validateById('#Allowance_Code', 'Allowance')) {
        return true;
    }
    else {
        return false;
    }
}
function validateBatchUpdateDefaultDropdowns() {
    debugger
    if (validateById('#CalcTypeCode', 'CalcType') && (validateById('#Rate', 'Rate'))) {
        return true;
    }

    else {
        return false;

    }
}
function applicableAllowanceClick() {
    debugger;
    var url = "/PayRoll/OvertimeSettings/GetApplicableAllowanceList";
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
function ApplicableAllowanceSave() {
    debugger;
    $.ajax({
        type: 'POST',
        url: '/PayRoll/OvertimeSettings/SaveApplicableAllowance',
        dataType: 'json',
        data: $('#ApplicableAllowanceSave').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    CloseSlider('applicableAllowanceSlider');
                    /* var url = "/PayRoll/HolidayWageSettings/GetApplicableAllowanceList";*/
                    $('#applicableallowance').load(url, {}, function () { }); 
                //    $('#kt_content').load(url, {}, function () { });
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
function onAllowanceCheckboxClick(chkid, tableid) {
    debugger;
    if ($('#' + chkid).is(':checked'))
        $('#' + tableid).find('input[type=checkbox]').prop('checked', true);
    else
        $('#' + tableid).find('input[type=checkbox]').prop('checked', false);
}
function getList() {
    debugger;
    $("#edit").css("display", "block");
    $("#updatecancel").css("display", "none");
    Allowance = $('#Allowance_Code').val();
    if (validateDropdowns()) {
        var url = "/PayRoll/OvertimeSettings/GetSettingsEmployeeList";
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

    //    //$('body').append('<div class="form-overlay"></div>');
    //    var url = "/PayRoll/HolidayWageSettings/GetBatchUpdateDetails";
    //    /*window.location.href = url;*/
    //$('#batchUpdate').load(url, {  }, function () { });
    //CloseSlider('batchUpdateSlider');
    if (validateDropdowns()) {
        $('body').append('<div class="form-overlay"></div>');
        var url = "/PayRoll/OvertimeSettings/GetBatchUpdateDetails";
        $('#batchUpdate').load(url, { AllowanceCode: Allowance, AllowanceName: AllowanceName }, function () { });

    }

}

function defaultSettingsClick() {
    debugger;
    //LeavePeriod = $('#LeavePeriod_Code').val();
    //Month = $('#Month_Code').val();
    //Leave = $('#Leave_Code').val();
    //DebitCredit = $("#DebitCredit_Code").val();

    //$('body').append('<div class="form-overlay"></div>');
    var url = "/PayRoll/OvertimeSettings/GetDefaultSettingsList";
    /*window.location.href = url;*/
    $('#defaultsettings').load(url, {}, function () { });
    CloseSlider('defaultSettingsSlider');


}
function ExportToExcel() {
    debugger;
    var AllowanceName = $('#Allowance_Code option:selected').text();
    if (validateDropdowns()) {

        var SettingsEmployeeListTableLength = document.getElementById("SettingsEmployeeListtable").rows.length - 1;
        if (SettingsEmployeeListTableLength > 0) {
            url = "/PayRoll/OvertimeSettings/ExportToExcel?Allowance=" + $('#Allowance_Code').val() + '&AllowanceName='+AllowanceName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
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

    // UpdatedCalcType = $('#calctyperow_Code').val();
    Allowance = $('#Allowance_Code').val();
    //MonthCode = $('#DeductionMonth_Code').val();
    //DedCode = $('#Deduction_Code').val();

    $.ajax({
        type: 'POST',
        url: '/PayRoll/OvertimeSettings/SaveEmployeeWiseSettings',
        dataType: 'json',
        data: { UpdatedRate: UpdatedRate, UpdatedCalcType: calculationType, EmployeeGI: EmployeeGI, AllowanceCode: Allowance },
        success: function (result) {
            debugger;
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    var url = "/PayRoll/OvertimeSettings/GetSettingsEmployeeList";
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
function BatchUpdateClick() {
    debugger;
    if (validateBatchUpdateDefaultDropdowns()) {
        $.ajax({
            type: 'POST',
            url: '/PayRoll/OvertimeSettings/BatchUpdateEmployeeWiseSettings',
            dataType: 'json',
            data: $('#BatchUpdateAllowance').serialize(),
            success: function (result) {
                debugger;
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        var url = "/PayRoll/OvertimeSettings/GetSettingsEmployeeList";
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
function DefaultSettingsUpdate() {
    debugger; if (validateBatchUpdateDefaultDropdowns()) {
        $.ajax({
            type: 'POST',
            url: '/PayRoll/OvertimeSettings/SaveDefaultSettings',
            dataType: 'json',
            data: $('#DefaultSettings').serialize(),
            success: function (result) {
                debugger;
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        var url = "/PayRoll/OvertimeSettings/GetSettingsEmployeeList";
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
}

function ApplyFilter(mode) {
    debugger

    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/PayRoll/OvertimeSettings/ApplyFilter',
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
                url: '/PayRoll/OvertimeSettings/ApplyFilter',
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
            url: '/PayRoll/OvertimeSettings/ApplyFilter',
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

//function onfilterClick() {
//    debugger

//    var url = "/PayRoll/HolidayWageSettings/ApplyFilterLoad";
//    $('body').append('<div class="form-overlay"></div>');
//    $('#FilterPartial').load(url, function () { });
//}
//function ApplyFilter(mode) {
//    debugger
//    AllowanceName = $('#Allowance_Code option:selected').text();
//    Allowance = $('#Allowance_Code').val();
//    //var tabIndex = $('#Tabindex').val();
//    //var search = $('#SearchId').val();
//    if (mode == 'apply') {
//        $.ajax({

//            type: 'POST',
//            url: '/PayRoll/HolidayWageSettings/ApplyFilter',
//            dataType: 'html',
//            data: { filter : $('#HolidayWageFilter').serialize(), Allowance :Allowance },
//            success: function (result) {
//                debugger
//                CloseSlider('HolidayWageFilter');
//                //var url = "/PayRoll/HolidayWageSettings/GetSettingsEmployeeList";
//                //$('#SettingsEmployeeList').load(url, { Allowance: $('#Allowance_Code').val() }, function () { });
//                $('#SettingsEmployeeList').html("");
//                $('#SettingsEmployeeList').html(result);
//            },


//            error: function (xhr, textStatus, errorThrown) {
//                swal.fire(xhr.responseText);
//            }
//        });
//    }
//    else {
//        $('.reset').val('');
//        $.ajax({

//            type: 'POST',
//            url: '/PayRoll/HolidayWageSettings/ApplyFilter',
//            dataType: 'html',
//            data: $('#HolidayWageFilter').serialize(),
//            success: function (result) {
//                debugger

//                $('#SettingsEmployeeList').html("");
//                $('#SettingsEmployeeList').html(result);

//            },


//            error: function (xhr, textStatus, errorThrown) {
//                swal.fire(xhr.responseText);
//            }
//        });
//    }
//}
