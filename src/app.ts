/**
 * Express application configuration
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature App
 */

import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import { appConfig } from "./config/database"
import { routes } from "./modules/index"

export const createApp = (): express.Application => {
  const app = express()

  // Security middleware
  app.use(helmet())
  app.use(
    cors({
      origin: appConfig.corsOrigin,
      credentials: true,
    }),
  )

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
      success: false,
      error: "Too many requests from this IP, please try again later",
    },
  })
  app.use(limiter)

  // Body parsing middleware
  app.use(express.json({ limit: "10mb" }))
  app.use(express.urlencoded({ extended: true }))

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
    })
  })

  // API routes
  app.use("/api", routes)

  // 404 handler
  app.use("*", (req, res) => {
    res.status(404).json({
      success: false,
      error: "Route not found",
    })
  })

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global error handler:", err)

    res.status(err.status || 500).json({
      success: false,
      error: err.message || "Internal server error",
      ...(appConfig.nodeEnv === "development" && { stack: err.stack }),
    })
  })

  return app
}
