import { Router } from 'express';
import { createCrudRouter } from '../base/crudRouter';
import { CourtModel } from '../courts/model';
import { CourtTypeModel } from '../court_type/model';
import { BookingModel } from '../bookings/model';
import { UserModel } from '../users/model';

const router = Router();

router.use('/courts', createCrudRouter(CourtModel, { 
    requireAuth: true, 
    requireAdmin: true 
}));

router.use('/court-types', createCrudRouter(CourtTypeModel, { 
    requireAuth: true, 
    requireAdmin: true 
}));

router.use('/bookings', createCrudRouter(BookingModel, { 
    requireAuth: true, 
    requireAdmin: true 
}));

router.use('/users', createCrudRouter(UserModel, { 
    requireAuth: true, 
    requireAdmin: true 
}));

export default router;
