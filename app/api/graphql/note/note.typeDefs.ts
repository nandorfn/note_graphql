import gql from "graphql-tag";

const noteTypeDefs = gql`
  type Note {
    id: String!
    title: String!
    body: String!
    createdAt: String
    updatedAt: String
  }

  input NoteEditor {
    title: String!
    body: String
  }

  type NotePayload {
    note: Note
    notes: [Note]
  }

  type ApiNoteResponse {
    success: Boolean!
    data: NotePayload
    message: String
    error: String
  }

  type Query {
    notes: ApiNoteResponse
    note(id: String!): ApiNoteResponse
  }

  type Mutation {
    create(input: NoteEditor!): ApiNoteResponse
    update(input: NoteEditor!): ApiNoteResponse
  }
`

export default noteTypeDefs;
