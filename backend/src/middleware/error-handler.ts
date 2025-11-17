import type { Request, Response, NextFunction } from 'express';

export enum ErrorType {
    Unauthorized = 'Unauthorized',
    NotFound = 'Not Found',
    BadRequest = 'Bad Request',
    InternalServerError = 'Internal Server Error',
    Forbidden = 'Forbidden'
}

const errorStatusMap: Record<ErrorType, number> = {
    [ErrorType.BadRequest]: 400,
    [ErrorType.Unauthorized]: 401,
    [ErrorType.Forbidden]: 403,
    [ErrorType.NotFound]: 404,
    [ErrorType.InternalServerError]: 500
};

export function errorHandler(
    err: Error | { message: ErrorType },
    req: Request,
    res: Response,
    next: NextFunction
) {
    
    const errorValues = Object.values(ErrorType);
    if (err.message && errorValues.includes(err.message as ErrorType)) {
        const status = errorStatusMap[err.message as ErrorType] || 500;
        return res.status(status).json({ error: err.message });
    }
    
    console.error('Unhandled error', err);
    const errorMessage = err instanceof Error ? err.message : 'An error occurred';
    return res.status(500).json({ 
        error: ErrorType.InternalServerError,
        message: process.env.NODE_ENV === 'production' ? 'An error occurred' : errorMessage 
    });
}