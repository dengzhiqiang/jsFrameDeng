var dom = (function (dom) {
    /**
     * 获取视口的宽度和高度
     * @returns {{width: (Number|number), height: (Number|number)}}
     */
    var getViewportSize = function () {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        };
    };

    dom.getViewportSize = getViewportSize;

    return dom;

})(window.dom || {});