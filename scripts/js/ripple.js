/*-------------------RIPPLE ------------- */
$(document).ready(function () {
    $(".ripple").click(function (event) {
        $(".wave").remove();

        var x = $(this).offset().left,
            y = $(this).offset().top,
            width = $(this).width(),
            height = $(this).height(),
            wave_size = (width > height) ? width : height;
        wave = $("<span>", { class: "wave" });

        $(this).append(wave);
        $(".wave").css({
            width: wave_size,
            height: wave_size,
            top: event.pageY - y - wave_size / 2 + 'px',
            left: event.pageX - x - wave_size / 2 + 'px'
        })
    });
});


