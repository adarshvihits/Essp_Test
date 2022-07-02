var prevTab = 'all';
var currentTab = 'All';
function tabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");    
    var url = "/DataBank/IndustryBenchmarkSalary/GetIndustryBenchmarkSalaryList";
    //$('#IndustryBenchmarkSalaryList').load(url, { TabIndex: TabIndex}, function () { });
    ApplyFilter('apply');
    prevTab = Tab;
}
function onAddBenchmarkSalaryClick() {
    debugger;
    $('#EmpCode').val("");
    var url = "/DataBank/IndustryBenchmarkSalary/AddBenchmarkSalary";
    $('#addBenchmarkSalary').load(url, {}, function () { });
    $('#addBenchmarkSalary').removeClass('hide');
}


function SaveIndustryBenchmarkSalary() {
    debugger;
    

    /*console.log($('#Save-IndustryBenchmarkSalary').serialize());*/
        $.ajax({

            type: 'POST',
            url: '/DataBank/IndustryBenchmarkSalary/Create',
            dataType: 'json',
            data: $('#Save-IndustryBenchmarkSalary').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire("Saved Successfully").then(function () {
                        CloseSlider('addBenchmarkSalarySlider');
                        //var url = "/DataBank/IndustryBenchmarkSalary/Index";

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

function onExportToExcelClick() {
    debugger;    

    var benchmarkTableLength = document.getElementById("industryBenchmarkSalaryTable").rows.length - 1;
    if (benchmarkTableLength > 0) {
        url = "/DataBank/IndustryBenchmarkSalary/ExportToExcel?TabIndex=" + currentTab;
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
    //$("#SearchId").val($('#DurationwiseFilterSlab_Code').val())
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/IndustryBenchmarkSalary/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#IndustryBenchmarkSalaryList').html("");
                    $('#IndustryBenchmarkSalaryList').html(result);

                    $('#IndustryBenchmarkSalaryList').removeClass('hide');

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
                url: '/DataBank/IndustryBenchmarkSalary/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#IndustryBenchmarkSalaryList').html("");
                    $('#IndustryBenchmarkSalaryList').html(result);

                    $('#IndustryBenchmarkSalaryList').removeClass('hide');

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
            url: '/DataBank/IndustryBenchmarkSalary/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#IndustryBenchmarkSalaryList').html("");
                $('#IndustryBenchmarkSalaryList').html(result);

                $('#IndustryBenchmarkSalaryList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}