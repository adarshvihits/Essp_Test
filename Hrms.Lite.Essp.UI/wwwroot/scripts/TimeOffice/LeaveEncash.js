

function getList()
{
    debugger;
    if (validateDropdowns())
    {
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
    var url = "/TimeOffice/LeaveEncash/GetList";
    $('#leaveEncashList').load(url, { LeavePeriod: $('#LeavePeriod_Code').val(), LeaveGroup: $('#LeaveGroup_Code').val(), Leave: $('#Leave_Code').val(), Month: $('#Month_Code').val() }, function () { });
    }
    
}



function validateDropdowns()
{
    if (validateById('#LeavePeriod_Code', 'levPeriod') && validateById('#LeaveGroup_Code', 'leavGroup') && validateById('#Leave_Code', 'leav') && validateById('#Month_Code', 'Month')) {
        return true;
    }
    else {
        return false;
    }
}


function onBatchUpdateClick() {
    debugger;
    if (validateDropdowns()) {
        $('body').append('<div class="form-overlay"></div>');
        var url = "/TimeOffice/LeaveEncash/GetBatchUpdateDetails";
        $('#batchUpdate').load(url, { LeavePeriod: $('#LeavePeriod_Code').val(), LeaveGroup: $('#LeaveGroup_Code').val(), Leave: $('#Leave_Code').val(), Month: $('#Month_Code').val() }, function () { });
    }
}


function BatchUpdate() {
    debugger;
    $.ajax({
        type: 'POST',
        url: '/TimeOffice/LeaveEncash/BatchUpdate',
        dataType: 'json',
        data: $('#leaveencashBatchUpdate').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    var url = "/TimeOffice/LeaveEncash/GetList";
                    $('#leaveEncashList').load(url, { LeavePeriod: LeavePeriod, LeaveGroup: LeaveGroup, Leave: Leave, Month: Month }, function () { });
                    CloseSlider('BatchUpdateLeaveEncash1');
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

function onEditClick(EmployeeGI) {
    debugger;
    $('body').append('<div class="form-overlay"></div>');
    var url = "/TimeOffice/LeaveEncash/GetEditDetails";
    $('#leaveEncashEdit').load(url, { EmployeeGI: EmployeeGI, LeavePeriod: $('#LeavePeriod_Code').val(), LeaveGroup: $('#LeaveGroup_Code').val(), Leave: $('#Leave_Code').val(), Month: $('#Month_Code').val() }, function () { });
}



function EmployeeWiseLeaveEncashModify()
{
    debugger;
    $.ajax({
        type: 'POST',
        url: '/TimeOffice/LeaveEncash/Edit',
        dataType: 'json',
        data: $('#LeaveEncashEdit').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    var url = "/TimeOffice/LeaveEncash/GetList";
                    $('#leaveEncashList').load(url, { LeavePeriod: $('#LeavePeriod_Code').val(), LeaveGroup: $('#LeaveGroup_Code').val(), Leave: $('#Leave_Code').val(), Month: $('#Month_Code').val() }, function () { });
                    CloseSlider('EditLeaveEncashment');
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

//function ExportToExcel() {
//    debugger;
   

//    var TableLength = document.getElementById("LeaveEncashTable").rows.length - 1;
//    if (TableLength > 0) {
      
//        $.ajax({

//            type: 'POST',
//            url: '/TimeOffice/LeaveEncash/ExportExcel',
//            dataType: 'json',
//            data: $('#BasicFilter').serialize(),
//            success: function (result) {
//                debugger
              
//                url = "/TimeOffice/LeaveEncash/ExportToExcel?LeavePeriod=" + $('#LeavePeriod_Code').val() + "&LeaveGroup=" + $('#LeaveGroup_Code').val() + "&Leave=" + $('#Leave_Code').val() + "&Month=" + $('#Month_Code').val() + "&LPName=" + $('#LeavePeriod_Code option:selected').text() + "&LGName=" + $('#LeaveGroup_Code option:selected').text() + "&LName=" + $('#Leave_Code option:selected').text() + "&Mname=" + $('#Month_Code option:selected').text();
//                window.location.href = url;

                              
//            },


//            error: function (xhr, textStatus, errorThrown) {
//                swal.fire(xhr.responseText);
//            }
//        });


//    }
//    else {
//        swal.fire("No data found to export");
//    }
//}
function ExportToExcel() {
    debugger;
    if (validateDropdowns()) {

        var leaveOpeningTableLength = document.getElementById("LeaveEncashTable").rows.length - 1;
        if (leaveOpeningTableLength > 0) {
            url = "/TimeOffice/LeaveEncash/ExportToExcel?LeavePeriod=" + $('#LeavePeriod_Code').val() + "&LeaveGroup=" + $('#LeaveGroup_Code').val() + "&Leave=" + $('#Leave_Code').val() + "&Month=" + $('#Month_Code').val() + "&LPName=" + $('#LeavePeriod_Code option:selected').text() + "&LGName=" + $('#LeaveGroup_Code option:selected').text() + "&LName=" + $('#Leave_Code option:selected').text() + "&Mname=" + $('#Month_Code option:selected').text(); 
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
            url: '/TimeOffice/LeaveEncash/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('basicFilter');

                $('#leaveEncashList').html("");
                $('#leaveEncashList').html(result);

                $('#leaveEncashList').removeClass('hide');

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
        $.ajax({

            type: 'POST',
            url: '/TimeOffice/LeaveEncash/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#leaveEncashList').html("");
                $('#leaveEncashList').html(result);

                $('#leaveEncashList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
        $('#filterForm').removeClass('filter-apply');
    }
}