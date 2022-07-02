var planningPeriod;
var CombnameIndex = '';
    var CombnameSummary;
function GetFormattedDate(date)
{
    var monthNames = new Array("Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec");

    var formattedDate = new Date(date);
    var cDate = formattedDate.getDate();
    var cMonth = formattedDate.getMonth();
    var cYear = formattedDate.getFullYear();
    if (cDate < 10)
        cDate = '0' + cDate;
    formattedDate = (cDate + "-" + monthNames[cMonth] + "-" + cYear);
    return formattedDate;

}


function onHRPlanningNameChange(sender,formname)
{
  
    debugger;
    $.ajaxSetup({
        async: false
    });
  
    var code = $(sender).val();
    if (formname == 'create') {
        
        $.getJSON("/DataBank/HRPlanning/GetPlanningDetails", { HRPlanningCode: code }, function (data) {
            $('.combination1Label').html(data.combination1Label);
            $('.fromDate').html(GetFormattedDate(data.fromDate));
            $('.toDate').html(GetFormattedDate(data.toDate));

        });

        $.getJSON("/DataBank/HRPlanning/GetHRPlanningAddNewCombination1DropDown", { HRPlanningCode: code }, function (data) {
            $('#Combination1_Code option').remove();
            $('#Combination1_Code').append('<option value="0">--Select--</option');
            debugger;
            for (var i = 0; i < data.length; i++) {
                $('#Combination1_Code').append('<option value="' + data[i].code + '">' + data[i].name + '</option');
            }

        });
    }
    else if (formname == 'index') {

       
        $.getJSON("/DataBank/HRPlanning/GetPlanningDetails", { HRPlanningCode: code }, function (data) {
            $('.combination1Name').html(data.combination1Label);
            
            CombnameIndex = data.combination1Label;

            planningPeriod = data.planningPeriod;
            $('.planningPeriod').html(data.planningPeriod);

        });
        $.getJSON("/DataBank/HRPlanning/GetHRPlanningCombination1DropDown", { HRPlanningCode: code }, function (data) {
            debugger
          
            $('#Combination1Main_Code option').remove();
            $('#Combination1Main_Code').append('<option value="0">' + CombnameIndex+'</option');
         
            for (var i = 0; i < data.length; i++) {
                $('#Combination1Main_Code').append('<option value="' + data[i].code + '">' + data[i].name + '</option');
            }

        });
    }
    else  {

        $.getJSON("/DataBank/HRPlanning/GetPlanningDetails", { HRPlanningCode: code }, function (data) {
            $('.combination1NameSummary').html(data.combination1Label);
            CombnameSummary = data.combination1Label;
            $('.planningPeriodSummary').html(data.planningPeriod);

        });
        $.getJSON("/DataBank/HRPlanning/GetHRPlanningCombination1DropDown", { HRPlanningCode: code }, function (data) {

            $('#Combination1Main_Code option').remove();
            $('#Combination1Main_Code').append('<option value="0">'+CombnameSummary+'</option');
            debugger;
            for (var i = 0; i < data.length; i++) {
                $('#Combination1Main_Code').append('<option value="' + data[i].code + '">' + data[i].name + '</option');
            }

        });
       
    }
}
function onHRPlanningCombination1Change(sender,planingClasName)
{
    debugger;
    var Combination1code = $(sender).val();
    /*    var HRPlanningCode = $('#HRPlanningName_Code').val();*/
    var HRPlanningCode = $('.' + planingClasName).val();

    var url = "/DataBank/HRPlanning/FillHRPlanningCombination2Grid"
    $('#combination2PlanningGrid').load(url, { HRPlanningCode: HRPlanningCode, Combination1TrnCode: Combination1code},function () { });
  
}

function showMonthCalender(sender) {
    debugger

    if ($(sender).val() == 0) {
        var toDate = new Date();
        var month = toDate.getMonth();
        var Year = toDate.getFullYear();
        $('#PreviousMonth').val(month + 1 + '-' + Year);
        $('.monthCalender').addClass('hide');
        onBasedOnChange(sender);
    }
    else
    {
        $('.monthCalender').removeClass('hide');
        
    }
       
}
function onCombination1MainChange(sender) {
    debugger;

    var Combination1code = $(sender).val();
    var BasedOn = $('input[name="BasedOn"]:checked').val();

   
     var monthCode = $('#PreviousMonth').val();
     var HRPlanningCode = $('#HRPlanningName_Code').val();

    var url = "/DataBank/HRPlanning/GetHRPlanningList"
    $('#hRplanningMainGrid').load(url, { HRPlanningCode: HRPlanningCode, Combination1TrnCode: Combination1code, BasedOn: BasedOn, monthCode: monthCode}, function () { });

}


function onBasedOnChange(sender) {
    debugger;
    var BasedOn= $('input[name="BasedOn"]:checked').val();
    var monthCode = $('#PreviousMonth').val();
   
    

    var Combination1code = $('#Combination1Main_Code').val();
    var HRPlanningCode = $('#HRPlanningName_Code').val();

    var url = "/DataBank/HRPlanning/GetHRPlanningList"
    $('#hRplanningMainGrid').load(url, { HRPlanningCode: HRPlanningCode, Combination1TrnCode: Combination1code, BasedOn: BasedOn, monthCode: monthCode }, function () { });

}

