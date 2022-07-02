var currentTab=0;
var prevTab='all';
var currentTabName = 'All';
var searchName = 'Allocated';
function onNewRequestClick() {
    debugger;
    var Code = 1;
    var url = "/DataBank/Appraisal/NewRequest";
    $('.add-appraisal').load(url, { EmpCode: Code }, function () { });
    $('#newRequestSlider').removeClass('hide');
    $('.add-appraisal').show();
}
function OnEmpChange(sender) {
    debugger;
    var Code = $(sender).val();
    if (Code != 0) {
        var url = "/DataBank/Appraisal/EmployeeCard";
        $('.search-profile-details').load(url, { EmpCode: Code }, function () { });
        $('.search-profile-details').show(300);

    }
}
function CloseSlider(id) {
    $("." + id).removeClass('slider-forms-open');
    $(".form-overlay").remove();
}

function onAppraisalEvaluationPeriodClick(AppraisalTrnGI) {
    debugger;
    var Code = 1;
    // var AssetAllocationGI = $(AssetAllocationGI).val();
    //alert($('#EmployeeGI').val());
    var EmployeeGI = $('#EmployeeGI').val();
    /*alert(EmployeeGI);*/
    var url = "/DataBank/Appraisal/AppraisalLogDetails";
    $('#AppraisalLogDetails').load(url, { AppraisalTrnGI: AppraisalTrnGI, EmployeeGI: EmployeeGI }, function () { });
    $('#AppraisalLogDetails').removeClass('hide');
    /* $('.assethistory').show();*/
}
function AllTab(Tab,TabName) {
    debugger;
    currentTab = Tab;
    currentTabName = TabName;
    var searchid = $('#DurationwiseFilterSlab_Code').val();
    var url = "/DataBank/Appraisal/AppraisalTabs";
   /* $('#pending').addClass('hide');*/
    $(".tab1").removeClass("active");
    $(".tab2").removeClass("active");
    $(".tab3").removeClass("active");
    $(".tab4").removeClass("active");
    $(".more").removeClass("active");
    $("#pendingreq").removeClass("active");
    /*$('#DisciplinaryIncList').removeClass('hide');*/
    $(".all").addClass("active");
    //$('#AppraisalList').load(url, { TabIndex: Tab, SearchId: searchid }, function () { });
    ApplyFilter('apply');
    $(".filterList").show();
}
//Need to add after pending req from essp
//function PendingRequestsTab(Tab, TabName) {
//    debugger;
//    currentTab = Tab;
//    currentTabName = TabName;
//    $('#TabCode').val(Tab);
//    var url = "/DataBank/AssetAllocation/Pending";
//    $(".filterList").hide();
//    $(".assetlist").hide();
//    $(".pendingreq").addClass("active");
//    $('#assetAllocList').addClass('hide');
//    $(".all").removeClass("active");
//    $("." + prevTab).removeClass("active");
//    $('#pending').removeClass('hide');
//    $(".tab1").removeClass("active");
//    $("#pending").load(url, { TabIndex: Tab }, function () {
//    });
//}

function Tab(Tab, TabId, TabName) {
    debugger;
    currentTab = Tab;
    currentTabName = TabName;
    //alert($('#AssetAllocationFilter_Code').val());
    var searchid = $('#DurationwiseFilterSlab_Code').val();
    searchName = $('#DurationwiseFilterSlab_Code option:selected').text();
    //$('#pending').addClass('hide');
    //$(".pendingreq").removeClass("active");
    $(".all").removeClass("active");
    $("." + prevTab).removeClass("active");
    $("." + TabId).addClass("active");
    var url = "/DataBank/Appraisal/AppraisalTabs";
    /*$('#AppraisalList').removeClass('hide');*/
    //$('#AppraisalList').load(url, { TabIndex: Tab, SearchId: searchid }, function () { });
    ApplyFilter('apply');
   /* $(".filterList").show();*/
   prevTab = TabId
}

