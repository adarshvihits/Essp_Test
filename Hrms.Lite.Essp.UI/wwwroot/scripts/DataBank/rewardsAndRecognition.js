var prevTab = 'AllTabRewards';
var currentTab = 0;
var Tab_Name = 'All';
function Tab(TabId, spanName,TabName) {
    debugger
    currentTab = TabId;
    var searchid = $('#RewardsAndRecognitionFilterCombo_Code').val();

    $("." + prevTab).removeClass("active");
    $("." + spanName).addClass("active");
   

    
    if (TabId == 1001) {
        ApplyFilter('apply');
        $(".Rewardsfilter").show();
       
    }
    else if (TabId == 1002) {
        ApplyFilter('apply');
        $(".Rewardsfilter").hide();
       
    }
    else
    {
        ApplyFilter('apply');
        $(".Rewardsfilter").show();
      
    }
    prevTab = spanName;
    Tab_Name = TabName;
}
//function PendingRecommendationTabRewards(TabId, TabName) {
//    debugger;

//    currentTab = TabId;
//    $("." + prevTab).removeClass("active");
//    $("." + TabName).addClass("active");
//    var url = "/DataBank/RewardsAndRecognition/Pending";
//    $("#PendingRecommendationsPartial").load(url, { TabIndex: TabId},function () {
//    });
 
//    $(".Rewardsfilter").hide();
//    $("#rewardsListPartial").addClass('hide');
//    $('#PendingRecommendationsPartial').removeClass('hide');
//    $('#PointsSummaryPartial').addClass('hide');
//    prevTab = TabName;
   
//}
//function PointsSummaryTabRewards(TabId, TabName) {
//    debugger;
 
//    currentTab = TabId;
//    $("." + prevTab).removeClass("active");
//    $("." + TabName).addClass("active");
//    var searchId = $('#RewardsAndRecognitionFilterCombo_Code').val();
//    var url = "/DataBank/RewardsAndRecognition/PointSummary";
//    $("#PointsSummaryPartial").load(url, { TabIndex: TabId, SearchId: searchId }, function () {
//    });
//    $(".Rewardsfilter").show();
//    $('#PointsSummaryPartial').removeClass('hide');
//    $('#PendingRecommendationsPartial').addClass('hide');
//    $("#rewardsListPartial").addClass('hide');
//    prevTab = TabName;
 
//}
//function AllTabRewards(TabId, TabName) {
//    debugger;

//    currentTab = TabId;
//    $("." + prevTab).removeClass("active");
//    $("." + TabName).addClass("active");
//    var searchId = $('#RewardsAndRecognitionFilterCombo_Code').val();
//    var url = "/DataBank/RewardsAndRecognition/Tab";
//    $("#rewardsListPartial").load(url, { TabIndex: TabId, SearchId:searchId }, function () {
//    });


//    $('#PendingRecommendationsPartial').addClass('hide');
//    $('#rewardsListPartial').removeClass('hide');
//    $('#PointsSummaryPartial').addClass('hide');
//    prevTab = TabName;

//}
function onFilterDropdownChange(SearchId) {
    debugger;
   var  TabIndex = currentTab;
    var url = "/DataBank/RewardsAndRecognition/Tab";
    var search = SearchId.value;
    if (currentTab != 1001) {
        ApplyFilter('apply');
        $('#PointsSummaryPartial').addClass('hide');
        $('#rewardsListPartial').removeClass('hide');
    }
    else {

        ApplyFilter('apply');
        $('#PointsSummaryPartial').removeClass('hide');
        $('#rewardsListPartial').addClass('hide');
    }
}

function onfilterClick()
{
    debugger
    var tabIndex = currentTab;
    var searchId = $('#RewardsAndRecognitionFilterCombo_Code').val();
    var url = "/DataBank/RewardsAndRecognition/ApplyFilter?TabIndex=" + tabIndex + '&SearChId=' + searchId;
    $('body').append('<div class="form-overlay"></div>');
    $('#FilterPartial').load(url, function () { });
}

