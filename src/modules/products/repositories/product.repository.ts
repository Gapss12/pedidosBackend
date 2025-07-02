/**
 * Product repository implementing the Repository pattern
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature ProductRepository
 */

import { Product } from "@/core/models/index"
import { IRepository } from "@/core/interfaces/IRepository"
import { CreateProductDTO } from "../dtos/create-product.dto"
import { UpdateProductDTO } from "../dtos/update-product.dto"
import type { PaginationOptions } from "@/core/types/global"

export class ProductRepository implements IRepository<Product, CreateProductDTO, UpdateProductDTO> {

  async getAll(options?: PaginationOptions): Promise<Product[]> {
    const queryOptions: any = {}

    if (options) {
      queryOptions.limit = options.limit
      queryOptions.offset = options.offset
    }

    return await Product.findAll(queryOptions)
  }

  async getById(id: string): Promise<Product | null> {
    return await Product.findByPk(id)
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const product = await Product.create(data as Partial<Product>)
    return product
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product | null> {
    const [affectedRows] = await Product.update(data, {
      where: { id },
    })

    if (affectedRows === 0) {
      return null
    }

    return await this.getById(id)
  }

  async delete(id: string): Promise<boolean> {
    const deletedRows = await Product.destroy({
      where: { id },
    })

    return deletedRows > 0
  }

  async count(): Promise<number> {
    return await Product.count()
  }

  async findLowStock(threshold = 10): Promise<Product[]> {
    return await Product.findAll({
      where: {
        stock: { ["$lt"]: threshold }
      }
    })
  }

  async updateStock(id: string, newStock: number): Promise<Product | null> {
    return await this.update(id, { stock: newStock })
  }
}