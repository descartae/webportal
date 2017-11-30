import * as fields from './fields'
import * as mutations from './mutations'
import * as queries from './queries'

export const schema = `
  # Represents an user's feedback
  type Feedback {
    _id: ID!

    # The related facility, if any
    facility: Facility

    # Indicates if the feedback was answered and/or resolved
    resolved: Boolean!

    # The feedback's content
    contents: String!
  }

  # Required data to create a new feedback entry
  input AddFeedbackInput {
    # The related facility, if any
    facility: ID

    # The feedback's content
    contents: String!
  }

  type AddFeedbackPayload {
    # Indicates whether the operation was successful
    success: Boolean!

    # The created entry, if any
    feedback: Feedback
  }

  # The required data to mark a feedback as resolved
  input ResolveFeedbackInput {
    _id: ID!
  }

  # The resolve operation result
  type ResolveFeedbackPayload {
    # Indicates whether the operation was successful
    success: Boolean!

    # The resolved entry, if any
    feedback: Feedback
  }
`

export const queryExtension = `
  # Every feedback received
  feedbacks: [Feedback]

  # The feedback with the given ID
  feedback(_id: ID!): Feedback
`

export const mutationExtension = `
  # Creates a new feedback entry
  addFeedback(input: AddFeedbackInput): AddFeedbackPayload!

  # Marks a given feedback as resolved
  resolveFeedback(input: ResolveFeedbackInput): ResolveFeedbackPayload!
`

export const resolvers = {
  Feedback: fields,
  Query: queries,
  Mutation: mutations
}
