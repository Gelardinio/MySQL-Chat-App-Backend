/*export const typeDefs = gql`

  type Message {
    text: String
    author: Author
  }

  type Author {
    name: String
  }

  type MessageList {
    table: String
  }

  type Query {
    messages: [Message]
    authors: [Author]
    user: String
  }

  type Mutation {
    addMessage(text: String, author: String): Message
    getMessage(table: String): MessageList
    register(username: String! email: String!, password: String!): User!
    login(email: String!, password: String!): String!
  }

  type User {
    username: String
    email: String
    password: String
  }
`;*/
