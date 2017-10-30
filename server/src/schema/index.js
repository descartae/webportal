import { reduce, mergeDeepRight } from 'ramda'
import { makeExecutableSchema } from 'graphql-tools'

import {
  schema as centerSchema,
  resolvers as centerResolvers,
  queryExtension as centerQueryExtension,
  mutationExtension as centerMutationExtension
} from './center'

import {
  schema as userSchema,
  resolvers as userResolvers,
  queryExtension as userQueryExtension,
  mutationExtension as userMutationExtension
} from './user'

/*
  TODO: Better solution to circunvent empty type errors
  https://github.com/apollographql/graphql-tools/issues/293
*/
const schemaDefinition = `
  type Query {
    ${centerQueryExtension}
    ${userQueryExtension}
  }

  type Mutation {
    ${centerMutationExtension}
    ${userMutationExtension}
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
