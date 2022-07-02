////function confirmJoin() {
////    debugger;
////    var preEnrollId = $('#PreEnrollGI').val();
////    //$('#Enrollment_PreEnrollment_PreEnrollGI').val("4705c73f-bdec-47bc-add7-dd95bf877947");
////    //alert($('#Enrollment_PreEnrollment_PreEnrollGI').val());
////    if (confirm("Do you want to Confirm?")) {
       
        
////        $.ajax({

////            type: 'POST',
////            url: '/DataBank/JoiningConfirmation/ConfirmJoin',
////            dataType: 'json',
////            /*data: $('#Join').serialize(),*/
////            data:
////                { preEnrollGI: preEnrollId },
////            success: function (result) {
////                debugger;
////                console.log(result);
////                if (result.success == true)
////                {
////                    toastr.success(result.message);
////                    window.location.href = '/DataBank/OnBoarding/Index';
////                }
////                else
////                {
////                    toastr.error(result.message);
////                    window.location.href = '/DataBank/JoiningConfirmation/Create?PreEnrollGI=' + preEnrollId;
////                }
////            },
////            error: function (xhr, textStatus, errorThrown) {
////                toastr.error(xhr.responseText);
////                console.log(xhr.responseText);
////            }
////        });
////    }
////    else {
////        return false;
////    }
////}
   
function confirmJoin() {
    debugger;
    //$('#PreEnrollGI').val("4705c73f-bdec-47bc-add7-dd95bf877947");
    //var preEnrollId = $('#PreEnrollGI').val();
    $('#Enrollment_PreEnrollment_PreEnrollGI').val("4705c73f-bdec-47bc-add7-dd95bf877947");
    var preEnrollId = $('#Enrollment_PreEnrollment_PreEnrollGI').val();
    if (confirm("Do you want to Confirm?")) {


        $.ajax({

            type: 'POST',
            url: '/DataBank/JoiningConfirmation/ConfirmJoin',
            dataType: 'json',
            data: $('#Join').serialize(),
            //data:
            //{
            //    preEnrollGI: preEnrollId
            //},
            success: function (result) {
                debugger;
                console.log(result);
                if (result.success ==true) {
                    swal.fire(result.message).then(function () {
                      window.location.href = '/DataBank/OnBoarding/Index';
                    });
                    
                }
                else {
                    swal.fire(result.message).then(function () {
                        window.location.href = '/DataBank/JoiningConfirmation/Create?PreEnrollGI=' + preEnrollId;

                    });
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                toastr.error(xhr.responseText);
                console.log(xhr.responseText);
            }
        });
    }
    else {
        return false;
    }
}


