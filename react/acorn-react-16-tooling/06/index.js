// const maybe = v => v ? v : 'default';
const maybe = (v = 'default') => v;

console.log(maybe('yes'));
console.log(maybe());