function onEmployeeClick(RewardsAndRecognitionGI, EmployeeGI, Tab) {
    debugger;
    if (Tab == 'All') {
        var url = "/DataBank/RewardsAndRecognition/RewardsAndRecognitionDetails";
        $('body').append('<div class="form-overlay"></div>');
        $('.rewardDT').load(url, { RewardsAndRecognitionGI: RewardsAndRecognitionGI, EmployeeGI: EmployeeGI }, function () { });

        $('#RewardDtSlider').removeClass('hide');
        /* $('.rewardDT').show();*/
    }
    else if (Tab == 'pending') {
        var url = "/DataBank/RewardsAndRecognition/RewardsApprove";
        $('body').append('<div class="form-overlay"></div>');
       // window.location.href = url + "?RewardsAndRecognitionGI=" + RewardsAndRecognitionGI + "&EmployeeGI=" + EmployeeGI;
        $('#ApproveSlider').load(url, { RewardsAndRecognitionGI: RewardsAndRecognitionGI, EmployeeGI: EmployeeGI }, function () { });


   
    }
}

function onEmployeeSummaryClick(EmployeeGI) {
    debugger;
    var searchId = $('#RewardsAndRecognitionFilterCombo_Code').val();
    var url = "/DataBank/RewardsAndRecognition/EmployeeSummary";
       $('body').append('<div class="form-overlay"></div>');
    $('.pointSummaryDT').load(url, { EmployeeGI: EmployeeGI, SearchId: searchId, }, function () { });
        $('#pointSummaryDTSlider').removeClass('hide');

    }


function onPointCriteriaChange(sender, spanId)
{
    debugger;
    var code = $(sender).val();
    if (code == 0) {
        $("#" + spanId + "").addClass('error-message');
        $(sender).addClass('is-invalid');
        $("#" + spanId + "").html("This field is required");
    }
    else {
        $("#" + spanId + "").removeClass('error-message');
        $(sender).removeClass('is-invalid');
        $("#" + spanId + "").html("");

        $.getJSON("/DataBank/RewardsAndRecognition/GetPoints", { PointCriteriaCode: code }, function (data) {
            debugger;
            console.log(data);
            $('.Points').html(data);
        });
    }
}



    function onRewardChange(sender, spanId)
  {

        var code = $(sender).val();
        if (code == 0) {
            $("#" + spanId + "").addClass('error-message');
            $(sender).addClass('is-invalid');
            $("#" + spanId + "").html("This field is required");
        }
        else {
            $("#" + spanId + "").removeClass('error-message');
            $(sender).removeClass('is-invalid');
            $("#" + spanId + "").html("");
            $.getJSON("/DataBank/RewardsAndRecognition/GetPointCriteria", { RewardCode: code }, function (data) {
                console.log(data);
                $('#PointCriteria_Code option').remove();
                $('#PointCriteria_Code').append('<option value>Select Point Criteria</option');
                debugger;
                for (var i = 0; i < data.length; i++) {
                    $('#PointCriteria_Code').append('<option value="' + data[i].code + '">' + data[i].name + '</option');
                }

            });
        }
}



function OnEmployeeChange(sender) {
    debugger;
    var EmpCode = $(sender).val();
    var url = "/DataBank/RewardsAndRecognition/EmployeeCard";
    $('.search-profile-details').load(url, { EmpCode: EmpCode }, function () { });
    $('.search-profile-details').show(300);

}
function onRewardLogClick(RewardsAndRecognitionGI) {
    debugger;
 
    var url = "/DataBank/RewardsAndRecognition/RewardLogDetails";
    $('.rewardHistory').load(url, { RewardsAndRecognitionGI: RewardsAndRecognitionGI }, function () { });
    $('#RewardLogDetailsSlider').removeClass('hide');
    $('.rewardHistory').show();
}

function onNewRequestClickRewards() {
    debugger;
  /*  var Code = 1;*/
    var url = "/DataBank/RewardsAndRecognition/NewRequest";
    $('.newRequestDiv').load(url, function () { });
    $('#newRequestRewardsSlider').removeClass('hide');
    $('.newRequestDiv').show();
}

function viewFileFromPointSummary(index)
{
    debugger;
 /*   RewardsLog_0__RewardsRequest_File_AbsoluteUri*/
    var AbsoluteURI = $('#PointSummaryDT_' + index + '__File_AbsoluteUri').val();
    window.open(AbsoluteURI, "_bank");
}
function viewFile() {
    debugger;
    var AbsoluteURI = $('#File_AbsoluteUri').val();
    if (AbsoluteURI == "") {
        swal.fire("No file Uploaded")
    }
    else {
        window.open(AbsoluteURI);
    }
}

