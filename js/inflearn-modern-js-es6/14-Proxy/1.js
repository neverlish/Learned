// 14 Proxy - 1 Proxy로 interception 기능 구현

const myObj = {
  name: 'crong',
  changedValue: 0
};

const proxy = new Proxy(myObj, {});
console.log(proxy.name); // crong

proxy.name = 'jisu';
console.log(proxy.name); // jisu

console.log(toString.call(proxy)); // [object object]

console.log(proxy); // { name: 'jisu' }
console.log(proxy === myObj); // false
console.log(proxy == myObj); // false
console.log(proxy.name == myObj.name); // true


//////////////////

const proxy2 = new Proxy(myObj, {
  get: function(target, property, receiver) {
    console.log('get value');
    return target[property];
  },
  set: function(target, property, value) {
    console.log('set value');
    target['changedValue']++;
    target[property] = value;
  }
});

proxy2.name = 'codesquad'; // set value
console.log(proxy2.name); // get value // codesquad
console.log(proxy2.changedValue); // get value // 1

myObj.name = 'campus';

console.log(proxy2); // { name: 'campus', changedValue: 1 }
console.log(myObj); // { name: 'campus', changedValue: 1 }

////////////////////

const proxy3 = new Proxy({name: 'crong', changedValue: 0}, {
  get: function(target, property, receiver) {
    console.log('get value');
    return target[property];
  },
  set: function(target, property, value) {
    console.log('set value');
    target['changedValue']++;
    target[property] = value;
  }
});

proxy3.name = 'codesquad'; // set value
console.log(proxy3.changedValue); // get value // 1


/////////////////////


const proxy4 = new Proxy({name: 'crong', changedValue: 0}, {
  get: function(target, property, receiver) {
    console.log('get value');
    return Reflect.get(target, property);
  },
  set: function(target, property, value) {
    console.log('set value');
    target['changedValue']++;
    target[property] = value;
  }
});

proxy4.name = 'codesquad'; // set value
console.log(proxy4.changedValue); // get value // 1


/////////////////////


const proxy5 = new Proxy({name: 'crong', changedValue: 0}, {
  get: function(target, property, receiver) {
    console.log('get value');
    // return Reflect.get(target, property);
    return (property in target) ? target[property] : 'anonymous';
  },
  set: function(target, property, value) {
    console.log('set value');
    target['changedValue']++;
    target[property] = value;
  }
});

proxy5.name = 'codesquad'; // set value
console.log(proxy5.changedValue); // get value // 1
console.log(proxy5.age); // get value // anonymous
