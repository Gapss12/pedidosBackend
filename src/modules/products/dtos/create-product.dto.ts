/**
 * DTO for creating a new product
 * @author Gabriel Guzman
 * @date 2025-08-01
 * @signature CreateProductDTO
 */

import { IsString, IsNumber, IsOptional, Min, MinLength } from "class-validator"

export class CreateProductDTO {
  @IsString()
  @MinLength(2)
  nombre!: string

  @IsOptional()
  @IsString()
  descripcion!: string

  @IsNumber()
  @Min(0)
  precio!: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number
}