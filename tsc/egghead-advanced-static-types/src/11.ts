// 11 Infer Types for Rest and Spread Properties in TypeScript

const person = {
  fullName: 'Marius Schulz',
  blog: 'https://blog.mariusschulz.com',
  twitter: '@mariusschulz'
};

// const { ... socialMedia, fullName } = person; // A rest element must be last in a destructuring pattern.
const { fullName, ... socialMedia } = person;

///////////

const defaultStyles = {
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'normal'
};

const userStyles = {
  color: '#111111',
  fontWeight: 700
};

const styles = {
  ...defaultStyles,
  ...userStyles
};

const { color, ...remainingProps } = styles;

////////////

const todo = {
  text: 'Mow the lawn',
  completed: false,
  tags: ['garden']
};

const shallowCopy = { ...todo };
shallowCopy.text = 'Buy milk';
shallowCopy.tags.push('kitchen');
console.log(shallowCopy); // { text: 'Buy milk', completed: false, tags: [ 'garden', 'kitchen' ] }
console.log(todo); // { text: 'Mow the lawn', completed: false, tags: [ 'garden', 'kitchen' ] }
