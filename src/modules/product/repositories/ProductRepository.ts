/**
 * ProductRepository class for managing product data
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature ProductRepository
 */
import { ProductModel } from "@/core/models/index"
import type { IRepository } from "@/core/interfaces/IRepository"
import { Product } from "@/core/entities/Product"

export class ProductRepository implements IRepository<Product> {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll()
    return products.map(
      (product) =>
        new Product(
          product.id,
          product.name,
          product.description,
          product.price,
          product.stock,
          product.createdAt,
          product.updatedAt,
        ),
    )
  }

  async findById(id: number): Promise<Product | null> {
    const product = await ProductModel.findByPk(id)
    if (!product) return null

    return new Product(
      product.id,
      product.name,
      product.description,
      product.price,
      product.stock,
      product.createdAt,
      product.updatedAt,
    )
  }

  async create(data: Partial<Product>): Promise<Product> {
    const product = await ProductModel.create(data as any)
    return new Product(
      product.id,
      product.name,
      product.description,
      product.price,
      product.stock,
      product.createdAt,
      product.updatedAt,
    )
  }

  async update(id: number, data: Partial<Product>): Promise<Product | null> {
    const [affectedRows] = await ProductModel.update(data as any, { where: { id } })
    if (affectedRows === 0) return null

    return this.findById(id)
  }

  async delete(id: number): Promise<boolean> {
    const affectedRows = await ProductModel.destroy({ where: { id } })
    return affectedRows > 0
  }

  async updateStock(id: number, quantity: number): Promise<boolean> {
    const [affectedRows] = await ProductModel.update({ stock: quantity }, { where: { id } })
    return affectedRows > 0
  }
}
