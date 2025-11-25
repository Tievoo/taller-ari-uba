# Backend del sistema 

## Endpoints disponibles

Se incluye a continuación una breve descripción de los endpoints disponibles en el sistema. Cada uno incluye el método HTTP utilizado, la url, y en caso de ser necesario, el body del pedido.
### Autenticación

#### Para registrarse:
```js
POST /auth/register

{
    email: "mail@example.com",
    password: "secret-password",
    first_name: "John",
    last_name: "Doe",
}
```
#### Para ingresar:
```js
POST /auth/login

{
    email: "mail@example.com",
    password: "secret-password",
}
```

En caso de ser exitosas, ambas operaciones devuelven una cookie `access_token`, necesaria para el resto de operaciones.

#### Para salir del sistema
```js
POST /auth/logout
```
---

### Uso del sistema
Todas las operaciones deben incluir el siguiente header en el pedido:

```http
Authorization: Bearer <access_token>
```

---

### Como usuario:

Para obtener todas las canchas registradas en el sistema:
```js
GET /courts
```

Para obtener la disponibilidad de una cancha en una fecha específica:
```js
GET /courts/{id}?date={yyyy-mm-dd}
```

Para realizar una reserva de una cancha en una fecha y hora específicas:
```js
POST /bookings

{
    court_id: "{id}",
    booking_date: "{yyyy-mm-dd}",
    start_time: "{hh:mm}",
}
```

Para obtener todas las reservas activas:
```js
GET /bookings
```

Para cancelar una reserva:
```js
DELETE /bookings/{id}
```
---
### Como admin:

Obtener los usuarios del sistema:
```js
GET /admin/users
```

Crear un nuevo usuario:
```js
POST /admin/users

{
    email: "mail@example.com",
    password: "secret-password",
    first_name: "John",
    last_name: "Doe",
    role: "user"|"admin",
}
```

Modificar un usuario:
```js
PUT /admin/users/{id} 

{
    id: "{id}",
    email: "mail@example.com",
    password: "secret-password",
    first_name: "John",
    last_name: "Doe",
    created_at: "YYYY-MM-DDTHH:mm:ss.sssZ",
    role: "user",
}
```

Eliminar un usuario:
```js
DELETE /admin/users/{id}
```

Ver todas las canchas del sistema:
```js
GET /admin/courts
```

Agregar una nueva cancha, del tipo de *court_type_id*:
```js
POST /admin/courts

{
    name: "{name}",
    court_type_id: "{court_type_id}",
    image: "{imageURL}",
}
```

Modificar una cancha:
```js
PUT /admin/courts/{id} 

{
    id: "{id}",
    name: "{name}",
    court_type_id: "{court_type_id}",
    image: "{imageURL}",
    created_at: "YYYY-MM-DDTHH:mm:ss.sssZ",
}
```

Eliminar una cancha:
```js
DELETE /admin/courts/{id}
```

Ver las reservas del sistema:
```js
GET /admin/bookings
```

Crear una nueva reserva:
```js
POST /admin/bookings

{
    user_id: "{id}",
    court_id: "{id}",
    booking_date: "{yyyy-mm-dd}",
    start_time: "{hh:mm}",
    end_time: "{hh:mm}",
}
```

Modificar una reserva:
```js
PUT /admin/bookings/{id} 

{
    id: "{id}",
    user_id: "{id}",
    court_id: "{id}",
    booking_date: "{yyyy-mm-dd}",
    start_time: "{hh:mm}",
    end_time: "{hh:mm}",
    created_at: "YYYY-MM-DDTHH:mm:ss.sssZ",
}
```

Eliminar una reserva:
```js
DELETE /admin/bookings/{id}
```

Obtener los tipos de canchas del sistema:
```js
GET /admin/court-types
```

Crear un nuevo tipo de cancha:
```js
POST /admin/court-types

{
    name: "{name}",
    price: "{price}",
}
```

Modificar un tipo de cancha:
```js
PUT /admin/court-types/{id} 

{
    id: "{id}",
    name: "{name}",
    price: "{price}",
}
```

Eliminar un tipo de cancha:
```js
DELETE /admin/court-types/{id}
```