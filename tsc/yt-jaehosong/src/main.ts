let Animals = {
  names: ['cat','dog','pig'],
  choose: function() {
    console.log(this.names[1])
  }
};

Animals.choose();

setTimeout(Animals.choose, 100);
// 에러 반환. this가 this의 부모를 참조할 수 없는 상황.

setTimeout( () => Animals.choose(), 100);
