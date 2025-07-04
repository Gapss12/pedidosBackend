/**
 * ProductDto - Data Transfer Object for creating a new product
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature ProductDtos
 */
export interface CreateProductDto {
  name: string
  description?: string
  price: number
  stock: number
}

export interface UpdateProductDto {
  name?: string
  description?: string
  price?: number
  stock?: number
}
