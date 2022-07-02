var currentTab;
function TabChange(res) {
    if (res == 'A') {
        $('#UserRoleList').removeClass('hide');
        $('#InactiveList').addClass('hide');
        $('#PendingList').addClass('hide');
    }
    else if (res == 'I') {
        $('#UserRoleList').addClass('hide');
        $('#InactiveList').removeClass('hide');
        $('#PendingList').addClass('hide');
         }
    else {
        $('#UserRoleList').addClass('hide');
        $('#InactiveList').addClass('hide');
        $('#PendingList').removeClass('hide');
         }
}
function onBackArrowClck(view) {
    debugger;
    if (view == "SubModule") {
        $('#Module').removeClass('hide');
        $('#SubModule').addClass('hide');
        $('#Menu').addClass('hide');
    }
    else {
        $('#SubModule').removeClass('hide');
        $('#Module').addClass('hide');
        $('#Menu').addClass('hide');
    }
}
function onNextClick(TabIndex,count) {
    debugger;
    if (TabIndex == 'Module') {
        var Code = [];
        var Appl = [];
        var Name = [];
        for (i = 0; i < count; i++) {
            if ($('#UserVsModule_' + i + '__Applicable').is(':checked')) {
                Appl.push($('#UserVsModule_' + i + '__Applicable').is(':checked'));
                Code.push($('#UserVsModule_' + i + '__Code').val());
                Name.push($('#UserVsModule_' + i + '__Name').val());
            }
            
        }
        var url = "/Master/UserRole/ModuleChange";
        /* window.location.href = url + "?Code=" + Code + "&Appl=" + Appl + "&Name=" + Name;*/
        $("#SubModule").load(url, { Code: Code, Appl: Appl, Name: Name, GI: GI, LogGI: LogGI, Editmode: Editmode }, function () {
        });
        console.log(Code);
        console.log(Appl);
        console.log(Name);
        $('#SubModule').removeClass('hide');
        $('#Module').addClass('hide');
        $('#Menu').addClass('hide');
    }
    else if (TabIndex == 'SubModule') {
        var MCode = [];
        for (i = 0; i < count; i++) {
            if ($('#UserVsSubModule_' + i + '__Applicable').is(':checked')) {
                MCode.push($('#UserVsSubModule_' + i + '__Code').val());
            }

        }
        //console.log(Code);
        //console.log(Code.length);
        var url = "/Master/UserRole/SubModuleChange";
        /* window.location.href = url + "?Code=" + Code + "&Appl=" + Appl + "&Name=" + Name;*/
        $("#Menu").load(url, { Code: MCode, GI: GI, LogGI: LogGI, Editmode: Editmode }, function () {
        });
        console.log(Code);
        $('#SubModule').addClass('hide');
        $('#Module').addClass('hide');
        $('#Menu').removeClass('hide');
    }

    else  //job-details
    {
        $('#SubModule').addClass('hide');
        $('#Module').removeClass('hide');
        $('#Menu').addClass('hide');
    }

}


function moduleChange(i) {
    debugger;
    Appl.push($('#z' + i + '__Applicable').is(':checked'));
    Code.push($('#z' + i + '__Code').val());
    Name.push($('#z' + i + '__Name').val());
    //alert(Code);
    //alert(Appl);
    //alert(Name);
    var url = "/Master/UserRole/ModuleChange";
   /* window.location.href = url + "?Code=" + Code + "&Appl=" + Appl + "&Name=" + Name;*/
    $("#submodulen").load(url, { Code: Code,Appl:Appl,Name:Name }, function () {
    });
}
function submoduleChange(i) {
    debugger;
    MAppl.push($('#UserVsSubModule_' + i + '__Applicable').is(':checked'));
    MCode.push($('#UserVsSubModule_' + i + '__Code').val());
    MName.push($('#UserVsSubModule_' + i + '__Name').val());
    alert(MCode);
    alert(MAppl);
    alert(MName);
    var url = "/Master/UserRole/SubModuleChange";
    /* window.location.href = url + "?Code=" + MCode + "&Appl=" + MAppl + "&Name=" + MName;*/
    $("#menu").load(url, { Code: MCode, Appl: MAppl, Name: MName,CCode:Code,AAppl:Appl,NName:Name }, function () {
    });
}

