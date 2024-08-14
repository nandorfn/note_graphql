import gql from "graphql-tag";

export const NOTE_QUERY = gql`
  query Notes {
    notes {
      success
      data {
        notes {
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
`;

export const GET_NOTE_BY_ID = gql`
  query GetNoteById($id: String!) {
    note(id: $id) {
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
`;