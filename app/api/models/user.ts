import { pool } from "@utils/db";

interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User {
  private static tableName = 'users';

  public static async getAll(): Promise<UserAttributes[]> {
    const result = await pool.query(`SELECT * FROM ${User.tableName}`);
    return result.rows;
  }

  public static async getById(id: number): Promise<UserAttributes | null> {
    const result = await pool.query(
      `SELECT * FROM ${User.tableName} WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  public static async create(user: UserAttributes): Promise<UserAttributes> {
    const { username, email, password } = user;
    const result = await pool.query(
      `INSERT INTO ${User.tableName} (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [username, email, password]
    );
    return result.rows[0];
  }

  public static async getByEmail(email: string): Promise<UserAttributes | null> {
    const result = await pool.query(
      `SELECT * FROM ${User.tableName} WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  }
}

export default User;
