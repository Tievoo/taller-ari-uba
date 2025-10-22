import express, { type Request, type Response } from "express";
import { errorHandler } from "./src/middleware/error-handler";
import { connectDatabase } from "./src/database/db";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/ping", (_, res: Response) => {
  res.status(200).send("ok");
});

app.use('/auth', require('./src/auth/route').default);

app.use(errorHandler);

await connectDatabase();

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});