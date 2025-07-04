/**
 * Database configuration settings
 * @author Gabriel Guzman
 * @date 2025-06-30
 * @signature DatabaseConfig
 */
import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

export const sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "orders_management",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})
