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

    /**
     * 判断是否是微信端
     * @returns {boolean}
     */
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

    /**
     * 复制对象
     * @param obj 传入一个对象
     * @returns {{}}返回一个新的复制的对象
     */
    var cloneObject = function (obj) {
        var o = {};
        for (var key in obj) {
            if (typeof key === 'object') {
                o[key] = cloneObject(key);
            } else {
                o[key] = obj[key];
            }
        }
        return o;
    };

    /**
     * （1）如果要复制多个对象的属性到一个对象上面
     *  extendDeep(obj1,obj2,obj3,obj4); 复制obj2,obj3,obj4的属性到obj1上面
     *
     * （2）如果要复制多个对象的属性到一个对象上面，不改变原来你的对象
     *  extendDeep({},obj1,obj2,obj3,obj4); 复制obj1,obj2,obj3,obj4的属性到{}上面
     *
     *
     *
     *
     * @returns {Window}
     */
    var extendDeep = function () {
        // 深度复制对象，从第二个对象开始，将后面的所有对象的属性都复制到第一个对象上面来
        var firstObj = arguments[0] || {};
        var len = arguments.length;
        var otherObj = null;

        for (var i = 1; i < len; i++) {
            otherObj = arguments[i];
            for (var key in otherObj) {
                // 只复制自己的属性，不复制继承过来的属性
                if (otherObj.hasOwnProperty(key)) {
                    if (Object.prototype.toString.call(otherObj[key]) === '[object Object]') {
                        // 如果要合并过来的对象中，有的属性，但是在前面的对象中没有，也要合并过来
                        // 用对象来接收返回的值
                        firstObj[key] = extendDeep(firstObj[key], otherObj[key]);
                    } else {
                        firstObj[key] = otherObj[key];
                    }
                }
            }
        }
        return firstObj;
    };


    /*loadScript('http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js', function () {
        // 通过DOM创建的script，文件的下载和执行并不会阻塞页面的其他进程，这和页面本身的渲染有所不同
        // 并不会按照顺序来加载文件，而是按照服务器返回的速度
        // 所以为了保证加载顺序可以向下面这样做
        loadScript('http://apps.bdimg.com/libs/jquery-lazyload/1.9.5/jquery.lazyload.min.js', function () {
            alert($);
        })
    });*/
    /**
     * 加载JavaScript代码
     * @param url
     * @param callback  加载完成的回调函数
     */
    var loadScript = function (url, callback) {
        var script = document.createElement('script');
        script.type = "text/javascript";

        if (script.readyState) {// IE
            script.onreadystatechange = function () {
                //  loaded下载完成
                //  complete 所有数据准备就绪
                // 二者可能会执行其中一个,也有可能都执行
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    // 防止重复加载
                    script.onreadystatechange = null;
                    callback();
                }
            }
        } else { // 其他浏览器
            script.onload = function () {
                callback();
            }
        }

        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    utils.isSupportSVG = isSupportSVG;
    utils.fullscreen = fullscreen;
    utils.cancleFullscreen = cancleFullscreen;
    utils.isSupportCanvas = isSupportCanvas;
    utils.isWeiXin = isWeiXin;
    utils.cloneObject = cloneObject;
    utils.extendDeep = extendDeep;
    utils.loadScript = loadScript;

    return utils;

})(window.utils || {});