function onPreviousMonthChange(sender) {
    debugger;
    var monthCode = $(sender).val();
    var BasedOn = $('input[name="BasedOn"]:checked').val();

    var Combination1code = $('#Combination1Main_Code').val();
    var HRPlanningCode = $('#HRPlanningName_Code').val();

    var url = "/DataBank/HRPlanning/GetHRPlanningList"
    $('#hRplanningMainGrid').load(url, { HRPlanningCode: HRPlanningCode, Combination1TrnCode: Combination1code, BasedOn: BasedOn, monthCode: monthCode }, function () { });

}





function onCombination2Click(hrPlanningCode, combination1code, combination2code,mode)
{
    debugger
  
    var url = "/DataBank/HRPlanning/GetHRPlanningDetailsForModify";
    $('body').append('<div class="form-overlay"></div>');
    if (mode == 'edit') {
      
        $('#edit').load(url, { HRPlanningCode: hrPlanningCode, Combination1TrnCode: combination1code, Combination2TrnCode: combination2code, Mode: mode }, function () { });
    }
    else {
   
        $('#delete').load(url, { HRPlanningCode: hrPlanningCode, Combination1TrnCode: combination1code, Combination2TrnCode: combination2code, Mode: mode }, function () { });
    }
} 

function onAddPlanningClick()
{
    debugger;
    //$.ajax({
    //    url: "/DataBank/HRPlanning/Create",
    //    cache: false,
    //    Type: 'GET',
    //    success: function (result) {
    //        $('#create').html("");
    //        $('#create').html(result);
    //    },
    //    error: function (xhr, textStatus, errorThrown) {
    //        swal.fire(xhr.responseText);
    //    }
    //});
    var url = "/DataBank/HRPlanning/Create"
    $('#create').load(url, function () { });

}

function SaveHRPlanning() {
    debugger;


    /*console.log($('#Save-IndustryBenchmarkSalary').serialize());*/
    $.ajax({

        type: 'POST',
        url: '/DataBank/HRPlanning/Save',
        dataType: 'json',
        data: $('#HRPlanning-Save').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire("Saved Successfully").then(function () {
                    CloseSlider('create');
                    //var url = "/DataBank/IndustryBenchmarkSalary/Index";

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

  
function onChartMOdeChange(sender) {
 var mode= $("#BudgetOrManpower :selected").text();
    debugger
        var Combination1code = $('#Combination1Main_Code').val();
        var HRPlanningCode = $('#HRPlanningName_Code').val();
    var url = '/DataBank/HRPlanning/GetHRplanningSummaryChart?HRPlanningCode=' + HRPlanningCode + '&Combination1TrnCode=' + Combination1code + "&Mode=" + mode;
    $('.planning-list-chart').load(url, function () { });
  /*  window.location.href = url;*/
      
  /*  $('.planning-list-chart').load(url, function () { });*/

    //   $.ajax({
    //    url: '/DataBank/HRPlanning/GetHRplanningSummaryChart?HRPlanningCode=' + HRPlanningCode + '&Combination1TrnCode=' + Combination1code + "&Mode=" + mode,

    //    cache: false,
    //    Type: 'GET',
    //       success: function (result) {
    //        //   console.log(result)
    //        //   debugger
    //        //$('.planning-list-chart').html("");
    //        //   $('.planning-list-chart').html(result);
    //           //$('.planning-list-chart').removeClass('hide');
    //           //xAxis.data.setAll(result);
    //           //series0.data.setAll(result);
    //           //series1.data.setAll(result);

    //    },
    //    error: function (xhr, textStatus, errorThrown) {
    //        swal.fire(xhr.responseText);
    //    }
    //});
   
}
function onExportToExcelClick() {
    debugger;
 
    var BasedOn = $('#BasedOn').val();
    var monthCode = $('#PreviousMonth').val();
    var Combination1code = $('#Combination1Main_Code').val();
    var HRPlanningCode = $('#HRPlanningName_Code').val();

    /*var bas = document.querySelector('input[name="BasedOn"]:checked');*/
    /*var month = $('#PreviousMonth option:selected').text();*/
    var Department = $('#Combination1Main_Code option:selected').text();
    var planname = $('#HRPlanningName_Code option:selected').text();
    var plannprd = planningPeriod;



    var TableLength = document.getElementById("hrPlanningTrnTable").rows.length-1;
    if (TableLength > 0) {
        url = '/DataBank/HRPlanning/ExportToExcel?HRPlanningCode=' + HRPlanningCode + '&Combination1TrnCode=' + Combination1code + '&BasedOn=' + BasedOn + '&monthCode=' + monthCode + '&Department=' + Department + '&planname=' + planname+ '&plannprd=' + plannprd;
        /*url = '/DataBank/HRPlanning/ExportToExcel?HRPlanningCode=' + HRPlanningCode + '&Combination1TrnCode=' + Combination1code + '&BasedOn=' + BasedOn + '&monthCode=' + monthCode + '&planname=' + planname + '&depart=' + '&planningPeriod=' + planningPeriod+ depart + '&basedon=' + basedon;*/
        window.location.href = url;
    }
    else {
        swal.fire("No data found to export");
    }
}

function ModifyHRPlanning() {

    $.ajax({

        type: 'POST',
        url: '/DataBank/HRPlanning/Save',
        dataType: 'json',
        data: $('#Modify-HRPlanning').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire("Modified Successfully").then(function () {
                    CloseSlider('edit');
                 

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
function DeleteHRPlanningClick() {
    $.ajax({

        type: 'POST',
        url: '/DataBank/HRPlanning/Delete',
        dataType: 'json',
        data: $('#Delete-HRPlanning').serialize(),
        success: function (result) {
            if (result.success == true) {
                swal.fire("Deleted Successfully").then(function () {
                    CloseSlider('delete');


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