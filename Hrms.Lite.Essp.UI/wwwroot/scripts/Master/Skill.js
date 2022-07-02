

var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';


function OnTabClick(Tab, TabIndex) {
    $.ajaxSetup({
        async: false
    });
    debugger;
    //currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/Skill/GetSkillList";
    $('#SkillList').load(url, { TabIndex: TabIndex }, function () { });
    currentTab = TabIndex;
    $('#tabsDropdownSkill').val(currentTab);
    prevTab = Tab;
}


function tabClick(val) {
    debugger;
    currentTab = $(val).val();
    $("." + prevTab).removeClass("active");
    if (currentTab == "ACTIVE")
        prevTab = 'ActiveTab'
    else if (currentTab == "INACTIVE")
        prevTab = 'InctiveTab';
    else
        prevTab = 'PendingTab';

    $("." + prevTab).addClass("active");
    var url = "/Master/Skill/GetSkillList";
    $('#SkillList').load(url, { TabIndex: currentTab }, function () { });

}
function confirmDelete(GI, LogGI) {

    if (confirm("Do you want to Delete?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/Skill/Delete',
            dataType: 'json',
            data: $('#deleteSkill').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('delete');
                        var url = "/Master/Skill/GetSkillList?TabIndex=" + 'ACTIVE';
                       
                       
                       

                        $('#SkillList').load(url, function () { });
                        $(".PendingTab").removeClass("active");
                        $(".ActiveTab").addClass("active");
                        $("#SkillList").removeClass("hide");
                    });

                }
                else {
                    debugger
                    swal.fire(result.message).then(function () {
                        var url = "/Master/Skill/Delete?SkillGI=" + GI + "&LogGI=" + LogGI;
                        $('#delete').load(url, function () { });
                        $('body').append('<div class="form-overlay"></div>');

                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
             /*   console.log(xhr.responseText);*/
            }
        });
    }
    else {
        return false;
    }

}
function AddNewOrEdit(Action, GI, LogGI)

{
    debugger;
    if (Action == 'MODIFY') {
        var url = "/Master/Skill/Edit?SkillGI=" + GI + "&LogGI=" + LogGI;
    }
    else {
            var url = "/Master/Skill/CreateSkill";
        }
        $('.AddNewOrEdit').load(url, function () { });
        $("#AddNewOrEditSlider").removeClass("hide");
        $('body').append('<div class="form-overlay"></div>');
        $(".AddNewOrEdit").show();


  


    
}
function SkillSave() {
    debugger;
    if (validateSkill()) {

        console.log($('#Skill-create-edit').serialize());
            $.ajax({

                type: 'POST',
                url: '/Master/Skill/Create',
                dataType: 'json',
                data: $('#Skill-create-edit').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('AddNewOrEdit');
                            var url = "/Master/Skill/GetSkillList";
                            $('#SkillList').load(url, { TabIndex: currentTab }, function () { });
                           /* window.location.href = url;*/
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
        else {
            return false;
        }
    }

function Approve(GI, LogGI) {
    debugger;
    var url = "/Master/Skill/Approve?SkillGI=" + GI + "&&LogGI=" + LogGI;
    $('.ApproveDiv').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
    $("#ApproveSlider").removeClass("hide");
    $(".ApproveDiv").show();

}
function confirmApprove(GI, LogGI) {

    if (confirm("Do you want to Approve?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/Skill/Approve',
            dataType: 'json',
            data: $('#approve').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('ApproveDiv');
                        var url = "/Master/Skill/GetSkillList?TabIndex=" + 'APPROVAL_PENDING';

                      
                        $('#SkillList').load(url, { TabIndex: currentTab }, function () { });


                        /* window.location.href = url;*/
                       

                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        debugger;
                        var url = "/Master/Skill/Approve?SkillGI=" + GI + "&LogGI=" + LogGI;
                        $('#ApproveSlider').load(url, function () { });
                        $('body').append('<div class="form-overlay"></div>');


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
}
function confirmReject(GI, LogGI) {

    if (confirm("Do you want to Reject?")) {
        debugger;

        $.ajax({

            type: 'POST',
            url: '/Master/Skill/Reject',
            dataType: 'json',
            data: $('#approve').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        CloseSlider('ApproveDiv');
                        var url = "/Master/Skill/GetSkillList?TabIndex=" + 'APPROVAL_PENDING';
                 
                        $('#SkillList').load(url, { TabIndex: currentTab }, function () { });
                        /*window.location.href = url;*/
                    });

                }
                else {
                    swal.fire(result.message).then(function () {
                        var url = "/Master/Skill/Approve?SkillGI=" + GI + "&LogGI=" + LogGI;
                        $('#ApproveSlider').load(url, function () { });
                        $('body').append('<div class="form-overlay"></div>');

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

}
function Delete(GI, LogGI) {

    debugger;
    var url = "/Master/Skill/Delete?SkillGI=" + GI + "&LogGI=" + LogGI;
    $('#DeleteSlider').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
}

function ExportToExcel() {

    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("PendingSkillTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/Skill/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else
    {
        var activeTableLength = document.getElementById("SkillTable").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/Skill/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else
        {
            swal.fire("No data found to export");
        }
    }
    ////else if (currentTab == 'INACTIVE') {
    ////    var inActiveTableLength = document.getElementById("SkillTable").rows.length - 1;
    ////    if (inActiveTableLength > 0) {
    ////        url = "/Master/Skill/ExportToExcel?TabIndex=" + currentTab;
    ////        window.location.href = url;
    ////    }
    ////    else {
    ////        swal.fire("No data found to export");
    ////    }

    ////}

}

function validateSkill() {
    debugger;
    if ($('.SName').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#SkillName").addClass('error-message');
        $('#SkillName').html("This field is required");
        $('#Name').focus();
        return false;
    }

    else if ($('.SShtName').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#SkillShortName").addClass('error-message');
        $('#SkillShortName').html("This field is required");
        $('#ShortName').focus();
        return false;
    }
   
    else
        return true;
}