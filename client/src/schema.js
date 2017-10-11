/*
export const typeDefs = `

type Library {
    id: ID!
    email: String!
    password: String!
    name: String!
    state: State!
}

enum State {
    EXAMPLE
}

type Query {
    libraries: [Library]
}
*/

import {
  makeExecutableSchema,
  addMockFunctionsToSchema, // we'll use this later
} from 'graphql-tools';

const typeDefs = `
type Center {
   id: ID!                // "!" denotes a required field
   name: String
}

// This type specifies the entry points into our API. In this case
// there is only one - "centers" - which returns a list of centers.

type Query {
   centers: [Center]   //  "[]" means this is a list of centers
}
`;
const schema = makeExecutableSchema({ typeDefs });
export { schema };`
