type thing = string | number | string[] | boolean;
let returnSomething = (someThing: thing) => {
  if (typeof someThing === 'string' || typeof someThing === 'number' || typeof someThing === 'boolean') {
    console.log('something = ', someThing)
  }
  if (someThing instanceof Array) {
    let joinedThings = '';
    someThing.forEach((thing) => {
      joinedThings += `${thing}`;
    })
    console.log('joinedThings', joinedThings);
  }
};

returnSomething(['wonder','woman','rocks!!!']);

type stuff = string | {name: string};
let gimmeStuff = (stuff: stuff) => {
  typeof stuff === 'string';
  // typeof stuff.name === 'string';
  // 에러 발생. Property 'name' does not exist on type 'stuff'.
}

type coolThings = {name: string;} | {id: number;};
let gimmeCoolThings = (thing: coolThings) => {
  // if (typeof thing.name === 'string') { return thing.name;}
  // if (typeof thing.id === 'number') {return thing.id;}
  // 둘다 에러 발생. Property 'name' does not exist on type 'string'. 타입을 명확히 하지 않아 생기는 에러.
}

type stuffAndThings = {cool: string; meh: string;} | {cool: string; lame: string;};
let gimmeStuffAndThings = (sat: stuffAndThings) => {
  // return sat.cool || sat.lame;
}