function OnTabClick(tab,mode) {
    debugger
    currentTab = mode;
    if (mode == 'ACTIVE') {
        var url = "/Master/UserRole/GetUserRoleList?TabIndex=" + mode;
        $('#UserRoleList').load(url, function () { });
        debugger;
        $(".PendingTab").removeClass("active");
        $(".InactiveTab").removeClass("active");
        $(".ActiveTab").addClass("active");
        $("#UserRoleList").removeClass("hide");
        $("#pendingList").addClass("hide");
        $("#InactiveList").addClass("hide");

    }
    else if (mode == 'APPROVAL_PENDING') {
        var url = "/Master/UserRole/GetUserRoleList?TabIndex=" + mode;

        $('#pendingList').load(url, function () { });
        debugger;
        $("#UserRoleList").addClass("hide");

        $(".PendingTab").addClass("active");
        $(".ActiveTab").removeClass("active");
        $(".InactiveTab").removeClass("active");
        $("#pendingList").removeClass("hide");
        $("#InactiveList").addClass("hide");
    }
    else {
        var url = "/Master/UserRole/GetUserRoleList?TabIndex=" + mode;
        $('#InactiveList').load(url, function () { });
        debugger;
        $("#pendingList").addClass("hide");
        $("#InactiveList").removeClass("hide");
        $("#UserRoleList").addClass("hide");
        $(".PendingTab").removeClass("active");
        $(".ActiveTab").removeClass("active");
        $(".InactiveTab").addClass("active");
    }

}

function Edit(GI, LogGI) {

    debugger;    
    var url = "/Master/UserRole/Edit?UserRoleGI=" + GI + "&LogGI=" + LogGI;
    window.location.href = url;
}

function Delete(GI, LogGI) {

    debugger;
    var url = "/Master/UserRole/Delete?UserRoleGI=" + GI + "&LogGI=" + LogGI;
    window.location.href = url;
}
function Approve(GI, LogGI) {

    debugger;
    var url = "/Master/UserRole/Approve?UserRoleGI=" + GI + "&LogGI=" + LogGI;
    window.location.href = url;
}

function deleteClick(GI) {

    debugger;
    var url = "/Master/UserRole/UserRoleDelete?UserRoleGI=" + GI;
    window.location.href = url;
}

function onExportToExcelClick() {
    debugger;
    if (currentTab == 'ACTIVE') {
        var ActiveUserRoleTableLength = document.getElementById("ActiveUserRoleTable").rows.length - 1;
        if (ActiveUserRoleTableLength > 0) {
            url = "/Master/UserRole/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }

    else if (currentTab == 'INACTIVE') {
        var InactiveUserRoleTableLength = document.getElementById("InactiveUserRoleTable").rows.length - 1;
        if (InactiveUserRoleTableLength > 0) {
            url = "/Master/UserRole/ExportToExcel?TabIndex=" + currentTab;
            window.location.href = url;
        }
        else {
            swal.fire("No data found to export");
        }
    }
    //else if (currentTab == 'INACTIVE') {
    //    var inActiveTableLength = document.getElementById("CountryTable").rows.length - 1;
    //    if (inActiveTableLength > 0) {
    //        url = "/Master/Country/ExportToExcel?TabIndex=" + currentTab;
    //        window.location.href = url;
    //    }
    //    else {
    //        swal.fire("No data found to export");
    //    }
    //}
}

function onAllClick(chkid, tableid) {
    if ($('#' + chkid).is(':checked'))
        $('#' + tableid).find('input[type=checkbox]').prop('checked', true);
    else
        $('#' + tableid).find('input[type=checkbox]').prop('checked', false);
}


function onCheckBoxClick(tableid) {
    if ($('#' + tableid).find('input[type=checkbox]').is(':checked')) {
        $("#modulebtn").removeClass("hide");
    }
    else {
        $("#modulebtn").addClass("hide");
    }
}
