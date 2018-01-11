$(document).ready(function () {

    FixViewPortOnWindows8PhonesPrioGDR3();

    AnimatePageScrollAfterAnkerClick();

    $('body').bind('copy paste', function (e) {
        e.preventDefault(); return false;
    });

    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });

    $('.close-privacy-div').click(function (e) {
        $.cookie("_dddn_privacy_div", 1, { expires: 30, path: '/' });
        $('#privacy-div').hide();
    });

});

function isIEMobile() {
    var regExp = new RegExp("IEMobile", "i");
    return navigator.userAgent.match(regExp);
}

function FixViewPortOnWindows8PhonesPrioGDR3() {

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style')
        msViewportStyle.appendChild(
          document.createTextNode(
            '@-ms-viewport{width:auto!important}'
          )
        )
        document.querySelector('head').appendChild(msViewportStyle)
    }

}

function AnimatePageScrollAfterAnkerClick() {

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
        $target = $(target);

        if (target === "#carousel-main")
            return;

        if (target === "#topmenu-section") {
            if ($($target).css('display') == 'none') {
                $target = $("#header-section");
            }
        }

        if (isIEMobile()) {
            var top = $(target).offsetTop;
            window.scrollTo(0, top);
            return;
        }

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 960, 'swing', function () {
            window.location.hash = target;
        });
    });
}