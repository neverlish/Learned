// 03-3-3 enum 타입 - enum을 선언하는 방법

enum WeekDay { Mon, Tue, Wed, Thu = Tue + Wed }
let thu2: number = 10 * 2;
enum WeekDay2 { Mon = 10, Tue, Wed = 10 << 2, Thu = thu2 }
enum WeekDay3 { Mon = "Monday", Tue = "Tuesday" }

console.log('1. ' + JSON.stringify(WeekDay)); // 1. {"0":"Mon","1":"Tue","2":"Wed","3":"Thu","Mon":0,"Tue":1,"Wed":2,"Thu":3}
console.log('2. ' + JSON.stringify(WeekDay2)); // 2. {"10":"Mon","11":"Tue","20":"Thu","40":"Wed","Mon":10,"Tue":11,"Wed":40,"Thu":20}
console.log('3. ' + JSON.stringify(WeekDay3)); // 3. {"Mon":"Monday","Tue":"Tuesday"}
console.log(`4. Mon=${WeekDay.Mon} Tue=${WeekDay["Tue"]} Wed=${WeekDay.Wed}`); // 4. Mon=0 Tue=1 Wed=2
console.log(`5. 0=${WeekDay[0]} 1=${WeekDay["1"]} 3=${WeekDay[WeekDay.Wed]}`); // 5. 0=Mon 1=Tue 3=Wed
console.log('6. ', typeof WeekDay); // 6.  object
console.log('7. ', typeof WeekDay.Mon, typeof WeekDay3.Mon); // 7.  number string
console.log('8. ', typeof WeekDay[0], WeekDay[0]); // 8.  string Mon

let myDay: WeekDay = 50;
console.log('9. ', typeof myDay, myDay); // 9.  number 50

let myDay2: WeekDay3 = WeekDay3.Mon;
console.log('10. ', typeof myDay2, myDay2); // 10.  string Monday

