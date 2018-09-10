// 09-1-2 타입 가드 - instanceof를 이용한 타입 검사 - instanceof를 이용한 객체 타입 검사

class Cat {
  name = 'cat';
  age = 13;
}

class Dog {
  name = 'dog';
  leg = 4;
}

function diffCheck(x: Cat | Dog) {
  if (x instanceof Dog) {
    console.log(x.name);
    console.log(x.leg);
  }

  console.log(x.name);
  // console.log(x.leg); // 오류
  // console.log(x.age); // 오류
}

diffCheck(new Dog());
/*
dog
4
dog
*/
