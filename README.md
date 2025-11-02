# Sistema de Gestión de Inventario

Una API RESTful completa desarrollada en Go para la gestión de inventario de pequeños negocios.

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura en capas (MVC modificado)** para APIs:

```
POO-PROJECT/
├── main.go              # Punto de entrada, configuración y enrutamiento
├── models/              # Estructuras de datos (User, Product)
├── repository/          # Capa de acceso a datos (interfaces + implementaciones SQLite)
├── service/             # Lógica de negocio (validaciones, orquestación)
├── handler/             # Controladores HTTP (peticiones/respuestas JSON)
├── auth/                # Sistema de autenticación (JWT, bcrypt)
├── middleware/          # Middleware de autenticación JWT
├── database/            # Inicialización y migración de BD
├── errors/              # Errores personalizados del sistema
└── inventory.db         # Base de datos SQLite (se crea automáticamente)
```

### 📦 Responsabilidades de cada Capa

- **models/**: Define las entidades del dominio con tags para JSON y BD
- **repository/**: Maneja todas las operaciones SQL (desacoplado mediante interfaces)
- **service/**: Contiene la lógica de negocio y valida los datos
- **handler/**: Procesa peticiones HTTP, delega al servicio y responde JSON
- **auth/**: Gestiona JWT tokens y hasheo de contraseñas con bcrypt
- **middleware/**: Intercepta peticiones para validar autenticación
- **database/**: Inicializa SQLite y crea las tablas automáticamente
- **errors/**: Define errores personalizados y mapea a códigos HTTP

## 🔐 Seguridad

- **Contraseñas**: Hasheadas con **bcrypt** (nunca se almacenan en texto plano)
- **Autenticación**: Basada en **JWT (JSON Web Tokens)**
- **Autorización**: Middleware que verifica el token en rutas protegidas
- **Validación**: Gin valida los datos de entrada automáticamente

## 🚀 Instalación y Uso

### Requisitos Previos

- Go 1.21 o superior
- GCC (para compilar el driver de SQLite)

### Pasos de Instalación

1. **Clonar el repositorio**:
```bash
cd /home/mat/Documents/POO-PROJECT
```

2. **Descargar dependencias**:
```bash
go mod download
```

3. **Ejecutar la aplicación**:
```bash
go run main.go
```

El servidor se iniciará en `http://localhost:8080`

## 📡 Endpoints de la API

### Autenticación (Públicas)

#### Registro de Usuario
```bash
POST /api/v1/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "micontraseña123"
}
```

#### Login
```bash
POST /api/v1/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "micontraseña123"
}

# Respuesta:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

### Perfil de Usuario (Protegidas - Requieren JWT)

#### Obtener Perfil
```bash
GET /api/v1/profile
Authorization: Bearer <tu_token_jwt>
```

#### Actualizar Perfil
```bash
PUT /api/v1/profile
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json

{
  "name": "Juan Pérez Actualizado",
  "email": "nuevo_email@example.com"
}
```

### Productos (Protegidas - Requieren JWT)

#### Crear Producto
```bash
POST /api/v1/products
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json

{
  "name": "Laptop Dell XPS 15",
  "description": "Laptop de alto rendimiento",
  "price": 1299.99,
  "stock": 10
}
```

#### Listar Productos
```bash
GET /api/v1/products
Authorization: Bearer <tu_token_jwt>
```

#### Obtener Producto por ID
```bash
GET /api/v1/products/1
Authorization: Bearer <tu_token_jwt>
```

#### Actualizar Producto
```bash
PUT /api/v1/products/1
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json

{
  "name": "Laptop Dell XPS 15 (Renovada)",
  "price": 1199.99,
  "stock": 5
}
```

#### Eliminar Producto
```bash
DELETE /api/v1/products/1
Authorization: Bearer <tu_token_jwt>
```

## 🧪 Pruebas con cURL

### 1. Registrar un usuario
```bash
curl -X POST http://localhost:8080/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María García",
    "email": "maria@test.com",
    "password": "password123"
  }'
```

### 2. Login y guardar el token
```bash
TOKEN=$(curl -X POST http://localhost:8080/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@test.com",
    "password": "password123"
  }' | jq -r '.token')

echo $TOKEN
```

### 3. Crear un producto
```bash
curl -X POST http://localhost:8080/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Mouse Inalámbrico",
    "description": "Mouse ergonómico Logitech",
    "price": 29.99,
    "stock": 50
  }'
```

### 4. Listar productos
```bash
curl -X GET http://localhost:8080/api/v1/products \
  -H "Authorization: Bearer $TOKEN"
```

## 🎯 Principios de Diseño Aplicados

### 1. **Desacoplamiento mediante Interfaces**
- `UserRepository` y `ProductRepository` son **interfaces**
- Permite cambiar fácilmente la implementación de SQLite a PostgreSQL/MySQL
- Facilita el testing con mocks

### 2. **Inyección de Dependencias**
- Todas las dependencias se inyectan en el constructor
- Ejemplo: `NewUserService(userRepo repository.UserRepository)`
- No hay acoplamiento directo entre capas

### 3. **Encapsulación (Estilo Go)**
- **NO se usan getters/setters** (ej: `GetName()`, `SetName()`)
- Los campos públicos se acceden directamente: `user.Name`
- La lógica interna se encapsula en métodos cuando es necesario

### 4. **Manejo de Errores Centralizado**
- Errores personalizados: `ErrNotFound`, `ErrInvalidCredentials`, etc.
- Función `GetHTTPStatus()` mapea errores a códigos HTTP
- Respuestas JSON consistentes en toda la API

### 5. **Separación de Responsabilidades (SRP)**
- Cada capa tiene una única responsabilidad
- Los handlers solo manejan HTTP
- Los servicios solo contienen lógica de negocio
- Los repositorios solo acceden a la BD

## 📊 Modelo de Base de Datos

### Tabla `users`
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `products`
```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL CHECK(price > 0),
    stock INTEGER NOT NULL CHECK(stock >= 0),
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🔧 Tecnologías Utilizadas

- **Go 1.21**: Lenguaje de programación
- **Gin**: Framework HTTP para enrutamiento y middleware
- **SQLite3**: Base de datos embebida
- **JWT**: Autenticación basada en tokens
- **bcrypt**: Hasheo seguro de contraseñas

## 📝 Notas Importantes

1. **Clave JWT**: Actualmente usa una clave hardcodeada. En producción, usar variables de entorno.
2. **CORS**: No implementado. Agregar middleware si se necesita acceso desde frontend.
3. **Validaciones**: Gin valida automáticamente con los tags `binding` en los modelos.
4. **Logs**: Actualmente básicos. Considerar un logger estructurado para producción.

## 🤝 Contribuciones

Este es un proyecto educativo que demuestra las mejores prácticas de Go para APIs RESTful.

## 📄 Licencia

MIT License - Libre para uso educativo y comercial.
