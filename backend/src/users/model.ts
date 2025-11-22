import { BaseModel } from "../base/BaseModel";
import { dbClient } from "../database/db";

export type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role?: 'admin' | 'user';
    password: string;
};

class UserModelClass extends BaseModel<User> {
    constructor() {
        super('users');
    }

    async findByEmail(email: string) {
        const result = await dbClient.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] as User | null;
    }
}

export const UserModel = new UserModelClass();