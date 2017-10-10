/*
import express from 'express'

import cors from 'cors'

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'

import schema from './schema'

const PORT = 4000

const server = express()

server.use('*', cors({ origin: 'http://localhost:3000' }))
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
server.use('/graphql', bodyParser.json(), graphqlExpress((request) => {
  // TODO: setup the request context with auth data & data connectors
  const context = {}

  return {
    schema,
    context
  }
}))

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`))

*/
