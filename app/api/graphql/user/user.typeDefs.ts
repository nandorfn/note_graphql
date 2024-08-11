import { gql } from 'graphql-tag';

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User!
  }

  type ApiResponse {
    success: Boolean!
    data: AuthPayload
    message: String
    error: String
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
    
  type Mutation {
    register(input: RegisterInput!): ApiResponse
    login(input: LoginInput!): ApiResponse
  }
`;

export default userTypeDefs;
