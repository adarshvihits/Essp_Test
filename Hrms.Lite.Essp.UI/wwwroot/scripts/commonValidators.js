var maxchars = 250;
function onlyNumberKey(evt) {

    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
        swal.fire("Only Numbers are allowed")
        return false;
    }
    return true;
}

function onlyAmount(evt) {

    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57) && ASCIICode == 46) {
        swal.fire("Only Numbers are allowed")
        return false;
    }
    return true;
}

function onlyLettersKey(evt) {

    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if ((ASCIICode > 64 && ASCIICode < 91) || (ASCIICode > 96 && ASCIICode < 123) || ASCIICode == 32)
        return true;
    swal.fire("Only Alphbets are allowed")
    return false;
}

function validate(val, id) {
    debugger;
    if (val.value == "") {
        $(val).addClass('is-invalid');
        $("#" + id + "").addClass('error-message');
        $("#" + id + "").html("This field is required");
    }
    else {
        $(val).removeClass('is-invalid');
        $("#" + id + "").removeClass('error-message');
        $("#" + id + "").html("");
        val.value = val.value.replace(/(^\s*)|(\s*$)/gi, "");
        return val.value;      
    }
}



function validateById(elementId, spanId) {
    debugger;
    if ($(elementId).val() == "") {
        $(elementId).addClass('is-invalid');
        $("#" + spanId + "").addClass('error-message');
        $("#" + spanId + "").html("This field is required");
        return false;
    }
    else {
        $(elementId).removeClass('is-invalid');
        $("#" + spanId + "").removeClass('error-message');
        $("#" + spanId + "").html("");
        //trim(val);        
        return true;
    }
}
function capitalizeFirstLetter(val, id) {

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

function OnlycapitalizeFirstLetter(val, id) {

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
       /* val.value = val.value.toLowerCase();*/
        val.value = val.value.
            replace(/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
            replace(/[ ]{2,}/gi, "").       // replaces multiple spaces with one space 
            replace(/\n +/, "\n");
        val.value = val.value.substr(0, 1).toUpperCase() + val.value.substr(1);
        return val.value;
    }
}
function RemarksLimitCheck(Id) {
    debugger
    var tlength = $('#'+Id).val().length;
    if (tlength > maxchars) {
        swal.fire("You have entered more than 250 characters");
        return false;
    }
    else {
        return true;
    }
}

function CloseSlider(id) {
    $("." + id).removeClass('slider-forms-open');
    $(".form-overlay").remove();
}

function CloseFilterSlider(id, divId) {
    $("#" + divId).hide();
    $("." + id).removeClass('slider-forms-open');
    $(".form-overlay").remove();
}

function CloseCard() {
    $('.search-profile-details').hide(300);
    $('.filter-option-inner-inner').html("Search by Employee name/ID");
    $('.dropdown-toggle').prop('title', 'Search by Employee name/ID');
    $('.sliderSearchInput').val(0);
}
