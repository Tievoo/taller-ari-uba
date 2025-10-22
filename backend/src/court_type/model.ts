import { dbClient } from "../database/db";

export type CourtType = {
    id: string;
    name: string;
    price: number;
};

export class CourtTypeModel {
    static async findById(id: string) {
        const result = await dbClient.query('SELECT * FROM court_type WHERE id = $1', [id]);
        return result.rows[0] as CourtType | null;
    }

    static async getAll() {
        const result = await dbClient.query('SELECT * FROM court_type');
        return result.rows as CourtType[];
    }

}