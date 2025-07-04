import type { Request, Response, NextFunction } from "express"
import { OrderDetailService } from "../services/OrderDetailService"
import type { ApiResponse } from "@/core/types/global"

export class OrderDetailController {
  private orderDetailService: OrderDetailService

  constructor() {
    this.orderDetailService = new OrderDetailService()
  }

  getAllOrderDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orderDetails = await this.orderDetailService.getAllOrderDetails()
      const response: ApiResponse = {
        success: true,
        data: orderDetails,
        message: "Detalles de pedidos obtenidos correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  getOrderDetailById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const orderDetail = await this.orderDetailService.getOrderDetailById(Number.parseInt(id))
      const response: ApiResponse = {
        success: true,
        data: orderDetail,
        message: "Detalle de pedido obtenido correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  getOrderDetailsByOrderId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { orderId } = req.params
      const orderDetails = await this.orderDetailService.getOrderDetailsByOrderId(Number.parseInt(orderId))
      const response: ApiResponse = {
        success: true,
        data: orderDetails,
        message: "Detalles del pedido obtenidos correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  createOrderDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orderDetailData = req.body
      const orderDetail = await this.orderDetailService.createOrderDetail(orderDetailData)
      const response: ApiResponse = {
        success: true,
        data: orderDetail,
        message: "Detalle de pedido creado correctamente",
      }
      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }

  updateOrderDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const orderDetailData = req.body
      const orderDetail = await this.orderDetailService.updateOrderDetail(Number.parseInt(id), orderDetailData)
      const response: ApiResponse = {
        success: true,
        data: orderDetail,
        message: "Detalle de pedido actualizado correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  deleteOrderDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      await this.orderDetailService.deleteOrderDetail(Number.parseInt(id))
      const response: ApiResponse = {
        success: true,
        message: "Detalle de pedido eliminado correctamente",
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
