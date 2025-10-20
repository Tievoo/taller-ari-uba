# bbdd

To install dependencies:

```bash
bun install
```

To run:

Renombrar ```env-example``` a ```.env```:
```bash
cp env-example .env
```

Correr el contenedor:
```bash
docker compose up -d
```


Y el server:
```bash
bun run index.ts
```

Para ejecutar las querys de ```/database/init```, se puede correr:
```bash
docker exec backend-db-1 psql -U fulbo -d fulbo_db -c "QUERY"
```

This project was created using `bun init` in bun v1.2.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
