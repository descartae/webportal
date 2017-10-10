import { load } from 'dotenv-safe'

import express from 'express'
import jwt from 'express-jwt'
import cors from 'cors'

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'

import schema from './schema'

load()

const {
  PORT,
  JWT_SECRET
} = process.env

const server = express()

const authMiddleware = 
  jwt({ 
    secret: new Buffer(JWT_SECRET, 'base64'),
    credentialsRequired: false
  })

server.use('*', cors({ origin: 'http://localhost:3000' }))

server.use('/graphiql', authMiddleware, graphiqlExpress({ endpointURL: '/graphql' }))
server.use('/graphql', authMiddleware, bodyParser.json(), graphqlExpress((request) => {
  const context = {
    configuration: { JWT_SECRET }
  }

  if (request.user != null) {
    context.user = request.user
  }

  return {
    schema,
    context
  }
}))

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`))
