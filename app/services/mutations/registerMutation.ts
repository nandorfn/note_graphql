import gql from "graphql-tag";

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(input: { username: $username, email: $email, password: $password }) {
      ... on ApiUserResponse {
        success
        data {
          user {
            id
            username
            email
          }
          }
        message
        error
      }
    }
  }
`;