var LeavePeriod;
var LeaveGroup;
var Leave;
var LPName;
var LGName;
var LName;

function validateDropdowns() {
    if (validateById('#LeavePeriod_Code', 'levPeriod') && validateById('#LeaveGroup_Code', 'levGroup') && validateById('#Leave_Code', 'lev')) {
        return true;
    }
    else {
        return false;
    }
}

function getList() {
    LeavePeriod = $('#LeavePeriod_Code').val();
    LeaveGroup = $('#LeaveGroup_Code').val();
    Leave = $('#Leave_Code').val();
    LPName = $('#LeavePeriod_Code option:selected').text();
    LGName = $('#LeaveGroup_Code option:selected').text();
    LName = $('#Leave_Code option:selected').text();
    $('.reset').val('');
    $('#Optional_Filter_EmploymentStatus_Code').val(0);
    $('#filterForm').removeClass('filter-apply');
    if (validateDropdowns()) {
        var url = "/TimeOffice/LeaveOpening/GetList";
        $('#leaveOpeningList').load(url, { LeavePeriod: $('#LeavePeriod_Code').val(), LeaveGroup: $('#LeaveGroup_Code').val(), Leave: $('#Leave_Code').val() }, function () { });    
    }
}
function onEditClick(EmployeeGI) {
    $('body').append('<div class="form-overlay"></div>');
    var url = "/TimeOffice/LeaveOpening/GetEditDetails";
    $('#editLeaveOpening').load(url, { EmployeeGI: EmployeeGI, LeavePeriod: $('#LeavePeriod_Code').val(), LeaveGroup: $('#LeaveGroup_Code').val(), Leave: $('#Leave_Code').val() }, function () { }); 
}

function onBatchUpdateClick() {
    if (validateDropdowns()) {
        $('body').append('<div class="form-overlay"></div>');
        var url = "/TimeOffice/LeaveOpening/GetBatchUpdateDetails";
        $('#batchUpdate').load(url, { LeavePeriod: $('#LeavePeriod_Code').val(), LeaveGroup: $('#LeaveGroup_Code').val(), Leave: $('#Leave_Code').val() }, function () { });
    }
}


function BatchUpdate() {

    $.ajax({
        type: 'POST',
        url: '/TimeOffice/LeaveOpening/BatchUpdate',
        dataType: 'json',
        data: $('#BatchUpdate1').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    var url = "/TimeOffice/LeaveOpening/GetList";
                    $('#leaveOpeningList').load(url, { LeavePeriod: LeavePeriod, LeaveGroup: LeaveGroup, Leave: Leave }, function () { });
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


function EmployeeWiseLeaveOpeningSave() {
  
        $.ajax({
            type: 'POST',
            url: '/TimeOffice/LeaveOpening/Edit',
            dataType: 'json',
            data: $('#EmployeeWiseLeaveOpeningSave').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        var url = "/TimeOffice/LeaveOpening/GetList";
                        $('#leaveOpeningList').load(url, { LeavePeriod: $('#LeavePeriod_Code').val(), LeaveGroup: $('#LeaveGroup_Code').val(), Leave: $('#Leave_Code').val() }, function () { });
                        CloseSlider('leaveOpeningEdit');
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

        var leaveOpeningTableLength = document.getElementById("leaveOpeningTable").rows.length - 1;
        if (leaveOpeningTableLength > 0) {
            url = "/TimeOffice/LeaveOpening/ExportToExcel?LeavePeriod=" + $('#LeavePeriod_Code').val() + "&LeaveGroup=" + $('#LeaveGroup_Code').val() + "&Leave=" + $('#Leave_Code').val() + "&LPName=" + $('#LeavePeriod_Code option:selected').text() +"&LGName=" + $('#LeaveGroup_Code option:selected').text() + "&LName=" + $('#Leave_Code option:selected').text();
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
            url: '/TimeOffice/LeaveOpening/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('basicFilter');

                $('#leaveOpeningList').html("");
                $('#leaveOpeningList').html(result);

                $('#leaveOpeningList').removeClass('hide');

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
            url: '/TimeOffice/LeaveOpening/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#leaveOpeningList').html("");
                $('#leaveOpeningList').html(result);

                $('#leaveOpeningList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}