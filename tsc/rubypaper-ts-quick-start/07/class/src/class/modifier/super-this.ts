// 07-1-4 접근 제한자의 사용법 - 부모 클래스의 멤버를 이용하기 - this, super를 이용한 부모 클래스의 멤버에 접근

class PC {
  constructor(public hddCapacity: string) { }

  private ram: string = '0G';
  set ramCapacity(value: string) { this.ram = value; }
  get ramCapacity() { return this.ram; }

  protected getHddCapacity() {
    return this.hddCapacity;
  }
}

class Desktop extends PC {
  constructor(public hddCapacity: string) {
    // 부모 클래스의 생성자를 호출함
    super(hddCapacity);
  }

  getInfo() {
    console.log('1번 HDD 용량 : ', super.getHddCapacity(), super.hddCapacity); // 1번 HDD 용량 :  1000G undefined
    console.log('2번 HDD 용량 : ', this.getHddCapacity(), this.hddCapacity); // 2번 HDD 용량 :  1000G 1000G

    this.hddCapacity = '2000G';
    console.log('3번 HDD 용량 : ', super.getHddCapacity(), super.hddCapacity); // 3번 HDD 용량 :  2000G undefined
    console.log('4번 HDD 용량 : ', this.getHddCapacity(), this.hddCapacity); // 4번 HDD 용량 :  2000G 2000G

    super.ramCapacity = '16G';
    console.log('5번 RAM 용량 : ', this.ramCapacity, super.ramCapacity); // 5번 RAM 용량 :  16G 16G

    super.ramCapacity = '8G';
    console.log('6번 RAM 용량 : ', this.ramCapacity, super.ramCapacity); // 6번 RAM 용량 :  8G 8G
  }
}

let myDesktop = new Desktop('1000G');
myDesktop.getInfo();
