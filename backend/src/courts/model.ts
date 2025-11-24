import { BaseModel } from "../base/BaseModel";
import { dbClient } from "../database/db";

export type Court = {
    id: string,
    name: string,
    court_type_id: string
};

export type FullCourt = Court & {
    court_type_name: string,
    price: number
};

class CourtModelClass extends BaseModel<Court> {
    constructor() {
        super('courts');
    }

    async findFullById(id: string) {
        const result = await dbClient.query(
            'SELECT c.*, ct.name as court_type_name, ct.price FROM courts c JOIN court_type ct ON c.court_type_id = ct.id WHERE c.id = $1', 
            [id]
        );
        return result.rows[0] as FullCourt | null;
    }

    async findAllFull() {
        const result = await dbClient.query(
            'SELECT c.*, ct.name as court_type_name, ct.price FROM courts c JOIN court_type ct ON c.court_type_id = ct.id'
        );
        return result.rows as FullCourt[];
    }
}

export const CourtModel = new CourtModelClass();