import { Router } from "express";
import { auth } from "../middleware/auth";
import { BookingModel } from "./model";

const router = Router();

router.get('/', auth({}), async (req, res) => {
    const user = req.user;
    const bookings = await BookingModel.getByUserId(user.id);
    return res.json(bookings);
})

router.post('/', auth({}),  async (req, res, next) => {
    const user = req.user;
    const { court_id, booking_date, start_time } = req.body;
    try {
        const newBooking = await BookingModel.create(user.id, court_id, booking_date, start_time);
        return res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        next(error);
    }
})

export default router;