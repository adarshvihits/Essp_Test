var currentTab;
var prevTab;
var currentTabName = 'All';
var currentTab = 0;
function onNewRequestClick() {
    debugger;
    var Code = 1;
    var url = "/DataBank/DisciplinaryIncident/NewRequest";
    $('.disciplinary').load(url, { EmpCode: Code }, function () { });
    $('#newRequestSlider').removeClass('hide');
    $('.add-assets').show();
}

function OnEmpChange(sender) {
    debugger;
    var EmpCode = $(sender).val();
    var url = "/DataBank/DisciplinaryIncident/EmployeeCard";
    $('.search-profile-details').load(url, { EmpCode: EmpCode }, function () { });
    $('.search-profile-details').show(300);
}
function onFilterDropdownChange(TabIndex, SearchId) {
    debugger;
    TabIndex = currentTab;
    var url = "/DataBank/DisciplinaryIncident/DisciplinaryTabs";
    $(".all").addClass("active");
    var search = SearchId.value;          
    $('#DisciplinaryIncList').load(url, { TabIndex: TabIndex, SearchId: search }, function () { });
}


function onDisciplinaryLogClick(DisciplinaryIncidentGI) {
    debugger;
    var Code = 1;
    // var AssetAllocationGI = $(AssetAllocationGI).val();
    //alert($('#EmployeeGI').val());
    var EmployeeGI = $('#EmployeeGI').val();
    var url = "/DataBank/DisciplinaryIncident/DisciplinaryIncidentsLog";
    $('#DisciplinaryIncidentsLog').load(url, { DisciplinaryIncidentGI: DisciplinaryIncidentGI, EmployeeGI: EmployeeGI }, function () { });
    $('#DisciplinaryIncidentsLog').removeClass('hide');
   /* $('.assethistory').show();*/
}



function pendingOpen() {
    $('#pending').removeClass('hide');
    $('#DisciplinaryIncList').addClass('hide');
}
var currentTab;
var prevTab;
function AllTab(Tab,TabName) {
    debugger;
    currentTab = Tab;
    currentTabName = TabName;
    var searchid = $('#DurationwiseFilterSlab_Code').val();
    var url = "/DataBank/DisciplinaryIncident/DisciplinaryTabs";
    $('#pending').addClass('hide');
    $(".pendingreq").removeClass("active");
    $(".tab1").removeClass("active");
    $(".tab2").removeClass("active");
    $(".tab3").removeClass("active");
    $(".more").removeClass("active");
    $('#DisciplinaryIncList').removeClass('hide');
    $(".all").addClass("active");
    $('#DisciplinaryIncList').load(url, { TabIndex: Tab, SearchId: searchid }, function () { });
    $(".filterList").show();
}
function PendingRequestsTab(Tab, TabName) {
    debugger;
    currentTab = Tab;
    currentTabName = TabName;
    var url = "/DataBank/DisciplinaryIncident/Pending";
    $(".filterList").hide();
    $(".assetlist").hide();
    $(".pendingreq").addClass("active");
    $('#DisciplinaryIncList').addClass('hide');
    $(".all").removeClass("active");
    $("." + prevTab).removeClass("active");
    $('#pending').removeClass('hide');
    $(".tab1").removeClass("active");
    $("#pending").load(url, { TabIndex: Tab }, function () {
    });
}
function Tab(Tab, TabId,TabName) {
    debugger;
    currentTab = Tab;
    currentTabName = TabName;
    //alert($('#AssetAllocationFilter_Code').val());
    var searchid = $('#DurationwiseFilterSlab_Code').val();
    $('#pending').addClass('hide');
    $(".pendingreq").removeClass("active");
    $(".all").removeClass("active");
    $("." + prevTab).removeClass("active");
    $("." + TabId).addClass("active");
    var url = "/DataBank/DisciplinaryIncident/DisciplinaryTabs";
    $('#DisciplinaryIncList').removeClass('hide');
    $('#DisciplinaryIncList').load(url, { TabIndex: Tab, SearchId: searchid }, function () { });
    $(".filterList").show();
    prevTab = TabId
}

function onEmployeeClick(DisciplinaryIncidentGI, EmployeeGI, Tab) {
    debugger;
    if (Tab == 'All') {
        //var AssetAllocationGI = "0D9D1593-119F-46FE-8848-804D035A10F7"
        var url = "/DataBank/DisciplinaryIncident/DisciplinaryIncidentsDetails";
        //window.location.href = url + '?AssetAllocationGI=' + AssetAllocationGI;
        //var EmployeeGI = $('#EmployeeGI').val()
        $('body').append('<div class="form-overlay"></div>');
        $('#DisciplinaryInc').load(url, { DisciplinaryIncidentGI: DisciplinaryIncidentGI, EmployeeGI: EmployeeGI }, function () { });

        $('#DisciplinaryInc').removeClass('hide');
        $('#DisciplinaryInc').show();
    }
    else if (Tab == 'Pending') {
        var url = "/DataBank/DisciplinaryIncident/Issue";
        $('body').append('<div class="form-overlay"></div>');
        $('.issuepending').load(url, { AssetAllocationGI: AssetAllocationGI, EmployeeGI: EmployeeGI }, function () { });
        $('#issue').removeClass('hide');
        $('.issuepending').show();
    }

}

