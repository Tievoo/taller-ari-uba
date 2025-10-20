import express, { Request, Response } from "express";
import { getTablesHTML } from "./src/database/db";

const app = express();


app.get("/tables", async (req: Request, res: Response) => {
  try {
    const html = await getTablesHTML();
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("<h1>Error al obtener las tablas</h1>");
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
