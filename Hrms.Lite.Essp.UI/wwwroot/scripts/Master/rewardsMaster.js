////var prevTab = 'ActiveTab';
////var currentTab;
var prevTab = 'ActiveTab';
var currentTab = 'ACTIVE';


function onAddNewClick() {
    debugger;
    var Code = 1;
    var url = "/Master/RewardsMaster/RewardsSave";
    $('.rewardsSaveclose').load(url, function () { });
    $('#newRequestSlider').removeClass('hide');
    $('.rewardsSaveclose').show();
}
function AddNewOrEdit(Action, GI, LogGI) {
    debugger;
    var Code = 1;
    debugger;
    if (Action == 'Edit') {
        var url = "/Master/RewardsMaster/Edit?RewardsGI=" + GI + "&LogGI=" + LogGI;
    }
    else {
        var url = "/Master/RewardsMaster/Create";
    }
    $('.rewardsSaveclose').load(url, function () { });
    $('#newRequestSlider').removeClass('hide');
    $('.rewardsSaveclose').show();
}

function onAllClick(chkid, tableid) {
    if ($('#' + chkid).is(':checked'))
        $('#' + tableid).find('input[type=checkbox]').prop('checked', true);
    else
        $('#' + tableid).find('input[type=checkbox]').prop('checked', false);
}



function AddRowGrid(tableId,i) {
    debugger;
    

        var count = 0;
    count = $('#' + tableId + ' tr[id^="row_OI_"]').length;
    if (count != 5) {
        var template = $('#' + tableId + ' #row_OI_0').clone(); // clone the row

        $.each(template.find('input, textarea'), function () {
            var name = $(this).attr('name');
            if (typeof name != 'undefined') {
                name = name.replace(/\[0\]./g, '[' + count + '].');
                $(this).attr('name', name);
            }

            var id = $(this).attr('id');
            if (typeof id != 'undefined') {
                id = id.replace(/_0__/g, '_' + count + '__');
                $(this).attr('id', id);
            }
            //---------------------------------For row Increment When onkeyup
            var onkeyup = $(this).attr('onkeyup');
            if (onkeyup !== undefined) {
                onkeyup = onkeyup.replace(/\(0\)/g, '(' + count + ')');
                $(this).attr('onkeyup', onkeyup);
            }

            //---------------------------------------For row Increment When onchange
            var onchange = $(this).attr('onchange');
            if (onchange !== undefined) {
                onchange = onchange.replace(/\(0\)/g, '(' + count + ')');
                $(this).attr('onchange', onchange);
            }
            //---------------------------------------
        });
        $.each(template.find('select'), function () {
            var name = $(this).attr('name');
            name = name.replace(/\[0\]./g, '[' + count + '].');
            $(this).attr('name', name);

            var id = $(this).attr('id');
            id = id.replace(/_0__/g, '_' + count + '__');
            $(this).attr('id', id);


            //---------------------------------------For row Increment When onchange
            var onchange = $(this).attr('onchange');
            if (onchange !== undefined) {
                onchange = onchange.replace(/\(0\)/g, '(' + count + ')');
                $(this).attr('onchange', onchange);
            }
            //---------------------------------------
        });

        $.each(template.find('input[type=button]'), function () {
            var onclick = $(this).attr('onclick');
            onclick = onclick.replace(/\(0\)/g, '(' + count + ')');
            $(this).attr('onclick', onclick);
        });

        //$.each(template.find('.hasDatepicker'), function () {
        //    $(this).removeClass('hasDatepicker');
        //});


        template.find('td[id=oi_slno]').text(count + 1);
        $('#' + tableId + '').append('<tr id="row_OI_' + count + '">' + template.html() + '  </tr>');
        //------------to clear when new row---------

        //$('#' + tableId + ' tr[id="row_OI_' + count + '"] .datepicker').datepicker({
        //    dateFormat: "dd-M-yy", changeMonth: true,
        //    changeYear: true
        //});

        $('#' + tableId + ' tr[id="row_OI_' + count + '"] input[type=text]').val('');
        $('#' + tableId + ' tr[id="row_OI_' + count + '"] textarea').val('');
        $('#' + tableId + ' tr[id="row_OI_' + count + '"] select').val('');



        //---------------------------------

        //make numbers only inputs.
        $('.numbers-only').keypress(function (e) {
            if (e.which == 8 || (e.which == 46 && $(this).val().indexOf('.') == -1) || (e.which > 47 && e.which < 58)) { } else { return false; }
        });
    }
    else {
        swal.fire('Limit Exceeded.Maximum level of point criteria is 5');
    }
}


