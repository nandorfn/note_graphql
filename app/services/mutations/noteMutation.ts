import gql from "graphql-tag";

export const NOTE_MUTATION = gql`
  mutation Note($title: String!, $body: String!) {
    create(input: { title: $title, body: $body }) {
      ... on ApiNoteResponse {
        success
        data {
          note {
            id
            title
            body
            createdAt
          }
        }
        message
        error
      }
    }
  }
`