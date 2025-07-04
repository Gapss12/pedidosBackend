/**
 * UserDto - Data Transfer Object for creating a new user
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature UserDtos
 */
export interface CreateUserDto {
  name: string
  email: string
  type?: "client" | "admin"
}

export interface UpdateUserDto {
  name?: string
  email?: string
  type?: "client" | "admin"
}
