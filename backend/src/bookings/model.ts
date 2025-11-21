import { BaseModel } from "../base/BaseModel";
import { dbClient } from "../database/db";

export type Booking = {
    id: number,
    user_id: number,
    court_id: string,
    booking_date: string,
    start_time: string,
    end_time: string,
    created_at: Date,
    court_name?: string
};

class BookingModelClass extends BaseModel<Booking> {
    constructor() {
        super('bookings');
    }

    async getByUserId(user_id: number) {
        const result = await dbClient.query(
            `SELECT b.*, c.name as court_name 
             FROM bookings b 
             JOIN courts c ON b.court_id = c.id 
             WHERE b.user_id = $1 
             ORDER BY b.booking_date DESC, b.start_time DESC`, 
            [user_id]
        );
        return result.rows as Booking[];
    }

    async create(data: Omit<Booking, 'id' | 'end_time' | 'created_at'>): Promise<Booking> {
        const end_time = `${(parseInt(data.start_time.split(':')[0]!) + 1).toString().padStart(2, '0')}:${data.start_time.split(':')[1]}`;
        const result = await dbClient.query(
            `INSERT INTO bookings (user_id, court_id, booking_date, start_time, end_time) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
            [data.user_id, data.court_id, data.booking_date, data.start_time, end_time]
        );
        return result.rows[0] as Booking;
    }

    async getByCourtAndDate(court_id: string, booking_date: string) {
        const result = await dbClient.query(
            'SELECT * FROM bookings WHERE court_id = $1 AND booking_date = $2',
            [court_id, booking_date]
        );
        return result.rows as Booking[];
    }

    async deleteBooking(id: number, user_id: number) {
        const result = await dbClient.query(
            'DELETE FROM bookings WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, user_id]
        );
        if (result.rowCount === 0) {
            throw new Error('Booking not found or unauthorized');
        }
        return result.rows[0] as Booking;
    }
}

export const BookingModel = new BookingModelClass();