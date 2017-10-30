import { reduce, mergeDeepRight } from 'ramda'
import { makeExecutableSchema } from 'graphql-tools'

import * as center from './center'
import * as user from './user'
import * as typeOfWaste from './typeOfWaste'

const definitions = [
  user,
  center,
  typeOfWaste
]

/*
  TODO: Better solution to circunvent empty type errors
  https://github.com/apollographql/graphql-tools/issues/293
*/
const createTypeDefs = (definitions) => {
  const queryExtensions = 
    definitions
      .map(it => it.queryExtension)
      .join('')
  
  const mutationExtensions =
    definitions
      .map(it => it.mutationExtension)
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

  return definitions.map(it => it.schema).concat(baseTypes)
}

const createResolvers = 
  (definitions) => reduce(mergeDeepRight, {}, definitions.map(it => it.resolvers))

const typeDefs = createTypeDefs(definitions)
const resolvers = createResolvers(definitions)
  

export default makeExecutableSchema({ typeDefs, resolvers })
