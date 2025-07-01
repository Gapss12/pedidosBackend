/**
 * DTO for creating a new user
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature CreateUserDTO
 */

import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from "class-validator"
import { UserRole } from "@/types/global"

export class CreateUserDTO {
  @IsString()
  @MinLength(2)
  nombre!: string

  @IsEmail()
  correo!: string

  @IsString()
  @MinLength(8)
  contraseña!: string

  @IsOptional()
  @IsEnum(UserRole)
  rol?: UserRole
}
