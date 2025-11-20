import { Router } from 'express';
import { createCrudRouter } from '../base/crudRouter';
import { CourtModel } from '../courts/model';
import { CourtTypeModel } from '../court_type/model';
import { BookingModel } from '../bookings/model';
import { UserModel } from '../users/model';

const router = Router();

router.use('/users', createCrudRouter(UserModel, { requireAdmin: true }));
router.use('/courts', createCrudRouter(CourtModel, { requireAdmin: true }));
router.use('/bookings', createCrudRouter(BookingModel, { requireAdmin: true }));
router.use('/court-types', createCrudRouter(CourtTypeModel, { requireAdmin: true }));

export default router;
