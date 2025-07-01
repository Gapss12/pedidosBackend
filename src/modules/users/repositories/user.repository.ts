/**
 * User repository implementing the Repository pattern
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature UserRepository
 */

import type { IRepository } from "@/core/interfaces/repostiry.interface"
import { User } from "@/core/models/index"
import type { CreateUserDTO } from "../dtos/create-user.dto"
import type { UpdateUserDTO } from "../dtos/update-user.dto"
import type { PaginationOptions } from "@/types/global"
import bcrypt from "bcryptjs"

export class UserRepository implements IRepository<User, CreateUserDTO, UpdateUserDTO> {
  async findAll(options?: PaginationOptions): Promise<User[]> {
    const queryOptions: any = {
      attributes: { exclude: ["contraseña"] },
    }

    if (options) {
      queryOptions.limit = options.limit
      queryOptions.offset = options.offset
    }

    return await User.findAll(queryOptions)
  }

  async findById(id: string): Promise<User | null> {
    return await User.findByPk(id, {
      attributes: { exclude: ["contraseña"] },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({
      where: { correo: email },
    })
  }

  async create(data: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.contraseña, 10)

    const user = await User.create({
      ...data,
      contraseña: hashedPassword,
    })

    // Remove password from returned object
    const userJson = user.toJSON() as any
    delete userJson.contraseña

    return userJson
  }

  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    const updateData = { ...data }

    if (updateData.contraseña) {
      updateData.contraseña = await bcrypt.hash(updateData.contraseña, 10)
    }

    const [affectedRows] = await User.update(updateData, {
      where: { id },
    })

    if (affectedRows === 0) {
      return null
    }

    return await this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const deletedRows = await User.destroy({
      where: { id },
    })

    return deletedRows > 0
  }

  async count(): Promise<number> {
    return await User.count()
  }

  async validatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email)
    if (!user) {
      return null
    }

    const isValid = await bcrypt.compare(password, user.contraseña)
    if (!isValid) {
      return null
    }

    const userJson = user.toJSON() as any
    delete userJson.contraseña

    return userJson
  }
}
