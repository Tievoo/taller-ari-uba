// Conexión con db y querys

import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT) || 5432,
});

async function fetchTables() {
  const query = `
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_type = 'BASE TABLE'
      AND table_schema NOT IN ('pg_catalog', 'information_schema')
    ORDER BY table_schema, table_name;
  `;
  const result = await pool.query(query);
  return result.rows;
}

// Obtener todas las tablas (para debug y testear conexion)
export async function getTablesHTML(): Promise<string> {
  const tables = await fetchTables();

  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Tablas de la Base de Datos</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { border-collapse: collapse; width: 50%; }
          th, td { border: 1px solid #333; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Tablas de la Base de Datos</h1>
        <table>
          <tr><th>Schema</th><th>Nombre de la Tabla</th></tr>
  `;

  tables.forEach((table) => {
    html += `<tr><td>${table.table_schema}</td><td>${table.table_name}</td></tr>`;
  });

  html += `
        </table>
      </body>
    </html>
  `;

  return html;
}