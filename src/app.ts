/**
 * Express application configuration
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature App
 */
import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"

// Importar rutas
import userRoutes from "./modules/users/user.routes"

// Importar middlewares
import { errorHandler } from "./core/middlewares/errorHandler"
import { notFoundHandler } from "./core/middlewares/notFoundHandler"

dotenv.config()

const app = express()

// Middlewares de seguridad
app.use(helmet())
app.use(cors())

// Middlewares de parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas principales
app.use("/api/users", userRoutes)

// Ruta de salud
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Middlewares de manejo de errores
app.use(notFoundHandler)
app.use(errorHandler)

export default app