function DeleteRw(index) {
    debugger;
    var count = 0;
    count = $('#AddNewRow tr[id^="row_OI_"]').length;
    //$("#" + index).html('');
    if (count > 1) {
        $("#AddNewRow #row_OI_" + index).remove();
        for (var j = index + 1; j < count; j++) {
            var template = $('#row_OI_' + j).clone(); // clone the row


            $.each(template.find('input[type=text]'), function () {
                var name = $(this).attr('name');
                name = name.replace(new RegExp("" + j, "g"), "" + (j - 1));
                $(this).attr('name', name);

                var id = $(this).attr('id');
                id = id.replace(new RegExp("" + j, "g"), "" + (j - 1));
                $(this).attr('id', id);

                //---------------------------------For row Increment When onkeyup
                var onkeyup = $(this).attr('onkeyup');
                if (onkeyup !== undefined) {
                    onkeyup = onkeyup.replace('(' + (j) + ')', '(' + (j - 1) + ')');
                    $(this).attr('onkeyup', onkeyup);
                }
                //----------------------------

            });

            $.each(template.find('select'), function () {
                var name = $(this).attr('name');
                name = name.replace(new RegExp("" + j, "g"), "" + (j - 1));
                $(this).attr('name', name);

                var id = $(this).attr('id');
                id = id.replace(new RegExp("" + j, "g"), "" + (j - 1));
                $(this).attr('id', id);


            });

            $.each(template.find('input[type=button]'), function () {
                var onclick = $(this).attr('onclick');
                onclick = onclick.replace(new RegExp("(" + j + ")", "g"), "" + (j - 1));
                $(this).attr('onclick', onclick);
            });

            template.find('td[id=grid_slno]').text(j);
            //$("#row_OI_" + j).html(template.html());
            $('#row_OI_' + j).attr('id', 'row_OI_' + (j - 1));



        }

    }
    else {
        swal.fire('Atleast One level is mandatory')
    }
}










//function DeleteRw(index) {
//    debugger;
//    if (confirm("Do you want to delete..?")) {
//        var count = 0;
//        count = $('tr[id^="row_OI_"]').length;
//        if (count > 1) {
//            $("#row_OI_" + index).remove();
//            for (var j = index + 1; j < count; j++) {
//                var template = $('#row_OI_' + j).clone(); // clone the row
//                /*var qid = $("#CopyHolder _" + j + "__EmployeeUserCode").val();*/



//                $.each(template.find('input, textarea'), function () {
//                    var name = $(this).attr('name');
//                    if (typeof name != 'undefined') {
//                        name = name.replace(new RegExp("" + j, "g"), "" + (j - 1));
//                        $(this).attr('name', name);
//                    }

//                    var id = $(this).attr('id');
//                    if (typeof id != 'undefined') {
//                        id = id.replace(new RegExp("" + j, "g"), "" + (j - 1));
//                        $(this).attr('id', id);
//                    }
//                    //---------------------------------For row Increment When onkeyup
//                    var onkeyup = $(this).attr('onkeyup');
//                    if (onkeyup !== undefined) {
//                        onkeyup = onkeyup.replace('(' + (j) + ')', '(' + (j - 1) + ')');
//                        $(this).attr('onkeyup', onkeyup);
//                    }

//                    //---------------------------------------For row Increment When onchange
//                    var onchange = $(this).attr('onchange');
//                    if (onchange !== undefined) {
//                        onchange = onchange.replace('(' + (j) + ')', '(' + (j - 1) + ')');
//                        $(this).attr('onchange', onchange);
//                    }
//                    //---------------------------------------
//                });


//                $.each(template.find('select'), function () {
//                    var name = $(this).attr('name');
//                    name = name.replace(new RegExp("" + j, "g"), "" + (j - 1));
//                    $(this).attr('name', name);

//                    var id = $(this).attr('id');
//                    id = id.replace(new RegExp("" + j, "g"), "" + (j - 1));
//                    $(this).attr('id', id);

