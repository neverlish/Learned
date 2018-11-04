const { queueScheduler } = require('rxjs');

// QueueScheduler를 사용하는 피보나치 수열
const n = 6;
queueScheduler.schedule(function(state) {
  console.log(`finabonicci[${state.index}]: ${state.a}`);
  if (state.index < n) {
    this.schedule({
      index: state.index + 1,
      a: state.b,
      b: state.a + state.b
    });
  }
}, null, { index: 0, a: 0, b: 1 });
/*
finabonicci[0]: 0
finabonicci[1]: 1
finabonicci[2]: 1
finabonicci[3]: 2
finabonicci[4]: 3
finabonicci[5]: 5
finabonicci[6]: 8
*/
