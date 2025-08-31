import { Client as DBClient } from "pg";
import { readFileSync } from "fs";
import type { Alumno } from "./types.db";

async function leerYParsearCSV(filePath: string): Promise<[string[], string[]]> {
    const fileContent = readFileSync(filePath, "utf-8");
    const lines = fileContent.split(/\r?\n/).filter(line => line.trim() !== "");
    if (lines.length === 0) throw new Error("CSV is empty.");
    const columns = lines[0]!.split(",").map(column => column.trim());
    const dataLines: string[] = lines.slice(1);

    return [dataLines, columns]
}

async function refrescarAlumnos(dbClient: DBClient, alumnos: string[], columnas: string[]) {
    await dbClient.query("DELETE FROM aida.alumnos");
    for (const alumno of alumnos) {
        const values = alumno.split(",").map(value => value.trim());
        await dbClient.query(
            `INSERT INTO aida.alumnos (${columnas.join(", ")}) VALUES
            (${values.map((value) => value == '' ? 'NULL' : `'${value}'`).join(', ')})
            `,
        );
        console.log(`Inserted alumno: ${values.join(", ")}`);
    }
}

async function obtenerPrimerAlumnoCertificable(dbClient: DBClient): Promise<Alumno | null> {
    const res = await dbClient.query(
        `SELECT * FROM aida.alumnos 
        WHERE titulo IS NOT NULL AND titulo_en_tramite IS NOT NULL 
        ORDER BY egreso 
        LIMIT 1`
    );
    return res.rows[0] || null;
}

async function main() {
    const dbClient = new DBClient();
    await dbClient.connect();

    const [alumnos, columnas] : [string[], string[]] = await leerYParsearCSV("data/alumnos.csv")
    await refrescarAlumnos(dbClient, alumnos, columnas);
    const alumnoACertificar : Alumno | null = await obtenerPrimerAlumnoCertificable(dbClient);
    if (!alumnoACertificar) console.log("No hay alumnos certificables.");
    else console.log(`Alumno a certificar: ${JSON.stringify(alumnoACertificar)}`);

    await dbClient.end();
}

main();
