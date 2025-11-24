import { Client } from "pg";

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

export const dbClient = new Client({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT) || 5432,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

export async function connectDatabase() {
    try {
        await dbClient.connect();
        console.log("Connected to the database");
    } catch (err) {
        console.error("Database connection error:", err);
        console.error("Failed to connect to database. Exiting...");
        process.exit(1);
    }
}

