/*
var firstName = 'laurence'; // String
var age = 10; // Integer
var age2 = 5;
var courseName = 'Javascript'; // String
var fiv = '5';
var boo = false; // Boolean

console.log(age + fiv);
*/

/*
console.log(firstName);
firstName += courseName;
console.log(firstName);

console.log(age);
age = age + 10;
console.log(age);
age++;
console.log(age);
age--;
console.log(age);
age = age + age2;
console.log(age);
console.log(age-20);
console.log(age*4);
console.log(age/5);
age += 10;
console.log(age);
age -= 10;
console.log(age);
*/

/*
var myArray = ['Javascript', 50, 10, false, 'Course'];
console.log(myArray[0]);
myArray[1] = 1000;
console.log(myArray.length);
myArray.sort();
console.log(myArray);

var a = 1;
var myObj = {course1: 'Javascript1',course2: 'Javascript2', price: 200, title: 'Intro to Javascript'};
console.log(myObj);
console.log(myObj['course'+a]);
a++;
console.log(myObj['course'+a]);
console.log(myObj.course1);

var b = 10;
var c = 1;

function myFun(a=3) {
  // contents of the Function
  var c = 100;
  // console.log(c);
  // console.log((a * b) + ' function was run');
  return (a * b);
}

var d = myFun(5); // setting it as 50
console.log(d);
d += myFun(6); // adding 60
console.log(d);
d += myFun(); // adding 30
console.log(d);


var myArray = ['one', 'two', 3, 4, 'five', 'six', 7, 8, 9];
console.log(myArray.sort());
console.log(myArray.reverse());
myArray.push('ten');
console.log(myArray);
myArray.pop();
console.log(myArray);
var a = myArray.shift();
console.log(a);
console.log(myArray);
myArray.unshift('ten');
console.log(myArray);
myArray.splice(0, 2);
console.log(myArray);
myArray.splice(3, 0, 'added 1', 'added 2');
console.log(myArray);
*/


// var myStr = 'JavaScript';
// console.log(myStr.length);
// console.log(myStr.slice(2,5));
// console.log(myStr.substr(2,7));
// var a = myStr.replace(/a/g, 'WWWWW');
// console.log(a);
// console.log(myStr.toLowerCase());

// var b = 5;
// console.log(b);
// console.log(b.toString());

// console.log(Math.round(5.2233));
// console.log(Math.ceil(5.2233));
// console.log(Math.floor(5.2233));

// console.log(Math.random());
// console.log(Math.ceil(Math.random() * 10));

// var da = Date();
// console.log(da);

var a = 15;
var b = 10;
var c = 'testb';
/*
if (a > b) { 
  console.log('Condition is TRUE'); 
  console.log('Condition is TRUE'); 
  console.log('Condition is TRUE'); 
  console.log('Condition is TRUE'); 
  console.log('Condition is TRUE'); 
} else if (a < 20) {
  console.log('Second Condition is True');
} else {
  console.log('Conditions are FALSE')
}
*/

switch (a) {
  case 15:
    console.log('Condition is case' + c);
    break;
  case 10:
    console.log('Condition is case' + c);
    break;
  case 5:
    console.log('Condition is case' + c);
    break;
  case 1:
    console.log('Condition is case' + c);
    break;  
  default:
    console.log('Conditions are FALSE');
}

switch (c) {
  case 'testc':
    console.log('Condition is case 15');
    break;
  case 'testb':
    console.log('Condition is case 10');
    break;
  case 5:
    console.log('Condition is case 5');
    break;
  case 1:
    console.log('Condition is case 1');
    break;  
  default:
    console.log('Conditions are FALSE');
}
