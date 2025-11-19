import { dbClient } from "../database/db";

export type Court = {
    id: string,
    name: string,
    court_type_id: string,
    court_type_name?: string,
    price?: number
};

export class CourtModel {
    static async findById(id: string) {
        const result = await dbClient.query('SELECT c.*, ct.name as court_type_name, ct.price FROM courts c JOIN court_type ct ON c.court_type_id = ct.id WHERE c.id = $1', [id]);
        return result.rows[0] as Court | null;
    }

    static async getAll() {
        const result = await dbClient.query('SELECT c.*, ct.name as court_type_name, ct.price FROM courts c JOIN court_type ct ON c.court_type_id = ct.id');
        return result.rows as Court[];
    }

    static async getAllByType(type: string) {
        const result = await dbClient.query('SELECT c.*, ct.name as court_type_name, ct.price FROM courts c JOIN court_type ct ON c.court_type_id = ct.id WHERE ct.id = $1', [type]);
        return result.rows as Court[];
    }

}