/**
 * User factory implementing Factory Method pattern
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature UserFactory
 */

import { ModuleFactory } from "@/patterns/creational/factory-method"
import { UserRepository } from "../repositories/user.repository"
import { UserService } from "../services/user.service"
import { UserController } from "../controllers/controller"
import type { User } from "@/core/models/index"
import type { CreateUserDTO } from "../dtos/create-user.dto"
import type { UpdateUserDTO } from "../dtos/update-user.dto"

export class UserFactory extends ModuleFactory<User, CreateUserDTO, UpdateUserDTO> {
  createRepository(): UserRepository {
    return new UserRepository()
  }

  createService(): UserService {
    return new UserService(this.createRepository())
  }

  createController(): UserController {
    return new UserController(this.createService())
  }
}