//                    //---------------------------------------For row Increment When onchange
//                    var onchange = $(this).attr('onchange');
//                    if (onchange !== undefined) {
//                        onchange = onchange.replace('(' + (j) + ')', '(' + (j - 1) + ')');
//                        // onchange = onchange.replace(/\(0\)/g, '(' + (j - 1) + ')');
//                        $(this).attr('onchange', onchange);
//                    }

//                    //---------------------------------------
//                });

//                $.each(template.find('input[type=button]'), function () {
//                    var onclick = $(this).attr('onclick');
//                    onclick = onclick.replace(new RegExp("(" + j + ")", "g"), "" + (j - 1));
//                    $(this).attr('onclick', onclick);
//                });

//                //$.each(template.find('.hasDatepicker'), function () {
//                //    $(this).removeClass('hasDatepicker');
//                //});


//                //$('#' + tableId + ' tr[id="row_OI_' + count + '"] .datepicker').datepicker({
//                //    dateFormat: "dd-M-yy", changeMonth: true,
//                //    changeYear: true
//                //});

//                template.find('td[id=oi_slno]').text(j);
//                $("#row_OI_" + j).html(template.html());
//                $('#row_OI_' + j).attr('id', 'row_OI_' + (j - 1));
//                /*$("#CopyHolder _" + (j - 1) + "__EmployeeUserCode").val(qid);*/

//            }

//        }
//        else {
//            /*$("#CopyHolder _0__EmployeeUserCode").val("");*/



//        }
//    }
//}

//function Validation() {
//    debugger;
//    var status = true;


//    $(".q").each(function (index, object) {
//        if ($("#CopyHolder _" + index + "__EmployeeUserCode").val() == '')
//            status = false;
//    });
//    return status;
//}

function ontabClick(Tab, TabIndex) {
    debugger;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");
    var url = "/Master/RewardsMaster/GetRewardsList";
   
    if (TabIndex != 'PendingTab')
        $('#ActiveList').load(url, { TabIndex: TabIndex }, function () { });
    else
        $('#PendingList').load(url, { TabIndex: TabIndex }, function () { });
    currentTab = TabIndex;
    $('#tabsDropdownRewards').val(currentTab);
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
    var url = "/Master/RewardsMaster/GetRewardsList";
    $('#ActiveList').load(url, { TabIndex: currentTab }, function () { });

}
function AddNewOrEdit(Action, GI, LogGI) {
    debugger;
    var Code = 1;
    debugger;
    if (Action == 'Edit') {
        var url = "/Master/RewardsMaster/Edit?RewardGI=" + GI + "&LogGI=" + LogGI;
    }
    else {
        var url = "/Master/RewardsMaster/Create";
    }
    $('.rewardsSaveclose').load(url, function () { });
    $('#newRequestSlider').removeClass('hide');
    $('.rewardsSaveclose').show();
}

function Delete(GI, LogGI) {
  
    debugger;
    var url = "/Master/RewardsMaster/Delete?RewardGI=" + GI + "&LogGI=" + LogGI;
    $('#deleteRewardstSlider').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
}



function Approve(GI, LogGI) {
    debugger;
    var url = "/Master/RewardsMaster/Approve?RewardGI=" + GI + "&LogGI=" + LogGI;
    $('.PendingApprove').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
    $("#approveSlider").removeClass("hide");
    $(".PendingApprove").show();

}
function ConfirmRewardsApprove(GI, LogGI) {

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
                url: '/Master/RewardsMaster/Approve',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('PendingApprove');
                            var url = "/Master/RewardsMaster/GetRewardsList?TabIndex=" + 'APPROVAL_PENDING';
                            window.location.href = url;

                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            debugger;
                            var url = "/Master/RewardsMaster/Approve?RewardGI=" + GI + "&LogGI=" + LogGI;
                            $('#approveSlider').load(url, function () { });
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
    })
}


function confirmRewardsReject(GI, LogGI) {

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
                url: '/Master/RewardsMaster/Reject',
                dataType: 'json',
                data: $('#approve').serialize(),
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            CloseSlider('ApproveDiv');
                            var url = "/Master/RewardsMaster/GetRewardsList?TabIndex=" + 'APPROVAL_PENDING';
                            window.location.href = url;
                        });

                    }
                    else {
                        swal.fire(result.message).then(function () {
                            var url = "/Master/RewardsMaster/Approve?RewardGI=" + GI + "&LogGI=" + LogGI;
                            $('#approveSlider').load(url, function () { });
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
    })

}

