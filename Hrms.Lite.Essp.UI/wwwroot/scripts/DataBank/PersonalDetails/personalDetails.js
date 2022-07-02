
/*const { block } = require("../../../js/scripts.bundle");*/

//state dropdown enable
filter = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
function onCountryChangepd(sender, id) {
    debugger;
    var cid = $(sender).val();
    if (cid == "") {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
    $.getJSON("/DataBank/PersonalDetails/GetState", { id: cid }, function (data) {

        $('#Address_PermanentAddress_State_Code option').remove();
        $('#Address_PermanentAddress_State_Code').append('<option value="0">--Select State--</option');

        for (var i = 0; i < data.length; i++) {
            $('#Address_PermanentAddress_State_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
    //Make Dtsrict Dropdwn Empty when no Country is Selected
    /*if (cid == 0) {*/
        $.getJSON("/DataBank/PersonalDetails/GetDistrict", { id: 0 }, function (data) {

            $('#Address_PermanentAddress_District_Code option').remove();
            $('#Address_PermanentAddress_District_Code').append('<option value="0">--Select District--</option');

            for (var i = 0; i < data.length; i++) {
                $('#Address_PermanentAddress_District_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
            }
        });
   /* }*/
}

//district dropdown enable
function onStateChangepd(sender, id) {
    debugger;
    var cid = $(sender).val();
    if (cid == 0 || cid == "") {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
    $.getJSON("/DataBank/PersonalDetails/GetDistrict", { id: cid }, function (data) {

        $('#Address_PermanentAddress_District_Code option').remove();
        $('#Address_PermanentAddress_District_Code').append('<option value="0">--Select District--</option');

        for (var i = 0; i < data.length; i++) {
            $('#Address_PermanentAddress_District_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
}

function onDistrictChangepd(sender, id) {
    debugger;
    var cid = $(sender).val();
    if (cid == "" || cid == 0) {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
}

function fillAddress() {
    debugger;
    //if ($(this).attr('checked')) {
    if ($("#Address_SameAsAddressCheck").prop('checked') == true) {
        debugger;
        $("#Address_PresentAddress_House").val($("#Address_PermanentAddress_House").val());
        $("#Address_PresentAddress_Street").val($("#Address_PermanentAddress_Street").val());
        $("#Address_PresentAddress_City").val($("#Address_PermanentAddress_City").val());
        $("#Address_PresentAddress_PinCode").val($("#Address_PermanentAddress_PinCode").val());
        $("#Address_PresentAddress_Country_Code").val($("#Address_PermanentAddress_Country_Code").val());
        $.getJSON("/DataBank/PersonalDetails/GetState", { id: $("#Address_PermanentAddress_Country_Code").val() }, function (data) {

            $('#Address_PresentAddress_State_Code option').remove();
            $('#Address_PresentAddress_State_Code').append('<option value="0">--Select--</option');

            for (var i = 0; i < data.length; i++) {
                $('#Address_PresentAddress_State_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
            }
            document.getElementById('Address_PresentAddress_State_Code').selectedIndex = document.getElementById('Address_PermanentAddress_State_Code').selectedIndex;
        });

        $.getJSON("/DataBank/PersonalDetails/GetDistrict", { id: $("#Address_PermanentAddress_State_Code").val() }, function (data) {

            $('#Address_PresentAddress_District_Code option').remove();
            $('#Address_PresentAddress_District_Code').append('<option value="0">--Select--</option');

            for (var i = 0; i < data.length; i++) {
                $('#Address_PresentAddress_District_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
            }
            document.getElementById('Address_PresentAddress_District_Code').selectedIndex = document.getElementById('Address_PermanentAddress_District_Code').selectedIndex;
        });
        //$("#Address_PresentAddress_State_Code").val($("#Address_PermanentAddress_State_Code").val());
        //$("#Address_PresentAddress_District_Code").val($("#Address_PermanentAddress_District_Code").val());
    }
    else {
        $("#Address_PresentAddress_House").val('');
        $("#Address_PresentAddress_Street").val('');
        $("#Address_PresentAddress_City").val('');
        $("#Address_PresentAddress_PinCode").val('');
        /*$('#Address_PresentAddress_Country_Code').selectedIndex = 0;*/
        document.getElementById('Address_PresentAddress_Country_Code').selectedIndex = 0;
        document.getElementById('Address_PresentAddress_State_Code').selectedIndex = 0;
        document.getElementById('Address_PresentAddress_District_Code').selectedIndex = 0;
    }
}


function onCountryChangepresentpd(sender,id) {
    debugger
    var cid = $(sender).val();
    if (cid == "") {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
    $.getJSON("/DataBank/PersonalDetails/GetState", { id: cid }, function (data) {

        $('#Address_PresentAddress_State_Code option').remove();
        $('#Address_PresentAddress_State_Code').append('<option value="0">--Select State--</option');

        for (var i = 0; i < data.length; i++) {
            $('#Address_PresentAddress_State_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
    //Make Dtsrict Dropdwn Empty when no Country is Selected
    /*if (cid == 0) {*/
    $.getJSON("/DataBank/PersonalDetails/GetDistrict", { id: 0 }, function (data) {

        $('#Address_PresentAddress_District_Code option').remove();
        $('#Address_PresentAddress_District_Code').append('<option value="0">--Select District--</option');

        for (var i = 0; i < data.length; i++) {
            $('#Address_PresentAddress_District_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }
    });
    /* }*/
}

function onSkillChange(sender, id) {
    debugger;
    var cid = $(sender).val();
    if (cid == "") {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
    $.getJSON("/DataBank/PersonalDetails/GetSkill", { id: cid }, function (data) {

        $('#Skills_SkillType_Code option').remove();
        $('#Skills_SkillType_Code').append('<option value>--Select Skill Type--</option');

        for (var i = 0; i < data.length; i++) {
            $('#Skills_SkillType_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
    //Make Dtsrict Dropdwn Empty when no Country is Selected
    /*if (cid == 0) {*/
    //niv$.getJSON("/DataBank/PersonalDetails/GetDistrict", { id: 0 }, function (data) {

    //    $('#Address_PresentAddress_District_Code option').remove();
    //    $('#Address_PresentAddress_District_Code').append('<option value="0">--Select--</option');

    //    for (var i = 0; i < data.length; i++) {
    //        $('#Address_PresentAddress_District_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
    //    }
    //});
    /* }*/
}

function onQualificationTypeChange(sender, id) {
    debugger;
    var cid = $(sender).val();
    if (cid == "") {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
    $.getJSON("/DataBank/PersonalDetails/GetQualification", { id: cid }, function (data) {

        $('#GetEducation_Qualification_Code option').remove();
        $('#GetEducation_Qualification_Code').append('<option value>--Select Qualification--</option');

        for (var i = 0; i < data.length; i++) {
            $('#GetEducation_Qualification_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
    //Make Dtsrict Dropdwn Empty when no Country is Selected
    /*if (cid == 0) {*/
    //niv$.getJSON("/DataBank/PersonalDetails/GetDistrict", { id: 0 }, function (data) {

    //    $('#Address_PresentAddress_District_Code option').remove();
    //    $('#Address_PresentAddress_District_Code').append('<option value="0">--Select--</option');

    //    for (var i = 0; i < data.length; i++) {
    //        $('#Address_PresentAddress_District_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
    //    }
    //});
    /* }*/
}

function onQualificationChange(sender, id) {
    debugger;
    var cid = $(sender).val();
    if (cid == "") {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
    $.getJSON("/DataBank/PersonalDetails/GetSpecialisation", { id: cid }, function (data) {

        $('#GetEducation_Specialisation_Code option').remove();
        $('#GetEducation_Specialisation_Code').append('<option value>--Select Specialization of Branch--</option');

        for (var i = 0; i < data.length; i++) {
            $('#GetEducation_Specialisation_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
    //Make Dtsrict Dropdwn Empty when no Country is Selected
    /*if (cid == 0) {*/
    //niv$.getJSON("/DataBank/PersonalDetails/GetDistrict", { id: 0 }, function (data) {

    //    $('#Address_PresentAddress_District_Code option').remove();
    //    $('#Address_PresentAddress_District_Code').append('<option value="0">--Select--</option');

    //    for (var i = 0; i < data.length; i++) {
    //        $('#Address_PresentAddress_District_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
    //    }
    //});
    /* }*/
}

//district dropdown enable
function onStateChangepresentpd(sender,id) {
    debugger;
    var cid = $(sender).val();
    if (cid == "" || cid == 0) {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
    $.getJSON("/DataBank/PersonalDetails/GetDistrict", { id: cid }, function (data) {

        $('#Address_PresentAddress_District_Code option').remove();
        $('#Address_PresentAddress_District_Code').append('<option value="0">--Select District--</option');

        for (var i = 0; i < data.length; i++) {
            $('#Address_PresentAddress_District_Code').append('<option value="' + data[i].value + '">' + data[i].text + '</option');
        }

    });
}

function onDistrictChangepresentpd(sender, id) {
    debugger;
    var cid = $(sender).val();
    if (cid == "" || cid == 0) {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
}

//pin validation
function validatePin(val, id) {
    debugger;

    pin = val.value;
    var pinSixDigit = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}$/;
    if (val.value == "") {
        /*$(sender).addClass('is-invalid');*/
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        if (pin.match(pinSixDigit)) {
            $(id).removeClass('is-invalid');
            $("#" + id + "").removeClass('error-message');
            $("#" + id + "").html("");
            return true;
        }
        else {
            $(id).addClass('is-invalid');
            $("#" + id + "").addClass('error-message');
            $("#" + id).html("Please enter a valid PIN number");
            return false;
        }
    }
}

function RequiredVal(val, id) {

    debugger;
    stringval = val.value;
    if (val.value == "") {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
        return val.value;
    }
}

//mobile validation
function validateMobile(val, id) {
    mobile = $(val).val();
    if (mobile == "") {
        $(val).addClass('is-invalid');
        $(val).focus();
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        var filter = /^[1-9]{1}[0-9]{9}$/
        if (!filter.test(mobile)) {
            debugger;
            $(val).addClass('is-invalid');
            $("#" + id + "").addClass('error-message');
            $("#" + id + "").html('Invalid Mobile number');
            $(val).focus();
        }
        else {
            $(val).removeClass('is-invalid');
            $("#" + id + "").removeClass('error-message');
            $("#" + id + "").html("");
            /*trim(val);*/
            return true;
        }
    }
}

//email validation
function validateEmail(val, id) {
    email = $(val).val();
    if (email == "") {
        $(val).addClass('is-invalid');
        $(val).focus();
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        filter = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if (!filter.test(email)) {
            debugger;
            $(val).addClass('is-invalid');
            $("#" + id + "").addClass('error-message');
            $("#" + id + "").html('Invalid Email ID');
            $(val).focus();
        }
        else {
            $(val).removeClass('is-invalid');
            $("#" + id + "").removeClass('error-message');
            $("#" + id + "").html("");
           /* trim(val);*/
            return true;
        }
    }
}

//Firstletter Capital validation
function firstLetterCaps(val, id) {

    debugger;
    stringval = val.value;
    if (val.value == "") {
        $(val).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(val).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
        val.value = val.value.toLowerCase();
        val.value = val.value.
            replace(/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
            replace(/[ ]{2,}/gi, "").       // replaces multiple spaces with one space
            replace(/\n +/, "\n");
        val.value = val.value.substr(0, 1).toUpperCase() + val.value.substr(1);
        return val.value;
    }
}
function firstLetterCapsWithOutValidation(val) {
    debugger;
    stringval = val.value;   
    val.value = val.value.toLowerCase();
    val.value = val.value.
    replace(/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
    replace(/[ ]{2,}/gi, "").       // replaces multiple spaces with one space
    replace(/\n +/, "\n");
    val.value = val.value.substr(0, 1).toUpperCase() + val.value.substr(1);
    return val.value;   
}


//function calcExp() {
//    debugger;
//    var from = $('#GetPreviousEmployment_Fromdate').val();
//    var to = $('#GetPreviousEmployment_Todate').val();
//    date1 = new Date(from);  
//    date2 = new Date(to); 
//    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
//    const firstDate = date2;
//    const secondDate = date1;
//    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
//    debugger;
//    var diff = parseFloat(diffDays);
//    debugger;   
//    diff = diff / 365.00;
//    $("#GetPreviousEmployment_Experience").val(diff.toFixed(2));
//    debugger;
//}

function calcExp(val, id) {
    debugger;
    /*alert($(val).val());*/
    var from = $('#GetPreviousEmployment_Fromdate').val();
    var to = $('#GetPreviousEmployment_Todate').val();
    date1 = new Date(from);
    date2 = new Date(to);
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
   /* alert(oneDay);*/
    const firstDate = date2;
    const secondDate = date1;
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
   /* alert(diffDays);*/
    debugger;
    var diff = parseFloat(diffDays);
    debugger;
    diff = diff / 365;
    /*alert(diff);*/
    var monthWiseDiff = diff / 0.0833344444;
   /* alert(monthWiseDiff);*/
    monthWiseDiff = parseInt(monthWiseDiff);
    /*alert(monthWiseDiff);*/
    abc = monthWiseDiff % 12;
    monthWiseDiff = monthWiseDiff / 12;
    //alert(abc);
    //alert(monthWiseDiff);
    var month = 0.01 * abc;
    var year = parseInt(monthWiseDiff);
    //alert(year);
    //alert(month);
    var experience = year + month;
    /*alert(experience);*/
    $("#GetPreviousEmployment_Experience").val(experience);
    debugger;
    if ($(val).val() == "") {
        $(val).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {

        var ToDate = new Date($(val).val());
        if (date1 > date2) {
            $(val).addClass('is-invalid');
            $("#" + id + "").addClass('error-message');
            $("#" + id + "").html("To date should be greater than From date");
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


function validateDOW(val, id) {
    if (val.value == "") {
        alert(val.value);
        $(val).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
        /*trim(val);*/
    }
}

function DOWStatus(sender,id) {
    debugger;
    var cid = $(sender).val();
    if (cid == "" || cid == 0) {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
    var maritalStatus = $('#PersonalInfo_MaritalStatus_Code').val();
    if (maritalStatus == 2) {
        //$('#PersonalInfo_DOW').prop('disabled', false);
        $('#PersonalInfo_wedding').removeAttr('disabled');
        $("#PersonalInfo_wedding").focus();
    }
    else {
        $('#PersonalInfo_wedding').prop('disabled', true);
        $("#dow").html("");
        $('#PersonalInfo_wedding').val('');
    }
}

function validateDOB(val, id) {
    debugger;
    console.log(val.value);
    if (val.value == "") {
        $(val).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        debugger;
        var DOB = new Date(document.getElementById('GetFamilyDetails_DateOfBirth').value);
        var DOBYear = Math.abs(DOB.getFullYear());

        var CurDate = new Date();
        var CurDateYear = Math.abs(CurDate.getFullYear())

        var years = parseInt(CurDateYear) - parseInt(DOBYear);

        var age = parseInt(years);
        //var now = new Date();
        //var birthdate = dateofbirth.split("/");
        //var born = new Date(birthdate[2], birthdate[0] - 1, birthdate[1]);
        //var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
        //if (now >= birthday)
        //    var age =  now.getFullYear() - born.getFullYear();
        //else
        //    var age = now.getFullYear() - born.getFullYear() - 1;
        if (age < 18) {
            $("#" + id + "").html("Age must be greater than 18");
            $(val).addClass('is-invalid');
            $("#" + id + "").addClass('error-message');
            return false;
        }
        else if (age > 58) {
            $(val).addClass('is-invalid');
            $("#" + id + "").addClass('error-message');
            if (confirm("Candidate age greater than 58. Do you want to continue?")) {
                $("#" + id + "").html("");
                return true;
            }
            else {
                val.value = "";
                $(val).removeClass('is-invalid');
                $("#" + id + "").removeClass('error-message');
                return false;
            }
        }       
            $("#" + id + "").html("");
            trim(val);
            $(val).removeClass('is-invalid');
            $("#" + id + "").removeClass('error-message');
            return true;
    }
}

function validateAllAddress() {
    debugger;
    if ($("#Address_PermanentAddress_House").val() == "") {
        $("#house").html("This field is required");
        $('#Address_PermanentAddress_House').focus();
        return false;
    }
    else if ($("#Address_PermanentAddress_Street").val() == "") {
        debugger;
        $("#street").html("This field is required");
        $('#Address_PermanentAddress_Street').focus();
        return false;
    }
    else if ($("#Address_PermanentAddress_City").val() == "") {
        debugger;
        $("#city").html("This field is required");
        $('#Address_PermanentAddress_City').focus();
        return false;
    }
    else if ($("#Address_PermanentAddress_PinCode").val() == "") {
        debugger;
        $("#pin").html("This field is required");
        $('#Address_PermanentAddress_PinCode').focus();
        return false;
    }
    else if ($("#Address_PermanentAddress_Country_Code").val() == "") {
        $("#country").html("This field is required");
        $('#Address_PermanentAddress_Country_Code').focus();
        return false;
    }
    else if ($("#Address_PermanentAddress_State_Code").val() == 0) {
        $("#state").html("This field is required");
        $('#Address_PermanentAddress_State_Code').focus();
        return false;
    }
    else if ($("#Address_PermanentAddress_District_Code").val() == 0) {
        $("#district").html("This field is required");
        $('#Address_PermanentAddress_District_Code').focus();
        return false;
    }

     debugger;
    if ($("#Address_PresentAddress_House").val() == "") {
        $("#prhouse").html("This field is required");
        $('#Address_PresentAddress_House').focus();
        return false;
    }
    else if ($("#Address_PresentAddress_Street").val() == "") {
        debugger;
        $("#prstreet").html("This field is required");
        $('#Address_PresentAddress_Street').focus();
        return false;
    }
    else if ($("#Address_PresentAddress_City").val() == "") {
        debugger;
        $("#prcity").html("This field is required");
        $('#Address_PresentAddress_City').focus();
        return false;
    }
    else if ($("#Address_PresentAddress_PinCode").val() == "") {
        debugger;
        $("#prpin").html("This field is required");
        $('#Address_PresentAddress_PinCode').focus();
        return false;
    }
    else if ($("#Address_PresentAddress_Country_Code").val() == "") {
        $("#prcountry").html("This field is required");
        $('#Address_PresentAddress_Country_Code').focus();
        return false;
    }
    else if ($("#Address_PresentAddress_State_Code").val() == 0) {
        $("#prstate").html("This field is required");
        $('#Address_PresentAddress_State_Code').focus();
        return false;
    }
    else if ($("#Address_PresentAddress_District_Code").val() == 0) {
        $("#prdistrict").html("This field is required");
        $('#Address_PresentAddress_District_Code').focus();
        return false;
    }
    else {
        $.ajax({

            type: 'POST',
            url: '/DataBank/PersonalDetails/Create',
            dataType: 'json',
            data: $('#Address').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        $('.tabOne').removeClass('active');
                        $('#tabOne').removeClass('active');
                        $('#tabOne').css('display', 'none');
                        $('.tabContactDetails').addClass('active');
                        $('#tabContactDetails').addClass('active');
                        $('#tabContactDetails').css('display', 'block');
                        /*CloseSlider('appraisalTypeMasterApprove');*/
                       /* var url = "/Master/AppraisalTypeMaster/Index";*/
                       /* window.location.href = url;*/
                    });

                }
                //else if (result.message == "MAKER_CHECKER") {
                //    swal.fire("Maker and checker cannot be same.").then(function () {


                //    });
                //}
                else {
                    swal.fire("Something went wrong.").then(function () {


                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
   /* window.localStorage.setItem('myCat', 2);*/
    //$('.tabOne').removeClass('active');
    //$('#tabOne').removeClass('active');
    //$('.tabContactDetails').addClass('active');
    //$('#tabContactDetails').addClass('active');
}


function validateAllContactDetails() {
    debugger;
    if (!validateMobile('#ContactDetails_PersonalMobile', 'pmobile')) {
        return false;
    }
    else if (!validateEmail('#ContactDetails_PersonalEmail', 'pemail')) {
            return false;
    }
    else if (!validateMobile('#ContactDetails_OfficeMobile', 'omobile')) {
        return false;
    }
    else if (!validateEmail('#ContactDetails_OfficeEmail', 'oemail')) {
        return false;
    }
    else if (!validateById('#ContactDetails_EmergencyContactPerson', 'econtactperson')) {
        return false;
    }
    else if (!validateMobile('#ContactDetails_EmergencyContactNumber', 'econtactnumber')) {
        return false;
    }
    else if (!validateById('#ContactDetails_Relation_Code', 'relation')) {
        return false;
    }
    //else if ($("#ContactDetails_PersonalEmail").val() == 0) {
    //    debugger;
    //    $("#pemail").html("This field is required");
    //    $('#ContactDetails_PersonalEmail').focus();
    //    filter = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    //    if (!filter.test($('#ContactDetails_PersonalEmail').val())) {
    //        debugger;
    //        $("#pemail").html('Invalid Email ID');
    //        $('#ContactDetails_PersonalEmail').focus();
    //        return false;
    //    }
    //    return false;
    //}
    //else if (!filter.test($('#ContactDetails_PersonalEmail').val())) {
    //    debugger;
    //    $("#pemail").html('Invalid Email ID');
    //    $('#ContactDetails_PersonalEmail').focus();
    //    return false;
    //}
    //else if ($("#ContactDetails_OfficeMobile").val() == 0) {
    //    $("#omobile").html("This field is required");
    //    $('#ContactDetails_OfficeMobile').focus();
    //    return false;
    //}
    //else if ($("#ContactDetails_OfficeEmail").val() == 0) {
    //    debugger;
    //    $("#oemail").html("This field is required");
    //    $('#ContactDetails_OfficeEmail').focus();
    //    if ('#ContactDetails_OfficeEmail')
    //    return false;
    //}
    //else if (!filter.test($('#ContactDetails_OfficeEmail').val())) {
    //    debugger;
    //    $("#oemail").html('Invalid Email ID');
    //    $('#ContactDetails_OfficeEmail').focus();
    //    return false;
    //}
    else if ($("#ContactDetails_EmergencyContactPerson").val() == 0) {
        $("#econtactperson").html("This field is required");
        $('#ContactDetails_EmergencyContactPerson').focus();
        return false;
    }
    else if ($("#ContactDetails_EmergencyContactNumber").val() == 0) {
        $("#econtactnumber").html("This field is required");
        $('#ContactDetails_EmergencyContactNumber').focus();
        return false;
    }
    else if ($("#ContactDetails_Relation_Code").val() == 0) {
        $("#erelation").html("This field is required");
        $('#ContactDetails_Relation_Code').focus();
        return false;
    }
    else {
        $.ajax({

            type: 'POST',
            url: '/DataBank/PersonalDetails/Create',
            dataType: 'json',
            data: $('#ContactDetails').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        $('.tabContactDetails').removeClass('active');
                        $('#tabContactDetails').removeClass('active');
                        $('#tabContactDetails').css('display','none');
                        $('.tabTwo').addClass('active');
                        $('#tabTwo').addClass('active');
                        /*CloseSlider('appraisalTypeMasterApprove');*/
                        /* var url = "/Master/AppraisalTypeMaster/Index";*/
                        /* window.location.href = url;*/
                    });

                }
                //else if (result.message == "MAKER_CHECKER") {
                //    swal.fire("Maker and checker cannot be same.").then(function () {


                //    });
                //}
                else {
                    swal.fire("Something went wrong.").then(function () {


                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
}

function validateAllPersonalInfo() {
    debugger;
    if ($("#PersonalInfo_BloodGroup_Code").val() == "") {
        $("#bloodgroup").html("This field is required");
        $('#PersonalInfo_BloodGroup_Code').focus();
        return false;
    }
    else if ($("#PersonalInfo_MaritalStatus_Code").val() == 0) {
        $("#maritalstatus").html("This field is required");
        $('#PersonalInfo_MaritalStatus_Code').focus();
        return false;
    }
    else if ($("#PersonalInfo_DOW").val() == 0) {
        var maritalStatus = $('#PersonalInfo_MaritalStatus_Code').val();
        if (maritalStatus != 2) {
            return true;
        }
        else {
            $("#dow").html("This field is required");
            $('#PersonalInfo_DOW').focus();
            return false;
        }
    }
    else if ($("#PersonalInfo_ReligiousView_Code").val() == 0) {
        $("#religiousview").html("This field is required");
        $('#PersonalInfo_ReligiousView_Code').focus();
        return false;
    }
    else if ($("#PersonalInfo_Language_Code").val() == 0) {
        $("#language").html("This field is required");
        $('#PersonalInfo_Language_Code').focus();
        return false;
    }
    else if ($("#PersonalInfo_Hobbies_Code").val() == 0) {
        $("#hobbies").html("This field is required");
        $('#PersonalInfo_Hobbies_Code').focus();
        return false;
    }
    else {
        $.ajax({

            type: 'POST',
            url: '/DataBank/PersonalDetails/Create',
            dataType: 'json',
            data: $('#Personalinfo').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        $('.tabTwo').removeClass('active');
                        $('#tabTwo').removeClass('active');
                        $('#tabTwo').css('display', 'none');
                        $('#tabThree').css('display', 'block');
                        $('.tabThree').addClass('active');
                        $('#tabThree').addClass('active');
                        /*CloseSlider('appraisalTypeMasterApprove');*/
                        /* var url = "/Master/AppraisalTypeMaster/Index";*/
                        /* window.location.href = url;*/
                    });

                }
                //else if (result.message == "MAKER_CHECKER") {
                //    swal.fire("Maker and checker cannot be same.").then(function () {


                //    });
                //}
                else {
                    swal.fire("Something went wrong.").then(function () {


                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
}
function validateAllFamilySave() {
    debugger;
    
    if (!validateById('#GetFamilyDetails_Name', 'fmlyname')) {
        return false;
    }
    else if (!validateById('#GetFamilyDetails_Relation_Code', 'familyrelation')) {
        return false;
    }
    else if (!validateById('.datepkr', 'fmlydob')) {
        return false;
    }
    //else if (!validateById('#GetFamilyDetails_Occupation', 'occupation')) {
    //    return false;
    //}
    else if (!validateById('#GetFamilyDetails_Status_Code', 'status')) {
        return false;
    }
    else {
        $.ajax({

            type: 'POST',
            url: '/DataBank/PersonalDetails/familyCreate',
            dataType: 'json',
            data: { Name: $('#GetFamilyDetails_Name').val(), relation: $('#GetFamilyDetails_Relation_Code').val(), dob: $('.datepkr').val(), occupation: $('#GetFamilyDetails_Occupation').val(), status: $('#GetFamilyDetails_Status_Code').val(), TabIndex: "Family Details", EmpGI: $('#EmployeeGI').val(), fmlyGI: $('#GetFamilyDetails_FamilyLogGI').val() },
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        //$('.tabOne').removeClass('active');
                        //$('#tabOne').removeClass('active');
                        //$('#tabOne').css('display', 'none');
                        //$('.tabContactDetails').addClass('active');
                        //$('#tabContactDetails').addClass('active');
                        CloseSlider('fam');
                        var url = "/DataBank/PersonalDetails/GetFamilyList";
                        $('.t3').load(url, {}, function (Data) { console.log(Data) });
                        /* var url = "/Master/AppraisalTypeMaster/Index";*/
                        /* window.location.href = url;*/
                    });

                }
                //else if (result.message == "MAKER_CHECKER") {
                //    swal.fire("Maker and checker cannot be same.").then(function () {


                //    });
                //}
                else {
                    if (result.message == "FATHER_DUPLICATION_ERROR" || result.message == "MOTHER_DUPLICATION_ERROR" || result.message =="SPOUSE_DUPLICATION_ERROR") {
                        swal.fire("Selected relation already exists");
                    }
                    else {
                        swal.fire("Something went wrong.");
                    }
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
}

function validateAllEducationSave() {
    debugger;
    if (!validateById('#GetEducation_QualificationType_Code','qualificationtype')) {
        return false;
    }
    else if (!validateById('#GetEducation_Qualification_Code', 'qualification')) {
        return false;
    }
    else if (!validateById('#GetEducation_Specialisation_Code', 'specialisation')) {
        return false;
    }
    else if (!validateById('#GetEducation_YearOfCompletion_Code', 'yoc')) {
        return false;
    }
    else {
        $("#eduID").prop('disabled', true);
        $.ajax({

            type: 'POST',
            url: '/DataBank/PersonalDetails/Create',
            dataType: 'json',
            data: $('#eduk').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        $('.tabOne').removeClass('active');
                        $('#tabOne').removeClass('active');
                        $('#tabOne').css('display', 'none');
                        //$('.tabContactDetails').addClass('active');
                        //$('#tabContactDetails').addClass('active');
                        CloseSlider('edu');
                        var url = "/DataBank/PersonalDetails/GetEducationList";
                        $('#tabFive').load(url, {}, function (Data) { console.log(Data) });
                        /* var url = "/Master/AppraisalTypeMaster/Index";*/
                        /* window.location.href = url;*/
                    });

                }
                //else if (result.message == "MAKER_CHECKER") {
                //    swal.fire("Maker and checker cannot be same.").then(function () {


                //    });
                //}
                else {
                    swal.fire("Something went wrong.").then(function () {


                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
}

function validateAllSkillSave() {
    debugger;
    if (!validateById('#Skills_Skill_Code', 'skill')) {
        return false;
    }
    else if (!validateById('#Skills_SkillType_Code', 'skilltype')) {
        return false;
    }
    else if (!validateById('#Skills_SkillProficiency_Code', 'skillproficiency')) {
        return false;
    }
    else {
        $.ajax({

            type: 'POST',
            url: '/DataBank/PersonalDetails/Create',
            dataType: 'json',
            data: $('#skillSubmit').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        $('.tabSix').removeClass('active');
                        $('#tabSix').removeClass('active');
                        $('#tabSix').css('display', 'none');
                        $('.tabSeven').addClass('active');
                        $('#tabSeven').addClass('active');
                        /*CloseSlider('appraisalTypeMasterApprove');*/
                        /* var url = "/Master/AppraisalTypeMaster/Index";*/
                        /* window.location.href = url;*/
                    });

                }
                //else if (result.message == "MAKER_CHECKER") {
                //    swal.fire("Maker and checker cannot be same.").then(function () {


                //    });
                //}
                else {
                    swal.fire("Something went wrong.").then(function () {


                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
}

function validateAllCertificate() {
    debugger;
    if (!validateById('#Certifications_Certificate', 'certificate')) {
        return false;
    }
    else if (!validateById('#Certifications_CertificateType_Code', 'certificatetype')) {
        return false;
    }
    else if (!validateById('#Certifications_IssuedBy', 'issuedby')) {
        return false;
    }
    else if (!validateById('#Certifications_Issued', 'issueddate')) {
        return false;
    }
    else if (!validateById('#Certifications_CertificateMode_Code', 'certificatemode')) {
        return false;
    }
    else if (!validateById('#Certifications_CertificateValidity_Code', 'validity')) {
        return false;
    }
    //else if (!validateById('#Certifications_Renewaldate', 'renewabledate')) {
    //    return false;
    //}
    else if ($('#Certifications_CertificateValidity_Code').val() == 2 && !validateRenewalDate('#Certifications_Renewaldate', 'renewabledate')) {
        debugger;
        return false;
    }
    else {
        debugger;
        $.ajax({

            type: 'POST',
            url: '/DataBank/PersonalDetails/Create',
            dataType: 'json',
            data: $('#certification').serialize(),
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        $('.tabSeven').removeClass('active');
                        $('#tabSeven').removeClass('active');
                        $('#tabSeven').css('display', 'none');
                        $('#tabEight').css('display', 'block');
                        $('.tabEight').addClass('active');
                        $('#tabEight').addClass('active');
                        //var url = "/DataBank/PersonalDetails/GetPreviousEmploymentList";
                        //$('.t4').load(url, {}, function (Data) { console.log(Data) });
                    });

                }
                //else if (result.message == "MAKER_CHECKER") {
                //    swal.fire("Maker and checker cannot be same.").then(function () {


                //    });
                //}
                else {
                    swal.fire("Something went wrong.").then(function () {


                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
}

function onExportToExcelClick1() {
    debugger; 
    var searchid = $('#Item2_PersonalDetailsFilter_Code').val();
    /*var searchid = $('#AssetAllocationFilter_Code').val();*/

    var pendingTableLength = document.getElementById("PersonalDetailsTable").rows.length - 1;
    if (pendingTableLength > 0) {
        url = "/DataBank/PersonalDetails/ExportToExcel?SearchId=" + searchid;
        window.location.href = url;
    }
    else {
        swal.fire("No data found to export");
    }


}
function validateAllPreviousEmployment() {
    debugger;
    if (!validateById('#GetPreviousEmployment_CompanyName', 'prvscompany')) {
        return false;
    }
    else if (!validateById('#GetPreviousEmployment_Location', 'prvslocation')) {
        return false;
    }
    else if (!validateById('#GetPreviousEmployment_Designation', 'prvsdesignation')) {
        return false;
    }
    else if (!validateById('#GetPreviousEmployment_Fromdate', 'fromdate')) {
        return false;
    }
    else if (!calcExp('#GetPreviousEmployment_Todate', 'todate')) {
        return false;
    }
    else {
        debugger;
        $.ajax({

            type: 'POST',
            url: '/DataBank/PersonalDetails/PreviousEmploymentCreate',
            dataType: 'json',
            data: { company: $('#GetPreviousEmployment_CompanyName').val(), location: $('#GetPreviousEmployment_Location').val(), designation: $('#GetPreviousEmployment_Designation').val(), from: $('#GetPreviousEmployment_Fromdate').val(), to: $('#GetPreviousEmployment_Todate').val(), exp: $('#GetPreviousEmployment_Experience').val(), TabIndex: "Previous Employment", EmpGI: $('#EmployeeGI').val(), prevEmpGI: $('#GetPreviousEmployment_PrevEmploymentLogGI').val() },
            success: function (result) {
                if (result.success == true) {
                    swal.fire(result.message).then(function () {
                        $('.tabOne').removeClass('active');
                        $('#tabOne').removeClass('active');
                        $('#tabOne').css('display', 'none');
                        CloseSlider('pre');
                        var url = "/DataBank/PersonalDetails/GetPreviousEmploymentList";
                        $('#tabEight').load(url, {}, function (Data) { console.log(Data) });
                        /*CloseSlider('appraisalTypeMasterApprove');*/
                        /* var url = "/Master/AppraisalTypeMaster/Index";*/
                        /* window.location.href = url;*/
                    });

                }
                //else if (result.message == "MAKER_CHECKER") {
                //    swal.fire("Maker and checker cannot be same.").then(function () {


                //    });
                //}
                else {
                    swal.fire("Something went wrong.").then(function () {


                    });
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
            }
        });
    }
}

function onEducationSave(logGI) {
    debugger;
    var url = "/DataBank/PersonalDetails/EducationSave";
    var EmployeeGI = $('#EmployeeGI').val();
    $('.edu').load(url, { LogGI: logGI, EmployeeGI: EmployeeGI }, function () {  // callback functions
    });
    $('#educationSav').removeClass('hide');
    //$.get("/DataBank/PersonalDetails/EducationSave?LogGI=FF318BC3-9DFD-492A-B256-BB96185BA29B", function (result) {
    //    $('.edu').html(result);
    //});
    debugger;
    $('.edu').show();
}

function onFamilySave(logGI) {
    debugger;
    var url = "/DataBank/PersonalDetails/FamilySave";
    var EmployeeGI = $('#EmployeeGI').val();
    $('#familySav').load(url, { LogGI: logGI, EmployeeGI: EmployeeGI }, function () {  // callback function
    });
    
    //$.get("/DataBank/PersonalDetails/EducationSave?LogGI=FF318BC3-9DFD-492A-B256-BB96185BA29B", function (result) {
    //    $('.edu').html(result);
    //});
    debugger;
    
}

function onPrevEmploymentSave(logGI) {
    debugger;
    var url = "/DataBank/PersonalDetails/PrevEmploymentSave";
    var EmployeeGI = $('#EmployeeGI').val();
    $('#previousSav').load(url, { LogGI: logGI, EmployeeGI: EmployeeGI }, function () {  // callback function
        /*$("#kt_datepicker_8").datepicker("refresh");*/
    });
   // $('#previousSav').removeClass('hide');
    //$.get("/DataBank/PersonalDetails/EducationSave?LogGI=FF318BC3-9DFD-492A-B256-BB96185BA29B", function (result) {
    //    $('.edu').html(result);
    //});
    debugger;
    //$('.pre').show();
}


function onEducationDelete(GI) {
    debugger;
    swal.fire({
        text:  "Do you want to delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
    //    // Save it
    
    $.ajax({

        type: 'POST',
        url: '/DataBank/PersonalDetails/EducationDelete',
        dataType: 'json',
        data: { LogGI: GI },
        success: function (result) {
            if (result.success == true) {
                swal.fire(result.message).then(function () {
                    $('.tabOne').removeClass('active');
                    $('#tabOne').removeClass('active');
                    $('#tabOne').css('display', 'none');
                    /*CloseSlider('pre');*/
                    var url = "/DataBank/PersonalDetails/GetEducationList";
                    $('#tabFive').load(url, {}, function (Data) { console.log(Data) });
                    /*CloseSlider('appraisalTypeMasterApprove');*/
                    /* var url = "/Master/AppraisalTypeMaster/Index";*/
                    /* window.location.href = url;*/
                });

            }
            //else if (result.message == "MAKER_CHECKER") {
            //    swal.fire("Maker and checker cannot be same.").then(function () {


            //    });
            //}
            else {
                swal.fire("Something went wrong.").then(function () {


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

function onFamilyDelete(GI) {
    
    debugger;
    swal.fire({
        text: "Do you want to delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            //    // Save it

            $.ajax({

                type: 'POST',
                url: '/DataBank/PersonalDetails/FamilyDelete',
                dataType: 'json',
                data: { LogGI: GI },
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            $('.tabOne').removeClass('active');
                            $('#tabOne').removeClass('active');
                            $('#tabOne').css('display', 'none');
                            /*CloseSlider('pre');*/
                            var url = "/DataBank/PersonalDetails/GetFamilyList";
                            $('#tabThree').load(url, {}, function (Data) { console.log(Data) });
                            /*CloseSlider('appraisalTypeMasterApprove');*/
                            /* var url = "/Master/AppraisalTypeMaster/Index";*/
                            /* window.location.href = url;*/
                        });

                    }
                    //else if (result.message == "MAKER_CHECKER") {
                    //    swal.fire("Maker and checker cannot be same.").then(function () {


                    //    });
                    //}
                    else {
                        swal.fire("Something went wrong.").then(function () {


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

function onPrevEmploymentDelete(logGI) {
   
    debugger;
    swal.fire({
        text: "Do you want to delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            //    // Save it

            $.ajax({

                type: 'POST',
                url: '/DataBank/PersonalDetails/PrevEmploymentDelete',
                dataType: 'json',
                data: { LogGI: logGI },
                success: function (result) {
                    if (result.success == true) {
                        swal.fire(result.message).then(function () {
                            $('.tabOne').removeClass('active');
                            $('#tabOne').removeClass('active');
                            $('#tabOne').css('display', 'none');
                            /*CloseSlider('pre');*/
                            var url = "/DataBank/PersonalDetails/GetPreviousEmploymentList";
                            $('#tabEight').load(url, {}, function (Data) { console.log(Data) });
                            /*CloseSlider('appraisalTypeMasterApprove');*/
                            /* var url = "/Master/AppraisalTypeMaster/Index";*/
                            /* window.location.href = url;*/
                        });

                    }
                    //else if (result.message == "MAKER_CHECKER") {
                    //    swal.fire("Maker and checker cannot be same.").then(function () {


                    //    });
                    //}
                    else {
                        swal.fire("Something went wrong.").then(function () {


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

function CloseSlider(id) {
    debugger;
    $("." + id).removeClass('slider-forms-open');
    $(".form-overlay").remove();
}

function validateRenewalDate(val, id) {
    debugger;
    if ($(val).val() == "") {
        $(val).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {

        var issueDate = new Date($('#Certifications_Issued').val());
        var renewalDate = new Date($(val).val());
        if (issueDate > renewalDate) {
            $(val).addClass('is-invalid');
            $("#" + id + "").addClass('error-message');
            $("#" + id + "").html("Renewal Date should be greater than issued date");
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

function DOWStatus(sender, id) {
    debugger;
    var cid = $(sender).val();
    if (cid == "" || cid == 0) {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
    if (cid != 2) {
        $('#PersonalInfo_wedding').prop('disabled', true);
        $('#PersonalInfo_wedding').val('');
    }
    else {
        $('#PersonalInfo_wedding').prop('disabled', false);
    }
}

function onLifetimeChange(sender, id) {
    var validity = $('#Certifications_CertificateValidity_Code').val();
    if (validity == 2) {
        //$('#PersonalInfo_DOW').prop('disabled', false);
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
        $('#Certifications_Renewaldate').prop('disabled', false);
        $('#Certifications_Renewaldate').val('');
    }
    else if (validity == 1) {
        $('#Certifications_Renewaldate').prop('disabled', true);
        $('#Certifications_Renewaldate').val('');
        $("#renewabledate").html("");
        $(sender).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
    }
    else {
        $(sender).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
}



function ApplyFilter(mode) {
    debugger
    //var tabIndex = $('#Tabindex').val();
    var search = $('#Item2_PersonalDetailsFilter_Code').val();
    //$("#Tabindex").val(currentTab);
    $("#SearchId").val($('#Item2_PersonalDetailsFilter_Code').val())
    if (mode == 'apply') {
        $.ajax({

            type: 'POST',
            url: '/DataBank/PersonalDetails/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger
                CloseSlider('basicFilter');

                $('#PersonalDetailsList').html("");
                $('#PersonalDetailsList').html(result);

                $('#PersonalDetailsList').removeClass('hide');

                //$('#rewardsListPartial').addClass('hide');               
            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
        $('#filterForm').addClass('filter-apply');
    }
    else {
        $('.reset').val('');
        $('#Optional_Filter_EmploymentStatus_Code').val(0);
        $('#filterForm').removeClass('filter-apply');
        $.ajax({

            type: 'POST',
            url: '/DataBank/PersonalDetails/ApplyFilter',
            dataType: 'html',
            data: $('#BasicFilter').serialize(),
            success: function (result) {
                debugger

                //CloseSlider('assetAllocationFilter');


                $('#PersonalDetailsList').html("");
                $('#PersonalDetailsList').html(result);

                $('#PersonalDetailsList').removeClass('hide');
                //$('#rewardsListPartial').addClass('hide');

            },


            error: function (xhr, textStatus, errorThrown) {
                swal.fire(xhr.responseText);
            }
        });
    }
}
