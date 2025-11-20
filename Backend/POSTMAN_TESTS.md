# Guía de Pruebas en Postman

## URL Base
```
http://localhost:8080
```

---

## REGISTRAR UN USUARIO

### Request
- **Método:** `POST`
- **URL:** `http://localhost:8080/api/v1/register`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Juan Pérez",
    "email": "juan@test.com",
    "password": "password123"
  }
  ```

### Respuesta Esperada (201 Created)
```json
{
  "message": "user registered successfully",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@test.com",
    "created_at": "2025-11-02T17:24:32Z",
    "updated_at": "2025-11-02T17:24:32Z"
  }
}
```

---

## LOGIN (OBTENER TOKEN JWT)

### Request
- **Método:** `POST`
- **URL:** `http://localhost:8080/api/v1/login`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "email": "juan@test.com",
    "password": "password123"
  }
  ```

### Respuesta Esperada (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Imp1YW5AdGVzdC5jb20iLCJpc3MiOiJpbnZlbnRvcnktc3lzdGVtIiwiZXhwIjoxNzMwNjQ5ODcyLCJpYXQiOjE3MzA1NjM0NzJ9.XYZ...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@test.com",
    "created_at": "2025-11-02T17:24:32Z",
    "updated_at": "2025-11-02T17:24:32Z"
  }
}
```
copia el `token` de la respuesta — lo necesitarás para todas las peticiones protegidas.

## VER PERFIL (RUTA PROTEGIDA)

### Request
- **Método:** `GET`
- **URL:** `http://localhost:8080/api/v1/profile`
- **Headers:**
  ```
  Authorization: Bearer TU_TOKEN_AQUI
  ```
  
  **Ejemplo:**
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Imp1YW5AdGVzdC5jb20iLCJpc3MiOiJpbnZlbnRvcnktc3lzdGVtIiwiZXhwIjoxNzMwNjQ5ODcyLCJpYXQiOjE3MzA1NjM0NzJ9.XYZ...
  ```

### Respuesta Esperada (200 OK)
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@test.com",
  "created_at": "2025-11-02T17:24:32Z",
  "updated_at": "2025-11-02T17:24:32Z"
}
```

---

## ACTUALIZAR PERFIL (RUTA PROTEGIDA)

### Request
- **Método:** `PUT`
- **URL:** `http://localhost:8080/api/v1/profile`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer TU_TOKEN_AQUI
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Juan Pérez Actualizado",
    "email": "juan.nuevo@test.com"
  }
  ```

### Respuesta Esperada (200 OK)
```json
{
  "message": "profile updated successfully",
  "user": {
    "id": 1,
    "name": "Juan Pérez Actualizado",
    "email": "juan.nuevo@test.com",
    "created_at": "2025-11-02T17:24:32Z",
    "updated_at": "2025-11-02T17:30:00Z"
  }
}
```

---

## CREAR UN PRODUCTO (RUTA PROTEGIDA)

### Request
- **Método:** `POST`
- **URL:** `http://localhost:8080/api/v1/products`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer TU_TOKEN_AQUI
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Laptop Dell XPS 15",
    "description": "Laptop de alto rendimiento con 16GB RAM",
    "price": 1299.99,
    "stock": 10
  }
  ```

### Respuesta Esperada (201 Created)
```json
{
  "message": "product created successfully",
  "product": {
    "id": 1,
    "name": "Laptop Dell XPS 15",
    "description": "Laptop de alto rendimiento con 16GB RAM",
    "price": 1299.99,
    "stock": 10,
    "user_id": 1,
    "created_at": "2025-11-02T17:35:00Z",
    "updated_at": "2025-11-02T17:35:00Z"
  }
}
```

---

## LISTAR TODOS LOS PRODUCTOS (RUTA PROTEGIDA)

### Request
- **Método:** `GET`
- **URL:** `http://localhost:8080/api/v1/products`
- **Headers:**
  ```
  Authorization: Bearer TU_TOKEN_AQUI
  ```

