import { Router } from 'express';
import { CourtModel } from './model';

const router = Router();

router.get('/courts', async (req, res, next) => {
    const {type} = req.query;

    if(type) 
        return CourtModel.getAllByType(type);

    return CourtModel.getAll();
});

export default router;
