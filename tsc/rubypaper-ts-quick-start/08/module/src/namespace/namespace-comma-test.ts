// 08-2-5 네임스페이스의 이름 확장 - 점(.)을 이용한 네임스페이스의 선언

namespace MyAnimal.Land {
  export function run() {
    console.log('옥상 동물이 달립니다!');
  }
}

namespace MyAnimal {
  MyAnimal.Land.run(); // 옥상 동물이 달립니다!
}
