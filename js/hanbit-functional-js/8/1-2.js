// 8 흐름 기반 프로그래밍 - 1 체이닝 - 2 프로미스

var {JSDOM} = require('jsdom');
var {window} = new JSDOM();
var $ = require('jquery')(window);
var {note} = require('../functions');

var longing = $.Deferred();

console.log(longing.promise()); 
/*
{ state: [Function: state],
  always: [Function: always],
  catch: [Function: catch],
  pipe: [Function: pipe],
  then: [Function: then],
  promise: [Function: promise],
  progress: [Function: add],
  done: [Function: add],
  fail: [Function: add] }
*/

console.log(longing.promise().state()); // pending

longing.resolve('<3')

console.log(longing.promise().state()); // resolved

console.log(longing.promise().done(note)); 
/*
NOTE: <3
{ state: [Function: state],
  always: [Function: always],
  catch: [Function: catch],
  pipe: [Function: pipe],
  then: [Function: then],
  promise: [Function: promise],
  progress: [Function: add],
  done: [Function: add],
  fail: [Function: add] }
*/

/////////

function go() {
  var d = $.Deferred();

  $.when('')
   .then(function() {
     setTimeout(function() {
       console.log('sub-task 1');
     }, 5000);
   })
   .then(function() {
     setTimeout(function() {
       console.log('sub-task 2');
     }, 10000)
   })
   .then(function() {
     setTimeout(function() {
       d.resolve('done done done done');
     }, 15000)
   });
  
  return d.promise();
}

var yearning = go().done(note);
console.log(yearning.state());
/*
pending
sub-task 1
sub-task 2
NOTE: done done done done
*/
