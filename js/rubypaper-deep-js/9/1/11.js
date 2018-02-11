// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 11 TypedArray 기능 추가

// 자바스크립트의 TCP 전송을 위한 자료구조 활용

class Employer {
  constructor(arrayBuffer = new ArrayBuffer(24)) {
    this._arrayBuffer = arrayBuffer;
    this._id = new Uint32Array(arrayBuffer, 0, 1);
    this._name = new Uint8Array(arrayBuffer, 4, 16);
    this._manMonth = new Float32Array(arrayBuffer, 20, 1);
  }

  set id(id) {
    this._id[0] = id;
    this._arrayBuffer.set(id);
  }

  get id() {
    return this._id[0];
  }

  set name(name) {
    this._name[0] = name;
  }

  get name() {
    return this._name[0];
  }

  set manMonth(manMonth) {
    this._manMonth[0] = manMonth;
  }

  get manMonth() {
    return this._manMonth[0];
  }

  get toByte() {
    return this._arrayBuffer;
  }
}
