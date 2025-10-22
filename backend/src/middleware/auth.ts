import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../users/model";

const secret = process.env.JWT_SECRET || "your_jwt_secret_key";

type AuthOptions = {
    admin?: boolean;
};

export const auth = ({ admin = false }: AuthOptions) => (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken) {
        return res.status(401).send("Unauthorized");
    }

    jwt.verify(accessToken, secret, async (err, payload) => {
        if (err || !payload || typeof payload === 'string' || !('id' in payload)) {
            return res.status(401).send("Unauthorized");
        }
        
        const user = await UserModel.findById(payload.id)
        if (!user) {
            return res.status(401).send("Unauthorized");
        }

        if (admin && user.role !== 'admin') {
            return res.status(403).send("Forbidden");
        }
        req.user = user;
        next();
    });
}