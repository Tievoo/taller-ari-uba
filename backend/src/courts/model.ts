import { dbClient } from "../database/db";

export type Court = {
    id: string,
    name: string,
    court_type_id: string,
};

export class CourtModel {
    static async findById(id: string) {
        const result = await dbClient.query('SELECT * FROM courts WHERE id = $1', [id]);
        return result.rows[0] as Court | null;
    }

    static async getAll() {
        const result = await dbClient.query('SELECT * FROM courts');
        return result.rows as Court[];
    }

}