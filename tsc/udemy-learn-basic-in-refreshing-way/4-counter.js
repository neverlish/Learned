// function Counter() {
//   this.num = 0;
//   this.timer = setInterval(function add() {
//     this.num++;
//     console.log(this.num);
//   }, 1000);
// }
// NaN만 계속해서 나옴


function Counter() {
  this.num = 0;
  var self = this;
  this.timer = setInterval(function add() {
    self.num++;
    console.log(self.num);
  }, 1000);
}

Counter();
