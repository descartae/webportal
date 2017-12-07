import * as mutations from './mutations'
import * as queries from './queries'

export const schema = `
  # Represents some type of waste accepted by facilities
  type TypeOfWaste {
    _id: ID!

    # The user-readable type name
    name: String!

    # The user-readable type description
    description: String!

    # The icons for this type
    icons: IconSet!
  }

  type IconSet {
    iosSmallURL: String!
    iosMediumURL: String!
    iosLargeURL: String!

    androidSmallURL: String!
    androidMediumURL: String!
    androidLargeURL: String!
  }

  # Required data for type of waste creation
  input AddTypeOfWasteInput {
    # The user-readable type name
    name: String!

    # The user-readable type description
    description: String!

    # The icons for this type
    icons: IconSetInput!
  }

  input IconSetInput {
    iosSmallURL: String!
    iosMediumURL: String!
    iosLargeURL: String!

    androidSmallURL: String!
    androidMediumURL: String!
    androidLargeURL: String!
  }

  # The add operation result
  type AddTypeOfWastePayload {
    # Indicates whether the operation was successful
    success: Boolean!

    # The created entry, if any
    typeOfWaste: TypeOfWaste
  }

  # Required data for type of waste update
  input UpdateTypeOfWasteInput {
    # The type of waste identifier
    _id: ID!

    # The data to be updated
    patch: TypeOfWastePatch!
  }

  # The update operation result
  type UpdateTypeOfWastePayload {
    # Indicates whether the operation was successful
    success: Boolean!

    # The updated entry, if applicable
    typeOfWaste: TypeOfWaste
  }

  # Represents what can be updated on a type of waste
  input TypeOfWastePatch {
    # The user-readable type name
    name: String

    # The user-readable type description
    description: String

    # The icons for this type
    icons: IconSetPatch!
  }

  # Represents what can be updated on a set of icons
  input IconSetPatch {
    iosSmallURL: String
    iosMediumURL: String
    iosLargeURL: String

    androidSmallURL: String
    androidMediumURL: String
    androidLargeURL: String
  }

  # The required data to disable a type of waste
  input DisableTypeOfWasteInput {
    _id: ID!
  }

  # The disable operation result
  type DisableTypeOfWastePayload {
    # Indicates whether the operation was successful
    success: Boolean!
  }
`

export const queryExtension = `
  # All the types of waste that a facility can receive
  typesOfWaste: [TypeOfWaste]
`

export const mutationExtension = `
  # Creates a new type of waste for facilities
  addTypeOfWaste(input: AddTypeOfWasteInput!): AddTypeOfWastePayload!

  # Updates data related to a given type of waste
  updateTypeOfWaste(input: UpdateTypeOfWasteInput!): UpdateTypeOfWastePayload!

  # Disables a type of waste, making it impossible to add it to new facilities
  disableTypeOfWaste(input: DisableTypeOfWasteInput!): DisableTypeOfWastePayload!
`

export const resolvers = {
  Query: queries,
  Mutation: mutations
}
