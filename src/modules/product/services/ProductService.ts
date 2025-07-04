import { ProductRepository } from "../repositories/ProductRepository"
import type { CreateProductDto, UpdateProductDto } from "../dtos/CreateProductDto"
import type { Product } from "@/core/entities/Product"
import { AppError } from "@/core/middlewares/errorHandler"
import { PricingContext, FixedPricingStrategy, VolumeDiscountStrategy, PromotionStrategy } from "./PricingStrategy"
import { PricingStrategyType } from "@/core/types/global"

export class ProductService {
  private productRepository: ProductRepository

  constructor() {
    this.productRepository = new ProductRepository()
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll()
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new AppError("Producto no encontrado", 404)
    }
    return product
  }

  async createProduct(productData: CreateProductDto): Promise<Product> {
    if (productData.price <= 0) {
      throw new AppError("El precio debe ser mayor a 0", 400)
    }

    if (productData.stock < 0) {
      throw new AppError("El stock no puede ser negativo", 400)
    }

    return await this.productRepository.create(productData)
  }

  async updateProduct(id: number, productData: UpdateProductDto): Promise<Product> {
    await this.getProductById(id) // Verificar que existe

    if (productData.price !== undefined && productData.price <= 0) {
      throw new AppError("El precio debe ser mayor a 0", 400)
    }

    if (productData.stock !== undefined && productData.stock < 0) {
      throw new AppError("El stock no puede ser negativo", 400)
    }

    const updatedProduct = await this.productRepository.update(id, productData)
    if (!updatedProduct) {
      throw new AppError("Error al actualizar producto", 500)
    }

    return updatedProduct
  }

  async deleteProduct(id: number): Promise<void> {
    await this.getProductById(id) // Verificar que existe
    const deleted = await this.productRepository.delete(id)

    if (!deleted) {
      throw new AppError("Error al eliminar producto", 500)
    }
  }

  // Método que utiliza Strategy Pattern para calcular precios
  async calculatePrice(
    productId: number,
    quantity: number,
    strategyType: PricingStrategyType = PricingStrategyType.FIXED,
  ): Promise<number> {
    const product = await this.getProductById(productId)

    let strategy
    switch (strategyType) {
      case PricingStrategyType.VOLUME_DISCOUNT:
        strategy = new VolumeDiscountStrategy()
        break
      case PricingStrategyType.PROMOTION:
        strategy = new PromotionStrategy()
        break
      default:
        strategy = new FixedPricingStrategy()
    }

    const pricingContext = new PricingContext(strategy)
    return pricingContext.calculatePrice(product.price, quantity)
  }

  async checkStock(productId: number, requiredQuantity: number): Promise<boolean> {
    const product = await this.getProductById(productId)
    return product.stock >= requiredQuantity
  }

  async reduceStock(productId: number, quantity: number): Promise<void> {
    const product = await this.getProductById(productId)

    if (product.stock < quantity) {
      throw new AppError("Stock insuficiente", 400)
    }

    const newStock = product.stock - quantity
    await this.productRepository.updateStock(productId, newStock)
  }
}
