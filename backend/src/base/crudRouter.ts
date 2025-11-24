import { Router, type RequestHandler } from 'express';
import { BaseModel } from './BaseModel';
import { ErrorType } from '../middleware/error-handler';
import { auth } from '../middleware/auth';

// mapping sqlstate prefixes to http status codes
const errorCodeMap: Record<string, number> = {
    '23': 409,
    '22': 400,
    '42': 400,
    '08': 503,
    '53': 503,
    '57': 503,
    '58': 500,
    'P0': 500,
    'XX': 500,
};

type SqlState = {
    code: string;
    detail: string;
}

function sqlErrorToHttpError(error: SqlState): { message: string; httpStatus: number } {
    const prefix = error.code.substring(0, 2);
    const httpStatus = errorCodeMap[prefix] || 500;
    return {
        message: error.detail || 'Database error',
        httpStatus,
    };
}

interface CrudOptions {
    requireAuth?: boolean;
    requireAdmin?: boolean;
    only?: ('findAll' | 'findById' | 'create' | 'update' | 'delete')[];
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

    const authMiddleware: RequestHandler = (requireAuth || requireAdmin)
        ? auth({ admin: requireAdmin })
        : (req, res, next) => next();

    router.use(authMiddleware);

    if (shouldInclude('findAll')) {
        router.get('/', async (req, res, next) => {
            try {
                const items = await model.findAll();
                res.json(items);
            } catch (error) {
                next(sqlErrorToHttpError(error as SqlState));
            }
        });
    }

    if (shouldInclude('findById')) {
        router.get('/:id', async (req, res, next) => {
            try {
                const item = await model.findById(req.params.id);
                if (!item) {
                    return next(new Error(ErrorType.NotFound));
                }
                res.json(item);
            } catch (error) {
                next(sqlErrorToHttpError(error as SqlState));
            }
        });
    }

    if (shouldInclude('create')) {
        router.post('/', async (req, res, next) => {
            try {
                const item = await model.create(req.body);
                res.status(201).json(item);
            } catch (error: any) {
                next(sqlErrorToHttpError(error as SqlState));
            }
        });
    }

    if (shouldInclude('update')) {
        router.put('/:id', async (req, res, next) => {
            try {
                const { id } = req.params;
                if (!id) return next(new Error(ErrorType.BadRequest));

                const item = await model.update(id, req.body);
                if (!item) {
                    return next(new Error(ErrorType.NotFound));
                }
                res.json(item);
            } catch (error) {
                next(sqlErrorToHttpError(error as SqlState));
            }
        });
    }

    if (shouldInclude('delete')) {
        router.delete('/:id', async (req, res, next) => {
            try {
                const { id } = req.params;
                if (!id) return next(new Error(ErrorType.BadRequest));

                const deleted = await model.delete(id);
                if (!deleted) {
                    return next(new Error(ErrorType.NotFound));
                }
                res.status(204).send();
            } catch (error) {
                next(sqlErrorToHttpError(error as SqlState));
            }
        });
    }

    return router;
}
