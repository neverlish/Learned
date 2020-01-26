// 사용 패턴 : module.exports에 인스턴스 객체를 만들어 할당함

// 생성자 함수
function User(id, name) {
  this.id = id;
  this.name = name;
}

User.prototype.getUser = function() {
  return {id: this.id, name: this.name};
}

User.prototype.group = {id: 'group1', name: '친구'};

User.prototype.printUser = function() {
  console.log('user 이름 : %s, group 이름 : %s', this.name, this.group.name);
}

module.exports = User;