//function ConfirmRewardsApprove() {
//    if (confirm("Do you want to Confirm?")) {
//        debugger;
//        console.log($('#approve').serialize());
//        $.ajax({

//            type: 'POST',
//            url: '/Master/RewardsMaster/Approve',
//            dataType: 'json',
//            data: $('#approve').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    debugger;
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('PendingApprove');
//                        var url = "/Master/RewardsMaster/GetRewardsList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#PendingList').load(url, function () { });
//                        $(".PendingTab").addClass("active");
//                        $(".ActiveTab").removeClass("active");
//                        $(".InctiveTab").removeClass("active");
//                        $("#pendingList").removeClass("hide");
//                    });

//                }
//                else {
//                    debugger;
//                    if (result.message == "MAKER_CHECKER") {
//                        swal.fire("Maker and checker cannot be same.")
//                    }
//                    else {
//                        swal.fire(result.message).then(function () {


//                        });
//                    }
//                }

//            },
//            error: function (xhr, textStatus, errorThrown) {
//                debugger;
//                toastr.error(xhr.responseText);
//            }
//        });
//    }
//    else {
//        debugger;
//        return false;
//    }
//}


//function ConfirmRewardsReject() {
//    if (confirm("Do you want to Confirm?")) {
//        debugger;

//        $.ajax({

//            type: 'POST',
//            url: '/Master/RewardsMaster/Reject',
//            dataType: 'json',
//            data: $('#approve').serialize(),
//            success: function (result) {
//                if (result.success == true) {
//                    swal.fire(result.message).then(function () {
//                        CloseSlider('PendingApprove');
//                        var url = "/Master/RewardsMaster/GetRewardsList?TabIndex=" + 'APPROVAL_PENDING';
//                        $('#pendingList').load(url, function () { });
//                        $(".PendingTab").addClass("active");
//                        $(".ActiveTab").removeClass("active");
//                        $(".InctiveTab").removeClass("active");
//                        $("#pendingList").removeClass("hide");
//                    });

//                }
//                else {
//                    swal.fire(result.message).then(function () {


//                    });
//                }

//            },
//            error: function (xhr, textStatus, errorThrown) {
//                toastr.error(xhr.responseText);
//            }
//        });
//    }
//    else {
//        return false;
//    }

//}

function validateRewards() {
    debugger;
    if ($('.Rname').val() == '') {

        $('#Name').addClass('is-invalid');
        $("#rewardsname").addClass('error-message');
        $('#rewardsname').html("This field is required");
        $('#Name').focus();
        return false;
    }

    else if ($('.RshtName').val() == '') {

        $('#ShortName').addClass('is-invalid');
        $("#rewardsshortname").addClass('error-message');
        $('#rewardsshortname').html("This field is required");
        $('#ShortName').focus();
        return false;
    }
    else if ($('#rewDep').find('input[type=checkbox]').is(':checked') == false) {
        swal.fire("Select atleast one department")
        return false;
    }
    //else if ($('.dept').val() == '') {

    //    $('#RewardsGridFill[i].Name').addClass('is-invalid');
    //    $("#depart").addClass('error-message');
    //    $('#depart').html("Select atleast one department");
    //    $('#RewardsGridFill[i].Name').focus();
    //    return false;
    //}
    else if ($('#RewardVsPointCriteriaList_0__Name').val() == '') {

        swal.fire("Atleast one Point Criteria required");
        $('#RewardVsPointCriteriaList_0__Name').focus();
        return false;
    }
    else if ($('#RewardVsPointCriteriaList_0__Point').val() == '') {
        swal.fire("Please file the Point");
        $('#RewardVsPointCriteriaList_0__Point').focus();
        return false;
    }
  

}

 
function ExportToExcel() {

    debugger;
    if (currentTab == 'APPROVAL_PENDING') {
        var pendingTableLength = document.getElementById("RewardsPendingTable").rows.length - 1;
        if (pendingTableLength > 0) {
            url = "/Master/RewardsMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else {
        var activeTableLength = document.getElementById("RewardsActiveList").rows.length - 1;
        if (activeTableLength > 0) {
            url = "/Master/RewardsMaster/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    

}