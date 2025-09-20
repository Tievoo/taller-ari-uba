import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import Handlebars from "handlebars";
import { Client as DBClient } from "pg";
import type { Alumno } from "./types.db";
import dotenv from 'dotenv';
dotenv.config({ quiet: true })

async function leerYParsearCSV(filePath: string): Promise<[string[], string[]]> {
    const fileContent = readFileSync(filePath, "utf-8");
    const lines = fileContent.split(/\r?\n/).filter(line => line.trim() !== "");
    if (lines.length === 0) throw new Error("CSV is empty.");
    const columns = lines[0]!.split(",").map(column => column.trim());
    const dataLines: string[] = lines.slice(1);

    return [dataLines, columns]
}

async function refrescarAlumnos(dbClient: DBClient, alumnos: string[], columnas: string[]): Promise<void> {
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

async function obtenerAlumnosPorAtributo(dbClient: DBClient, atributo: string, value: string) {
    const res = await dbClient.query(`
        SELECT * FROM aida.alumnos
        WHERE ${atributo} = '${value}';
    `)
    return res.rows;
}

async function obtenerAlumnoPorAtributo(dbClient: DBClient, atributo: string, value: string) {
    const res = await dbClient.query(`
        SELECT * FROM aida.alumnos
        WHERE ${atributo} = '${value}'
        LIMIT 1;
    `)
    return res.rows[0];
}

function certificarAlumno(alumno: Alumno): void {
    const template = readFileSync("data/certificado-template.html", "utf-8");
    const compiledTemplate = Handlebars.compile(template);
    const result = compiledTemplate({
        nombre_completo: `${alumno.apellido}, ${alumno.nombres}`,
        titulo: alumno.titulo,
        fecha_emision: new Date(alumno.egreso).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
    });
    if (!existsSync("certificados")) mkdirSync("certificados");
    writeFileSync(`certificados/certificado_${alumno.lu.replace(/\//g, '-')}.html`, result);
    console.log(`Certificado generado para alumno: ${alumno.nombres} ${alumno.apellido} con LU: ${alumno.lu}`);
}

async function procesarComando(dbClient: DBClient, command: string | undefined, value: string| undefined) {
    
    try {
    if (!command || !value) {
            throw new Error("Se necesita uno de los siguientes argumentos: --fecha --archivo --lu con un valor asociado")
        }
    
        switch (command) {
            case '--archivo':
                const [alumnos, columnas] = await leerYParsearCSV(value);
                await refrescarAlumnos(dbClient, alumnos, columnas);
                break;
            case '--fecha':
                const alumnosPorFecha: Alumno[] = await obtenerAlumnosPorAtributo(dbClient, 'titulo_en_tramite', value);
                if (!alumnosPorFecha || alumnosPorFecha.length == 0) throw new Error("No hay alumnos con titulos en tramite en esa fecha");
                for (const alumno of alumnosPorFecha) {
                    certificarAlumno(alumno)
                }
                break;
            case '--lu':
                const alumnoPorLU: Alumno = await obtenerAlumnoPorAtributo(dbClient, 'lu', value);
                if (!alumnoPorLU) throw new Error("No existe un alumno con ese LU")
                if (!alumnoPorLU.titulo_en_tramite) throw new Error("El alumno con ese LU no tiene titulo en tramite")
                certificarAlumno(alumnoPorLU)
                break;
            default:
                throw new Error("Comando invalido. Usar: --fecha --archivo --lu")
        }
    } catch (error) {
        console.error(String(error))
    }
}

async function main() {
    
    const dbClient = new DBClient();
    await dbClient.connect();

    const [command, value]: string[] = process.argv.slice(2);

    await procesarComando(dbClient, command, value);
        
    await dbClient.end();
    
}

main();