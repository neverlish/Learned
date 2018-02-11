// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 4 객체 표현식 기능 확대

// 변수명과 동일한 속성 석정 기능 추가
var property1 = 'New',
    property2 = 'Object literal',
    namedProperty = 'Functionalities';

var mergedObject = {
  property1: property1,
  property2: property2,
  property3: namedProperty
};
console.log(mergedObject);

var newMergedObject = {
  property1,
  property2,
  property3: namedProperty
};
console.log(newMergedObject);

// 산술식을 통한 속성명 정의 기능
var i = 0,
    newComputedProperty = {
      ['property' + ++i]: i,
      ['property' + ++i]: i,
      ['property' + ++i]: i
    };

console.log(newComputedProperty); // { property1: 1, property2: 2, property3: 3 }

var j = 0,
    previousComputedProperty = {};

previousComputedProperty['property' + ++j] = j;
previousComputedProperty['property' + ++j] = j;
previousComputedProperty['property' + ++j] = j;
console.log(previousComputedProperty); // { property1: 1, property2: 2, property3: 3 }

// 간단한 함수 정의와 getter, setter 정의 기능
var newFunctionDefinition = {
  func() {
    console.log('This is new definition');
  },
  _name: 'Unikys',
  get name() {
    return this._name;
  },
  set name(name) {
    this._name = name;
  }
};

var previousFunctionDefinition = {
  func: function() {
    console.log('This is the compatible definition');
  },
  _name: 'Unikys'
};
Object.defineProperty(previousFunctionDefinition, 'name', {
  get: function() {
    return this._name;
  },
  set: function(name) {
    this._name = name;
  }
});

// __proto__ 속성 정의 기능
var car = {
  name: 'Default',
  type: 'Car',
  getName() {
    return this.name;
  }
}

var suvES6 = {
  __proto__: car,
  name: 'My car',
  type: 'SUV'
};

var suvES5 = Object.create(car, {
  name: {
    writable: true,
    configurable: true,
    value: 'My car'
  },
  type: {
    writable: true,
    configurable: true,
    value: 'SUV'
  }
});

var suvES5Other = Object.create(car);
suvES5Other.name = 'My car';
suvES5Other.type = 'SUV';
