(function ($) {
    $.fn.mScrollBar = function (options) {
        var settings = $.extend({}, options);

        $element = $(this);
        $element.css('overflow', 'hidden');
        var $scrollBar = $('<div class="mScrollBar"></div>').appendTo($element);
        var $scrollBarKnob = $('<div class="mScrollBarKnob"></div>').appendTo($scrollBar);

        $element.visibleHeight = function () {
            var scrollTop = $(window).scrollTop(),
                scrollBot = scrollTop + $(window).height(),
                elTop = $element.offset().top,
                elBottom = elTop + $element.prop('scrollHeight'),
                visibleTop = elTop < scrollTop ? scrollTop : elTop,
                visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;

            return visibleBottom - visibleTop;
        };

        $element.updateKnobPosition = function () {
            var visibleHeight = $element.visibleHeight();
            var actualHeight = $element.prop('scrollHeight');
            var scale = actualHeight / visibleHeight;
            var newTop = ($(window).scrollTop() / scale);

            $scrollBarKnob.css('top', newTop + 'px');
        };

        $(window).resize(function () {
            var visibleHeight = $element.visibleHeight();
            var actualHeight = $element.prop('scrollHeight');
            var newHeightPercentage = (100 / (actualHeight / visibleHeight));

            $scrollBarKnob.css('height', newHeightPercentage + '%');
        }).resize();

        function wheelEventCatcher(e) {
            $scrollBar.finish().fadeTo('fast', 1.0);
            var delta = e.wheelDelta ? e.wheelDelta : -e.detail;
            var scrollingDown = (delta < 0);
            var currentScrollTop = $(window).scrollTop();
            var newScrollTop = scrollingDown ? (currentScrollTop + 30) : (currentScrollTop - 30);

            $element.scrollTop(newScrollTop);
            $element.trigger('scroll');
            $scrollBar.finish().delay(300).fadeTo('fast', 0.3);
        }

        $element.scroll(function () {
            $element.updateKnobPosition();
        });
        window.addEventListener('mousewheel', wheelEventCatcher);
        window.addEventListener('DOMMouseScroll', wheelEventCatcher);
    };
}(jQuery));