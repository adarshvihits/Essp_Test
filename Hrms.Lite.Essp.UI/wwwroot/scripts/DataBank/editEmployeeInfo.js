var prevTab = 'tab1';
var currentTab = 0;
function tabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    
    //var url = "/DataBank/EditEmployeeInfo/GetList";
    //$('#editEmployeeList').load(url, { TabIndex: TabIndex, SearchId: 0 }, function () { });

    ApplyFilter('apply');

    prevTab = Tab;
}



function onEmployeeClick(EmployeeGI, LogGI) {
    var url = "/DataBank/EditEmployeeInfo/EditEmployeeLog?EmployeeGI=" + EmployeeGI + "&LogGI=" + LogGI;
    window.location.href = url;
}


function onEditEmployeeClick() {
    //debugger;
    //$('#EmployeeId').val("");
    //var url = "/DataBank/EditEmployeeInfo/EditEmployee";
    //$('#editEmployee').load(url, {}, function () { });


    debugger;
    $('#EmployeeId').val("");
    var url = "/DataBank/EditEmployeeInfo/EditEmployee";
    $('#editEmployee').load(url, {}, function () { });
    $('#editEmployee').removeClass('hide');
}

function onApproveClick(EmployeeGI,LogGI) {
    var url = "/DataBank/EditEmployeeInfo/Approve?EmployeeGI=" + EmployeeGI+"&LogGI="+ LogGI;
    window.location.href = url;
}

function OnEmpChange(sender) {
    debugger;
    var Code = $(sender).val();
    if (Code != 0) {
        var url = "/DataBank/EditEmployeeInfo/EmployeeCard";
        $('.search-profile-details').load(url, { EmpCode: Code }, function () { });
        $('.search-profile-details').show(300);
    }

}
function onFilterComboChange(SearchId) {
    debugger;
    //var url = "/DataBank/EditEmployeeInfo/GetList";
    $("." + prevTab).removeClass("active");
    $(".all").addClass("active");
    //var search = SearchId.value;
    ApplyFilter('apply');
    //$('#editEmployeeList').load(url, { TabIndex: currentTab, SearchId: search }, function () { });  
}
function confirmReject() {

    if (confirm("Do you want to Confirm?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/DataBank/EditEmployeeInfo/Reject',
            dataType: 'json',
            data: $('#Approve').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {                       
                        var url = '/DataBank/EditEmployeeInfo/Index'
                        window.location.href = url;                       
                    });

                }
                else {
                    swal.fire(result.message).then(function () {


                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
    else {
        return false;
    }

}
function onExportToExcelClick() {
    debugger;
    if ($('#FilterCombo_Code').val() != 0)
        var searchid = $('#FilterCombo_Code').val();
    else
        var searchid = 3;
    if (currentTab == 0) {

        var editSummaryTableLength = document.getElementById("editSummaryTable").rows.length - 1;
        if (editSummaryTableLength > 0) {
            url = "/DataBank/EditEmployeeInfo/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchid;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var pendingTableLength = document.getElementById("pendingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/DataBank/EditEmployeeInfo/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchid;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}


function ApplyFilter(mode) {
    debugger
    var tabIndex = $('#Tabindex').val();
    var search = $('#SearchId').val();
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#FilterCombo_Code').val())
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/EditEmployeeInfo/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#editEmployeeList').html("");
                    $('#editEmployeeList').html(result);

                    $('#editEmployeeList').removeClass('hide');

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
                url: '/DataBank/EditEmployeeInfo/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#editEmployeeList').html("");
                    $('#editEmployeeList').html(result);

                    $('#editEmployeeList').removeClass('hide');

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
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        $.ajax({

            type: 'POST',
            url: '/DataBank/EditEmployeeInfo/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#editEmployeeList').html("");
                $('#editEmployeeList').html(result);

                $('#editEmployeeList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}