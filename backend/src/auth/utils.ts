import { UserModel, type User } from "../users/model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ErrorType } from "../middleware/error-handler";

function generateAuthToken(user: User) : string {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
        console.log("JWT_SECRET is not defined");
        throw new Error(ErrorType.InternalServerError);
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "12h" });
    return token;
}

export async function login(email: string, password: string): Promise<string> {
    const user = await UserModel.findByEmail(email);
    if (!user) {
        throw new Error(ErrorType.NotFound);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error(ErrorType.NotFound); // no le voy a avisar que el email existe
    }
    return generateAuthToken(user);
}

export async function register(user: Omit<User, "id">): Promise<string> {
    const existingUser = await UserModel.findByEmail(user.email);
    if (existingUser) {
        throw new Error("Email already in use");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await UserModel.create({ ...user, password: hashedPassword });
    return generateAuthToken(newUser);
}