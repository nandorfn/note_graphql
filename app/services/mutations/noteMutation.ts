import gql from "graphql-tag";

export const NOTE_CREATE_MUTATION = gql`
  mutation CreateNote($title: String!, $body: String!) {
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
`;

export const NOTE_UPDATE_MUTATION = gql`
  mutation UpdateNote($id: String!, $title: String!, $body: String) {
    update(id: $id, input: { title: $title, body: $body }) {
      ... on ApiNoteResponse {
        success
        data {
          note {
            id
            title
            body
            createdAt
            updatedAt
          }
        }
        message
        error
      }
    }
  }
`;

export const NOTE_DELETE_MUTATION = gql`
  mutation DeleteNote($id: String!) {
    delete(id: $id) {
      ... on ApiNoteResponse {
        success
        data {
          note {
            id
            title
            body
            createdAt
            updatedAt
          }
        }
        message
        error
      }
    }
  }
`;
