// 12 객체 - 4 Object setPrototypeOf로 객체 만들기

const healthObj = {
  showHealth: function() {
    console.log('오늘 운동시간 : ' + this.healthTime);
  },
  setHealth: function(newTime) {
    this.healthTime = newTime;
  }
}

const newobj = Object.setPrototypeOf({
  name: 'crong',
  healthTime: '11:20'
}, healthObj)

console.log('newobj is ', newobj); // myhealth is  { name: 'crong', healthTime: '11:20' }
