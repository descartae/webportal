import * as fields from './fields'
import * as mutations from './mutations'
import * as queries from './queries'

export const schema = `
  # Represents a registered recycling facility
  type Facility {
    _id: ID!

    # The name of the facility
    name: String!

    # The location data for a given facility
    location: Location!

    # The responsible's website, if available
    website: String

    # The responsible's contact phone number, if available
    telephone: String

    # The types of waste the recycling facility handles
    typesOfWaste: [TypeOfWaste]!

    # The facility's operating hours
    openHours: [OpenTime]!
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

  # Data for the creation of a facility
  input AddFacilityInput {
    # The name of the facility
    name: String!

    # The location data of the new facility
    location: LocationInput!

    # The responsible's website, if available
    website: String

    # The responsible's contact phone number, if available
    telephone: String

    # IDs of the types of waste the recycling facility handles
    typesOfWaste: [ID]

    # The facility's operating hours
    openHours: [OpenTimeInput]
  }

  # A location for the related facility
  input LocationInput {
    # The readable, complete address
    address: String!

    # The adress' municipality
    municipality: String

    # The adress' state
    state: String

    # The zip code or equivalent
    zip: String

    # Exact coordinates to the location
    coordinates: CoordinatesInput
  }

  # A latitude + longitude pair
  input CoordinatesInput {
    latitude: Float!
    longitude: Float!
  }

  # Represents a timespan in a day of the week
  input OpenTimeInput {
    dayOfWeek: DayOfWeek!

    # The hour representing the start of the timespan
    startTime: Int!

    # The hour representing the end of the timespan
    endTime: Int!
  }

  # The add facility operation result
  type AddFacilityPayload {
    # Indicates whether the operation was successful
    success: Boolean!

    # The created entry, if any
    facility: Facility
  }

  # Required data for updating a facility
  input UpdateFacilityInput {
    # The facility identifier
    _id: ID!

    # The data to be updated
    patch: FacilityPatch!
  }

  # Represents what can be updated on a facility
  input FacilityPatch {
    # The name of the facility
    name: String

    # The location data of the facility
    location: LocationInput

    # The responsible's website
    website: String

    # The responsible's contact phone number
    telephone: String

    # IDs of the types of waste the recycling facility handles
    # Changes to this field replace the entire list
    typesOfWaste: [ID]

    # The facility's operating hours
    # Changes to this field replace the entire list
    openHours: [OpenTimeInput]
  }

  # The result of a facility update operation
  type UpdateFacilityPayload {
    # Indicates whether the operation was successful
    success: Boolean!
    
    # The updated entry, if applicable
    facility: Facility
  }

  # The required data to disable a facility
  input DisableFacilityInput {
    _id: ID!
  }

  # The disable operation result
  type DisableFacilityPayload {
    # Indicates whether the operation was successful
    success: Boolean!
  }

  # Represents the possible filters on facilities
  input FacilityFilters {
    # The pagination data
    cursor: FilterCursors!

    # Requirements related to location
    location: LocationFilter

    # The types of wast the facility has to support
    hasTypesOfWaste: [ID]
  }

  # Filters on location data
  input LocationFilter {
    # Indicates roughly where the subject must be located
    near: CoordinatesInput
  }

  # Represents relevant pagination data
  input FilterCursors {
    # Indicates that the results must be after a given cursor
    # Has priority over the 'before' field
    after: Cursor

    # Indicates that the results must be before a given cursor
    # The field 'after' has priority over this
    before: Cursor

    # The total quantity of items that should be retrieved
    # Must be a value between 1 and 100
    quantity: Int!
  }

  # Represents the result of the facilities query
  type FacilitiesPage {
    # Cursor information for the next possible requests
    cursors: PageCursors

    # The items found according to the query
    items: [Facility]
  }

  # A pair of cursors allowing navigation from this page
  type PageCursors {
    # The cursor used to get items from before this page
    after: Cursor

    # The cursor used to get items from after this page
    before: Cursor
  }
`
export const queryExtension = `
  # The list of available facilities
  facilities(filters: FacilityFilters!): FacilitiesPage

  # The facility with the given ID
  facility(_id: ID!): Facility
`

export const mutationExtension = `
  # Creates a new facility
  addFacility(input: AddFacilityInput!): AddFacilityPayload!

  # Updates information related to an existing facility
  updateFacility(input: UpdateFacilityInput!): UpdateFacilityPayload!

  # Disables a facility, removing it from search results
  disableFacility(input: DisableFacilityInput!): DisableFacilityPayload!
`

export const resolvers = {
  Facility: fields,
  Query: queries,
  Mutation: mutations
}
