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

`
