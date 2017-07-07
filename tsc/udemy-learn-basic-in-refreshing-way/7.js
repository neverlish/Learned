"use strict";
var SportsCar = (function () {
    function SportsCar(engine, color) {
        this.engine = engine;
        this.color = color;
    }
    SportsCar.prototype.honk = function (sound) {
        return sound + " " + sound;
    };
    SportsCar.prototype.roar = function () {
        return this.engine.volume + "cc are roaring at you";
    };
    return SportsCar;
}());
var raceCar = new SportsCar({ numCylinders: 6, volume: 2000 }, 'red');
console.log(raceCar.honk('beep')); // beep beep 
console.log(raceCar.roar()); // 2000cc are roaring at you
var HeavyTruck = (function () {
    function HeavyTruck(engine, color, numWheels) {
        this.engine = engine;
        this.color = color;
        this.numWheels = numWheels;
    }
    HeavyTruck.prototype.honk = function (sound) {
        return sound + " " + sound;
    };
    HeavyTruck.prototype.roar = function () {
        return this.engine.volume + "cc are roaring at you";
    };
    HeavyTruck.prototype.pullLoad = function (weight) {
        return this.numWheels + " wheels are pulling " + weight + "kg";
    };
    return HeavyTruck;
}());
var monsterTruck = new HeavyTruck({ numCylinders: 6, volume: 10000 }, 'white', 16);
console.log(monsterTruck.roar()); // 10000cc are roaring at you
console.log(monsterTruck.pullLoad(2500)); // 6 wheels are pulling 2500kg
