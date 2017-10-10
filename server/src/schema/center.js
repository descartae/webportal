export const schema = `
  type Center {
    id: ID!
    name: String!
    location: Location!
    website: String
    telephone: String
    typeOfWaste: TypeOfWaste!
    openHours: [OpenTime]
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

  extend type Query {
    centers: [Center]
  }

  extend type Mutation {
    addCenter(name: String!): Boolean!
  }
`

export const resolvers = {
  Query: {
    centers(obj, args, context, info) {
      return []
    }
  },
  Mutation: {
    addCenter(obj, args, context, info) {
      return true
    }
  }
}