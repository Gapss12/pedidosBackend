/**
 * User service implementing business logic
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature UserService
 */

import type { IService } from "@/core/interfaces/service.interface"
import type { UserRepository } from "../repositories/user.repository"
import type { User } from "@/core/models/index"
import type { CreateUserDTO } from "../dtos/create-user.dto"
import type { UpdateUserDTO } from "../dtos/update-user.dto"
import type { ApiResponse, PaginatedResponse, PaginationOptions } from "@/types/global"
import { ResponseUtil } from "@/core/utils/response.util"
import { PaginationUtil } from "@/core/utils/pagination.util"
import jwt from "jsonwebtoken"
import { appConfig } from "@/config/database"

export class UserService implements IService<User, CreateUserDTO, UpdateUserDTO> {
  constructor(private userRepository: UserRepository) {}

  async getAll(options?: PaginationOptions): Promise<PaginatedResponse<User>> {
    try {
      const paginationOptions = options || PaginationUtil.createPaginationOptions()
      const users = await this.userRepository.findAll(paginationOptions)
      const total = await this.userRepository.count()

      const paginationResponse = PaginationUtil.createPaginationResponse(users, total, paginationOptions)

      return ResponseUtil.paginated(
        paginationResponse.data,
        paginationResponse.pagination,
        "Users retrieved successfully",
      )
    } catch (error) {
      return ResponseUtil.error("Failed to retrieve users") as PaginatedResponse<User>
    }
  }

  async getById(id: string): Promise<ApiResponse<User>> {
    try {
      const user = await this.userRepository.findById(id)

      if (!user) {
        return ResponseUtil.error("User not found")
      }

      return ResponseUtil.success(user, "User retrieved successfully")
    } catch (error) {
      return ResponseUtil.error("Failed to retrieve user")
    }
  }

  async create(data: CreateUserDTO): Promise<ApiResponse<User>> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(data.correo)
      if (existingUser) {
        return ResponseUtil.error("User with this email already exists")
      }

      const user = await this.userRepository.create(data)
      return ResponseUtil.success(user, "User created successfully")
    } catch (error) {
      return ResponseUtil.error("Failed to create user")
    }
  }

  async update(id: string, data: UpdateUserDTO): Promise<ApiResponse<User>> {
    try {
      // Check if email is being updated and already exists
      if (data.correo) {
        const existingUser = await this.userRepository.findByEmail(data.correo)
        if (existingUser && existingUser.id !== id) {
          return ResponseUtil.error("User with this email already exists")
        }
      }

      const user = await this.userRepository.update(id, data)

      if (!user) {
        return ResponseUtil.error("User not found")
      }

      return ResponseUtil.success(user, "User updated successfully")
    } catch (error) {
      return ResponseUtil.error("Failed to update user")
    }
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      const deleted = await this.userRepository.delete(id)

      if (!deleted) {
        return ResponseUtil.error("User not found")
      }

      return ResponseUtil.success(undefined, "User deleted successfully")
    } catch (error) {
      return ResponseUtil.error("Failed to delete user")
    }
  }

  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const user = await this.userRepository.validatePassword(email, password)

      if (!user) {
        return ResponseUtil.error("Invalid credentials")
      }

      const token = jwt.sign({ id: user.id, email: user.correo, role: user.rol }, appConfig.jwtSecret, {
        expiresIn: "24h",
      })

      return ResponseUtil.success({ user, token }, "Login successful")
    } catch (error) {
      return ResponseUtil.error("Login failed")
    }
  }
}
