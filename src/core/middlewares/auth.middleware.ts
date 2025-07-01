/**
 * Authentication middleware for protecting routes
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature AuthMiddleware
 */

import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { appConfig } from "@/config/database"
import type { UserRole } from "@/types/global"

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    role: UserRole
  }
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    res.status(401).json({ success: false, error: "Access token required" })
    return
  }

  jwt.verify(token, appConfig.jwtSecret, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ success: false, error: "Invalid or expired token" })
      return
    }

    req.user = user
    next()
  })
}

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Authentication required" })
      return
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ success: false, error: "Insufficient permissions" })
      return
    }

    next()
  }
}
