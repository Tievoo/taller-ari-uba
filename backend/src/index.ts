import express, { type Request, type Response } from "express";
import { errorHandler } from "./middleware/error-handler";
import { connectDatabase } from "./database/db";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.FRONT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/ping", (_, res: Response) => {
  res.status(200).send("ok");
});

app.use('/auth', require('./auth/routes').default);
app.use('/courts', require('./courts/routes').default);
app.use('/bookings', require('./bookings/routes').default);

app.use(errorHandler);

await connectDatabase();

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});