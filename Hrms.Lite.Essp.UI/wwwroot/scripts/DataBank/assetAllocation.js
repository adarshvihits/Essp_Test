var prevTab='all';
var currentTab = 0;
var currentTabName = 'All';
var searchName = 'Allocated';
function AllTab(Tab,TabName) {
    debugger;
    currentTab = Tab;
    currentTabName = TabName;
    $('#TabCode').val(Tab);
    var searchid = $('#AssetAllocationFilter_Code').val();
    searchName = $('#AssetAllocationFilter_Code option:selected').text();

    var url = "/DataBank/AssetAllocation/AssetTabs";
    $('#pending').addClass('hide');
    $(".pendingreq").removeClass("active");
    $(".tab1").removeClass("active");
    $(".tab2").removeClass("active");
    $(".tab3").removeClass("active");
    $(".more").removeClass("active");    
    $(".all").addClass("active");
    $('#assetAllocList').removeClass('hide');
    $('#assetAllocList').load(url, { TabIndex: Tab, SearchId: searchid }, function () { });
    $(".assetlist").show();   
    $(".filterList").show();
}
function PendingRequestsTab(Tab,TabName) {
    debugger;
    currentTab = Tab;
    currentTabName = TabName;
    $('#TabCode').val(Tab);
    var url = "/DataBank/AssetAllocation/Pending";
    $(".filterList").hide();
    $(".assetlist").hide();
    $(".pendingreq").addClass("active");
    $('#assetAllocList').addClass('hide');    
    $(".all").removeClass("active");
    $("." + prevTab).removeClass("active");
    $('#pending').removeClass('hide');
    $(".tab1").removeClass("active");
    $("#pending").load(url, { TabIndex: Tab }, function () {
    });
}
function Tab(Tab,TabId,TabName,mode) {
    debugger;    
    currentTab = Tab;
    currentTabName = TabName;
    $('#TabCode').val(Tab);
    //alert($('#AssetAllocationFilter_Code').val());
    var searchid = $('#AssetAllocationFilter_Code').val();
    searchName = $('#AssetAllocationFilter_Code option:selected').text();
    $('#pending').addClass('hide');
    $(".pendingreq").removeClass("active");
    $(".all").removeClass("active");
    $("." + prevTab).removeClass("active");
    $("." + TabId).addClass("active");    
    var url = "/DataBank/AssetAllocation/AssetTabs";
    $('#assetAllocList').removeClass('hide');    
    //$('#assetAllocList').load(url, { TabIndex: Tab, SearchId: searchid}, function () { });
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#AssetAllocationFilter_Code').val())
    ApplyFilter(mode);
    $(".assetlist").show();
    $(".filterList").show();
    prevTab = TabId
}

function tabClick(mode) {
    debugger;
    currentTab = $('#TabCode').val();
    currentTabName = $('#TabCode option:selected').text();
    var searchid = $('#AssetAllocationFilter_Code').val();
    searchName = $('#AssetAllocationFilter_Code option:selected').text();
    $("." + prevTab).removeClass("active");
    //$("." + Tab).addClass("active");
    //if ($('#FilterList_Code').val() != 0)
    if (currentTab == 0)
        prevTab = 'all'
    else if (currentTab == 1)
        prevTab = 'tab1';
    else if (currentTab == 2)
        prevTab = 'tab2';
    else if (currentTab == 3)
        prevTab = 'tab3';
    else if (currentTab == 1000)
        prevTab = 'more';
    else
        prevTab = 'pendingreq';

    $("." + prevTab).addClass("active");
    
    if (currentTab != 1001) {
        $('#assetFilter').removeClass('hide');
        $('#assetAllocList').removeClass('hide');
        $('#pending').addClass('hide');
        var url = "/DataBank/AssetAllocation/AssetTabs";
        //$('#assetAllocList').load(url, { TabIndex: currentTab, SearchId: searchid }, function () { });
        ApplyFilter(mode);
    }
    else {
        $('#assetFilter').addClass('hide');
        $('#assetAllocList').addClass('hide');
        $('#pending').removeClass('hide');
        var url = "/DataBank/AssetAllocation/Pending";
        ApplyFilter(mode);
        //$("#pending").load(url, { TabIndex: currentTab }, function () {});
            }
}


function onFilterBtnClick() {    

    //var url = "/DataBank/AssetAllocation/Filter";
    //window.location.href = url;
    //$('#filterSlider').load(url, {}, function () { });

    //$('body').append('<div class="form-overlay"></div>');
    //$('#filterSlider').removeClass('hide');
    //$(".assetAllocationFilter").addClass('slider-forms-open');
    //$('#filterSlider').show();    
    debugger;
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#AssetAllocationFilter_Code').val())
    var url = "/DataBank/AssetAllocation/Filter";
    $('.filterSlider').load(url, {}, function () { });
    $('#filterSlider').removeClass('hide');
    $('.filterSlider').show();
}


