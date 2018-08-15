import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga'
import { createConnection } from 'typeorm'
import { importSchema } from 'graphql-import'
import * as path from 'path'

import { ResolverMap } from './types/ResolverType'
import { User } from './entity/User'
import { Profile } from './entity/Profile'

import { GQL } from './generated/schema'

const typeDefs = importSchema(path.join(__dirname, './schema.graphql'))

const resolvers: ResolverMap = {
  Query: {
		hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Hello ${name || 'World'}`,
		user: async (_, { id }: GQL.IUserOnQueryArguments) => {
			const user = await User.findOneById(id, { relations: ['profile'] })
			return user;
		},
		users: async () => {
			const users = await User.find({ relations: ['profile'] })
			return users
		},
	},
	Mutation: {
		createUser: async (_, args: GQL.ICreateUserOnMutationArguments) => {
			const profile = Profile.create({ ...args.profile })
			await profile.save()

			const user = User.create({
				firstName: args.firstName
			})

			user.profile = profile

			await user.save()

			return user
		},
		updateUser: async (_, { id, firstName }: GQL.IUpdateUserOnMutationArguments) => {
			try {
				await User.updateById(id, { firstName: firstName || undefined })
			} catch (err) {
				console.log(err)
				return false
			}

			return true
		},
		deleteUser: async (_, { id }: GQL.IDeleteUserOnMutationArguments) => {
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
