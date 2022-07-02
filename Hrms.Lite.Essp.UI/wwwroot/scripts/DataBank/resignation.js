var prevTab = "tab1";
var currentTab = 0;
var currentTabName = "In Notice Period";
function tabClick(Tab, TabIndex,TabName) {
    debugger;
    currentTab = TabIndex;
    currentTabName = TabName;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    //var url = "/DataBank/Resignation/GetResignationList";
    //$('#resignationList').load(url, { TabIndex: TabIndex }, function () { });
    ApplyFilter('apply');
    prevTab = Tab;
}

function onAddNewClick() {
    debugger;
    var url = "/DataBank/Resignation/AddNew";
    $('#addNewResignation').load(url, {}, function () { });
    $('#addNewResignation').removeClass('hide');
}

function OnEmpChange(sender) {
    debugger;
    var Code = $(sender).val();
    if (Code != 0) {
        var url = "/DataBank/Resignation/EmployeeCard";
        $('.search-profile-details').load(url, { EmpCode: Code }, function () { });
        $('.search-profile-details').show(300);
    }

}

function onResignationTypeChange(sender) {

    debugger;
    var cid = $(sender).val();  
    $.getJSON("/DataBank/Resignation/GetResignationReason", { id: cid }, function (data) {

        $('#ResignationDetails_ResignationReason_Code option').remove();
        $('#ResignationDetails_ResignationReason_Code').append('<option value>--Select Reason--</option');

        for (var i = 0; i < data.length; i++) {
            $('#ResignationDetails_ResignationReason_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
}

function CheckImageExtensionSize(e) {
    debugger;
    console.log(e);
    var size = $(e)[0].files[0].size;
    var filename = $(e)[0].files[0].name;
    var fileExtension = ['jpeg', 'jpg', 'png', 'bmp','pdf'];
    console.log(size);
    if (size > 1024 * 1024) {
        swal.fire('File size cannot exceeds 1 Mb');
        $(e).val('');
    }
    else if ($.inArray($(e).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        swal.fire("Only pdf, jpg, jpeg, png and bmp formats are allowed");
        $(e).val('');
    }

}

function ViewFile(absoluteURI) {
    //window.open(absoluteURI, "_blank");
    
    if (absoluteURI == "") {
        swal.fire("No file Uploaded")
    }
    else {
        window.open(absoluteURI);
    }
}


function PreviewImage() {
    var path = URL.createObjectURL($('.previewImage')[0].files[0]);
    window.open(path, "_blank");
}

function NoticePeriodInDays(val,spanId) {
    debugger;
    //const date1 = new Date($('#ResignationDetails_ResignationDate').val());
    //const date2 = new Date($('#ResignationDetails_LastWorkingDate').val());
    //const diffTime = Math.abs(date2 - date1);
    //const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //alert(diffDays + " days");
    validate(val, spanId);
    validateLwd();
    var RDate = $('#ResignationDetails_ResignationDate').val();
    var LWD = $('#ResignationDetails_LastWorkingDate').val();
    var EmployeeGI = $('#EmployeeGI').val();

    $.getJSON("/DataBank/Resignation/GetNoticePeriodDetails", { EmployeeGI: EmployeeGI, ResignationDate: RDate, LastWorkingDate: LWD }, function (data) {        
        $('#noticePeriodDescription1').html(data.noticePeriodDetails[0].description);
        $('#noticePeriodDays1').html(data.noticePeriodDetails[0].inDays);
        $('#noticePeriodDescription2').html(data.noticePeriodDetails[1].description);
        $('#noticePeriodDays2').html(data.noticePeriodDetails[1].inDays);
    });
}


function validateLwd() {
    debugger;
    var LastWrkngDate =new Date($('#ResignationDetails_LastWorkingDate').val());
    var resDate = new Date($('#ResignationDetails_ResignationDate').val());

    if (LastWrkngDate < resDate) {
        swal.fire("Last working date should be greater than Resignation Date.");
        return false;
    }
    else {
        return true;
    }
}

function validateRelieving() {
     if (!validateById('#ResignationDetails_LastWorkingDate', 'RLwd')) {
        return false;
    }
    else if (!validateLwd()) {
        return false;
     }
     else if (!validateById('#ResignationDetails_WorkHandOverDetails', 'Whd'))
     {
         return false;
     }
    else {
        return true;
    }
}

function validateApproveAcceptance() {
    if (!validateById('#ResignationDetails_AcceptanceRemarks','RAcceptanceRemarks')) {
        return false;
    }
    else {
        return true;
    }
}

function validateRejectAcceptance() {
    if (!validateById('#ResignationDetails_AcceptanceRemarks', 'RAcceptanceRemarks')) {
        return false;
    }
    else {
        $.ajax({

            type: 'POST',
            url: '/DataBank/Resignation/Reject',
            dataType: 'json',
            data: $('#resignationAcceptanceform').serialize(),
            success: function (result) {
                if (result.success == true) {
                    //window.location.href = url;
                    swal.fire("Rejected Successfully").then(function () {                        
                        var url = "/DataBank/Resignation/Index";                        
                        window.location.href = url;
                    });

                }
                //else if (result.message == "MAKER_CHECKER") {
                //    swal.fire("Maker and checker cannot be same.").then(function () {
                //        //var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;
                //        //$('#ApproveSlider').load(url, function () { });
                //        //$('body').append('<div class="form-overlay"></div>');

                //    });
                //}
                else {
                    swal.fire(result.message).then(function () {

                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
        return true;
    }
}

function validateAll() {
    if (!validateById('#ResignationDetails_ResignationType_Code', 'RType')) {
        return false;
    }
    else if (!validateById('#ResignationDetails_ResignationReason_Code', 'RReason')) {
        return false;
    }
    else if (!validateById('#ResignationDetails_ResignationDate', 'RDate')) {
        return false;
    }
    else if (!validateById('#ResignationDetails_LastWorkingDate', 'RLwd')) {
        return false;
    }
    else if (!validateLwd())
    {
        return false;
    }
    else if (!validateById('#ResignationDetails_Remarks', 'RRemarks')) {
        return false;
    }
    else {
        return true;
    }
}


function onExportToExcelClick() {
    debugger;
    if (currentTab == 0)
    {
        var inNoticePeriodTableLength = document.getElementById("inNoticePeriodTable").rows.length - 1;
        if (inNoticePeriodTableLength > 1) {
            url = "/DataBank/Resignation/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 1)
    {
        var resignationAcceptTableLength = document.getElementById("resignationAcceptTable").rows.length - 1;
        if (resignationAcceptTableLength > 1) {
            url = "/DataBank/Resignation/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 2)
    {
        var resignationExitChecklistTableLength = document.getElementById("resignationExitChecklistTable").rows.length - 1;
        if (resignationExitChecklistTableLength > 1) {
            url = "/DataBank/Resignation/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 3)
    {
        var resignationRelivingTableLength = document.getElementById("resignationRelivingTable").rows.length - 1;
        if (resignationRelivingTableLength > 1) {
            url = "/DataBank/Resignation/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
        }
    else
    {
        var resignationRetirementTableLength = document.getElementById("resignationRetirementTable").rows.length - 1;
        if (resignationRetirementTableLength > 1) {
            url = "/DataBank/Resignation/ExportToExcel?TabIndex=" + currentTab + "&TabName=" + currentTabName;
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
    $("#SearchId").val($('#FilterList_Code').val())
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/Resignation/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#resignationList').html("");
                    $('#resignationList').html(result);

                    $('#resignationList').removeClass('hide');

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
                url: '/DataBank/Resignation/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#resignationList').html("");
                    $('#resignationList').html(result);

                    $('#resignationList').removeClass('hide');

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
            url: '/DataBank/Resignation/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#resignationList').html("");
                $('#resignationList').html(result);

                $('#resignationList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}