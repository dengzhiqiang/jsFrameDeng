var utils = (function (utils) {

    /**
     * 如果支持svg返回true，否则返回false
     * @returns {boolean}
     */
    var isSupportSVG = function isSupportSVG() {
        var SVG_NS = 'http://www.w3.org/2000/svg';
        return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
    };

    /**
     * 实现浏览器全屏
     */
    var fullscreen = function () {
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullscreen) {
            docElm.webkitRequestFullscreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    };

    var cancleFullscreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    /**
     * 判断浏览器是否支持canvas
     * @returns {boolean}
     */
    var isSupportCanvas = function () {
        return document.createElement('canvas').getContext ? true : false;
    };

    var isWeiXin = function () {
        var ua = navigator.userAgent.toLowerCase();
        // match() 方法将检索字符串 stringObject，以找到一个或多个与 regexp 匹配的文本。这个方法的行为在很大程度上有赖于 regexp 是否具有标志 g。
        // 如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。
        // 如果没有找到任何匹配的文本， match() 将返回 null。
        // 否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本。
        // 除了这些常规的数组元素之外，返回的数组还含有两个对象属性。
        // index 属性声明的是匹配文本的起始字符在 stringObject 中的位置，input 属性声明的是对 stringObject 的引用。
        // console.log(typeof ua.match(/MicroMessenger/i)); // object
        // 自动转了字符串
        return ua.match(/MicroMessenger/i) == "micromessenger" ? true : false;
    };


    utils.isSupportSVG = isSupportSVG;
    utils.fullscreen = fullscreen;
    utils.cancleFullscreen = cancleFullscreen;
    utils.isSupportCanvas = isSupportCanvas;
    utils.isWeiXin = isWeiXin;

    return utils;

})(window.utils || {});
