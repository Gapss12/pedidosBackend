import { UserRepository } from "../repositories/UserRepository"
import type { CreateUserDto, UpdateUserDto } from "../dtos/CreateUserDto"
import type { User } from "@/core/entities/User"
import { UserFactoryProvider } from "../factories/UserFactory"
import { UserType } from "@/core/types/global"
import { AppError } from "@/core/middlewares/errorHandler"
import { NotificationManager } from "./NotificationManager"

export class UserService {
  private userRepository: UserRepository
  private notificationManager: NotificationManager

  constructor() {
    this.userRepository = new UserRepository()
    this.notificationManager = NotificationManager.getInstance()
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new AppError("Usuario no encontrado", 404)
    }
    return user
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    // Verificar si el email ya existe
    const existingUser = await this.userRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new AppError("El email ya está registrado", 400)
    }

    // Usar Factory para crear el usuario
    const userType = userData.type === "admin" ? UserType.ADMIN : UserType.CLIENT
    const factory = UserFactoryProvider.getFactory(userType)
    const userEntity = factory.createUser(userData.name, userData.email)

    // Crear en base de datos
    const createdUser = await this.userRepository.create({
      name: userEntity.name,
      email: userEntity.email,
      type: userEntity.type,
    })

    // Notificar a observadores
    this.notificationManager.notify("user_created", createdUser)

    return createdUser
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
    const existingUser = await this.getUserById(id)

    if (userData.email && userData.email !== existingUser.email) {
      const emailExists = await this.userRepository.findByEmail(userData.email)
      if (emailExists) {
        throw new AppError("El email ya está registrado", 400)
      }
    }

    const updatedUser = await this.userRepository.update(id, userData)
    if (!updatedUser) {
      throw new AppError("Error al actualizar usuario", 500)
    }

    return updatedUser
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id)
    const deleted = await this.userRepository.delete(id)

    if (!deleted) {
      throw new AppError("Error al eliminar usuario", 500)
    }
  }
}
