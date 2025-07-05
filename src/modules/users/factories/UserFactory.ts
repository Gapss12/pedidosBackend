/**
 * UserFactory - Factory para crear diferentes tipos de usuarios
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature UserFactory
 */
// PATRÓN FACTORY METHOD - Creación de diferentes tipos de usuario

import { User } from "@/core/entities/User"
import type { IUserFactory } from "@/core/interfaces/IUserFactory"
import { UserType } from "@/core/types/global"

export abstract class UserFactory implements IUserFactory {
  abstract createUser(name: string, email: string): User
}

export class ClientUserFactory extends UserFactory {
  createUser(name: string, email: string): User {
    return new User(0, name, email, UserType.CLIENT)
  }
}

export class AdminUserFactory extends UserFactory {
  createUser(name: string, email: string): User {
    return new User(0, name, email, UserType.ADMIN)
  }
}

export class UserFactoryProvider {
  static getFactory(type: UserType): UserFactory {
    switch (type) {
      case UserType.CLIENT:
        return new ClientUserFactory()
      case UserType.ADMIN:
        return new AdminUserFactory()
      default:
        throw new Error(`Tipo de usuario no soportado: ${type}`)
    }
  }
}