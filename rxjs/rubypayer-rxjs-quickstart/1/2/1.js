class User {
  constructor() {
    this._state = {
      name: '손찬욱',
      isLogin: false
    };
  }

  getName() {
    return this._state.name;
  }

  isLogin() {
    return this._state.isLogin;
  }

  login(name) {
    this._state.name = name;
    this._state.isLogin = true;
  }

  logout() {
    this._state.name = '';
    this._state.isLogin = false;
  }
}

class System {
  constructor(user) {
    this._token = null;
    this._id = 'System';
    this._user = user;
  }

  check() {
    const username = this._user.getName();
    if (this._user.isLogin()) {
      this._token = [...username].reduce((acc, v) => acc + v.charCodeAt(0), 0);
      console.log(`[${this._id}] ${username} 의 토큰은 ${this._token} 입니다`);
    } else {
      this._token = null;
      console.log(`[${this._id}] 로그인 되지 않았습니다`);
    }
  }
}

let user = new User();
let system = new System(user);

// System 작업
system.check(); // [System] 로그인 되지 않았습니다

// User의 상태변화 발생
user.login('sculove');

// System 작업
system.check(); // [System] sculove 의 토큰은 769 입니다

// User의 상태변화 발생
user.logout();

// System 작업
system.check(); // [System] 로그인 되지 않았습니다
