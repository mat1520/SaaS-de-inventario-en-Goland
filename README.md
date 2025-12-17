# 📦 SaaS de Inventario

Sistema de gestión de inventario desarrollado como una aplicación SaaS (Software as a Service) con arquitectura moderna de microservicios.

![Go](https://img.shields.io/badge/Go-1.21-00ADD8?style=flat-square&logo=go)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite)

## 🚀 Características

- **Autenticación segura** con JWT (JSON Web Tokens)
- **CRUD completo de productos** (Crear, Leer, Actualizar, Eliminar)
- **Gestión de perfil de usuario**
- **Dashboard interactivo** con métricas y reportes
- **Interfaz moderna y responsiva** con React
- **API RESTful** siguiendo mejores prácticas

## 🏗️ Arquitectura

```
SaaS-de-inventario-en-Goland/
├── Backend/                 # API en Go
│   ├── auth/               # Lógica de autenticación JWT
│   ├── database/           # Configuración SQLite
│   ├── errors/             # Manejo de errores personalizado
│   ├── handler/            # Controladores HTTP
│   ├── middleware/         # Middleware de autenticación
│   ├── models/             # Modelos de datos
│   ├── repository/         # Capa de acceso a datos
│   ├── service/            # Lógica de negocio
│   └── main.go             # Punto de entrada
│
└── Frontend/                # Cliente React
    ├── src/
    │   ├── components/     # Componentes reutilizables
    │   ├── context/        # Context API para estado global
    │   ├── pages/          # Páginas de la aplicación
    │   └── services/       # Servicios para API calls
    └── package.json
```

## 🛠️ Tecnologías

### Backend
- **Go 1.21** - Lenguaje de programación
- **Gin** - Framework web HTTP
- **SQLite** - Base de datos embebida
- **JWT** - Autenticación con tokens
- **bcrypt** - Encriptación de contraseñas

### Frontend
- **React 19** - Biblioteca UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **Recharts** - Gráficos y visualizaciones

## 📋 Requisitos Previos

- [Go 1.21+](https://golang.org/dl/)
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## ⚡ Instalación y Ejecución

### Backend

```bash
# Navegar al directorio del backend
cd Backend

# Instalar dependencias
go mod download

# Ejecutar el servidor (puerto 8080 por defecto)
go run main.go
```

### Frontend

```bash
# Navegar al directorio del frontend
cd Frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (puerto 5173)
npm run dev
```

## 🔌 Endpoints de la API

### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/auth/register` | Registrar nuevo usuario |
| POST | `/api/v1/auth/login` | Iniciar sesión |

### Usuario (Requiere autenticación)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/profile` | Obtener perfil |
| PUT | `/api/v1/profile` | Actualizar perfil |

### Productos (Requiere autenticación)
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/products` | Crear producto |
| GET | `/api/v1/products` | Listar productos |
| GET | `/api/v1/products/:id` | Obtener producto por ID |
| PUT | `/api/v1/products/:id` | Actualizar producto |
| DELETE | `/api/v1/products/:id` | Eliminar producto |

## 📝 Modelos de Datos

### Usuario
```json
{
  "id": 1,
  "name": "Nombre del Usuario",
  "email": "usuario@email.com",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Producto
```json
{
  "id": 1,
  "name": "Nombre del Producto",
  "description": "Descripción del producto",
  "price": 99.99,
  "stock": 100,
  "user_id": 1,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

## 🔐 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor backend | `8080` |

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos.

---

**Desarrollado por @mat1520 usando Go y React**
