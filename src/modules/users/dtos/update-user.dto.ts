/**
 * DTO for updating user information
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature UpdateUserDTO
 */

import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from "class-validator"
import { UserRole } from "@/types/global"

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(2)
  nombre?: string

  @IsOptional()
  @IsEmail()
  correo?: string

  @IsOptional()
  @IsString()
  @MinLength(8)
  contraseña?: string

  @IsOptional()
  @IsEnum(UserRole)
  rol?: UserRole
}
