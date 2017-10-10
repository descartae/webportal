import jwt from 'jsonwebtoken'

export const schema = `
  extend type Query {
    whoami: String
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

  extend type Mutation {
    authenticate(credentials: AuthenticationData!): AuthenticationResult
  }
`

export const resolvers = {
  Query: {
    whoami(obj, args, context, info) {
      const { id, email } = context.user || {}

      return id ? `${id}: ${email}` : `anonymous`
    }
  },
  Mutation: {
    authenticate(obj, args, context, info) {
      const id = "identification"
      const { email, password } = args.credentials

      const payload = { id, email }

      const { JWT_SECRET } = process.env

      return {
        success: true,
        sessionToken: jwt.sign(payload, new Buffer(JWT_SECRET, 'base64'))
      }
    }
  }
}