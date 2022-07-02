var prevTab = 'ActiveTab';
var currentTab = 'NotRegularizedDays';

function OnTabClick(Tab, TabIndex) {
    debugger;
    currentTab = TabIndex;
    $("." + prevTab).removeClass("active");
    $("." + Tab).addClass("active");

    var url = "/ESSP/AbsenteeismRegularization/GetList";
    /* $('#tabsDropdownCategory').val(currentTab);*/
    var month = $('#Month_Code').val();
    $('#RegList').load(url, { month: month, TabIndex: TabIndex }, function () { });

    prevTab = Tab;
}

function tabClick(val) {
    debugger;
    currentTab = $(val).val();
    $("." + prevTab).removeClass("active");
    if (currentTab == "NotRegularizedDays")
        prevTab = 'ActiveTab'
    else if (currentTab == "PENDING")
        prevTab = 'PendingTab';

    $("." + prevTab).addClass("active");
    var url = "/ESSP/AbsenteeismRegularization/GetList";
    $('#RegList').load(url, { TabIndex: currentTab }, function () { });

}


function OnMonthChange(sender) {
    debugger;

    var url = "/ESSP/AbsenteeismRegularization/GetList";
    /* $('#tabsDropdownCategory').val(currentTab);*/
    var month = sender.value;
    $('#RegList').load(url, { month: month, TabIndex: currentTab }, function () { });
}

function onFormNameChange(dropdownVal, date, status) {
    debugger;
    if (dropdownVal == 1)
        var url = "/ESSP/LeaveApplication/AbsenteeismBasedIndex?FromTodate=" + date + "&status=" + status;
    else if (dropdownVal == 4)
        url = "/ESSP/CoffApplication/AbsenteeismBasedIndex?Leaveon=" + date;
    else if (dropdownVal == 3)
        url = "/ESSP/OnDutyApplication/AbsenteeismBasedIndex?FromTodate=" + date + "&status=" + status;
    else if (dropdownVal == 2)
        url = "/ESSP/WFHApplication/AbsenteeismBasedIndex?FromTodate=" + date + "&status=" + status;
    /* $('#tabsDropdownCategory').val(currentTab);*/
    window.location.href = url;
}

function onTrackerClick(LeaveGI, LeaveType) {

    debugger;
    var url = "/ESSP/AbsenteeismRegularization/TrackerView?LeaveGI=" + LeaveGI + "&Type=" + LeaveType;
    $('#trackerId').load(url, function () { });
    $('body').append('<div class="form-overlay"></div>');
}