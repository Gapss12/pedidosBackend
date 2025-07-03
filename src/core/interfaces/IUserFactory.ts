import type { User } from "../entities/User"

export interface IUserFactory {
  createUser(name: string, email: string): User
}
