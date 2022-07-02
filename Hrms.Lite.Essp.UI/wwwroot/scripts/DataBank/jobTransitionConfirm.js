var prevTab = 'all';
var currentTab = 0;  //code for 'all'
function ontabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    //var searchID = $("#Filter_Code").val();;
    //var url = "/DataBank/JobTransitionConfirmation/GetJobTransitionConfirmList";
    //$('#jobTransition-Confirm-Approval-Pending-List').load(url, { TabIndex: TabIndex, SearchId: searchID }, function () { });
    ApplyFilter('apply');
    prevTab = Tab;
     
   
   
}

function onFilterDropdownChange(SearchId) {
    debugger;

    //var url = "/DataBank/JobTransitionConfirmation/GetJobTransitionConfirmList";
   
    //var search = SearchId.value;
    //$('#jobTransition-Confirm-Approval-Pending-List').load(url, { TabIndex: currentTab, SearchId: search }, function () { });
    ApplyFilter('reset');
}

function onExportToExcelClick() {
    debugger;
    var searchid = $('#Filter_Code').val();

    var TableLength = document.getElementById("jobTransitionConfirmationTable").rows.length - 1;
    if (TableLength > 0) {
        url = "/DataBank/JobTransitionConfirmation/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchid;
        window.location.href = url;
    }
    else {
        swal.fire("No data found to export");
    }
}


function ApplyFilter(mode) {
    debugger
    var tabIndex = $('#Tabindex').val();
    var search = $('#SearchId').val();
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#Filter_Code').val())
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/JobTransitionConfirmation/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#jobTransition-Confirm-Approval-Pending-List').html("");
                    $('#jobTransition-Confirm-Approval-Pending-List').html(result);

                    $('#jobTransition-Confirm-Approval-Pending-List').removeClass('hide');

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
                url: '/DataBank/JobTransitionConfirmation/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#jobTransition-Confirm-Approval-Pending-List').html("");
                    $('#jobTransition-Confirm-Approval-Pending-List').html(result);

                    $('#jobTransition-Confirm-Approval-Pending-List').removeClass('hide');

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
            url: '/DataBank/JobTransitionConfirmation/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#jobTransition-Confirm-Approval-Pending-List').html("");
                $('#jobTransition-Confirm-Approval-Pending-List').html(result);

                $('#jobTransition-Confirm-Approval-Pending-List').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}
