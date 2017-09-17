// 11 Function - 2 Arrow function의 this context

const myObj = {
  runTimeout() {
    // setTimeout(function() {
    //   console.log(this === window); // true
    //   this.printData();
    // }.bind(this), 200);
    setTimeout(() => {
      console.log(this === window); // false
      this.printData();
    }, 200);
  },
  printData() {
    console.log('hi codesquad!');
  }
}

myObj.runTimeout();

///////

const el = document.querySelector('p');

const myObj2 = {
  register() {
    // el.addEventListener('click', function() {
    //   // console.log(this);
    //   this.printData(); // this.printData is not a function
    // });
    el.addEventListener('click', (evt) => {
      this.printData(evt.target);
    })
  },
  printData(el) {
    console.log('clicked!!', el.innerText);
  }
}

myObj2.register();
