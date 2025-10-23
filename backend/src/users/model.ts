import { dbClient } from "../database/db";

export type User = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role?: 'admin' | 'user';
    password: string;
};

export class UserModel {
    static async findById(id: string) {
        const result = await dbClient.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0] as User | null;
    }

    static async findByEmail(email: string) {
        const result = await dbClient.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] as User | null;
    }

    static async create(user: Omit<User, "id">) {
        const result = await dbClient.query(
            'INSERT INTO users (email, first_name, last_name, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user.email, user.first_name, user.last_name, user.role, user.password]
        );
        return result.rows[0] as User;
    }
}