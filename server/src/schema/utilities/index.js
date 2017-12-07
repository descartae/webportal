import { ObjectId } from 'mongodb'
import { Kind } from 'graphql'

export const resolvers = {
  ID: {
    __parseValue (value) {
      if (ObjectID.isValid(value)) {
        return ObjectId(value)
      }
      
      return null
    },
    __serialize (value) {
      return value.toString()
    },
    __parseLiteral (ast) {
      if (ast.kind === Kind.STRING && ObjectId.isValid(ast.value)) {
        return ObjectId(ast.value)
      }

      return null
    }
  }
}
