var prevTab = 'ActiveTab';
var currentTab = 0;
var Tab_Name = 'All';

function tabClick(Tab, TabIndex, TabName) {
    debugger;
    currentTab = TabIndex;
    currentTabName = TabName;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    //var url = "/DataBank/EmployeeProfile/GetEmployeeProfileList";
    //$('#activeListPartial').load(url, { TabIndex: TabIndex }, function () { });
    ApplyFilter('apply');
    prevTab = Tab;
}

function OnFinancialYearSelect() {
    debugger;
    FinancialYear = $('#FinancialYear_Code').val();
    FinancialYearName = $('#FinancialYear_Name').val();
    EmployeeGI = $("#EmployeeHeader_EmployeeGuid").val();;
    var url = "/DataBank/EmployeeProfile/GetEmployeeSalAttDetails";

    $('#tabSeven').load(url, { FinancialYear: FinancialYear, EmployeeGI: EmployeeGI }, function () { });
   
}

function ApplyFilter(mode) {
    debugger
    var tabIndex = $('#Tabindex').val();
    var search = $('#SearchId').val();
    $("#Tabindex").val(currentTab);
    //$("#SearchId").val($('#DurationwiseFilterSlab_Code').val())
    if (mode == 'apply') {
        $.ajax({

            type: 'POST',
            url: '/DataBank/EmployeeProfile/ApplyFilter',
            dataType: 'html',
            data: $('#AdvancedFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('basicFilter');

                $('#activeListPartial').html("");
                $('#activeListPartial').html(result);

                $('#activeListPartial').removeClass('hide');

                //$('#rewardsListPartial').addClass('hide');               
            },


            error: function (xhr, textStatus, errorThrown) {
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
            url: '/DataBank/EmployeeProfile/ApplyFilter',
            dataType: 'html',
            data: $('#AdvancedFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#activeListPartial').html("");
                $('#activeListPartial').html(result);

                $('#activeListPartial').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}
function ExportToExcel() {
    debugger;
    /*if (validateDropdowns()) {*/
    if (currentTab == 0) {
        var currentTabName = "Active";
        var ActiveListtableLength = document.getElementById("ActiveListtable").rows.length - 1;
        if (ActiveListtableLength > 0) {
            url = "/DataBank/EmployeeProfile/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 1) {
        var currentTabName = "Resigned";
        var ResignedListTableLength = document.getElementById("ActiveListtable").rows.length - 1;
        if (ResignedListTableLength > 0) {
            url = "/DataBank/EmployeeProfile/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
   /* }*/
}
