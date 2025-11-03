import { dbClient } from "../database/db";

export type Booking = {
    id: number,
    user_id: number,
    court_id: string,
    booking_date: string,
    start_time: string,
    end_time: string,
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

    static async create(user_id: number, court_id: string, booking_date: string, start_time: string, end_time: string) {
        const result = await dbClient.query(
            `INSERT INTO bookings (user_id, court_id, booking_date, start_time, end_time) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user_id, court_id, booking_date, start_time, end_time])
        return result.rows[0] as Booking;
    }
}