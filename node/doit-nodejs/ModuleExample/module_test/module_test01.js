// require() 메소드는 exports 객체를 반환함
var user01 = require('./user01');

function showUser() {
  return user01.getUser().name + ', ' + user01.group.name;
}

console.log('사용자 정보 : %s', showUser());
