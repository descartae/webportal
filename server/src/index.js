import { load as loadConfiguration } from 'dotenv-safe'

import express from 'express'
import jwt from 'express-jwt'
import cors from 'cors'

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'

import { mongoConnector, mongoLoaders } from './mongo'  
import schema from './schema'

loadConfiguration()

const {
  PORT,
  JWT_SECRET,
  MONGODB_URL
} = process.env

const start = async () => {
  console.log(`Connecting to mongodb at ${MONGODB_URL}`)

  const collections = await mongoConnector(MONGODB_URL)

  console.log('Creating server')

  const server = express()

  server.use(cors())

  const authMiddleware =
    jwt({ 
      secret: new Buffer(JWT_SECRET, 'base64'),
      credentialsRequired: false
    })

  server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  server.use('/graphql', authMiddleware, bodyParser.json(), graphqlExpress((request) => {
    const context = {
      configuration: { JWT_SECRET },
      dataLoaders: mongoLoaders(collections),
      collections
    }
  
    if (request.user != null) {
      context.user = request.user
    }
  
    return {
      schema,
      context
    }
  }))
  
  server.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`))
}

start()
