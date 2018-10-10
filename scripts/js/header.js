/*-------------------BURGER ------------- */
$(document).ready(function () {
    var toggableButton = {
        init: function (conf) {
            var self = this;
            $( conf.element ).click(function (event) {
                (self.state === 0) ? conf.off() : conf.on();
                self.state = ~self.state;
            });

        },
        state: 0
    };

    var elementCollection = {
        init: function ( elements ) {
            this.elements = elements;
        },
        apply: function ( callback ) {
            for (var i = 0, length = this.elements.length; i < length; ++i) {
                callback( $( this.elements[i] ) );
            }
        }
    }

    $( "#menu>ul>li" ).click( function (event) {
        event.preventDefault();
        $(  this ).children().one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
        function(event) {
            window.location.href = $( this ).attr('href');
        });
    });

    elementCollection.init(
        [
            "nav", "nav ul", "nav ul a", "nav ul a div", ".menuText", ".tabsWrap", ".tabsContent", "#rightArrow", "leftArrow"
        ]
    );

    toggableButton.init({
        element: "#burger",
        off: function () {
            $("#menu").attr("style", "display: block !important;");
            $("main").attr("style", "margin-top: 300px;")
        },
        on: function () {
            $("#menu").attr("style", "display:none;");
            $("main").attr("style", "margin-top: 0px;")
        }
    });

    
    $(window).resize(function () {
        if ($(window).width() >= 1000) {
            $("#menu").attr("style", "display: block !important;");
            $("main").attr("style", "margin-top: 0px;")
            toggableButton.state = 0;
        } else if ( toggableButton.state === 0 ) {
            $("#menu").attr("style", "display: none");
            $("main").attr("style", "margin-top: 0px;")
            toggableButton.state = 0;
        }
    });
    /*
    $(window).resize(function(e)
    {
      console.log('window resized..');
      this.location.reload(false);
    });

    /*-------------------FIX HEADER ON SCROLL------------- */
    $(document).scroll(function () {
        const mq = window.matchMedia("(min-width: 1000px)");
        if (mq.matches) {
            if ($(document).scrollTop() >= 260) {
                elementCollection.apply( function ( $element ) {
                    $element.addClass("fixed");
                });
            }
            else {
                elementCollection.apply( function ( $element ) {
                    $element.removeClass("fixed");
                });
            }
        }
        else {
            if (toggableButton.state === -1) {
                if ($(document).scrollTop() >= 459) {
                    $('.tabsWrap').addClass('fixed');
                    $('.tabsContent').addClass('fixed');
                    $('#leftArrow').addClass('fixed');
                    $('#rightArrow').addClass('fixed');
                }
                else {
                    $('.tabsWrap').removeClass('fixed');
                    $('.tabsContent').removeClass('fixed');
                    $('#leftArrow').removeClass('fixed');
                    $('#rightArrow').removeClass('fixed');
                }
            }
            else {
                if ($(document).scrollTop() >= 159) {
                    $('.tabsWrap').addClass('fixed');
                    $('.tabsContent').addClass('fixedLittle');
                    $('#leftArrow').addClass('fixed');
                    $('#rightArrow').addClass('fixed');
                }
                else {
                    $('.tabsWrap').removeClass('fixed');
                    $('.tabsContent').removeClass('fixedLittle');
                    $('#leftArrow').removeClass('fixed');
                    $('#rightArrow').removeClass('fixed');
                }
            }
        }
    });
});



