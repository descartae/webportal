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
  Center: {
    createdBy(obj, args, { dataLoaders: { Users } }, info) {
      return Users.load(obj.createdBy)
    }
  },
  Query: {
    centers(obj, args, { collections: { Centers } }, info) {
      return Centers.find().toArray()
    }
  },
  Mutation: {
    addCenter(obj, args, context, info) {
      return true
    }
  }
}