import type { Request, Response, NextFunction } from "express"
import { OrderService } from "../services/OrderService"
import { OrderProcessFacade } from "../services/OrderProcessFacade"
import type { ApiResponse } from "@/core/types/global"

export class OrderController {
  private orderService: OrderService
  private orderProcessFacade: OrderProcessFacade

  constructor() {
    this.orderService = new OrderService()
    this.orderProcessFacade = new OrderProcessFacade()
  }

  getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orders = await this.orderService.getAllOrders()
      const response: ApiResponse = {
        success: true,
        data: orders,
        message: "Pedidos obtenidos correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const order = await this.orderService.getOrderById(Number.parseInt(id))
      const response: ApiResponse = {
        success: true,
        data: order,
        message: "Pedido obtenido correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  getOrdersByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.params
      const orders = await this.orderService.getOrdersByUserId(Number.parseInt(userId))
      const response: ApiResponse = {
        success: true,
        data: orders,
        message: "Pedidos del usuario obtenidos correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orderData = req.body
      const order = await this.orderProcessFacade.processOrder(orderData)
      const response: ApiResponse = {
        success: true,
        data: order,
        message: "Pedido creado correctamente",
      }
      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }

  updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const orderData = req.body
      const order = await this.orderService.updateOrder(Number.parseInt(id), orderData)
      const response: ApiResponse = {
        success: true,
        data: order,
        message: "Pedido actualizado correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  cancelOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      await this.orderProcessFacade.cancelOrder(Number.parseInt(id))
      const response: ApiResponse = {
        success: true,
        message: "Pedido cancelado correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
