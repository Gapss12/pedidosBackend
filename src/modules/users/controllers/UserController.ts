import type { Request, Response, NextFunction } from "express"
import { UserService } from "../services/UserService"
import type { ApiResponse } from "@/core/types/global"

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers()
      const response: ApiResponse = {
        success: true,
        data: users,
        message: "Usuarios obtenidos correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const user = await this.userService.getUserById(Number.parseInt(id))
      const response: ApiResponse = {
        success: true,
        data: user,
        message: "Usuario obtenido correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = req.body
      const user = await this.userService.createUser(userData)
      const response: ApiResponse = {
        success: true,
        data: user,
        message: "Usuario creado correctamente",
      }
      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const userData = req.body
      const user = await this.userService.updateUser(Number.parseInt(id), userData)
      const response: ApiResponse = {
        success: true,
        data: user,
        message: "Usuario actualizado correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      await this.userService.deleteUser(Number.parseInt(id))
      const response: ApiResponse = {
        success: true,
        message: "Usuario eliminado correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
