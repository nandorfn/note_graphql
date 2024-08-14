import { pool } from "@utils/db";

interface IBaseModel<T> {
  getAll(): Promise<T[]>;
  getById(id: number | string): Promise<T | null>;
  create(attributes: T): Promise<T>;
  update(id: number | string, attributes: Partial<T>): Promise<T | null>;
  deleteById(id: number | string): Promise<T | null>;
}

abstract class BaseModel<T extends { [key: string]: any }> implements IBaseModel<T> {
  protected abstract tableName: string;

  public async getAll(): Promise<T[]> {
    try {
      const result = await pool.query(`SELECT * FROM ${this.tableName}`);
      return result.rows;
    } catch (error) {
      throw new Error('Failed to fetch all records');
    }
  }

  public async getById(id: number | string): Promise<T | null> {
    try {
      const result = await pool.query(
        `SELECT * FROM ${this.tableName} WHERE id = $1`,
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Failed to fetch record by ID');
    }
  }

  public async create(attributes: T): Promise<T> {
    try {
      const keys = Object.keys(attributes);
      const values = Object.values(attributes);
      const columns = keys.join(', ');
      const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');

      const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
      const result = await pool.query(query, values);

      return result.rows[0];
    } catch (error) {
      throw new Error('Failed to create record');
    }
  }

  public async deleteById(id: number | string): Promise<T | null> {
    try {
      const result = await pool.query(
        `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`, [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Failed to delete record by ID');
    }
  }

  public async update(id: number | string, attributes: Partial<T>): Promise<T | null> {
    try {
      const keys = Object.keys(attributes) as (keyof T)[];
      const values = Object.values(attributes);

      if (keys.length === 0) {
        throw new Error("No attributes provided to update");
      }

      const setClause = keys
        .map((key, index) => `"${String(key)}" = $${index + 1}`)
        .join(', ');

      const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;

      const result = await pool.query(query, [...values, id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Failed to update record');
    }
  }
}

export default BaseModel;
