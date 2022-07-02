var prevTab = 'all';
var currentTab = 0;
var CTC = 0;
var currentTabName = 'All';
var searchName = 'Allocated';
function Tab(Tab, TabId, TabName) {
    debugger;    
    currentTab = Tab;
    currentTabName = TabName;
    $('#TabCode').val(Tab);
    //alert($('#AssetAllocationFilter_Code').val());
    /*$('#OnBoardingList').addClass('hide');*/
    $(".all").removeClass("active");
    $("." + prevTab).removeClass("active");
    $("." + TabId).addClass("active");    
    var url = "/DataBank/OnBoarding/OnBoardingTabs";
    $('#OnBoardingList').load(url, {TabIndex: Tab}, function () { });
    $("#Tabindex").val(currentTab);
    prevTab = TabId;
}
function CTCCalculation() {
    debugger;
    var TotAmt = parseInt("0");
    var TotGrossAmt = parseInt("0");
    $('.AllowanceAmount').each(function (i, obj) {
        var Amt = parseInt($("#PreEnrollment_Compensation_FixedAllowance_" + i + "__Amount").val());
        var type = $("#PreEnrollment_Compensation_FixedAllowance_" + i + "__AllowanceType").val();
        debugger;
        if (isNaN(Amt)) {
            Amt = parseInt("0");
        }
        TotAmt = TotAmt + Amt;
        if (type != 'CTC Component') {
            TotGrossAmt = TotGrossAmt + Amt;
        }
        $("#CTC").html(TotAmt);
        $("#GrossSalary").html(TotGrossAmt);
    });

}

function RejectPreEnrollment(GI){
    debugger
    swal.fire({
        text: "Do you want to Reject?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({

                type: 'POST',
                url: '/Databank/OnBoarding/ApproveRejectPreEnrollment',
                dataType: 'json',
                data: { preEnrollGI:GI,mode:"REJECT"},
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            var url = "/DataBank/OnBoarding/Index";
                            window.location.href = url;
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            //var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;
                            //$('#ApproveSlider').load(url, function () { });
                            //$('body').append('<div class="form-overlay"></div>');

                        });
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    toastr.error(xhr.responseText);
                }
            });
        }
        else {
            return false;
        }
    })


}
function ApprovePreEnrollment(GI) {
    debugger
    swal.fire({
        text: "Do you want to Approve?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({

                type: 'POST',
                url: '/Databank/OnBoarding/ApproveRejectPreEnrollment',
                dataType: 'json',
                data: { preEnrollGI: GI,mode:"APPROVE" },
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            var url = "/DataBank/OnBoarding/Index";
                            window.location.href = url;
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            //var url = "/Master/Country/Approve?CountryGI=" + GI + "&LogGI=" + LogGI;
                            //$('#ApproveSlider').load(url, function () { });
                            //$('body').append('<div class="form-overlay"></div>');

                        });
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    toastr.error(xhr.responseText);
                }
            });
        }
        else {
            return false;
        }
    })


}

function ApplyFilter(mode) {
    debugger
    var tabIndex = $('#Tabindex').val();
    $("#Tabindex").val(currentTab);
    if (mode == 'apply') {
        $.ajax({

            type: 'POST',
            url: '/DataBank/OnBoarding/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('basicFilter');

                $('#OnBoardingList').html("");
                $('#OnBoardingList').html(result);

                $('#OnBoardingList').removeClass('hide');

                //$('#rewardsListPartial').addClass('hide');               
            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
    else {
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $.ajax({

            type: 'POST',
            url: '/DataBank/OnBoarding/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#OnBoardingList').html("");
                $('#OnBoardingList').html(result);

                $('#OnBoardingList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}

function onExportToExcelClick() {
    debugger;
    if (currentTab == 0) {
        var OnboardingListTableLength = document.getElementById("OnboardingList").rows.length - 1;
        if (OnboardingListTableLength > 1) {
            url = "/DataBank/OnBoarding/onExportToExcelClick?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else if (currentTab == 3) {
        var resignationAcceptTableLength = document.getElementById("CheckList").rows.length - 1;
        if (resignationAcceptTableLength > 1) {
            url = "/DataBank/OnBoarding/onExportToExcelClick?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    else {
        var resignationExitChecklistTableLength = document.getElementById("PreEnrollmentJCODList").rows.length - 1;
        if (resignationExitChecklistTableLength > 1) {
            url = "/DataBank/OnBoarding/onExportToExcelClick?TabIndex=" + currentTab + "&TabName=" + currentTabName;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }    
}
   