import * as mutations from './mutations'
import * as queries from './queries'

export const schema = `
  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type AuthenticationResult {
    success: Boolean!
    # error: AuthenticationFailureReason
    sessionToken: String
  }

  # TODO: Define what kind of problems to communicate
  # enum AuthenticationFailureReason {
  #   INVALID_CREDENTIALS
  # }

  input AuthenticationData {
    email: String!
    password: String!
  }
`

export const queryExtension = `
  whoami: String
`

export const mutationExtension = `
  authenticate(credentials: AuthenticationData!): AuthenticationResult
`

export const resolvers = {
  Query: queries,
  Mutation: mutations
}
