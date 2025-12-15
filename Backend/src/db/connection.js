import pkg from "pg";
const { Pool } = pkg;

// Configuración del pool con variables individuales
export const pool = new Pool({
  host: process.env.HOSTDB || "localhost",
  user: process.env.USERDB || "postgres",
  password: process.env.PASSWORDDB || "",
  database: process.env.DB || "railway",
  port: parseInt(process.env.PORTDB || "5432"),
  // Configuración SSL: Solo en producción (Railway requiere SSL)
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  // Timeouts y configuración de conexión
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Manejar errores del pool
pool.on("error", (err) => {
  console.error("❌ Error en el pool de conexión:", err.message);
});

// Validar variables de entorno - SOLO después de que dotenv haya cargado
export async function testConnection() {
  if (!process.env.HOSTDB || !process.env.USERDB || !process.env.DB) {
    console.warn("⚠️ Advertencia: Faltan variables de entorno para la base de datos");
    console.warn("Configura en Railway o en tu .env local:");
    console.warn("   - HOSTDB");
    console.warn("   - USERDB");
    console.warn("   - DB");
    console.warn("   - PASSWORDDB");
    console.warn("   - PORTDB");
    return;
  }

  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Conexión exitosa a PostgreSQL en", process.env.HOSTDB);
    console.log("   Base de datos:", process.env.DB);
    console.log("   Usuario:", process.env.USERDB);
    console.log("   Puerto:", process.env.PORTDB);
  } catch (err) {
    console.error("❌ Error conectando a la base de datos:");
    console.error("   Código:", err.code);
    console.error("   Mensaje:", err.message);
    console.error("   Stack:", err.stack);
    console.error("   Host:", process.env.HOSTDB);
    console.error("   Puerto:", process.env.PORTDB);
    console.error("   Base de datos:", process.env.DB);
    console.error("   Usuario:", process.env.USERDB);
    
    if (err.message.includes("password authentication failed")) {
      console.error("   → Verifica tu contraseña en PASSWORDDB");
    } else if (err.message.includes("connect ECONNREFUSED")) {
      console.error("   → PostgreSQL no está corriendo o el host/puerto son incorrectos");
    } else if (err.code === "ENOTFOUND") {
      console.error("   → No se puede resolver el host. Verifica HOSTDB");
    } else if (err.code === "ECONNREFUSED") {
      console.error("   → Conexión rechazada. El servidor no está escuchando en ese puerto");
    } else if (err.code === "ECONNRESET") {
      console.error("   → Conexión reiniciada. Posible problema de SSL o firewall");
    }
  }
}