function onEmployeeClick(AppraisalGI, EmployeeGI, Tab) {
    debugger;
    if (Tab == 'All') {
        //var AssetAllocationGI = "0D9D1593-119F-46FE-8848-804D035A10F7"
        var url = "/DataBank/Appraisal/AppraisalDetails";
        //window.location.href = url + '?AssetAllocationGI=' + AssetAllocationGI;
        //var EmployeeGI = $('#EmployeeGI').val()
        $('body').append('<div class="form-overlay"></div>');
        $('.delete-appraisal').load(url, { AppraisalGI: AppraisalGI, EmployeeGI: EmployeeGI }, function () { });

        $('#newDeleteRequestSlider').removeClass('hide');
        $('.delete-appraisal').show();
    }
    else if (Tab == 'Pending') {
        var url = "/DataBank/Appraisal/Issue";
        $('body').append('<div class="form-overlay"></div>');
        $('.issuepending').load(url, { AppraisalGI: AppraisalGI, EmployeeGI: EmployeeGI }, function () { });
        $('#issue').removeClass('hide');
        $('.issuepending').show();
    }

}
function onDeleteAppraisal(AppraisalGI) {
    debugger;
    url = "/DataBank/Appraisal/AppraisalDelete?AppraisalGI=" + AppraisalGI;
    window.location.href = url;
}
function onStarRatingClick(rating) {
    /*alert(rating);*/
    $('#AppraisalRequest_SelfRating_Code').val(rating);
}
function onStarRatingClick2(rating) {
    /*alert(rating);*/
    $('#AppraisalRequest_AppraiserRating_Code').val(rating);
}
function onStarRatingClick3(rating) {
   /* alert(rating);*/
    $('#AppraisalRequest_ReviewerRating_Code').val(rating);
}

function onFilterDropdownChange(SearchId) {
    debugger;
    var url = "/DataBank/Appraisal/AppraisalTabs";
    $("." + prevTab).removeClass("active");
    $(".all").addClass("active");
    var search = SearchId.value;

    //$('#AppraisalList').load(url, { TabIndex: currentTab, SearchId: search }, function () { });
    ApplyFilter('apply');

}

function onAppraisalTypeChange(AppraisalCode,id) {
    debugger;
    validate(AppraisalCode, id);
    var cid = $(AppraisalCode).val();

    $.getJSON("/DataBank/Appraisal/GetAppraisalType", { AppraisalTypeCode: cid }, function (data) {
        debugger;
        console.log(data);
        //$('.trainingType').html(data.trainingRequest.type);
        if (data.assesmentMode == 1) //rating
        {
            $('.text-box').addClass('hide');
            $('.rating').removeClass('hide');
        }
        else {
            $('.rating').addClass('hide');
            $('.text-box').removeClass('hide');
        }

    });

}

function ExportToExcel() {
    debugger;
    var searchId = $('#DurationwiseFilterSlab_Code').val();
    searchName = $('#DurationwiseFilterSlab_Code option:selected').text();
    alert(searchId);
    alert(searchName);
    var TabName = $("#AppraisalTabs_" + currentTab + "__Name").val();
    alert(TabName);
    //url = "/DataBank/RewardsAndRecognition/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchId + "&SearchName=" + searchName + "&TabName=" + TabName;
    //if (currentTab == 1001) {
    //    var TableLength = document.getElementById("rewAndRecPendingTable").rows.length - 1;
    //    if (TableLength > 0) {

    //        window.location.href = url;
    //    }
    //    else {
    //        swal.fire("No data found to export");
    //    }
    //}
    //else if (currentTab == 1002) {
    //    var TableLength = document.getElementById("rewAndRecPointSumTable").rows.length - 1;
    //    if (TableLength > 0) {

    //        window.location.href = url;
    //    }
    //    else {
    //        swal.fire("No data found to export");
    //    }
    //}
    //else {
    //    var TableLength = document.getElementById("rewAndRecogTable").rows.length - 1;
    //    if (TableLength > 0) {

    //        window.location.href = url;
    //    }
    //    else {
    //        swal.fire("No data found to export");
    //    }
    //}
}
function ApplyFilter(mode) {
    debugger
    var tabIndex = $('#Tabindex').val();
    var search = $('#SearchId').val();
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#DurationwiseFilterSlab_Code').val())
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/Appraisal/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#AppraisalList').html("");
                    $('#AppraisalList').html(result);

                    $('#AppraisalList').removeClass('hide');

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
                url: '/DataBank/Appraisal/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#AppraisalList').html("");
                    $('#AppraisalList').html(result);

                    $('#AppraisalList').removeClass('hide');

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
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        $.ajax({

            type: 'POST',
            url: '/DataBank/Appraisal/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#AppraisalList').html("");
                $('#AppraisalList').html(result);

                $('#AppraisalList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}

function process(input) {
    debugger;
    let value = input.value;
    let numbers = value.replace(/[^0-9]/g, "");
    input.value = numbers;
}
