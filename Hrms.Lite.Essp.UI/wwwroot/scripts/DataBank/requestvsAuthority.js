var prevTab = 'all';
var currentTab = 0;


var currentTabName = 'All';
//function CloseSlider(id) {
//    $("." + id).removeClass('slider-forms-open');
//    $(".form-overlay").remove();
//}
function batchUpdateClick() {
    $('#BatchUpdateSlider').removeClass('hide');
}

function onEmployeeClick(EmpGI) {
    alert(EmpGI);
    var url = '/DataBank/RequestVsAuthority/RequestAuthority?EmployeeGI=' + EmpGI;
    window.location.href = url;
}

function addLevelClick() {
    debugger;
    var ReqType = $("#BatchUpdate_RequestType_Code").val();
    alert(ReqType);
    alert(EmpGI);
    var url = '/DataBank/RequestVsAuthority/AddLevel?EmployeeGI=' + EmpGI + '&code=' + ReqType;
    $('#AddLevelSlider').load(url, function () { });
    $('#AddLevelSlider').removeClass('hide');
}

function onRequestTypeChange(id, EmpGI) {
    debugger;
    var url = '/DataBank/RequestVsAuthority/RequestTypeChange?EmployeeGI=' + EmpGI + '&RequestID=' + $(id).val();
    $('#LevelList').load(url, function () { });
}

function tabClick(Tab, TabIndex,TabName) {
    debugger;
    var searchVal = 0;
    if (Tab == "tab2") {
        $('#UnassignedDropDown').removeClass('hide');
    }
    else {
        $('#UnassignedDropDown').addClass('hide');
    }
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    //var url = "/DataBank/RequestVsAuthority/GetRequestVsAuthorityList";
    //$('#RequestVsAuthorityList').load(url, { TabIndex: TabIndex, SearchID: searchVal}, function () { });
    ApplyFilter('apply');
    currentTabName = TabName;
    prevTab = Tab;
}

function getLevelDetails(ReqVsAuthGI) {
    var url = '/DataBank/RequestVsAuthority/LevelDetails?EmpGI=' + EmpGI + '&ReqVsAuthGI=' + ReqVsAuthGI;
    $('#AddLevelSlider').load(url, function () { });
    $('#AddLevelSlider').removeClass('hide');
}

function onUnassignedFilterChange() {
    debugger;
    var tabIndex = 2;
    var searcId = $('#UnassignedList').val();
    //var url = '/DataBank/RequestVsAuthority/GetRequestVsAuthorityList?TabIndex=' + tabIndex + '&SearchID=' + searcId;
    //$('#RequestVsAuthorityList').load(url, { TabIndex: tabIndex, SearchID: searcId }, function () { });
    ApplyFilter('apply');
}

function ApplyFilter(mode) {
    debugger
    var tabIndex = $('#Tabindex').val();
    var search = $('#SearchId').val();
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#UnassignedList').val())
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/RequestVsAuthority/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#RequestVsAuthorityList').html("");
                    $('#RequestVsAuthorityList').html(result);

                    $('#RequestVsAuthorityList').removeClass('hide');

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
                url: '/DataBank/RequestVsAuthority/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#RequestVsAuthorityList').html("");
                    $('#RequestVsAuthorityList').html(result);

                    $('#RequestVsAuthorityList').removeClass('hide');

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
            url: '/DataBank/RequestVsAuthority/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#RequestVsAuthorityList').html("");
                $('#RequestVsAuthorityList').html(result);

                $('#RequestVsAuthorityList').removeClass('hide');
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
    var searchid = $('#Filter_Code').val();

    var TableLength = document.getElementById("RequestVsAuthorityTable").rows.length - 1;
    if (TableLength > 0) {
        url = "/DataBank/RequestVsAuthority/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchid + "&TabName=" +currentTabName;
        window.location.href = url;
    }
    else {
        swal.fire("No data found to export");
    }
}
