import type { User } from "../users/model";

export declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}