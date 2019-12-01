const { ApolloServer, PubSub } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { readFileSync } = require('fs')
const { MongoClient } = require('mongodb')
const { createServer } = require('http')
require('dotenv').config()
const path = require('path')
const depthLimit = require('graphql-depth-limit')

const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')
const resolvers = require('./resolvers')

async function start() {
  const app = express()
  const MONGO_DB = process.env.DB_HOST

  const client = await MongoClient.connect(
    MONGO_DB,
    { useNewUrlParser: true }
  )

  const db = client.db()

  const pubsub = new PubSub();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5)],
    context: async ({ req, connection }) => {
      const githubToken = req ? req.headers.authorization : connection.context.Authorization
      const currentUser = await db.collection('users').findOne({
        githubToken
      })
      return { db, currentUser, pubsub }
    }
  })

  server.applyMiddleware({ app })

  app.get('/', (req, res) => res.send('PhotoShare API에 오신 것을 환영합니다.'))

  app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

  app.use(
    '/img/photos',
    express.static(path.join(__dirname, 'assets', 'photos'))
  )

  const httpServer = createServer(app)
  server.installSubscriptionHandlers(httpServer)
  httpServer.timeout = 5000

  httpServer.listen({ port: 4000 }, () =>
    console.log(`GraphQL Service running on http://localhost:4000${server.graphqlPath}`))
}

start()
