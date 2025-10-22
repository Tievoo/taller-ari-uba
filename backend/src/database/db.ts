import { Client } from "pg";

export const dbClient = new Client({
    connectionString: process.env.PG_URL,
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

