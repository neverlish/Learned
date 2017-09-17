// 12 객체 - 5 Object setPrototypeOf로 객체간 prototype chain 생성하기

const healthObj = {
  showHealth: function() {
    console.log('오늘 운동시간 : ' + this.healthTime);
  },
  setHealth: function(newTime) {
    this.healthTime = newTime;
  }
}

// child obj
const healthChildObj = {
  getAge: function() {
    return this.age;
  }
}

Object.setPrototypeOf(healthChildObj, healthObj);

const childObj = Object.setPrototypeOf({
  age: 22
}, healthChildObj);

childObj.setHealth('11:55');
childObj.showHealth(); // 오늘 운동시간 : 11:55
console.log('childobj is ', childObj); // childobj is  { age: 22 }
console.log(childObj.__proto__); // { getAge: [Function: getAge] }
console.log(childObj.__proto__.__proto__); // { showHealth: [Function: showHealth], setHealth: [Function: setHealth] }