function ApplyFilter(mode) {
    debugger
    var tabIndex = $('#Tabindex').val();
    var search = $('#SearchId').val();
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#AssetAllocationFilter_Code').val())
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/AssetAllocation/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');
                    if (tabIndex != 1001) {

                        $('#assetAllocList').html("");
                        $('#assetAllocList').html(result);

                        $('#assetAllocList').removeClass('hide');
                        $('#pending').addClass('hide');
                        $(".filterList").show();
                        //$('#rewardsListPartial').addClass('hide');


                    }
                    else {
                        $(".filterList").hide();
                        $('#pending').html("");
                        $('#pending').html(result);
                        $('#pending').removeClass('hide');
                        $('#assetAllocList').addClass('hide');
                        //$('#PendingRecommendationsPartial').addClass('hide');

                    }
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
                url: '/DataBank/AssetAllocation/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');
                    if (tabIndex != 1001) {

                        $('#assetAllocList').html("");
                        $('#assetAllocList').html(result);

                        $('#assetAllocList').removeClass('hide');
                        $('#pending').addClass('hide');
                        $(".filterList").show();
                        //$('#rewardsListPartial').addClass('hide');


                    }
                    else {
                        $(".filterList").hide();
                        $('#pending').html("");
                        $('#pending').html(result);
                        $('#pending').removeClass('hide');
                        $('#assetAllocList').addClass('hide');
                        //$('#PendingRecommendationsPartial').addClass('hide');

                    }
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
            url: '/DataBank/AssetAllocation/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');
                if (tabIndex != 1001) {

                    $('#assetAllocList').html("");
                    $('#assetAllocList').html(result);

                    $('#assetAllocList').removeClass('hide');
                    $('#pending').addClass('hide');
                    //$('#rewardsListPartial').addClass('hide');


                }
                else {
                    $('#pending').html("");
                    $('#pending').html(result);
                    $('#pending').removeClass('hide');
                    $('#assetAllocList').addClass('hide');
                    //$('#PendingRecommendationsPartial').addClass('hide');

                }
            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}

function onFilterDropdownChange(SearchId) {
    debugger;
    var url = "/DataBank/AssetAllocation/AssetTabs";
    //$(".all").addClass("active");
    var search = SearchId.value;
    searchName = SearchId.text;
    TabIndex = currentTab;
    $('#AssetAllocationFilter_Code').val(search);
    $('.filterDropDown').val(search);
    $('#pending').addClass('hide');
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#AssetAllocationFilter_Code').val())
    if (search == 1) //Allocated
    {        
        $('#assetAllocList').removeClass('hide');        
        //$('#assetAllocList').load(url, { TabIndex: TabIndex, SearchId: search }, function () { });    
        ApplyFilter('apply');
        $(".filterList").show();
    }
    
    if (search == 2) //Asset In Stock
    {
        $('#assetAllocList').removeClass('hide');
        //$('#assetAllocList').load(url, { TabIndex: TabIndex, SearchId: search }, function () { });
        ApplyFilter('apply');
        $(".notAllocatedAssets").show();
        $(".filterList").show();
    }
    if (search == 3) //Due List
    {
        $('#assetAllocList').removeClass('hide');
        //$('#assetAllocList').load(url, { TabIndex: TabIndex, SearchId: search }, function () { });
        ApplyFilter('apply');
        $(".filterList").show();
    }
    if (search == 4) //Asset Issue History
    {
        $('#assetAllocList').removeClass('hide');
        //$('#assetAllocList').load(url, { TabIndex: TabIndex, SearchId: search }, function () { });
        ApplyFilter('apply');
        $(".filterList").show();
    }
    if (search == 5) //Damaged
    {
        $('#assetAllocList').removeClass('hide');
        //$('#assetAllocList').load(url, { TabIndex: TabIndex, SearchId: search }, function () { });
        ApplyFilter('apply');
        $(".filterList").show();
    }
}
function OnEmpChange(sender) {
    debugger;
    var Code = $(sender).val();
    if (Code != 0) {
    var url = "/DataBank/AssetAllocation/EmployeeCard";
    $('.search-profile-details').load(url, { EmpCode: Code }, function () { });
    $('.search-profile-details').show(300);
    }
   
}



