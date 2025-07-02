/**
 * DTO for updating product information
 * @author Gabriel Guzman
 * @date 2025-08-01
 * @signature UpdateProductDTO
 */

import { IsString, IsNumber, IsOptional, Min, MinLength } from "class-validator"

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  @MinLength(2)
  nombre?: string

  @IsOptional()
  @IsString()
  descripcion?: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  precio?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number
}