import { Router } from 'express';
import { CourtModel } from './model';
import { BookingModel } from '../bookings/model';
import { createCrudRouter } from '../base/crudRouter';
import { ErrorType } from '../middleware/error-handler';

const router = Router();

router.use(createCrudRouter(CourtModel, { only: ['findById'] }));

router.get('/', async (req, res, next) => {
    try {
        const courts = await CourtModel.findAllFull();
        res.json(courts);
    } catch (error) {
        next(error);
    }
})

router.get('/:id/availability', async (req, res, next) => {
    const { id } = req.params;
    const { date } = req.query;
    
    try {
        if (!date || typeof date !== 'string') {
            return res.status(400).json({ error: 'Date query parameter is required (format: YYYY-MM-DD)' });
        }

        const court = await CourtModel.findFullById(id);
        if (!court) {
            return next(new Error(ErrorType.NotFound));
        }

        const bookings = await BookingModel.getByCourtAndDate(id, date);
        const slots = [];
        for (let hour = 8; hour <= 23; hour++) {
            const startTime = `${hour.toString().padStart(2, '0')}:00`;
            const endTime = hour === 23 ? '00:00' : `${(hour + 1).toString().padStart(2, '0')}:00`;
            
            const isBooked = bookings.some(booking => {
                const bookingTime = booking.start_time.substring(0, 5);
                return bookingTime === startTime;
            });
            if (isBooked) continue;
            slots.push({
                id: hour,
                start_time: startTime,
                end_time: endTime,
                available: !isBooked
            });
        }
        
        res.json(slots);
    } catch (error) {
        next(error);
    }
});

export default router;
