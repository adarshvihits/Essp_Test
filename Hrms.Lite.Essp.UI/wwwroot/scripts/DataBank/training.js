var prevTab = 'all';
var currentTab=0;
var TabName = 'All';
function onNewRequestClick() {
    debugger;
    $('#EmpCode').val("");
    var url = "/DataBank/Training/NewRequest";
    $('#newRequestSlider').load(url, {}, function () { });
    $('#newRequestSlider').removeClass('hide');
}

function OnEmpChange(sender) {
    debugger;
    var Code = $(sender).val();
    if (Code != 0) {
        var url = "/DataBank/Training/EmployeeCard";
        $('.search-profile-details').load(url, { EmpCode: Code }, function () { });
        $('.search-profile-details').show(300);
    }

}

function validateDuration(evt) {

    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
        swal.fire("Duration should be enter in hours");
        return false;
    }
    return true;
}

function onTrainingNameChange(sender) {
    debugger;
    var cid = $(sender).val();
    
    $.getJSON("/DataBank/Training/GetTrainingType", { TrainingCode: cid }, function (data) {
        debugger;
        console.log(data);
        console.log(data.trainingRequest.type);
        $('.trainingType').html(data.trainingRequest.type);
        if (data.trainingRequest.trainingAssessmentMode.code == 1) //rating
        {
            $('.score').addClass('hide');
            $('.rating').removeClass('hide');
        }
        else {
            $('.rating').addClass('hide');
            $('.score').removeClass('hide');
        }
        
    });
    
}
function onEmployeeClick(EmployeeTrainingGI, EmployeeGI, Tab) {
    debugger;
    if (Tab == 'All') {
        //var AssetAllocationGI = "0D9D1593-119F-46FE-8848-804D035A10F7"
        var url = "/DataBank/Training/TrainingDetails";
        //window.location.href = url + '?AssetAllocationGI=' + AssetAllocationGI;
        //var EmployeeGI = $('#EmployeeGI').val()
        //var EmployeeGI = "0D9D1593-119F-46FE-8848-804D035A10F7"
        $('body').append('<div class="form-overlay"></div>');
        $('#trainingDetails').load(url, { EmployeeTrainingGI: EmployeeTrainingGI, EmployeeGI: EmployeeGI }, function () { });

        $('#trainingDetails').removeClass('hide');        
    }
}

function tabClick(Tab,TabIndex,CurrentTabName) {
    debugger;
    currentTab = TabIndex;
    TabName = CurrentTabName;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");    
    //if ($('#FilterList_Code').val() != 0)
        var searchid = $('#FilterList_Code').val();
    //else
        //var searchid = 3;
    var url = "/DataBank/Training/GetTrainingList";
    //$('#trainingList').load(url, { TabIndex: TabIndex, SearchId: searchid }, function () { });
    ApplyFilter('apply');
    prevTab = Tab;
}
function onFilterDropdownChange(TabIndex, SearchId) {
    debugger;
    var url = "/DataBank/Training/GetTrainingList";
    $("." + prevTab).removeClass("active");
    $(".all").addClass("active");
    var search = SearchId.value;

    //$('#trainingList').load(url, { TabIndex: TabIndex, SearchId: search }, function () { });    
    ApplyFilter('apply');

}
function onLogFilterDropdownChange(SearchId) {
    debugger;
    var url = "/DataBank/Training/GetTrainingLogList";    
    var search = SearchId.value;
    var EmployeeGI = $('#EmployeeGI').val();
    //.location.href = url + '?EmployeeGI=' + EmployeeGI + '&SearchId=' + search;
    $('#trainingLog').load(url, { EmployeeGI: EmployeeGI, SearchId: search }, function () { });    
}

function onStarRatingClick(rating) {
    $('#TrainingRequest_TrainingAssessmentMode_Code').val(rating);
    //alert(rating);
}


function onDeleteTraining(EmployeeTrainingGI) {
    url = "/DataBank/Training/TrainingDelete?EmployeeTrainingGI=" + EmployeeTrainingGI;
    window.location.href = url;
}
function onExportToExcelClick() {
    debugger;
    if ($('#FilterList_Code').val() != 0)
        var searchid = $('#FilterList_Code').val();
    else
        var searchid = 3;
    
        var pendingTableLength = document.getElementById("trainingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            //url = "/DataBank/Training/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchid;
            //window.location.href = url;

            $.ajax({

                type: 'POST',
                url: '/DataBank/Training/ExportExcel',
                dataType: 'json',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    //CloseSlider('basicFilter');

                    //$('#trainingList').html("");
                    //$('#trainingList').html(result);

                    //$('#trainingList').removeClass('hide');
                    url = "/DataBank/Training/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchid + "&TabName=" + TabName;
                    window.location.href = url;

                    //$('#rewardsListPartial').addClass('hide');               
                },


                error: function (xhr, textStatus, errorThrown) {
                    swal.fire(xhr.responseText);
                }
            });


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
    $("#SearchId").val($('#FilterList_Code').val())
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/Training/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#trainingList').html("");
                    $('#trainingList').html(result);

                    $('#trainingList').removeClass('hide');

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
            url: '/DataBank/Training/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('basicFilter');
               
                    $('#trainingList').html("");
                    $('#trainingList').html(result);

                    $('#trainingList').removeClass('hide');
                    
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
            url: '/DataBank/Training/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');
                

                    $('#trainingList').html("");
                    $('#trainingList').html(result);

                    $('#trainingList').removeClass('hide');                    
                    //$('#rewardsListPartial').addClass('hide');
               
            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}