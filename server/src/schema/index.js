import { reduce, mergeDeepRight } from 'ramda'
import { makeExecutableSchema } from 'graphql-tools'

import { 
  schema as centerSchema, 
  resolvers as centerResolvers 
} from './center'

import { 
  schema as userSchema, 
  resolvers as userResolvers 
} from './user'

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
  centerSchema,
  userSchema
]

const resolvers = 
  reduce(mergeDeepRight, {}, [
    centerResolvers,
    userResolvers
  ])

export default makeExecutableSchema({ typeDefs, resolvers })