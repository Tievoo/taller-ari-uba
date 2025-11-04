import { Router } from 'express';
import { CourtModel } from './model';

const router = Router();

router.get('/', async (req, res) => {
    const courts = await CourtModel.getAll();
    res.status(200).json(courts);
});

export default router;