function onEmployeeClick(AssetAllocationGI,EmployeeGI,Tab) {
    debugger;
    if (Tab == 'All') {
        //var AssetAllocationGI = "0D9D1593-119F-46FE-8848-804D035A10F7"
        var url = "/DataBank/AssetAllocation/AssetAllocationDetails";
        //window.location.href = url + '?AssetAllocationGI=' + AssetAllocationGI;
        //var EmployeeGI = $('#EmployeeGI').val()
        $('body').append('<div class="form-overlay"></div>');
        $('#assetaloc').load(url, { AssetAllocationGI: AssetAllocationGI, EmployeeGI: EmployeeGI }, function () { });

        $('#assetaloc').removeClass('hide');
        $('.edit-assets').show();
    }
    else if (Tab == 'Pending') {
        var url = "/DataBank/AssetAllocation/Issue";
        $('body').append('<div class="form-overlay"></div>');
        $('.issuepending').load(url, { AssetAllocationGI: AssetAllocationGI, EmployeeGI: EmployeeGI }, function () { });
        $('#issue').removeClass('hide');
        $('.issuepending').show();
    }
    else if (Tab == 'History') {
        var url = "/DataBank/AssetAllocation/AssetIssueHistoryDetails";
        $('body').append('<div class="form-overlay"></div>');
        $('.issueHistory').load(url, { AssetAllocationGI: AssetAllocationGI, EmployeeGI: EmployeeGI }, function () { });
        $('#assetIssueHistoryDetails').removeClass('hide');
        $('.issueHistory').show();
    }
    
}
function onAssetClick(AssetCode) {
    var url = "/DataBank/AssetAllocation/GetAssetDetails";
    $('body').append('<div class="form-overlay"></div>');
    $('.assetDetails').load(url, { AssetCode: AssetCode }, function () { });
    $('#assetDetailsSlider').removeClass('hide');
    $('.assetDetails').show();
}
function onNewRequestClick() {
    debugger;
    var url = "/DataBank/AssetAllocation/NewRequest";
    $('.add-assets').load(url, {}, function () { });    
    $('#newRequestSlider').removeClass('hide');
    $('.add-assets').show();
}





function validateDueDate(val, id) {
    debugger;
    if ($(val).val() == "") {
        $(val).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        
        var issueDate = new Date($('#AssetRequest_AssetIssueDate').val());
        var dueDate = new Date($(val).val());
        var d = new Date();
        var iDate = new Date(issueDate.toLocaleDateString());
        var dDate = new Date(dueDate.toLocaleDateString());

        if (iDate > dDate) {
            $(val).addClass('is-invalid');
            $("#" + id + "").addClass('error-message');
            $("#" + id + "").html("Due date should be greater than issued date");
            return false;
        }
        else {
            $(val).removeClass('is-invalid');
            $("#" + id + "").removeClass('error-message');
            $("#" + id + "").html("");
            return true;
        }
    }
}

