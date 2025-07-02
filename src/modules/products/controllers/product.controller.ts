/**
 * Product controller handling HTTP requests
 * @author Gabriel Guzman
 * @date 2025-08-01
 * @signature ProductController
 */

import type { Request, Response } from "express"
import type { ProductService } from "../services/product.service"
import { PaginationUtil } from "@/core/utils/pagination.util"

export class ProductController {
  constructor(private productService: ProductService) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const paginationOptions = PaginationUtil.createPaginationOptions(page, limit)
      const result = await this.productService.getAll(paginationOptions)

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const result = await this.productService.getById(id)

      const statusCode = result.success ? 200 : 404
      res.status(statusCode).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.productService.create(req.body)

      const statusCode = result.success ? 201 : 400
      res.status(statusCode).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const result = await this.productService.update(id, req.body)

      const statusCode = result.success ? 200 : 404
      res.status(statusCode).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const result = await this.productService.delete(id)

      const statusCode = result.success ? 200 : 404
      res.status(statusCode).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }

  getLowStock = async (req: Request, res: Response): Promise<void> => {
    try {
      const threshold = Number.parseInt(req.query.threshold as string) || 10
      const result = await this.productService.getLowStockProducts(threshold)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      })
    }
  }
}
