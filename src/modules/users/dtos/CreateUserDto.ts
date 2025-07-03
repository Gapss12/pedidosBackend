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