function validateReturnDate(val, id) {
    debugger;
    if ($(val).val() == "") {
        $(val).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {        

        var issueDate = new Date($('#AssetRequest_AssetIssueDate').val());
        var dueDate = new Date($(val).val());
        var currDate = new Date();
        if (issueDate > dueDate) {
            $(val).addClass('is-invalid');
            $("#" + id + "").addClass('error-message');
            $("#" + id + "").html("Return date should be greater than issued date");
            return false;
        }       
        else {
            $(val).removeClass('is-invalid');
            $("#" + id + "").removeClass('error-message');
            $("#" + id + "").html("");
            return true;
        }
    }
}

function fillEmployeeDropdown() {
    debugger;
    $.getJSON("/DataBank/AssetAllocation/GetEmployees", {}, function (data) {
        debugger;
        $('#EmpId option').remove();
        $('#EmpId').append('<option value disabled selected hidden>--Select--</option');

        for (var i = 0; i < data.length; i++) {
            $('#EmpId').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
}

function onAssetLogClick(AssetAllocationGI) {
    debugger;
    var Code = 1;
   // var AssetAllocationGI = $(AssetAllocationGI).val();
    //alert($('#EmployeeGI').val());
    var EmployeeGI = $('#EmployeeGI').val()
    var url = "/DataBank/AssetAllocation/AssetLog";
    $('.assethistory').load(url, { AssetAllocationGI: AssetAllocationGI, EmployeeGI: EmployeeGI }, function () { });
    $('#assetlog').removeClass('hide');
    $('.assethistory').show();
}




function onAssetCategoryChange(sender,id) {

    debugger
    var cid = $(sender).val();
    if (cid == "") {
        $("#" + id + "").addClass('error-message');
        $(sender).addClass('is-invalid');
        $("#" + id + "").html("This field is required");
    }
    else {
        $("#" + id + "").removeClass('error-message');
        $(sender).removeClass('is-invalid');
        $("#" + id + "").html("");
    }
    $.getJSON("/DataBank/AssetAllocation/GetAsset", { AssetCategoryCode: cid }, function (data) {

        $('#AssetRequest_AssetName_Code option').remove();
        $('#AssetRequest_AssetName_Code').append('<option value>--Select Asset Name--</option');

        for (var i = 0; i < data.length; i++) {
            $('#AssetRequest_AssetName_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
}
function onAssetChange(sender,id) {
    debugger;
    var cid = $(sender).val();
    if (cid == 0) {
        $("#" + id + "").addClass('error-message');
        $(sender).addClass('is-invalid');
        $("#" + id + "").html("This field is required");
    }
    else {
        $("#" + id + "").removeClass('error-message');
        $(sender).removeClass('is-invalid');
        $("#" + id + "").html("");

        $.getJSON("/DataBank/AssetAllocation/GetAssetDescription", { AssetCode: cid }, function (data) {
            debugger;
            console.log(data);
            console.log(data.assetRequest.asset);
            $('.assetcode').html(data.assetRequest.asset.assetCode);
            var dop = formatDate(data.assetRequest.asset.dateOfPurchase);
            $('.dop').html(dop);
            $('.brd').html(data.assetRequest.asset.brand);
            $('.modelno').html(data.assetRequest.asset.modelNo);
            $('.cost').html(data.assetRequest.asset.cost);
            $('.issuingdept').html(data.assetRequest.asset.issuingDepartment.name);
            $('.condition').html(data.assetRequest.asset.condition.name);
            $('.spec').html(data.assetRequest.asset.specification);
        });
    }
}
function formatDate(dateObject) {
    debugger;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];


    var d = new Date(dateObject);
    var day = d.getDate();
    var month = monthNames[d.getMonth()];  //d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "-" + month + "-" + year;

    return date;
};

function onDeleteAssetAllocation(AssetAllocationGI) {
    swal.fire({
        text: "Do you want to delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            url = "/DataBank/AssetAllocation/AssetAllocationDelete?AssetAllocationGI=" + AssetAllocationGI;
            window.location.href = url;
        }
    });
}
function onExportToExcelClick() {
    debugger;
    var searchid = $('#AssetAllocationFilter_Code').val();
    searchName = $('#AssetAllocationFilter_Code option:selected').text();
    var url = "/DataBank/AssetAllocation/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchid + "&TabName=" + currentTabName + "&SearchName=" + searchName;

    if (currentTab == 1001) {
        var pendingTableLength = document.getElementById("pendingTable").rows.length - 1;
        if (pendingTableLength > 0) {           
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (searchid == 1) {
        var assetAllocationTableLength = document.getElementById("assetAllocationTable").rows.length - 1;
        if (assetAllocationTableLength > 0) {            
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (searchid == 2) {
        var stockTableLength = document.getElementById("stockTable").rows.length - 1;
        if (stockTableLength > 0) {            
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (searchid == 3) {
        var dueTableLength = document.getElementById("dueTable").rows.length - 1;
        if (dueTableLength > 0) {            
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (searchid == 4) {
        var historyTableLength = document.getElementById("historyTable").rows.length - 1;
        if (historyTableLength > 0) {            
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (searchid == 5) {
        var damagedTableLength = document.getElementById("damagedTable").rows.length - 1;
        if (damagedTableLength > 0) {            
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }    
}

function validateAll() {
    debugger;
    if ($('#AssetRequest_Asset_AssetCategory_Code').val() == "") {
        validateById('#AssetRequest_Asset_AssetCategory_Code', 'assetCategory');
        return false;
    }
    else if ($('#AssetRequest_AssetName_Code').val() == "") {
        validateById('#AssetRequest_AssetName_Code', 'assetName');
        return false;
    }
    else if ($('#AssetRequest_AssetIssueDate').val() == "") {
        validateById('#AssetRequest_AssetIssueDate', 'assetIssueDate');
        return false;
    }
    else if ($('#AssetRequest_AssetDueDate').val() == "") {
        validateDueDate('#AssetRequest_AssetDueDate', 'assetDueDate');
        return false;
    }   
    else if ($('#AssetRequest_AssetDueDate').val() != "")
    {
        if (!validateDueDate('#AssetRequest_AssetDueDate', 'assetDueDate'))
            return false;
        else if (!RemarksLimitCheck('AssetRequest_Remarks')) {
            return false;
        }
        else {
            return true;
        }
    }
    else if (!RemarksLimitCheck('AssetRequest_Remarks'))
    {
        return false;
    }
    else {
        return true;
    }
}
function validateAllOnReturn() {
    if (validateReturnDate('#AssetRequest_AssetReturnDate', 'assetReturnDte'))
        return true;
    else
        return false;
}