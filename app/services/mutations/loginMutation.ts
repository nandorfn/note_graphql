import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: {
      email: $email,
      password: $password
    }) {
    ... on ApiResponse {
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