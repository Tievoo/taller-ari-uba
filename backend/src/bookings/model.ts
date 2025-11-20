import { BaseModel } from "../base/BaseModel";
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

class BookingModelClass extends BaseModel<Booking> {
    constructor() {
        super('bookings');
    }

    async getByUserId(user_id: string) {
        const result = await dbClient.query('SELECT * FROM bookings WHERE user_id = $1', [user_id]);
        return result.rows as Booking[];
    }

    async create(data: Partial<Booking> & { user_id: string, court_id: string, booking_date: string, start_time: string }) {
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
}

export const BookingModel = new BookingModelClass();