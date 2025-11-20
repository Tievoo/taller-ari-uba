import { BaseModel } from "../base/BaseModel";
import { dbClient } from "../database/db";

export type Court = {
    id: string,
    name: string,
    court_type_id: string,
    court_type_name?: string,
    price?: number
};

class CourtModelClass extends BaseModel<Court> {
    constructor() {
        super('courts');
    }

    async findById(id: string) {
        const result = await dbClient.query(
            'SELECT c.*, ct.name as court_type_name, ct.price FROM courts c JOIN court_type ct ON c.court_type_id = ct.id WHERE c.id = $1', 
            [id]
        );
        return result.rows[0] as Court | null;
    }

    async getAll() {
        const result = await dbClient.query(
            'SELECT c.*, ct.name as court_type_name, ct.price FROM courts c JOIN court_type ct ON c.court_type_id = ct.id'
        );
        return result.rows as Court[];
    }

    async getAllByType(type: string) {
        const result = await dbClient.query(
            'SELECT c.*, ct.name as court_type_name, ct.price FROM courts c JOIN court_type ct ON c.court_type_id = ct.id WHERE ct.id = $1', 
            [type]
        );
        return result.rows as Court[];
    }
}

export const CourtModel = new CourtModelClass();