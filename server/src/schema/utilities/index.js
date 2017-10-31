import { ObjectId } from 'mongodb'
import { Kind } from 'graphql'

export const resolvers = {
  ID: {
    __parseValue (value) {
      return ObjectId(value)
    },
    __serialize (value) {
      return value.toString()
    },
    __parseLiteral (ast) {
      if (ast.kind === Kind.STRING) {
        return ObjectId(ast.value)
      }

      return null
    }
  }
}
