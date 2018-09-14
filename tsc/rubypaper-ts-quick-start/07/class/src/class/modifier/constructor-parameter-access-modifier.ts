// 07-1-4 접근 제한자의 사용법 - 생성자 매개변수에 접근 제한자 추가 - 생성자 매개변수에 접근 제한자를 추가해 멤버 변수처럼 사용하기

class Cube {
  // #1 생성자 매개변수 선언
  constructor(public width: number, private length: number, protected height: number) { }

  // #2 직육면체 부피 구하기
  getVolumne() {
    return this.width * this.length * this.height;
  }
}

let [cWidth, cLength, cHeight] = [1, 2, 3];
let cube = new Cube(cWidth, cLength, cHeight);
console.log('1번 세로 : ', cube.width, 'cm'); // 1번 세로 :  1 cm
console.log('2번 부피 : ', cube.getVolumne(), 'cm'); // 2번 부피 :  6 cm
