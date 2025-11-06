import { Router } from 'express';
import { CourtModel } from './model';

const router = Router();

router.get('/', async (req, res) => {
    const { type } = req.query;

    if (type && typeof type === 'string') return res.json(await CourtModel.getAllByType(type));

    return res.json(await CourtModel.getAll());
});

export default router;
