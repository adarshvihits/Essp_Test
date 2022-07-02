 $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    $('[data-toggle="tooltip"]').tooltip({
        container: '.wrapper'
    });
    $(".tooltip-link").on("mouseover", function () {

        $(".tooltip-hover").fadeIn(300, function () {

        });

    })
    $(".tooltip-link").on("mouseout", function () {

        $(".tooltip-hover").fadeOut(300, function () {

        });

    })