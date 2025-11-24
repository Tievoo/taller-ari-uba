# Alquiler de Canchas

## Para levantar todo en local:

Como runtime, usamos [bun](https://bun.com/), una alternativa general a Node. El proyecto fue desarrollado con el mismo. 

### Backend:
Instalar dependencias
```bash
bun install
```

Duplicar ```.env.example``` y renombrar a ```.env```:
```bash
cp .env.example .env
```

Correr el contenedor para la base de datos:
```bash
docker compose up -d
```

Y el server:
```bash
bun dev
```


### Frontend
Instalar dependencias
```bash
bun install
```
Duplicar ```.env.example``` y renombrar a ```.env```:
```bash
cp .env.example .env
```

Correr el front
```bash
bun dev
```
