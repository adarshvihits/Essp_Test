var LeavePeriod;
var Month;
var Leave;
var DebitCredit;
function sliderChange() {
    debugger;
    LeavePeriod = $('#LeavePeriod_Code').val();
    Month = $('#Month_Code').val();
    Leave = $('#Leave_Code').val();
    DebitCredit = $("#DebitCredit_Code").val();
    if (DebitCredit == 1) {
        $('body').append('<div class="form-overlay"></div>');
        var url = "/TimeOffice/LeaveCreditDebit/GetBatchUpdateDetails";
        /*window.location.href = url;*/
        $('#bupdate1').load(url, { LeavePeriod: LeavePeriod, Leave: Leave, Month: Month, Type: DebitCredit }, function () { });
        CloseSlider('batchUpdateSlider2');
    }
    else {
        $('body').append('<div class="form-overlay"></div>');
        var url = "/TimeOffice/LeaveCreditDebit/GetBatchUpdateDetails";
        $('#bupdate2').load(url, { LeavePeriod: LeavePeriod, Leave: Leave, Month: Month, Type: DebitCredit }, function () { });
        CloseSlider('batchUpdateSlider');
    }
}

function getList() {
    debugger;
    LeavePeriod = $('#LeavePeriod_Code').val();
    Month = $('#Month_Code').val();
    Leave = $('#Leave_Code').val();
    DebitCredit = $('#DebitCredit_Code').val();
    if (validateById('#LeavePeriod_Code', 'leaveperiod') && validateById('#Month_Code', 'month') && validateById('#Leave_Code', 'debitcredit') && validateById('#DebitCredit_Code', 'leave')) {
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        var url = "/TimeOffice/LeaveCreditDebit/GetList";
        debugger
        $('#LeaveCreditDebitList').load(url, { LeavePeriod: LeavePeriod, Leave: Leave, Month: Month, DebitCredit: DebitCredit }, function () { });
    }
    
}

function onEditClick(EmployeeGI) {
    alert(EmployeeGI);
    $('body').append('<div class="form-overlay"></div>');
    var url = "/TimeOffice/LeaveCreditDebit/GetEditDetails";
    $('#editLeaveCreditDebit').load(url, { EmployeeGI: EmployeeGI, LeavePeriod: $('#LeavePeriod_Code').val(), Leave: Leave = $('#Leave_Code').val(), Month: Month = $('#Month_Code').val(), Type: $('#DebitCredit_Code').val() }, function () { });
}

function EmployeeWiseLeaveCreditDebitSave() {

    $.ajax({
        type: 'POST',
        url: '/TimeOffice/LeaveCreditDebit/Edit',
        dataType: 'json',
        data: $('#editSave').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    var url = "/TimeOffice/LeaveCreditDebit/GetList";
                    $('#LeaveCreditDebitList').load(url, { LeavePeriod: $('#LeavePeriod_Code').val(), Leave: Leave = $('#Leave_Code').val(), Month: Month = $('#Month_Code').val(), DebitCredit: $('#DebitCredit_Code').val() }, function () { });
                    CloseSlider('leavCreditDebitEdit');
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

function DebitSubmit() {
    debugger;
    $.ajax({
        type: 'POST',
        url: '/TimeOffice/LeaveCreditDebit/BatchSave',
        dataType: 'json',
        data: $('#debitS').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    var url = "/TimeOffice/LeaveCreditDebit/GetList";
                    $('#LeaveCreditDebitList').load(url, { LeavePeriod: $('#LeavePeriod_Code').val(), Leave: Leave = $('#Leave_Code').val(), Month: Month = $('#Month_Code').val(), DebitCredit: $('#DebitCredit_Code').val() }, function () { });
                    CloseSlider('batchUpdateSlider2');
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

function CreditSubmit() {
    debugger;
    $.ajax({
        type: 'POST',
        url: '/TimeOffice/LeaveCreditDebit/BatchSave',
        dataType: 'json',
        data: $('#creditS').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    var url = "/TimeOffice/LeaveCreditDebit/GetList";
                    $('#LeaveCreditDebitList').load(url, { LeavePeriod: $('#LeavePeriod_Code').val(), Leave: Leave = $('#Leave_Code').val(), Month: Month = $('#Month_Code').val(), DebitCredit: $('#DebitCredit_Code').val() }, function () { });
                    CloseSlider('batchUpdateSlider');
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
        debugger;
        var leaveCreditdebitTableLength = document.getElementById("leaveCreditdebitTable").rows.length - 1;
        if (leaveCreditdebitTableLength > 0) {
            url = "/TimeOffice/LeaveCreditdebit/ExportToExcel?LeavePeriod=" + $('#LeavePeriod_Code').val() + "&Leave=" + $('#Leave_Code').val() + "&Month=" + $('#Month_Code').val() + "&DebitCredit=" + $('#DebitCredit_Code').val() + "&LPName=" + $('#LeavePeriod_Code option:selected').text() + "&MName=" + $('#Month_Code option:selected').text() + "&LName=" + $('#Leave_Code option:selected').text() + "&DCName=" + $('#DebitCredit_Code option:selected').text();
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}

function validateDropdowns() {
    if (validateById('#LeavePeriod_Code', 'leaveperiod') && validateById('#Leave_Code', 'leave') && validateById('#Month_Code', 'month') && validateById('#DebitCredit_Code', 'debitcredit')) {
        return true;
    }
    else {
        return false;
    }
}

function ApplyFilter(mode) {
    debugger

    if (mode == 'apply') {
        $.ajax({

            type: 'POST',
            url: '/TimeOffice/LeaveCreditdebit/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('basicFilter');

                $('#LeaveCreditDebitList').html("");
                $('#LeaveCreditDebitList').html(result);

                $('#LeaveCreditDebitList').removeClass('hide');

                //$('#rewardsListPartial').addClass('hide');               
            },


            error: function (xhr, textStatus, errorThrown) {
                debugger
                swal.fire(xhr.responseText);
            }
        });
        $('#filterForm').addClass('filter-apply');
    }
    else {
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        $.ajax({

            type: 'POST',
            url: '/TimeOffice/LeaveCreditdebit/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#LeaveCreditDebitList').html("");
                $('#LeaveCreditDebitList').html(result);

                $('#LeaveCreditDebitList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}
