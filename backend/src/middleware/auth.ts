import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../users/model";
import { ErrorType } from "./error-handler";

const secret = process.env.JWT_SECRET;

type AuthOptions = {
    admin?: boolean;
};

export const auth = ({ admin = false }: AuthOptions) => (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken || !secret) {
        return next(ErrorType.Unauthorized);
    }

    jwt.verify(accessToken, secret, async (err, payload) => {
        if (err || !payload || typeof payload === 'string' || !('id' in payload)) {
            return next(ErrorType.Unauthorized);
        }
        
        const user = await UserModel.findById(payload.id)
        if (!user) {
            return next(ErrorType.Unauthorized);
        }

        if (admin && user.role !== 'admin') {
            return next(ErrorType.Forbidden);
        }
        req.user = user;
        next();
    });
}