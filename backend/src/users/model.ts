import { dbClient } from "../database/db";

export type User = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: 'admin' | 'user';
    password: string;
};

export class UserModel {
    static async findById(id: string) {
        const result = await dbClient.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0] as User | null;
    }
}