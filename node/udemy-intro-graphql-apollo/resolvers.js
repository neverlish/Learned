const authors = [{
  name: 'JK Rowling',
  age: 50,
  books: ['Harry Potter and the Goblet of Fire', 'Harry Potter and the Prisoner of Azkaban']
}, {
  name: 'George RR Martin',
  age: 70,
  books: ['GOT - Song of Ice and Fire', 'GOT - A Dance with Dragons']
}]

const resolvers = {
  Query: {
    author: () => {
      return authors
    }
  }
}

export default resolvers;
