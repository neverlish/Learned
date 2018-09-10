// 09-2-1 문자열 리터럴 타입 - 문자열 리터럴 타입

type EventType = 'keyup' | 'mouseover';

const myEvent: EventType = 'keyup';
console.log(typeof myEvent, myEvent); // string keyup

function on(event: EventType, callback: (message: string) => any) {
  console.log(typeof event, event);
  callback('callback!');
}

on(myEvent, (message) => console.log(message));
/*
string keyup
callback!
*/
