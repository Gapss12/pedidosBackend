/**
 * Servicio de Productos - Integra patrón Observer para alertas de stock
 */

import { Product } from "@/core/models/index"
import { ProductRepository } from "../repositories/product.repository"
import { IService } from "@/core/interfaces/service.interface"
import { EventManager } from "@/patterns/behavioral/observer"
import { CreateProductDTO } from "../dtos/create-product.dto"
import { UpdateProductDTO } from "../dtos/update-product.dto"
import { ProductEntity } from "@/core/entities/product.entity"
import { PaginationOptions, PaginatedResponse, ApiResponse } from "@/core/types/global"
import { ResponseUtil } from "@/core/utils/response.util"
import { PaginationUtil } from "@/core/utils/pagination.util"

export class ProductService implements IService<Product, CreateProductDTO, UpdateProductDTO> {
  constructor(
    private productRepository: ProductRepository,
    private eventManager?: EventManager,
  ) {
    console.log(`ProductService: Inicializado`)
  }

  async getAll(options?: PaginationOptions): Promise<PaginatedResponse<Product>> {
    try {
      const paginationOptions = options || PaginationUtil.createPaginationOptions()
      const products = await this.productRepository.getAll(paginationOptions)
      const total = await this.productRepository.count()
      const paginationResponse = PaginationUtil.createPaginationResponse(products, total, paginationOptions)
      return ResponseUtil.paginated(
        paginationResponse.data,
        paginationResponse.pagination,
        "Productos obtenidos correctamente"
      )
    } catch (error) {
      return ResponseUtil.error("No se pudieron obtener los productos") as PaginatedResponse<Product>
    }
  }

  async getById(id: string): Promise<ApiResponse<Product>> {
    try {
      const product = await this.productRepository.getById(id)
      if (!product) {
        return ResponseUtil.error("Producto no encontrado")
      }
      return ResponseUtil.success(product, "Producto obtenido correctamente")
    } catch (error) {
      return ResponseUtil.error("No se pudo obtener el producto")
    }
  }

  async create(data: CreateProductDTO): Promise<ApiResponse<Product>> {
    try {
      const product = await this.productRepository.create(data)
      if (this.eventManager) {
        await this.eventManager.notifyObservers("product_created", {
          productId: product.id,
          productName: product.nombre,
          initialStock: product.stock,
        })
      }
      return ResponseUtil.success(product, "Producto creado correctamente")
    } catch (error) {
      return ResponseUtil.error("No se pudo crear el producto")
    }
  }

  async update(id: string, data: UpdateProductDTO): Promise<ApiResponse<Product>> {
    try {
      const oldProduct = await this.productRepository.getById(id)
      if (!oldProduct) {
        return ResponseUtil.error(`Producto ${id} no encontrado`)
      }
      const updatedProduct = await this.productRepository.update(id, data)
      if (!updatedProduct) {
        return ResponseUtil.error("No se pudo actualizar el producto")
      }
      if (this.eventManager && data.stock !== undefined && data.stock < 10) {
        await this.eventManager.notifyObservers("low_stock", {
          productId: updatedProduct.id,
          productName: updatedProduct.nombre,
          currentStock: data.stock,
          minimumStock: 10,
        })
      }
      return ResponseUtil.success(updatedProduct, "Producto actualizado correctamente")
    } catch (error) {
      return ResponseUtil.error("No se pudo actualizar el producto")
    }
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      const deleted = await this.productRepository.delete(id)
      if (!deleted) {
        return ResponseUtil.error("Producto no encontrado")
      }
      return ResponseUtil.success(undefined, "Producto eliminado correctamente")
    } catch (error) {
      return ResponseUtil.error("No se pudo eliminar el producto")
    }
  }

  async getLowStockProducts(threshold = 10): Promise<ApiResponse<Product[]>> {
    try {
      const products = await this.productRepository.findLowStock(threshold)
      return ResponseUtil.success(products, "Productos con bajo stock obtenidos correctamente")
    } catch (error) {
      return ResponseUtil.error("No se pudieron obtener los productos con bajo stock")
    }
  }

  async updateStock(id: string, newStock: number): Promise<ApiResponse<Product>> {
    return this.update(id, { stock: newStock })
  }
}