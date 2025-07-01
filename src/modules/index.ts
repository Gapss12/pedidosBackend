/**
 * Main routes configuration
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature Routes
 */

import { Router } from "express"
import { userRoutes } from "@/modules/users/user.routes"

const router = Router()

// API version prefix
const API_VERSION = "/v1"

// Module routes
router.use(`${API_VERSION}/users`, userRoutes)

// API info endpoint
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-commerce API - Gestión Integral de Pedidos",
    version: "1.0.0",
    endpoints: {
      users: `${API_VERSION}/users`,
      products: `${API_VERSION}/products`,
      orders: `${API_VERSION}/orders`,
      inventory: `${API_VERSION}/inventory`,
      notifications: `${API_VERSION}/notifications`,
      reports: `${API_VERSION}/reports`,
      health: "/health",
    },
  })
})

export { router as routes }
