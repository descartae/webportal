import * as fields from './fields'
import * as mutations from './mutations'
import * as queries from './queries'

export const schema = `
type Center {
  _id: ID!
  name: String!
  location: Location!
  website: String
  telephone: String
  typeOfWaste: TypeOfWaste!
  openHours: [OpenTime]

  createdBy: User
}

type Location {
  address: String
  municipality: String
  state: String
  zip: String
}

type TypeOfWaste {
  aluminium: Boolean
  compost: Boolean
  cookingOil: Boolean
  ewaste: Boolean
  furniture: Boolean
  glass: Boolean
  greenWaste: Boolean
  hazardousWaste: Boolean
  paper: Boolean
  plastic: Boolean
}

type OpenTime {
  dayOfWeek: DayOfWeek!
  startTime: Int!
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
`

export const queryExtension = `
  centers: [Center]
  center(_id: String!): Center
`

export const mutationExtension = `
  addCenter(name: String!): Boolean!
`

export const resolvers = {
  Center: fields,
  Query: queries,
  Mutation: mutations
}