### Respuesta Esperada (200 OK)
```json
{
  "count": 2,
  "products": [
    {
      "id": 2,
      "name": "Mouse Logitech",
      "description": "Mouse ergonómico inalámbrico",
      "price": 29.99,
      "stock": 50,
      "user_id": 1,
      "created_at": "2025-11-02T17:36:00Z",
      "updated_at": "2025-11-02T17:36:00Z"
    },
    {
      "id": 1,
      "name": "Laptop Dell XPS 15",
      "description": "Laptop de alto rendimiento con 16GB RAM",
      "price": 1299.99,
      "stock": 10,
      "user_id": 1,
      "created_at": "2025-11-02T17:35:00Z",
      "updated_at": "2025-11-02T17:35:00Z"
    }
  ]
}
```

---

## OBTENER UN PRODUCTO POR ID (RUTA PROTEGIDA)

### Request
- **Método:** `GET`
- **URL:** `http://localhost:8080/api/v1/products/1`
- **Headers:**
  ```
  Authorization: Bearer TU_TOKEN_AQUI
  ```

### Respuesta Esperada (200 OK)
```json
{
  "id": 1,
  "name": "Laptop Dell XPS 15",
  "description": "Laptop de alto rendimiento con 16GB RAM",
  "price": 1299.99,
  "stock": 10,
  "user_id": 1,
  "created_at": "2025-11-02T17:35:00Z",
  "updated_at": "2025-11-02T17:35:00Z"
}
```

---

##  ACTUALIZAR UN PRODUCTO (RUTA PROTEGIDA)

### Request
- **Método:** `PUT`
- **URL:** `http://localhost:8080/api/v1/products/1`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer TU_TOKEN_AQUI
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Laptop Dell XPS 15 (Renovada)",
    "price": 1199.99,
    "stock": 5
  }
  ```

### Respuesta Esperada (200 OK)
```json
{
  "message": "product updated successfully",
  "product": {
    "id": 1,
    "name": "Laptop Dell XPS 15 (Renovada)",
    "description": "Laptop de alto rendimiento con 16GB RAM",
    "price": 1199.99,
    "stock": 5,
    "user_id": 1,
    "created_at": "2025-11-02T17:35:00Z",
    "updated_at": "2025-11-02T17:40:00Z"
  }
}
```

---

##  ELIMINAR UN PRODUCTO (RUTA PROTEGIDA)

### Request
- **Método:** `DELETE`
- **URL:** `http://localhost:8080/api/v1/products/1`
- **Headers:**
  ```
  Authorization: Bearer TU_TOKEN_AQUI
  ```

### Respuesta Esperada (200 OK)
```json
{
  "message": "product deleted successfully"
}
```

---

##  CASOS DE ERROR

### Error: Sin token (401 Unauthorized)
```json
{
  "error": "authorization header required"
}
```

### Error: Token inválido (401 Unauthorized)
```json
{
  "error": "invalid or expired token"
}
```

### Error: Email duplicado (409 Conflict)
```json
{
  "error": "email already exists"
}
```

### Error: Credenciales inválidas (401 Unauthorized)
```json
{
  "error": "invalid credentials"
}
```

### Error: Producto no encontrado (404 Not Found)
```json
{
  "error": "resource not found"
}
```

---

##  PASOS PARA PROBAR EN POSTMAN

1. **Abre Postman** y crea una nueva colección llamada "Inventory System"

2. **Registra un usuario:**
   - Crea una request POST a `/api/v1/register`
   - Agrega el body JSON con name, email, password

3. **Haz login:**
   - Crea una request POST a `/api/v1/login`
   - Agrega el body JSON con email, password
   - **COPIA EL TOKEN** de la respuesta

4. **Configura el token en Postman:**
   - Ve a la pestaña "Authorization"
   - Selecciona "Bearer Token"
   - Pega el token que copiaste

5. **Prueba las rutas protegidas:**
   - Ahora puedes probar todas las rutas de productos y perfil
   - El token se enviará automáticamente en cada petición

---

## 💡 TIPS

- El token JWT expira en 24 horas
- Cada usuario solo puede ver/modificar sus propios productos
- Los campos opcionales en actualizaciones no son obligatorios
- La validación de datos se hace automáticamente (ej: email válido, precio > 0)
