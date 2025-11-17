import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../users/model";
import { ErrorType } from "./error-handler";

type AuthOptions = {
    admin?: boolean;
};

export const auth = ({ admin = false }: AuthOptions) => (req: Request, res: Response, next: NextFunction) => {
    const { JWT_SECRET } = process.env;
    const accessToken = req.cookies?.access_token;
    if (!accessToken || !JWT_SECRET) {
        return next(new Error(ErrorType.Unauthorized));
    }

    jwt.verify(accessToken, JWT_SECRET, async (err: jwt.VerifyErrors | null, payload: string | jwt.JwtPayload | undefined) => {
        if (err || !payload || typeof payload === 'string' || !('id' in payload)) {
            return next(new Error(ErrorType.Unauthorized));
        }
        
        const user = await UserModel.findById(payload.id)
        if (!user) {
            return next(new Error(ErrorType.Unauthorized));
        }

        if (admin && user.role !== 'admin') {
            return next(new Error(ErrorType.Forbidden));
        }
        req.user = user;
        next();
    });
}