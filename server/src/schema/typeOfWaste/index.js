import * as mutations from './mutations'
import * as queries from './queries'

export const schema = `
  # Represents some type of waste accepted by centers
  type TypeOfWaste {
    _id: ID!
    # The user-readable type name
    name: String!
    # The icon URL
    icon: String!
  }

  # Required data for type of waste creation
  input NewTypeOfWaste {
    # The user-readable type name
    name: String!
    # The icon URL
    icon: String!
  }

  # Required data for type of waste update
  input TypeOfWasteUpdate {
    # The type of waste identifier
    _id: ID!
    # The data to be updated
    patch: TypeOfWastePatch!
  }

  # Represents what can be updated on a type of waste
  input TypeOfWastePatch {
    # The user-readable type name
    name: String
    # The icon URL
    icon: String
  }
`

export const queryExtension = `
  typesOfWaste: [TypeOfWaste]
`

export const mutationExtension = `
  addTypeOfWaste(data: NewTypeOfWaste!): Boolean!
  updateTypeOfWaste(data: TypeOfWasteUpdate!): Boolean!
  disableTypeOfWaste(_id: ID!): Boolean!
`

export const resolvers = {
  Query: queries,
  Mutation: mutations
}
