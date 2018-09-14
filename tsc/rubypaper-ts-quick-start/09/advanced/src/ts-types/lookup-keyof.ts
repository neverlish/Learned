// 09-2-2 룩업 타입 - keyof를 이용한 룩업 타입 선언과 사용

interface Profile {
  name: string;
  gender: string;
  age: number;
}

type Profile1 = keyof Profile;
type Profile2 = keyof Profile[];
type Profile3 = keyof { [x: string]: Profile};
type Profile4 = keyof Profile['name'];

let pValue1: Profile1 = 'name';
// let pValue2: Profile1 = 'name2';
let pValue3: Profile2 = 'length';
let pValue4: Profile2 = 'push';
let pValue5: Profile3 = 'hello';
let pValue6: Profile4 = 'length';
// let pValue7: Profile4 = 'abc';

console.log(`
  1번: ${pValue1} / 2번: 오류 / 3번: ${pValue3}
  4번: ${pValue4} / 5번: ${pValue5} / 6번: ${pValue6} / 7번: 오류
`);

/*
1번: name / 2번: 오류 / 3번: length
4번: push / 5번: hello / 6번: length / 7번: 오류
*/
