import { Router } from 'express';
import { CourtModel } from './model';
import { ErrorType } from '../middleware/error-handler';

const router = Router();

router.get('/', async (req, res) => {
    const { type } = req.query;

    if (type && typeof type === 'string') return res.json(await CourtModel.getAllByType(type));

    return res.json(await CourtModel.getAll());
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const court = await CourtModel.findById(id);
        
        if (!court) {
            return next(new Error(ErrorType.NotFound));
        }
        
        res.json(court);
    } catch (error) {
        next(error);
    }
});

export default router;
