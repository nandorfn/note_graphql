import BaseModel from "./baseModel";

interface NoteAttributes {
  id?: string;
  title: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Note extends BaseModel<NoteAttributes> {
  protected tableName = 'notes';
}

export default Note;
