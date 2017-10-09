import { reduce, mergeDeepRight } from 'ramda'
import { makeExecutableSchema } from 'graphql-tools'

import { 
  schema as centerSchema, 
  resolvers as centerResolvers 
} from './center'

/* 
  TODO: Better solution to circunvent empty type errors
  https://github.com/apollographql/graphql-tools/issues/293
*/
const schemaDefinition = `
  type Query {
    _blank: String
  }

  type Mutation {
    _blank: String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

const typeDefs = [
  schemaDefinition,
  centerSchema
]

const resolvers = reduce(mergeDeepRight, {}, [centerResolvers])

export default makeExecutableSchema({ typeDefs, resolvers })