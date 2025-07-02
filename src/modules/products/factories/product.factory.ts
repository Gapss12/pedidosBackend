/**
 * Factory de Productos - Implementa patrón Factory Method
 */

import { ServiceFactory } from "@/patterns/creational/factory"
import { ProductRepository } from "../repositories/product.repository"
import { ProductService } from "../services/product.service"
import type { Product, CreateProductDTO, UpdateProductDTO } from "../models/product.model"

export class ProductFactory extends ServiceFactory<Product, CreateProductDTO, UpdateProductDTO> {
  createService(): ProductService {
    console.log(`🏭 ProductFactory: Creando ProductService`)

    const repository = new ProductRepository()
    return new ProductService(repository)
  }
}
