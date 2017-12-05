import { ObjectId } from 'mongodb'
import { Kind } from 'graphql'

export const schema = `
  scalar Cursor
`

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
  },
  Cursor: {
    __parseValue (value) {
      return Buffer.from(value, 'base64').toString('ascii')
    },
    __serialize (value) {
      return Buffer.from(value).toString('base64')
    },
    __parseLiteral (ast) {
      if (ast.kind === Kind.STRING) {
        return Buffer.from(ast.value, 'base64').toString('ascii')
      }

      return null
    }
  }
}
