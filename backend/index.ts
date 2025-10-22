import express, { type Request, type Response } from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/ping", (_, res: Response) => {
  res.status(200).send("ok");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});