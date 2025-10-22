import { Client } from "pg";

export const dbClient = new Client({
    connectionString: process.env.PG_URL,
});
dbClient.connect().then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.error("Database connection error:", err);
});

