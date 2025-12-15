# TodoList-02

Aplicación simple de gestión de tareas con Backend (Node/Express + PostgreSQL) y Frontend (React + Vite).

## Estructura del proyecto

- `Backend/`: API en Node.js (Express).
- `frontend/`: Aplicación cliente en React (Vite).
- `netlify.toml`: Configuración de despliegue (frontend).

## Requisitos

- Node.js (v16+ recomendado)
- npm
- PostgreSQL (o servicio compatible)

## Variables de entorno (Backend)

El archivo `Backend/.env` debe incluir al menos las siguientes variables:

```
# Puerto del servidor
PORT=3000

# Conexión a PostgreSQL
HOSTDB=localhost
USERDB=postgres
PASSWORDDB=
DB=railway
PORTDB=5432

# Seguridad
JWT_SECRET=tu_secreto_jwt

# URL del frontend (opcional, para CORS)
FRONTEND_URL=http://localhost:5173

# Entorno (development|production)
NODE_ENV=development
```

Nota: `Backend/.env` actual está vacío; rellena las claves necesarias antes de iniciar el servidor.

## Instalación y ejecución

Backend

```bash
cd Backend
npm install
# Desarrollo (con nodemon)
npm run dev
# Producción
npm start
```

Frontend

```bash
cd frontend
npm install
npm run dev
# Accede en http://localhost:5173
```

## Scripts principales

- Backend: `npm run dev` (nodemon) / `npm start` (node)
- Frontend: `npm run dev` (vite), `npm run build`, `npm run preview`

## Despliegue

- El frontend puede desplegarse en Netlify (ya contiene `netlify.toml`).
- El backend puede desplegarse en Railway, Heroku, Fly.io, o cualquier servidor que soporte Node.js y PostgreSQL.

## Contribuir

- Abrir issues o pull requests para mejoras o correcciones.

