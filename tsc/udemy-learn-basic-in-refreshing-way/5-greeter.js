"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _5_nameDecorator_1 = require("./5-nameDecorator");
function sayHello(name) {
    console.log('hello ' + _5_nameDecorator_1.decorateName(name));
}
exports.sayHello = sayHello;
