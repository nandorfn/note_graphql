import { pool } from "@utils/db";
import BaseModel from "./baseModel";

interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends BaseModel<UserAttributes> {
  protected tableName = 'users';

  public async getByEmail(email: string): Promise<UserAttributes | null> {
    const result = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  }
}

export default User;
