# Backend del sistema fulbo

## Endpoints disponibles

Se incluye a continuación una breve descripción de los endpoints disponibles en el sistema. Cada uno incluye el método HTTP utilizado, la url, y en caso de ser necesario, el body del pedido.
### Autenticación

#### Para registrarse:
```json
POST /auth/register

{
    email: "mail@example.com",
    password: "secret-password",
    first_name: "John",
    last_name: "Doe"
}
```
#### Para ingresar:
```json
POST /auth/login

{
    email: "mail@example.com",
    password: "secret-password"
}
```

En caso de ser exitosas, ambas operaciones devuelven una cookie `access_token`, necesaria para el resto de operaciones.

---

### Uso del sistema
Todas las operaciones deben incluir el siguiente header en el pedido:

```http
Authorization: Bearer <access_token>
```

Para obtener todas las canchas registradas en el sistema:
```
GET /courts
```

Para obtener todas las canchas, filtrando por tipo de cancha:
```bash
GET /courts?type={court_type_id}&date={yyyy-mm-dd}
```

Para obtener todas las reservas activas del usuario:
```
GET /bookings
```

Para obtener las reservas activas de una cancha, filtrando por tipo de cancha y/o fecha:
```bash
GET /bookings?type={court_type_id}&date={yyyy-mm-dd}
```

Para reservar una cancha en una fecha específica:
```json
POST /bookings

{
    "court_id": court_id,
    "date": yyyy-mm-dd,
    "start_time": hh:mm:ss,
    "end_time": hh:mm:ss
}
```
---

### Despliegue en local


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