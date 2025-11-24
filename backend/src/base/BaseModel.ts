import { dbClient } from "../database/db";

export class BaseModel<T> {
  constructor(protected tableName: string, protected idColumn: string = "id") {}

  private sanitizeIdentifier(identifier: string): string {
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(identifier)) {
      throw new Error(`Invalid identifier: ${identifier}`);
    }
    return identifier;
  }

  async findById(id: string | number): Promise<T | null> {
    const result = await dbClient.query(
      `SELECT * FROM ${this.tableName} WHERE ${this.idColumn} = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findAll(): Promise<T[]> {
    const result = await dbClient.query(`SELECT * FROM ${this.tableName}`);
    return result.rows;
  }

  async create(data: Partial<T>): Promise<T> {
    const columns = Object.keys(data).map((c) => this.sanitizeIdentifier(c));
    const values = Object.keys(data).map((k) => data[k as keyof T]);
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");

    const result = await dbClient.query(
      `INSERT INTO ${this.tableName} (${columns.join(", ")}) 
             VALUES (${placeholders}) 
             RETURNING *`,
      values
    );
    return result.rows[0];
  }

  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    const columns = Object.keys(data)
      .filter((k) => k !== this.idColumn)
      .map((c) => this.sanitizeIdentifier(c));
    const values = Object.keys(data)
      .filter((k) => k !== this.idColumn)
      .map((k) => data[k as keyof T]);
    const setClause = columns.map((col, i) => `${col} = $${i + 2}`).join(", ");

    const result = await dbClient.query(
      `UPDATE ${this.tableName} 
             SET ${setClause} 
             WHERE ${this.idColumn} = $1 
             RETURNING *`,
      [id, ...values]
    );
    return result.rows[0] || null;
  }

  async delete(id: string | number): Promise<boolean> {
    const result = await dbClient.query(
      `DELETE FROM ${this.tableName} WHERE ${this.idColumn} = $1`,
      [id]
    );
    return result.rowCount! > 0;
  }
}