function onExportToExcelClick() {
    debugger;
    var searchid = $('#DurationwiseFilterSlab_Code').val();
    /*var searchid = $('#AssetAllocationFilter_Code').val();*/
    if (currentTab == 1001) {
        var pendingTableLength = document.getElementById("pendingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/DataBank/DisciplinaryIncident/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchid + "&TabName=" +currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var assetAllocationTableLength = document.getElementById("DsplnryIncTbl").rows.length - 1;
        if (assetAllocationTableLength > 0) {
            url = "/DataBank/DisciplinaryIncident/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchid + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
}

function onDeleteDisciplinaryIncidents(DisciplinaryIncidentGI) {
    swal.fire({
        text: "Do you want to Delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            url = "/DataBank/DisciplinaryIncident/DisciplinaryIncidentsDelete?DisciplinaryIncidentGI=" + DisciplinaryIncidentGI;
            window.location.href = url;
        }
        else {
            return false;
        }
    })
}

function viewFileFromDT() {
    debugger;
    var AbsoluteURI = $('#IncidentsAction_Incidents_FileUri').val();
    if (AbsoluteURI == "") {
        swal.fire("No file Uploaded")
    }
    else {
        window.open(AbsoluteURI);
    }
}

function Preview() {
    debugger;
    var path = URL.createObjectURL($('.PreviewImage')[0].files[0]);
    if (path == "") {
        swal.fire("No file Uploaded")
    }
    else {
         window.open(path);
    }
}

function validateAllDisciplinaryIncidents() {
    
    if (!validateById('#IncidentsAction_Incident_Code', 'incident')) {
        return false;
    }
    else if (!validateById('#IncidentsAction_IncidentType_Code', 'incidenttype')) {
        return false;
    }
    else if (!validateById('#IncidentsAction_Incidentdate', 'incidentdate')) {
        return false;
    }
    else if (!validateById('#IncidentsAction_ReportedBy', 'reportedby')) {
        return false;
    }
    else if (!validateReportedDate('#IncidentsAction_Reportedtdate', 'reporteddate')) {
        return false;
    }
    else if (!validateById('#IncidentsAction_ActionTaken_Code', 'actiontaken')) {
        return false;
    }
    else if (!validateById('#IncidentsAction_Narration', 'narration')) {
        return false;
    }
    else {

        console.log("Success");
        return true;
    }
}

//function validateReportedDate(val, id) {
//    debugger;
//    if ($(val).val() == "") {
//        $(val).addClass('is-invalid');
//        $("#" + id + "").addClass('error-message');
//        $("#" + id + "").html("This field is required");
//    }
//    else {

//        var incidentDate = $('#IncidentsAction_Incidentdate').val();
//        var reportedDate = $(val).val();
//        var d1 = Date.parse(incidentDate);
//        var d2 = Date.parse(reportedDate);
//        if (d1 > d2) {
//            $(val).addClass('is-invalid');
//            $("#" + id + "").addClass('error-message');
//            $("#" + id + "").html("Renewal should be greater than issued date");
//            return false;
//        }
//        else {
//            $(val).removeClass('is-invalid');
//            $("#" + id + "").removeClass('error-message');
//            $("#" + id + "").html("");
//            return true;
//        }
//    }
//}
function validateReportedDate(val, id) {
    debugger;
    if ($(val).val() == "") {
        $(val).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {

        var issueDate = new Date($('#IncidentsAction_Incidentdate').val());
        var dueDate = new Date($(val).val().toString());
        //var d1 = '2013-11-02', d2 = '2013-11-01';
        //console.log(d1 < d2);
        console.log(dueDate);
        console.log(issueDate);
        console.log(issueDate > dueDate);
        var iDate = new Date(issueDate.toLocaleDateString());
        var rDate = new Date(dueDate.toLocaleDateString());
        if (iDate > rDate) {
            $(val).addClass('is-invalid');
            $("#" + id + "").addClass('error-message');
            $("#" + id + "").html("Reported date should be greater than Incident date");
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
function CheckFIleExtensionSize(e) {
    debugger;
    console.log(e);
    debugger;
    var size = $(e)[0].files[0].size;
    var filename = $(e)[0].files[0].name;
    var fileExtension = ['pdf','jpeg', 'jpg', 'png', 'bmp'];
    if (size > 1024 * 1024) {
        swal.fire('File size cannot exceeds 1 Mb');
        $(e).val('');
    }
    else if ($.inArray($(e).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        swal.fire("Only pdf,jpg, jpeg, png and bmp formats are allowed");
        $(e).val('');
    }
    else {
        $('#disp').hide();
    }
}

function ApplyFilter(mode) {
    debugger
    var tabIndex = $('#Tabindex').val();
    var search = $('#SearchId').val();
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#DurationwiseFilterSlab_Code').val())
    if (mode == 'apply') {
        if (filterApplicable>=1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/DisciplinaryIncident/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#DisciplinaryIncList').html("");
                    $('#DisciplinaryIncList').html(result);

                    $('#DisciplinaryIncList').removeClass('hide');

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
                url: '/DataBank/DisciplinaryIncident/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#DisciplinaryIncList').html("");
                    $('#DisciplinaryIncList').html(result);

                    $('#DisciplinaryIncList').removeClass('hide');

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
            url: '/DataBank/DisciplinaryIncident/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#DisciplinaryIncList').html("");
                $('#DisciplinaryIncList').html(result);

                $('#DisciplinaryIncList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}


