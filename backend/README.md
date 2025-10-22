# bbdd

To install dependencies:

```bash
bun install
```

To run:

Duplicar ```.env.example``` y renombrar a ```.env```:
```bash
cp .env.example .env
```

Correr el contenedor:
```bash
docker compose up -d
```


Y el server:
```bash
bun run index.ts
```