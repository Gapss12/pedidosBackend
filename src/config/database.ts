/**
 * Database configuration settings
 * @author Gabriel Guzman
 * @date 2025-06-30
 * @signature DatabaseConfig
 */

import { config } from "dotenv"

config()

export const databaseConfig = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "proyectoDB",
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "5432"),
    dialect: "postgres" as const,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
  },
  production: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    port: Number.parseInt(process.env.DB_PORT!),
    dialect: "postgres" as const,
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
}

export const appConfig = {
  port: Number.parseInt(process.env.PORT || "3000"),
  jwtSecret: process.env.JWT_SECRET ,
  nodeEnv: process.env.NODE_ENV ,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
}
