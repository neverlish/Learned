"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Animal
var Animal = (function () {
    function Animal(type) {
        this.type = type;
    }
    Animal.isAnimal = function (instance, type) {
        if (!Animal.prototype.isPrototypeOf(instance)) {
            return false;
        }
        return type ? instance.type === type : true;
    };
    return Animal;
}());
// Dog
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog(name, breed) {
        var _this = _super.call(this, 'dog') || this;
        _this.name = name;
        _this.breed = breed;
        return _this;
    }
    Dog.prototype.bark = function () {
        console.log('ruff, ruff');
    };
    Dog.prototype.print = function () {
        console.log('The dog ' + this.name + ' is a ' + this.breed);
    };
    Dog.isDog = function (instance) {
        return Animal.isAnimal(instance, 'dog');
    };
    return Dog;
}(Animal));
// Usage
var sparkie = new Dog('Sparkie', 'Border Collie');
console.log(sparkie.name); // Sparkie
console.log(sparkie.breed); // Border Collie
sparkie.bark(); // ruff, ruff
sparkie.print(); // The dog Sparkie is a Border Collie
console.log(Dog.isDog(sparkie));
