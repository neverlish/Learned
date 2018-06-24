// 03-4-1 any 타입 - any 타입의 사용법

let basket: any = 10;
basket = true;
basket = "banana";
console.log(basket); // banana

let vList: any[] = [1, false, "happy"];
console.log(vList[0]); // 1
