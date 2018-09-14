// 08-2-5 네임스페이스의 이름 확장 - 점(.)을 이용한 네임스페이스의 논리적인 선언 순서

namespace Animal {
  export function run() {
    console.log('동물이 달립니다!');
  }
  // Animal.Land.run(); // 하위 네임스페이스 요소는 호출 불가
}

namespace Animal.Land {
  Animal.run();

  export function run() {
    console.log('옥상 동물이 달립니다')
  }
}

namespace Animal.Land.Pet {
  Animal.Land.run();

  export function run() {
    console.log('애완 동물이 달립니다!');
  }

  export class Cat {
    run() {
      Animal.Land.Pet.run();
    }
  }
}

let cat = new (Animal.Land.Pet).Cat();
cat.run();
/*
동물이 달립니다!
옥상 동물이 달립니다
애완 동물이 달립니다!
*/
