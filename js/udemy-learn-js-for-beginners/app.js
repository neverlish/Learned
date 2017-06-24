var firstName = 'laurence'; // String
var age = 10; // Integer
var age2 = 5;
var courseName = 'Javascript'; // String
var fiv = '5';
var boo = false; // Boolean

console.log(age + fiv);

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
