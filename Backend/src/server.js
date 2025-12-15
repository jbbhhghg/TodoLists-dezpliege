import dotenv from "dotenv";
dotenv.config(); // DEBE ser lo primero

// 🔍 DEBUG: Mostrar variables cargadas
console.log("🔍 Variables de entorno cargadas:");
console.log("   PORT:", process.env.PORT);
console.log("   NODE_ENV:", process.env.NODE_ENV);
console.log("   HOSTDB:", process.env.HOSTDB);
console.log("   PORTDB:", process.env.PORTDB);
console.log("   DB:", process.env.DB);
console.log("   USERDB:", process.env.USERDB);
console.log("   PASSWORDDB:", process.env.PASSWORDDB ? "***" : "NO DEFINIDO");
console.log("   JWT_SECRET:", process.env.JWT_SECRET ? "***" : "NO DEFINIDO");

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import { authMiddleware } from "./middleware/auth.js";
import { testConnection } from "./db/connection.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS - flexible en desarrollo, y permite localhost en producción
const corsOptions = {
  origin: (origin, callback) => {
    // Orígenes permitidos
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000",
      "https://todolist-frontend-harryson.netlify.app/login"
    ];
    
    // En producción, también permitir el frontend desplegado si existe
    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(process.env.FRONTEND_URL);
    }
    
    // Permitir si está en la lista o si no hay origin (requests sin CORS)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS bloqueado para origin: ${origin}`);
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => res.send("API OK"));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 Entorno: ${process.env.NODE_ENV || "development"}`);
  // Pruebar la conexión a la BD después de que el servidor esté escuchando
  testConnection();
});

export default app;
