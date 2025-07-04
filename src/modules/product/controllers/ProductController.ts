/**
 * ProductController - Controlador para manejar las operaciones de productos
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature ProductController
 */
import type { Request, Response, NextFunction } from "express"
import { ProductService } from "../services/ProductService"
import { PricingStrategyType, type ApiResponse } from "@/core/types/global"

export class ProductController {
  private productService: ProductService

  constructor() {
    this.productService = new ProductService()
  }

  getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const products = await this.productService.getAllProducts()
      const response: ApiResponse = {
        success: true,
        data: products,
        message: "Productos obtenidos correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const product = await this.productService.getProductById(Number.parseInt(id))
      const response: ApiResponse = {
        success: true,
        data: product,
        message: "Producto obtenido correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productData = req.body
      const product = await this.productService.createProduct(productData)
      const response: ApiResponse = {
        success: true,
        data: product,
        message: "Producto creado correctamente",
      }
      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }

  updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const productData = req.body
      const product = await this.productService.updateProduct(Number.parseInt(id), productData)
      const response: ApiResponse = {
        success: true,
        data: product,
        message: "Producto actualizado correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      await this.productService.deleteProduct(Number.parseInt(id))
      const response: ApiResponse = {
        success: true,
        message: "Producto eliminado correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  calculatePrice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const { quantity, strategy } = req.body

      const strategyType = (strategy as PricingStrategyType) || PricingStrategyType.FIXED
      const price = await this.productService.calculatePrice(Number.parseInt(id), quantity, strategyType)

      const response: ApiResponse = {
        success: true,
        data: { price, quantity, strategy: strategyType },
        message: "Precio calculado correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
