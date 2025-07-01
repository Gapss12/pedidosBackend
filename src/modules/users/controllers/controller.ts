/**
 * User controller handling HTTP requests
 * @author Backend Team
 * @date 2024-01-01
 * @signature UserController
 */

import type { Request, Response } from "express"
import  { UserService } from "../services/user.service"
import { PaginationUtil } from "@/core/utils/pagination.util"
import type { AuthenticatedRequest } from "@/core/middlewares/auth.middleware"

export class UserController {
  constructor(private userService: UserService) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const paginationOptions = PaginationUtil.createPaginationOptions(page, limit)
      const result = await this.userService.getAll(paginationOptions)

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const result = await this.userService.getById(id)

      const statusCode = result.success ? 200 : 404
      res.status(statusCode).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.userService.create(req.body)

      const statusCode = result.success ? 201 : 400
      res.status(statusCode).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }

  update = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const result = await this.userService.update(id, req.body)

      const statusCode = result.success ? 200 : 404
      res.status(statusCode).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }

  delete = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const result = await this.userService.delete(id)

      const statusCode = result.success ? 200 : 404
      res.status(statusCode).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { correo, contraseña } = req.body
      const result = await this.userService.login(correo, contraseña)

      const statusCode = result.success ? 200 : 401
      res.status(statusCode).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }

  getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: "Authentication required",
        })
        return
      }

      const result = await this.userService.getById(req.user.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }
}
