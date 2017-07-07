class Counter {
  num = 0;
  timer = setInterval(() => {
    this.num++;
    console.log(this.num);
  }, 1000);
}

var c = new Counter();
