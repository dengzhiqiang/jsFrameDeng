var stringBulider = (function () {
    var sb = function () {
        // 存放要拼接的元素
        this.data = [];
    };

    /**
     * 添加字符串到数组中
     * @param str 字符串，每次只能传入一个字符串
     * @return this 当前StringBulider对象
     */
    sb.prototype.add = function (str) {
        this.data.push(str);
        return this;
    };

    /**
     * 生成字符串
     * @param str 默认为空,如果传入','逗号，则用逗号分隔数组
     * @returns {StringBulider}
     */
    sb.prototype.builder = function (str) {
        var builderString = '';
        if (typeof str !== 'undefined') {
            builderString = this.data.join(str)
        } else {
            builderString = this.data.join('');
        }

        // 清空数组
        this._clear();
        return builderString;
    };

    /**
     * 清空数组
     * 字符串生成之后，也就意味着他的使命结束了
     * @param str
     */
    sb.prototype._clear = function (str) {
        this.data = [];
        this.data.length = 0;

        return this;
    };


    return new sb();

})();

console.log(stringBulider.add('邓').add('志').add('强').builder());
console.log(stringBulider.add('邓').add('志').add('强').builder('+'));



