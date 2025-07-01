/**
 * Database configuration settings
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature SequelizeConfig
 */

import { Sequelize } from "sequelize"
import { databaseConfig } from "./database"

const env = process.env.NODE_ENV || "development"
const config = databaseConfig[env as keyof typeof databaseConfig]

export const sequelize = new Sequelize({
  ...config,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
})

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    console.log("✅ Database connection established successfully")

    if (env === "development") {
      await sequelize.sync({ alter: true })
      console.log("✅ Database synchronized")
    }
  } catch (error) {
    console.error("❌ Unable to connect to database:", error)
    process.exit(1)
  }
}
