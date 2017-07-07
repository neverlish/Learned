"use strict";
var Counter = (function () {
    function Counter() {
        var _this = this;
        this.num = 0;
        this.timer = setInterval(function () {
            _this.num++;
            console.log(_this.num);
        }, 1000);
    }
    return Counter;
}());
var c = new Counter();
