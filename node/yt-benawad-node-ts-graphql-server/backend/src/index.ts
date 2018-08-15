import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga'
import { createConnection, getConnection } from 'typeorm'
import { ResolverMap } from './types/ResolverType'
import { User } from './entity/User';
import { Profile } from './entity/Profile';

const typeDefs = `
  type User {
		id: Int!
		firstName: String!
		profile: Profile
	}

	type Profile {
		favoriteColor: String!
	}
	
	type Query {
		hello(name: String): String!
		user(id: Int!): User!
		users: [User!]!
	}

	input ProfileInput {
		favoriteColor: String!
	}

	type Mutation {
		createUser(firstName: String!, profile: ProfileInput): User!
		updateUser(id: Int!, firstName: String): Boolean
		deleteUser(id: Int!): Boolean
	}
`

const resolvers: ResolverMap = {
  Query: {
		hello: (_: any, { name }: any) => `Hello ${name || 'World'}`,
		user: async (_, { id }) => {
			const user = await User.findOneById(id, { relations: ['profile'] })
			return user;
		},
		users: async () => {
			const users = await User.find({ relations: ['profile'] })
			return users
		},
	},
	Mutation: {
		createUser: async (_, args) => {
			const profile = Profile.create({ ...args.profile })
			await profile.save()

			const user = User.create({
				firstName: args.firstName
			})

			user.profile = profile

			await user.save()

			return user
		},
		updateUser: async (_, { id, ...args }) => {
			try {
				await User.updateById(id, args)
			} catch (err) {
				console.log(err)
				return false
			}

			return true
		},
		deleteUser: async (_, { id }) => {
			try {
				await User.removeById(id)
				// const deleteQuery =  getConnection()
				// 	.createQueryBuilder()
				// 	.delete()
				// 	.from(User)
				// 	.where("id = :id", { id })
				
				// 	if (id === 3) {
				// 		deleteQuery.andWhere('email = :email', { email: 'neverlish@gmail.com' })
				// 	}

				// 	await deleteQuery.execute()
			} catch (err) {
				console.log(err)
				return false
			}

			return true
		}
	},
}

const server = new GraphQLServer({ typeDefs, resolvers })
createConnection().then(() => {
  server.start(() => console.log('Server is running on localhost:4000'))
})
