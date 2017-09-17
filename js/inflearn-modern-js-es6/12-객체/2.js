// 12 객체 - Object assign으로 JS 객체 만들기

const healthObj = {
  showHealth: function() {
    console.log('오늘 운동시간 : ' + this.healthTime);
  }
}

const myHealth = Object.create(healthObj);

myHealth.healthTime = '11:20';
myHealth.name = 'crong';

console.log(myHealth); // { healthTime: '11:20', name: 'crong' }
myHealth.showHealth();

const myHealth2 = Object.assign(Object.create(healthObj), {
  name: 'crong',
  healthTime: '11:20'
});

console.log(myHealth2); // { name: 'crong', healthTime: '11:20' }
