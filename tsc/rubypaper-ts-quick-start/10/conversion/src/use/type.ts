// 10-1-1 타입 에일리어스 - 타입 에일리어스를 이용한 유니언 타입 선언 - type 에일리어스를 이용해 새로운 타입 정의하기

type myId = string;
type myAlias = string | undefined;
type User = {
  id: myId;
  alias?: myAlias;
  city: string;
};

let id1: User = { id: 'happy1', city: 'seoul' };
let id2: User = { id: 'happy2', alias: undefined, city: 'daegu' };
let id3: User = { id: 'happy3', alias: 'happy3!!', city: 'pusan' };

console.log(typeof id1, id1);
console.log(typeof id2, id2);
console.log(typeof id3, id3);

/*
object { id: 'happy1', city: 'seoul' }
object { id: 'happy2', alias: undefined, city: 'daegu' }
object { id: 'happy3', alias: 'happy3!!', city: 'pusan' }
*/
