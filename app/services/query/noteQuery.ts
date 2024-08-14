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
          updatedAt
        }
      }
      message
      error
    }
  }
`;
