import { dbClient } from "../database/db";

export type Booking = {
    id: number,
    user_id: number,
    court_id: string,
    booking_date: string,
    start_time: string,
    created_at: Date
};

export class BookingModel {
    static async findById(id: number) {
        const result = await dbClient.query('SELECT * FROM bookings WHERE id = $1', [id]);
        return result.rows[0] as Booking | null;
    }

    static async getAll() {
        const result = await dbClient.query('SELECT * FROM bookings');
        return result.rows as Booking[];
    }

    static async getByUserId(user_id: string) {
        const result = await dbClient.query('SELECT * FROM bookings WHERE user_id = $1', [user_id]);
        return result.rows as Booking[];
    }

    static async create(user_id: string, court_id: string, booking_date: string, start_time: string) {
        const end_time = `${(parseInt(start_time.split(':')[0]!) + 1).toString().padStart(2, '0')}:${start_time.split(':')[1]}`;
        const result = await dbClient.query(
            `INSERT INTO bookings (user_id, court_id, booking_date, start_time, end_time) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user_id, court_id, booking_date, start_time, end_time])
        return result.rows[0] as Booking;
    }
}