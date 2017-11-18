import * as fields from './fields'
import * as mutations from './mutations'
import * as queries from './queries'

export const schema = `
  # Represents a registered recycling center
  type Center {
    _id: ID!

    # The name of the center
    name: String!

    # The location data for a given center
    location: Location!

    # The responsible's website, if available
    website: String

    # The responsible's contact phone number, if available
    telephone: String

    # The types of waste the recycling center handles
    typesOfWaste: [TypeOfWaste]

    # The center's operating hours
    openHours: [OpenTime]
  }

  # Location data for a point of interest
  type Location {
    # The readable address
    address: String!

    # The adress' municipality
    municipality: String

    # The adress' state
    state: String

    # The zip code or equivalent
    zip: String

    # Exact coordinates to the location
    coordinates: Coordinates
  }

  # A latitude + longitude pair
  type Coordinates {
    latitude: Float!
    longitude: Float!
  }

  # Represents a timespan in a day of the week
  type OpenTime {
    dayOfWeek: DayOfWeek!

    # The hour representing the start of the timespan
    startTime: Int!

    # The hour representing the end of the timespan
    endTime: Int!
  }

  enum DayOfWeek {
    SUNDAY
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
  }

  # Data for the creation of a center
  input AddCenterInput {
    # The name of the center
    name: String!

    # The location data of the new center
    location: LocationInput!

    # The responsible's website, if available
    website: String

    # The responsible's contact phone number, if available
    telephone: String

    # IDs of the types of waste the recycling center handles
    typesOfWaste: [ID]

    # The center's operating hours
    openHours: [OpenTimeInput]
  }

  # A location for the related center
  input LocationInput {
    # The readable, complete address
    address: String!

    # The adress' municipality
    municipality: String

    # The adress' state
    state: String

    # The zip code or equivalent
    zip: String
  }

  # Represents a timespan in a day of the week
  input OpenTimeInput {
    dayOfWeek: DayOfWeek!

    # The hour representing the start of the timespan
    startTime: Int!

    # The hour representing the end of the timespan
    endTime: Int!
  }

  # The add center operation result
  type AddCenterPayload {
    # Indicates whether the operation was successful
    success: Boolean!

    # The created entry, if any
    center: Center
  }

  # Required data for updating a center
  input UpdateCenterInput {
    # The center identifier
    _id: ID!

    # The data to be updated
    patch: CenterPatch!
  }

  # Represents what can be updated on a center
  input CenterPatch {
    # The name of the center
    name: String

    # The location data of the center
    location: LocationInput

    # The responsible's website
    website: String

    # The responsible's contact phone number
    telephone: String

    # IDs of the types of waste the recycling center handles
    # Changes to this field replace the entire list
    typesOfWaste: [ID]

    # The center's operating hours
    # Changes to this field replace the entire list
    openHours: [OpenTimeInput]
  }

  # The result of a center update operation
  type UpdateCenterPayload {
    # Indicates whether the operation was successful
    success: Boolean!
    
    # The updated entry, if applicable
    center: Center
  }

  # The required data to disable a center
  input DisableCenterInput {
    _id: ID!
  }

  # The disable operation result
  type DisableCenterPayload {
    # Indicates whether the operation was successful
    success: Boolean!
  }
`
export const queryExtension = `
  # The list of available centers
  centers: [Center]

  # The center with the given ID
  center(_id: ID!): Center
`

export const mutationExtension = `
  # Creates a new center
  addCenter(input: AddCenterInput!): AddCenterPayload!

  # Updates information related to an existing center
  updateCenter(input: UpdateCenterInput!): UpdateCenterPayload!

  # Disables a center, removing it from search results
  disableCenter(input: DisableCenterInput!): DisableCenterPayload!
`

export const resolvers = {
  Center: fields,
  Query: queries,
  Mutation: mutations
}
