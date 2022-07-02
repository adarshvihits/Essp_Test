function validateDropdowns() {
    if (validateById('#LeaveGroup_Code', 'levGroup') && validateById('#Leave_Code', 'lev') && validateById('#LeavePeriodFrom_Code', 'levPeriodFrom') && validateById('#LeavePeriodTo_Code', 'levPeriodTo') && validateById('#Month_Code', 'month')) {
        return true;
    }
    else {
        return false;
    }
}
function getList() {   
    if (validateDropdowns()) {
        var url = "/TimeOffice/LeaveCarryForward/GetList";
        $('#leaveCarryForwardList').load(url, { LeaveGroup: $('#LeaveGroup_Code').val(), Leave: $('#Leave_Code').val(), LeavePeriodFrom: $('#LeavePeriodFrom_Code').val(), LeavePeriodTo: $('#LeavePeriodTo_Code').val(), Month: $('#Month_Code').val()}, function () { });
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
    }
    
}

function onEditClick(EmployeeGI) {
    $('body').append('<div class="form-overlay"></div>');
    var url = "/TimeOffice/LeaveCarryForward/GetEditDetails";
    $('#editCarryForward').load(url, { EmployeeGI: EmployeeGI, LeaveGroup: $('#LeaveGroup_Code').val(), Leave: $('#Leave_Code').val(), LeavePeriodFrom: $('#LeavePeriodFrom_Code').val(), LeavePeriodTo: $('#LeavePeriodTo_Code').val(), Month: $('#Month_Code').val() }, function () { });
}

function onBatchUpdateClick() {
    if (validateDropdowns()) {
        $('body').append('<div class="form-overlay"></div>');
        var url = "/TimeOffice/LeaveCarryForward/GetBatchUpdateDetails";
        //window.location.href = url
        $('#batchUpdateCarryForward').load(url, { LeaveGroup: $('#LeaveGroup_Code').val(), Leave: $('#Leave_Code').val(), LeavePeriodFrom: $('#LeavePeriodFrom_Code').val(), LeavePeriodTo: $('#LeavePeriodTo_Code').val(), Month: $('#Month_Code').val()}, function () { });
    }
}

function BatchUpdate() {

    $.ajax({
        type: 'POST',
        url: '/TimeOffice/LeaveCarryForward/BatchUpdate',
        dataType: 'json',
        data: $('#BatchUpdateSlider').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    getList();
                    CloseSlider('batchupSlider');
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

function EmployeeWiseLeaveCarryForwardSave() {

    $.ajax({
        type: 'POST',
        url: '/TimeOffice/LeaveCarryForward/Edit',
        dataType: 'json',
        data: $('#editCarryForwardSlider').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    //var url = "/TimeOffice/LeaveCarryForward/GetList";
                    getList();
                    CloseSlider('editLeaveCarryForwardSlider');
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

        var leaveCarryForwardTableLength = document.getElementById("leaveCarryForwardTable").rows.length - 1;
        if (leaveCarryForwardTableLength > 0) {
            url = "/TimeOffice/LeaveCarryForward/ExportToExcel?LeaveGroup=" + $('#LeaveGroup_Code').val() + "&LeavePeriodFrom=" + $('#LeavePeriodFrom_Code').val() + "&LeavePeriodTo=" + $('#LeavePeriodTo_Code').val() + "&Leave=" + $('#Leave_Code').val() + "&Month=" + $('#Month_Code').val() + "&LPFrom=" + $('#LeavePeriodFrom_Code option:selected').text() + "&LPTo=" + $('#LeavePeriodTo_Code option:selected').text() + "&LGName=" + $('#LeaveGroup_Code option:selected').text() + "&LName=" + $('#Leave_Code option:selected').text() + "&MName=" + $('#Month_Code option:selected').text();
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
        $.ajax({

            type: 'POST',
            url: '/TimeOffice/LeaveCarryForward/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('basicFilter');

                $('#leaveCarryForwardList').html("");
                $('#leaveCarryForwardList').html(result);

                $('#leaveCarryForwardList').removeClass('hide');

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
            url: '/TimeOffice/LeaveCarryForward/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#leaveCarryForwardList').html("");
                $('#leaveCarryForwardList').html(result);

                $('#leaveCarryForwardList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}