import { Router, type RequestHandler } from 'express';
import { BaseModel } from './BaseModel';
import { ErrorType } from '../middleware/error-handler';
import { auth } from '../middleware/auth';

interface CrudOptions {
    requireAuth?: boolean;
    requireAdmin?: boolean;
    only?: ('getAll' | 'getById' | 'create' | 'update' | 'delete')[];
}

export function createCrudRouter<T>(
    model: BaseModel<T>,
    options: CrudOptions = {}
): Router {
    const router = Router();
    const {
        requireAuth = false,
        requireAdmin = false,
        only
    } = options;

    const shouldInclude = (operation: string) => !only || only.includes(operation as any);
    
    const authMiddleware: RequestHandler = requireAuth 
        ? auth({ admin: requireAdmin }) 
        : (req, res, next) => next();

    if (shouldInclude('getAll')) {
        router.get('/', async (req, res, next) => {
            try {
                const items = await model.getAll();
                res.json(items);
            } catch (error) {
                next(error);
            }
        });
    }

    if (shouldInclude('getById')) {
        router.get('/:id', async (req, res, next) => {
            try {
                const item = await model.findById(req.params.id);
                if (!item) {
                    return next(new Error(ErrorType.NotFound));
                }
                res.json(item);
            } catch (error) {
                next(error);
            }
        });
    }

    if (shouldInclude('create')) {
        router.post('/', authMiddleware, async (req, res, next) => {
            try {
                const item = await model.create(req.body);
                res.status(201).json(item);
            } catch (error) {
                next(error);
            }
        });
    }

    if (shouldInclude('update')) {
        router.put('/:id', authMiddleware, async (req, res, next) => {
            try {
                const { id } = req.params;
                if (!id) return next(new Error(ErrorType.BadRequest));
                
                const item = await model.update(id, req.body);
                if (!item) {
                    return next(new Error(ErrorType.NotFound));
                }
                res.json(item);
            } catch (error) {
                next(error);
            }
        });
    }

    if (shouldInclude('delete')) {
        router.delete('/:id', authMiddleware, async (req, res, next) => {
            try {
                const { id } = req.params;
                if (!id) return next(new Error(ErrorType.BadRequest));
                
                const deleted = await model.delete(id);
                if (!deleted) {
                    return next(new Error(ErrorType.NotFound));
                }
                res.status(204).send();
            } catch (error) {
                next(error);
            }
        });
    }

    return router;
}
