import { pool } from "@utils/db";

interface IBaseModel<T> {
  getAll(): Promise<T[]>;
  getById(id: number | string): Promise<T | null>;
  create(attributes: T): Promise<T>;
}

abstract class BaseModel<T extends { [key: string]: any }> implements IBaseModel<T> {
  protected abstract tableName: string;

  public async getAll(): Promise<T[]> {
    const result = await pool.query(`SELECT * FROM ${this.tableName}`);
    return result.rows;
  }

  public async getById(id: number | string): Promise<T | null> {
    const result = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  public async create(attributes: T): Promise<T> {
    const keys = Object.keys(attributes);
    const values = Object.values(attributes);
    const columns = keys.join(', ');
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
    const result = await pool.query(query, values);

    return result.rows[0];
  }
}


export default BaseModel;