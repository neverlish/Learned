// 12 Capture Side Effects in a Task

const Task = require('data.task');

Task.of(1) // Task(1)
.fork(e => console.log('err', e),
      x => console.log('success', x)); // success 1

Task.rejected(1) // Task(1)
.fork(e => console.log('err', e),
      x => console.log('success', x)); // err 1

Task.of(1) // Task(1)
.map(x => x + 1)
.fork(e => console.log('err', e),
      x => console.log('success', x)); // success 2

Task.rejected(1) // Task(1)
.map(x => x + 1)
.fork(e => console.log('err', e),
      x => console.log('success', x)); // err 1

Task.of(1) // Task(1)
.map(x => x + 1)
.chain(x => Task.of(x + 1))
.fork(e => console.log('err', e),
      x => console.log('success', x)); // success 3

Task.rejected(1) // Task(1)
.map(x => x + 1)
.chain(x => Task.of(x + 1))
.fork(e => console.log('err', e),
      x => console.log('success', x)); // err 1

const launchMissies = () => 
  new Task((rej, res) => {
    console.log('launch missiles!')
    res('missile')
  })

launchMissies()
.map(x => x + '!')
.fork(e => console.log('err', e),
      x => console.log('success', x)); // success missile!

const app = launchMissies().map(x => x + '!');
app.fork(e => console.log('err', e),
         x => console.log('success', x)); // success missile!


app.map(x => x + '!').fork(e => console.log('err', e),
                           x => console.log('success', x)); // success missile!!