function viewFileFromDT() {
    debugger;
    var AbsoluteURI = $('#RewardsRequest_File_AbsoluteUri').val();
    /*window.open(AbsoluteURI, "_bank");*/
    if (AbsoluteURI == "") {
        swal.fire("No file Uploaded")
    }
    else {
        window.open(AbsoluteURI);
    }
}
function Delete(RewardsAndRecognitionGI) {
    debugger;
    url = "/DataBank/RewardsAndRecognition/Delete?RewardsAndRecognitionGI=" + RewardsAndRecognitionGI;
    window.location.href = url;
}
function  ExportToExcel() {
    debugger;
    var searchId = $('#RewardsAndRecognitionFilterCombo_Code').val();
    searchName = $('#RewardsAndRecognitionFilterCombo_Code option:selected').text();

    url = "/DataBank/RewardsAndRecognition/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchId + "&SearchName=" + searchName + "&TabName=" + Tab_Name;
    if (currentTab == 1002)
    {
                var TableLength = document.getElementById("rewAndRecPendingTable").rows.length - 1;
                if (TableLength > 1) {
                 
                    window.location.href = url;
                }
                else {
                    swal.fire("No data found to export");
                }
    }
    else if (currentTab == 1001)
    {
                var TableLength = document.getElementById("rewAndRecPointSumTable").rows.length - 1;
                if (TableLength > 1) {
                   
                        window.location.href = url;
                    }
                    else {
                        swal.fire("No data found to export");
                    }
    }
    else
    {
                var  TableLength = document.getElementById("rewAndRecogTable").rows.length - 1;
                if (TableLength > 1) {
                   
                    window.location.href = url;
                }
                else {
                    swal.fire("No data found to export");
                }
    }
}

function CheckExtensionAndSize(e) {
    debugger;


    var size = $(e)[0].files[0].size; //Size is in Bytes
    var filename = $(e)[0].files[0].name;
    var fileExtension = ['jpeg', 'jpg', 'png', 'bmp', 'pdf'];
    if (size > 1024 * 1024)  //1,048,576 Bytes=1 MB
    {
        swal.fire('File size cannot exceeds 1 MB');
        $(e).val('');
    }
    if ($.inArray($(e).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        swal.fire("Only pdf, Jpeg,Jpg,Png and bmp files are allowed");
        $(e).val('');
    }

}

function Preview()
{
    debugger
    var path = URL.createObjectURL($('.PreviewImage')[0].files[0]);
    window.open(path, "_blank");
}


function validateRewardsRecognition()
{
    debugger
    if (!validateById('#Rewards_Code', 'reward')) 
        return false;

   else if (!validateById('#PointCriteria_Code', 'pointCriteria'))
        return false;
    else if (!validateById('#RewardDate', 'rewardDate'))
        return false;
      else if (!validateById('#RewardRecommendedBy', 'recommendedBy'))
        return false;
    else if (!validateById('#RecommendedFor', 'recommendedFor'))
        return false;
      
    else if (!RemarksLimitCheck('Remarks')) {
        return false;
    }
    else {
        return true;
    }
    
}





function ApplyFilter(mode)
{
    debugger
    var tabIndex = $('#Tabindex').val();
    var search = $('#SearchId').val();
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#RewardsAndRecognitionFilterCombo_Code').val())
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/RewardsAndRecognition/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                 
                    CloseSlider('basicFilter');
                    $('#rewardsListPartial').html("");
                    $('#rewardsListPartial').html(result);
                   
                },


                error: function (xhr, textStatus, errorThrown) {
                    swal.fire(textStatus);
                }
            });
            $('#filterForm').removeClass('filter-apply');
        }
        else {
            $.ajax({

                type: 'POST',
                url: '/DataBank/RewardsAndRecognition/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    //console.log(result);
                    CloseSlider('basicFilter');
                    $('#rewardsListPartial').html("");
                    $('#rewardsListPartial').html(result);
                },


                error: function (xhr, textStatus, errorThrown) {
                    swal.fire(textStatus);
                }
            });
            $('#filterForm').addClass('filter-apply');
        }
       
    }
    else
    {
        filterApplicable = 1;
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        $.ajax({

            type: 'POST',
            url: '/DataBank/RewardsAndRecognition/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger
                
                $('#rewardsListPartial').html("");
                $('#rewardsListPartial').html(result);
            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
    }
   


