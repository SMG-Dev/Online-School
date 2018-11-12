$(document).ready(function () {

        var tabsWidth = 0


        for (var i = 0, length = $(".tabs").children("a").length; i < length; ++i) {
                tabsWidth += $(".tabs").children().eq(i).outerWidth() + 1;
        }

        $(".tabs").width(tabsWidth);

        setBarPosition($("#tab1-tab"));


        $('.tabs').each(function () {

                var $active, $content, $links = $(this).find('a');

                $active = $($links[0]);
                $active.addClass('active');

                $content = $($active[0].hash);

                $links.not($active).each(function () {
                        $(this.hash).hide();
                });

                $(this).on('click', 'a', function (e) {

                        $("html, body").animate({ scrollTop: 0 }, "medium");

                        setBarPosition($(this));

                        $active.removeClass('active');
                        $content.hide();

                        $active = $(this);
                        $content = $(this.hash);

                        $active.addClass('active');
                        $content.show();

                        e.preventDefault();
                });
        });

        handleArrows();

        $(window).resize(function (event) {
                handleArrows();
        });

        $(".tabsWrap").scroll(function (event) {
                handleArrows();
        });

        function handleArrows() {

                if ($(".tabs").offset().left < 0) {
                        $("#leftArrow").css({
                                display: "block"
                        });
                }

                if ($(".tabs").offset().left <= $(window).width() - $(".tabs").width() + 1) {
                        $("#rightArrow").css({
                                display: "none"
                        });
                }

                if ($(".tabs").offset().left >= $(window).width() - $(".tabs").width() + 1) {
                        $("#rightArrow").css({
                                display: "block"
                        });
                }

                if ($(".tabs").offset().left >= 0) {
                        $("#leftArrow").css({
                                display: "none"
                        });
                }

        }

        $("#rightArrow").click(function (event) {
                $(".tabsWrap").scrollLeft($(".tabsWrap").scrollLeft() + 50);
        });

        $("#leftArrow").click(function (event) {
                $(".tabsWrap").scrollLeft($(".tabsWrap").scrollLeft() - 50);
        });

        function setBarPosition($element) {
                var siblings = $element.parent().children("a");
                index = siblings.index($element),
                        barWidth = 0,
                        i;

                for (i = 0; i < index; ++i) {
                        barWidth += siblings.eq(i).outerWidth();
                }

                $element.siblings("span.bar").width($element.outerWidth());

                $element.siblings("span.bar").css({
                        left: barWidth
                });
        }
});

