/**
 * Server entry point
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature Server
 */

import { createApp } from "./src/app"
import { connectDatabase } from "@/config/sequelize"
import { appConfig } from "@/config/database"

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase()

    // Create Express app
    const app = createApp()

    // Start server
    app.listen(appConfig.port, () => {
      console.log(`🚀 Server running on port ${appConfig.port}`)
      console.log(`📊 Environment: ${appConfig.nodeEnv}`)
      console.log(`🔗 Health check: http://localhost:${appConfig.port}/health`)
      console.log(`📚 API docs: http://localhost:${appConfig.port}/api`)
    })
  } catch (error) {
    console.error("❌ Failed to start server:", error)
    process.exit(1)
  }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Promise Rejection:", err)
  process.exit(1)
})

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err)
  process.exit(1)
})

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully")
  process.exit(0)
})

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully")
  process.exit(0)
})

startServer()
