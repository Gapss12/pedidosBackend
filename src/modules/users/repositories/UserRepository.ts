import { User } from "../../../core/models/User"
import type { IRepository } from "../../../core/interfaces/IRepository"
import { User } from "../../../core/entities/User"

export class UserRepository implements IRepository<User> {
  async findAll(): Promise<User[]> {
    const users = await User.findAll()
    return users.map((user) => new User(user.id, user.name, user.email, user.type, user.createdAt, user.updatedAt))
  }

  async findById(id: number): Promise<User | null> {
    const user = await User.findByPk(id)
    if (!user) return null

    return new User(user.id, user.name, user.email, user.type, user.createdAt, user.updatedAt)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } })
    if (!user) return null

    return new User(user.id, user.name, user.email, user.type, user.createdAt, user.updatedAt)
  }

  async create(data: Partial<User>): Promise<User> {
    const user = await User.create(data as any)
    return new User(user.id, user.name, user.email, user.type, user.createdAt, user.updatedAt)
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    const [affectedRows] = await User.update(data as any, { where: { id } })
    if (affectedRows === 0) return null

    return this.findById(id)
  }

  async delete(id: number): Promise<boolean> {
    const affectedRows = await User.destroy({ where: { id } })
    return affectedRows > 0
  }
}
