import {decorateName} from './5-nameDecorator';

function sayHello(name: string) {
  console.log('hello ' + decorateName(name));
}

export {sayHello};
