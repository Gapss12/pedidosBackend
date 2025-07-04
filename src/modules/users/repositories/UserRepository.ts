/**
 * UserRepository - Repositorio para manejar operaciones de usuario
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature UserRepository
 */
import { UserModel } from "@/core/models/index"
import type { IRepository } from "../../../core/interfaces/IRepository"
import { User } from "../../../core/entities/User"

export class UserRepository implements IRepository<User> {
  async findAll(): Promise<User[]> {
    const users = await UserModel.findAll()
    return users.map((user) => new User(user.id, user.name, user.email, user.type, user.createdAt, user.updatedAt))
  }

  async findById(id: number): Promise<User | null> {
    const user = await UserModel.findByPk(id)
    if (!user) return null

    return new User(user.id, user.name, user.email, user.type, user.createdAt, user.updatedAt)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } })
    if (!user) return null

    return new User(user.id, user.name, user.email, user.type, user.createdAt, user.updatedAt)
  }

  async create(data: Partial<User>): Promise<User> {
    const user = await UserModel.create(data as any)
    return new User(user.id, user.name, user.email, user.type, user.createdAt, user.updatedAt)
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    const [affectedRows] = await UserModel.update(data as any, { where: { id } })
    if (affectedRows === 0) return null

    return this.findById(id)
  }

  async delete(id: number): Promise<boolean> {
    const affectedRows = await UserModel.destroy({ where: { id } })
    return affectedRows > 0
  }
}
