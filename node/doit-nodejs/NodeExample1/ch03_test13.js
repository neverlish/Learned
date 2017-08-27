var Users = [{name: '소녀시대', age: 20}, {name: '걸스데이', age: 22}, {name: '티아라', age: 23}];
console.log('delete 키워드로 배열 요소 삭제 전 배열 요소의 수 : %d', Users.length);

delete Users[1];
console.log('delete 키워드로 배열 요소 삭제 후');
console.dir(Users);
