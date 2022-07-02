var prevTab = 'tab1';
var currentTab = 0;
function tabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    //if ($('#FilterList_Code').val() != 0)
    //    var searchid = $('#FilterList_Code').val();
    //else
    //    var searchid = 3;
    if (TabIndex != 2) {
        $('.filterList').addClass('hide')
        var searchid = 0;
    }
    else {
        $('.filterList').removeClass('hide')
        var searchid = 0;
    }

    //var url = "/DataBank/DocumentUpload/GetDocumentUploadList";
    //$('#docUploadList').load(url, { TabIndex: TabIndex, SearchId: searchid }, function () { });
    ApplyFilter('apply');
    prevTab = Tab;
}

function onFilterComboChange(sender) {
    var SearchId = $(sender).val();
    //var url = "/DataBank/DocumentUpload/GetDocumentUploadList";
    //$('#docUploadList').load(url, { TabIndex: currentTab, SearchId: SearchId }, function () { });
    ApplyFilter('apply');
}

function onAddNewClick(EmployeeGI) {
    debugger;
    var url = "/DataBank/DocumentUpload/AddDocument";
    $('#addDocument').load(url, { EmployeeGI: EmployeeGI }, function () { });
    $('#addDocument').removeClass('hide');
    
}


function ApplyFilter(mode) {
    debugger
    var tabIndex = $('#Tabindex').val();
    var search = $('#SearchId').val();
    $("#Tabindex").val(currentTab);
    $("#SearchId").val($('#FilterCombo_Code').val())
    if (mode == 'apply') {
        if (filterApplicable >= 1) {
            $.ajax({

                type: 'POST',
                url: '/DataBank/DocumentUpload/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#docUploadList').html("");
                    $('#docUploadList').html(result);

                    $('#docUploadList').removeClass('hide');

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
                url: '/DataBank/DocumentUpload/ApplyFilter',
                dataType: 'html',
                data: $('#BasicFilter').serialize(),
                success: function (result) {
                    debugger
                    CloseSlider('basicFilter');

                    $('#docUploadList').html("");
                    $('#docUploadList').html(result);

                    $('#docUploadList').removeClass('hide');

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
            url: '/DataBank/DocumentUpload/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#docUploadList').html("");
                $('#docUploadList').html(result);

                $('#docUploadList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}

function validateAadhar(val, id) {
    debugger;

    aadhar = val.value;
    if (val.value == "") {
        $("#" + id + "").addClass('error-message');
        $(val).addClass('is-invalid');
        $("#" + id + "").html("This field is required");
    }
    else {
        var filter = /^[2-9]{1}[0-9]{11}$/
        $(val).addClass('is-invalid');
        if (!filter.test(aadhar)) {
            debugger;
            $("#" + id + "").addClass('error-message');
            $(val).addClass('is-invalid');
            $("#" + id + "").html('Invalid Aadhar number')
        }
        else {
            $("#" + id + "").removeClass('error-message');
            $(val).removeClass('is-invalid');
            $("#" + id + "").html("");
            trim(val);
            return true;
        }
    }
}

function validatePan(val, id) {
    var pan = val.value;
    if (val.value == "") {
        $("#" + id + "").addClass('error-message');
        $(val).addClass('is-invalid');
        $("#" + id + "").html("This field is required");
    }
    else {
        var panPat = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
        var code = /([C,P,H,F,A,T,B,L,J,G])/;
        var code_chk = pan.substring(3, 4);
        if (pan.search(panPat) == -1) {
            $("#" + id + "").addClass('error-message');
            $(val).addClass('is-invalid');
            $("#" + id + "").html("Invalid Pan Number");
            return false;
        }
        else if (code.test(code_chk) == false) {
            $("#" + id + "").addClass('error-message');
            $(val).addClass('is-invalid');
            $("#" + id + "").html("Invalid Pan Number");
            return false;
        }
        else {
            $("#" + id + "").removeClass('error-message');
            $(val).removeClass('is-invalid');
            $("#" + id + "").html("");
            trim(val);
            return true;
        }
    }
}



function onEmployeeClick(empid,employeeGI) {    
    var url = "/DataBank/DocumentUpload/Create?EmpId=" + empid + "&EmployeeGI=" + employeeGI;
    window.location.href = url;
}

function EditAadharOrPan(DocName) {
    var url = "/DataBank/DocumentUpload/UploadAadharOrPan";
    var EmployeeGI = $('#EmployeeGI').val();    
    $('#aadharOrPanUpload').load(url, { DocumentName: DocName, EmployeeGI: EmployeeGI }, function () { });
    $('#aadharOrPanUpload').removeClass('hide');
}
function DeleteIdentityDocuments() {
    var EmployeeGI = $('#EmployeeGI').val();  
    var sliderTitle = $('#SliderTitle').val();  
    var url = "/DataBank/DocumentUpload/DeleteIdentityDocuments?EmployeeGI=" + EmployeeGI + "&sliderTitle=" + sliderTitle;
    window.location.href = url;
}

function EditDrivingLicenseOrPassport(DocName) {
    var url = "/DataBank/DocumentUpload/UploadDrivingLicenseOrPassport";
    var EmployeeGI = $('#EmployeeGI').val();
    $('#licenseOrPassport').load(url, { DocumentName: DocName, EmployeeGI: EmployeeGI }, function () { });
    $('#licenseOrPassport').removeClass('hide');
}

function EditOtherDocuments(OtherDocGI,LogGI) {
    var url = "/DataBank/DocumentUpload/EditOtherDocuments";   
    var EmployeeGI = $('#EmployeeGI').val();    
    $('#otherDocumentEdit').load(url, { OtherDocGI: OtherDocGI, LogGI: LogGI, EmployeeGI: EmployeeGI }, function () { });
    $('#otherDocumentEdit').removeClass('hide');
}

function previewDocument(absoluteURI) {
    window.open(absoluteURI,"_blank");
}

function onExportToExcelClick() {
    debugger;
    //if ($('#FilterList_Code').val() != 0)
    //    var searchid = $('#FilterList_Code').val();
    //else

    if (currentTab != 2) 
        var searchid = 0;
    else
        var searchid = $('#FilterCombo_Code').val();

    var docUploadTableLength = document.getElementById("docUploadTable").rows.length - 1;
    if (docUploadTableLength > 0) {
        url = "/DataBank/DocumentUpload/ExportToExcel?TabIndex=" + currentTab + "&SearchId=" + searchid;
        window.location.href = url;
    }
    else {
        swal.fire("No data found to export");
    }
}