import { people, getById } from './db'

const resolvers = {
  Query: {
    people: () => people,
    person: () => getById(id)
  }
}

export default resolvers
