import { reduce, mergeDeepRight } from 'ramda'
import { makeExecutableSchema } from 'graphql-tools'

import * as facility from './facility'
import * as user from './user'
import * as typeOfWaste from './typeOfWaste'

import * as utilities from './utilities'

const definitions = [
  user,
  facility,
  typeOfWaste,
  utilities
]

/*
  TODO: Better solution to circunvent empty type errors
  https://github.com/apollographql/graphql-tools/issues/293
*/
const createTypeDefs = (definitions) => {
  const queryExtensions =
    definitions
      .map(it => it.queryExtension)
      .filter(it => it != null)
      .join('')

  const mutationExtensions =
    definitions
      .map(it => it.mutationExtension)
      .filter(it => it != null)
      .join('')

  const baseTypes = `
    type Query {
      ${queryExtensions}
    }

    type Mutation {
      ${mutationExtensions}
    }

    schema {
      query: Query
      mutation: Mutation
    }
  `

  return definitions.map(it => it.schema).filter(it => it != null).concat(baseTypes)
}

const createResolvers = (definitions) => {
  const resolvers =
    definitions.map(it => it.resolvers).filter(it => it != null)

  return reduce(mergeDeepRight, {}, resolvers)
}

const typeDefs = createTypeDefs(definitions)
const resolvers = createResolvers(definitions)

export default makeExecutableSchema({ typeDefs, resolvers })
