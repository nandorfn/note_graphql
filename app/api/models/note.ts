import { pool } from "@utils/db";
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

  public async getAllByUser(userId: number): Promise<NoteAttributes[]> {
    try {
      const result = await pool.query(`SELECT id, title, body, "createdAt" FROM ${this.tableName} WHERE user_id = ${userId}`);
      return result.rows;
    } catch (error) {
      throw new Error("Failed to get all notes");
    }
  }
}

export default Note;
