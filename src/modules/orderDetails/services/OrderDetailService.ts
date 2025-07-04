/**
 * Order Detail Service
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature OrderDetailService
 */

import { OrderDetailRepository } from "../repositories/OrderDetailRepository"
import type { CreateOrderDetailDto, UpdateOrderDetailDto } from "../dtos/OrderDetailDto"
import type { OrderDetail } from "@/core/entities/OrderDetail"
import { AppError } from "@/core/middlewares/errorHandler"

export class OrderDetailService {
  private orderDetailRepository: OrderDetailRepository

  constructor() {
    this.orderDetailRepository = new OrderDetailRepository()
  }

  async getAllOrderDetails(): Promise<OrderDetail[]> {
    return await this.orderDetailRepository.findAll()
  }

  async getOrderDetailById(id: number): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailRepository.findById(id)
    if (!orderDetail) {
      throw new AppError("Detalle de pedido no encontrado", 404)
    }
    return orderDetail
  }

  async getOrderDetailsByOrderId(orderId: number): Promise<OrderDetail[]> {
    return await this.orderDetailRepository.findByOrderId(orderId)
  }

  async createOrderDetail(orderDetailData: CreateOrderDetailDto): Promise<OrderDetail> {
    if (orderDetailData.quantity <= 0) {
      throw new AppError("La cantidad debe ser mayor a 0", 400)
    }

    if (orderDetailData.unitPrice <= 0) {
      throw new AppError("El precio unitario debe ser mayor a 0", 400)
    }

    // Verificar que el subtotal sea correcto
    const expectedSubtotal = orderDetailData.quantity * orderDetailData.unitPrice
    if (Math.abs(orderDetailData.subtotal - expectedSubtotal) > 0.01) {
      throw new AppError("El subtotal no coincide con cantidad × precio unitario", 400)
    }

    return await this.orderDetailRepository.create(orderDetailData)
  }

  async updateOrderDetail(id: number, orderDetailData: UpdateOrderDetailDto): Promise<OrderDetail> {
    await this.getOrderDetailById(id) // Verificar que existe

    if (orderDetailData.quantity !== undefined && orderDetailData.quantity <= 0) {
      throw new AppError("La cantidad debe ser mayor a 0", 400)
    }

    if (orderDetailData.unitPrice !== undefined && orderDetailData.unitPrice <= 0) {
      throw new AppError("El precio unitario debe ser mayor a 0", 400)
    }

    const updatedOrderDetail = await this.orderDetailRepository.update(id, orderDetailData)
    if (!updatedOrderDetail) {
      throw new AppError("Error al actualizar detalle de pedido", 500)
    }

    return updatedOrderDetail
  }

  async deleteOrderDetail(id: number): Promise<void> {
    await this.getOrderDetailById(id) // Verificar que existe
    const deleted = await this.orderDetailRepository.delete(id)

    if (!deleted) {
      throw new AppError("Error al eliminar detalle de pedido", 500)
    }
  }
}
